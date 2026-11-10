/* Interações do site (vanilla JS, sem dependências). */
(function () {
  var PHONE = '5555997167672';
  var wa = function (msg) { return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg); };

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

  /* ---------- Cursos: inscrição pelo WhatsApp ---------- */
  var form = document.querySelector('form.form');
  if (form) {
    var OPTS = [
      { t: 'Reserva de vaga' },
      { t: 'À vista' },
      { t: 'Cartão em até 12x' },
      { t: 'Entrada + boleto' }
    ];
    var pag = 1;
    var optBtns = form.querySelectorAll('.opt');
    var send = form.querySelector('a.btn');
    var val = function (id) { var el = document.getElementById(id); return (el && el.value.trim()) || '(não informado)'; };
    var update = function () {
      optBtns.forEach(function (b, j) { b.classList.toggle('on', j === pag); b.setAttribute('aria-pressed', j === pag ? 'true' : 'false'); });
      send.href = wa([
        'Olá, Dr. José Carlos! Quero me inscrever na Imersão Esthetic Pro 2027.', '',
        'Nome: ' + val('f-nome'),
        'Cidade: ' + val('f-cidade'),
        'CRO: ' + val('f-cro'),
        'Forma de pagamento: ' + OPTS[pag].t
      ].join('\n'));
    };
    optBtns.forEach(function (b, j) { b.addEventListener('click', function () { pag = j; update(); }); });
    form.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', update); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    // Botões dos cards de preço pré-selecionam a forma de pagamento
    document.querySelectorAll('.pr .btn').forEach(function (b, j) { b.addEventListener('click', function () { pag = j; update(); }); });
    update();
  }
})();
