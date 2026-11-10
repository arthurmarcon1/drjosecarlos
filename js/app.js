/* Interações do site (vanilla JS, sem dependências). */
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

  /* ---------- Cursos: contato pelo WhatsApp (valores e condições são combinados na conversa) ---------- */
  var form = document.querySelector('form.form');
  if (form) {
    var send = form.querySelector('a.btn');
    var val = function (id) { var el = document.getElementById(id); return (el && el.value.trim()) || '(não informado)'; };
    var update = function () {
      send.href = wa([
        'Olá, Dr. José Carlos! Vim pelo site e quero saber os valores e as condições da Imersão Esthetic Pro 2027.', '',
        'Nome: ' + val('f-nome'),
        'Cidade: ' + val('f-cidade'),
        'CRO: ' + val('f-cro')
      ].join('\n'));
    };
    form.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', update); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    update();
  }
})();
