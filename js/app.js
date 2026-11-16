/* Interações do site (vanilla JS, sem dependências). */

/* ---------- Depoimentos de pacientes (página inicial) ----------
   Para publicar, coloque o arquivo em /img/depoimentos/ e preencha os campos.
   tipo: 'print' (imagem do depoimento) ou 'video' (vídeo vertical 9:16, abre num modal)
   arquivo: caminho do arquivo; vazio = card de placeholder
   capa: (opcional, só vídeo) imagem mostrada antes de dar play
   Só publicar depoimentos reais, com autorização do paciente. */
var DEPOIMENTOS_PACIENTES = [
  { tipo: 'print', arquivo: '', nome: '', tratamento: '' },
  { tipo: 'video', arquivo: '', capa: '', nome: '', tratamento: '' },
  { tipo: 'print', arquivo: '', nome: '', tratamento: '' },
  { tipo: 'video', arquivo: '', capa: '', nome: '', tratamento: '' },
  { tipo: 'print', arquivo: '', nome: '', tratamento: '' }
];

(function () {
  var PHONE = '5555997167672';
  var wa = function (msg) { return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg); };
  var hasIO = 'IntersectionObserver' in window;
  var onVisible = function (els, fn, opts) {
    if (!hasIO) { els.forEach(fn); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } });
    }, opts || { threshold: 0.35 });
    els.forEach(function (el) { io.observe(el); });
  };

  /* ---------- Modo claro / escuro ----------
     O tema inicial é definido por um script no <head> (escolha salva ou a do sistema). */
  var root = document.documentElement;
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var applyTheme = function (t) {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#131619' : '#FFFFFF');
    document.querySelectorAll('.theme-t').forEach(function (b) {
      b.setAttribute('aria-label', t === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
      b.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    });
  };
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  document.querySelectorAll('.theme-t').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(t);
      try { localStorage.setItem('tema', t); } catch (e) {}
    });
  });

  /* ---------- Revelação ao rolar (fallback para navegadores sem animation-timeline) ---------- */
  var supportsTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (!supportsTimeline && hasIO) {
    document.documentElement.classList.add('io');
    onVisible(Array.prototype.slice.call(document.querySelectorAll('.rv')), function (el) { el.classList.add('in'); },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }

  /* ---------- Números que sobem ----------
     <span class="num" data-count="17">17</span>      conta de 0 até 17
     <span class="num" data-since="2018">8</span>     anos desde 2018 (atualiza sozinho)
     data-pad="2" completa com zero (01, 02...). Sem JS, o número final já está no HTML. */
  var nums = Array.prototype.slice.call(document.querySelectorAll('.num[data-count], .num[data-since]'));
  var fmt = function (el, v) {
    var s = Math.round(v).toLocaleString('pt-BR');
    var pad = Number(el.getAttribute('data-pad') || 0);
    while (s.length < pad) s = '0' + s;
    el.textContent = s;
  };
  nums.forEach(function (el) {
    var since = el.getAttribute('data-since');
    el._target = since ? Math.max(0, new Date().getFullYear() - Number(since)) : Number(el.getAttribute('data-count'));
    fmt(el, hasIO ? 0 : el._target);
  });
  onVisible(nums, function (el) {
    var t0 = null, dur = el._target > 20 ? 1800 : 1100;
    var step = function (t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur);
      fmt(el, el._target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });

  /* ---------- Início: casos antes/depois ---------- */
  var CASES = [
    { label: 'Facetas em resina composta', antes: '/img/caso-resina-antes.jpg', depois: '/img/caso-resina-depois.jpg',
      desc: 'Correção de cor, forma e proporção com resina composta. Técnica conservadora, feita em consultório, que preserva ao máximo a estrutura do dente.' },
    { label: 'Reabilitação em cerâmica', antes: '/img/caso-reab-antes.jpg', depois: '/img/caso-reab-depois.jpg',
      desc: 'Reconstrução do sorriso com peças cerâmicas quando vários dentes precisam de tratamento, devolvendo estética, função e confiança.' },
    { label: 'Facetas em cerâmica', antes: '/img/caso-ceram-antes.jpg', depois: '/img/caso-ceram-depois.jpg',
      desc: 'Laminados cerâmicos confeccionados sob medida para um resultado natural, estável e duradouro.' }
  ];
  var ba = document.querySelector('.ba');
  if (ba) {
    var imgs = ba.querySelectorAll('img');           // [0] depois, [1] antes
    var before = ba.querySelector('.ba-b');
    var line = ba.querySelector('.ba-line');
    var range = ba.querySelector('.ba-range');
    var tabs = document.querySelectorAll('.tab');
    var setPos = function (v) {
      before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
      line.style.left = v + '%';
    };
    range.addEventListener('input', function () { setPos(Number(range.value)); });
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        var c = CASES[i];
        tabs.forEach(function (t, j) { t.classList.toggle('on', j === i); t.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
        imgs[0].src = c.depois; imgs[0].alt = 'Depois: ' + c.label;
        imgs[1].src = c.antes;  imgs[1].alt = 'Antes: ' + c.label;
        document.querySelector('.case-n').textContent = '0' + (i + 1) + ' / 03';
        document.querySelector('.case-t').textContent = c.label;
        document.querySelector('.case-d').textContent = c.desc;
        range.value = 50; setPos(50);
      });
    });
  }

  /* ---------- Início: carrossel de depoimentos ---------- */
  var track = document.getElementById('dp-track');
  if (track && window.DEPOIMENTOS_PACIENTES) {
    var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var PLAY = '<span class="dp-play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></span>';
    var nP = 0, nV = 0;
    track.innerHTML = DEPOIMENTOS_PACIENTES.map(function (d, i) {
      var isV = d.tipo === 'video', n = isV ? ++nV : ++nP;
      var label = isV ? 'Vídeo depoimento ' + n : 'Print depoimento ' + n;
      var nome = d.nome ? esc(d.nome) : '<span class="ph-hold">[Nome do paciente]</span>';
      var trat = d.tratamento ? esc(d.tratamento) : '<span class="ph-hold">[Tratamento]</span>';
      var media;
      if (!d.arquivo) {
        media = '<span class="dp-ph"><em class="dp-tag">placeholder</em>' + (isV ? PLAY : '') + '<span>[' + label + ']</span></span>';
      } else if (isV) {
        media = (d.capa ? '<img src="' + esc(d.capa) + '" alt="" loading="lazy">' : '<span class="dp-ph"></span>') + PLAY;
      } else {
        media = '<img src="' + esc(d.arquivo) + '" alt="Depoimento de ' + esc(d.nome || 'paciente') + '" loading="lazy">';
      }
      var mediaEl = isV
        ? '<button class="dp-media" type="button" data-i="' + i + '" aria-label="Assistir ' + (d.nome ? 'depoimento de ' + esc(d.nome) : label) + '">' + media + '</button>'
        : '<div class="dp-media">' + media + '</div>';
      return '<article class="dp' + (isV ? ' dp-v' : '') + '">' + mediaEl + '<p class="dp-cap"><b>' + nome + '</b><span>' + trat + '</span></p></article>';
    }).join('');

    var cards = function () { return track.querySelectorAll('.dp'); };
    var prev = document.querySelector('[data-car="-1"]'), next = document.querySelector('[data-car="1"]');
    var updateArrows = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    [prev, next].forEach(function (b) {
      if (!b) return;
      b.addEventListener('click', function () {
        var c = cards()[0]; var stepW = c ? c.getBoundingClientRect().width + 16 : 280;
        track.scrollBy({ left: Number(b.getAttribute('data-car')) * stepW, behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();

    // modal de vídeo: o arquivo só é carregado quando o modal abre
    var modal = document.getElementById('vmodal');
    if (modal && modal.showModal) {
      var body = modal.querySelector('.vmodal-b');
      var close = function () { modal.close(); };
      modal.addEventListener('close', function () { body.innerHTML = ''; });
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      modal.querySelector('.vmodal-x').addEventListener('click', close);
      track.addEventListener('click', function (e) {
        var btn = e.target.closest('button.dp-media'); if (!btn) return;
        var d = DEPOIMENTOS_PACIENTES[Number(btn.getAttribute('data-i'))];
        body.innerHTML = d.arquivo
          ? '<video src="' + esc(d.arquivo) + '"' + (d.capa ? ' poster="' + esc(d.capa) + '"' : '') + ' controls autoplay playsinline></video>'
          : '<div class="vmodal-ph"><p>' + esc(btn.querySelector('.dp-ph > span:last-child') ? btn.querySelector('.dp-ph > span:last-child').textContent : '[Vídeo]') + '</p><span>O vídeo entra aqui quando o arquivo for enviado.</span></div>';
        modal.showModal();
      });
    }
  }

  /* ---------- Cursos: contagem regressiva ----------
     data-cd usa -03:00, o fuso de America/Sao_Paulo (sem horário de verão desde 2019).
     Fica escondida sem JS e some quando a data passa. */
  var cd = document.querySelector('[data-cd]');
  if (cd) {
    var target = Date.parse(cd.getAttribute('data-cd'));
    var two = function (n) { return (n < 10 ? '0' : '') + n; };
    var cdTimer = null;
    var tick = function () {
      var ms = target - Date.now();
      if (!(ms > 0)) { cd.hidden = true; if (cdTimer) clearInterval(cdTimer); return; }
      var min = Math.floor(ms / 60000);
      cd.querySelector('[data-cd-d]').textContent = two(Math.floor(min / 1440));
      cd.querySelector('[data-cd-h]').textContent = two(Math.floor((min % 1440) / 60));
      cd.querySelector('[data-cd-m]').textContent = two(min % 60);
      cd.hidden = false;
    };
    tick();
    if (!cd.hidden) cdTimer = setInterval(tick, 20000);
  }

  /* ---------- Cursos: copiar a lista do que levar ---------- */
  var copyBtn = document.querySelector('[data-copy-list]');
  if (copyBtn) {
    var okMsg = document.querySelector('.lev-ok');
    copyBtn.addEventListener('click', function () {
      var items = Array.prototype.map.call(document.querySelectorAll('.chk .chk-t'), function (el) { return '• ' + el.textContent.trim(); });
      var text = 'O que levar para a Imersão Esthetic Pro 2027:\n' + items.join('\n');
      var done = function (ok) { okMsg.textContent = ok ? 'Lista copiada!' : 'Não deu para copiar. Seleciona a lista e copia manualmente.'; setTimeout(function () { okMsg.textContent = ''; }, 3500); };
      var fallback = function () {
        var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done(ok);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      else fallback();
    });
  }

  /* ---------- Cursos: contato pelo WhatsApp (valores e condições são combinados na conversa) ---------- */
  var form = document.querySelector('form.form');
  if (form) {
    var send = form.querySelector('a.btn');
    var val = function (id) { var el = document.getElementById(id); return (el && el.value.trim()) || '(não informado)'; };
    var perfil = function () { var r = form.querySelector('input[name="f-perfil"]:checked'); return r ? r.value : '(não informado)'; };
    var update = function () {
      send.href = wa([
        'Olá, Dr. José Carlos! Vim pelo site e quero saber os valores e as condições da Imersão Esthetic Pro 2027.', '',
        'Sou: ' + perfil(),
        'Nome: ' + val('f-nome'),
        'Cidade: ' + val('f-cidade'),
        'CRO: ' + val('f-cro')
      ].join('\n'));
    };
    form.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', update); i.addEventListener('change', update); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    update();
  }
})();
