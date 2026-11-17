(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var WA_NUMBER = '919890964512';
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.toggle');
  var menu = document.getElementById('menu');

  // Dynamic year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Scroll-aware nav
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Reveal on scroll (lightweight, below-the-fold only)
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }
  // Safety net: never leave content hidden
  setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 2500);

  // Floating contact buttons + rule-based assistant (no AI service, no data leaves the page)
  (function () {
    var ICON = {
      wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11 11 0 0 1-4.7-4.1c-.4-.5-1.2-1.6-1.2-3s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.900 1.200 2.200 1.300.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.100.200.100.700-.100 1.300z"/></svg>',
      call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.100.4 2.300.6 3.500.6.600 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.500c.600 0 1 .4 1 1 0 1.200.2 2.400.6 3.500.1.300 0 .7-.2 1l-2.300 2.300z"/></svg>',
      bot: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 5v2h10V8H7zm0 4v2h7v-2H7z"/></svg>'
    };
    var WA = 'https://wa.me/' + WA_NUMBER;
    var TOPICS = [
      { k: ['ai agent', 'agent', 'automation', 'automate'], a: 'We build AI agents and automations around your own process, with clear rules for when a person takes over. See <a href="services.html#s1">AI Agents & Business Automation</a>.' },
      { k: ['voice', 'call', 'calling', 'missed'], a: 'Our voice and calling workflows answer, collect the caller\'s details and pass them to your team. See <a href="services.html#s2">Voice AI & Calling</a>.' },
      { k: ['whatsapp', 'message', 'chat'], a: 'We set up WhatsApp flows for enquiries, reminders and follow-ups, connected to your existing systems. See <a href="services.html#s3">WhatsApp Business Automation</a>.' },
      { k: ['crm', 'lead', 'workflow', 'pipeline'], a: 'We organise leads, stages and follow-ups in one workflow and automate the hand-offs. See <a href="services.html#s4">CRM & Workflow Automation</a>.' },
      { k: ['clinic', 'dental', 'doctor', 'health', 'hospital', 'patient'], a: 'We build software around how a clinic works. ShrikantAI DentalDesk is a dental practice workflow solution currently in development. See <a href="index.html#solutions">Featured solutions</a>.' },
      { k: ['web', 'website', 'app', 'application', 'custom'], a: 'We design and build custom web applications for your workflow. See <a href="services.html#s6">Custom Web Application Development</a>.' },
      { k: ['api', 'integration', 'integrate', 'consult'], a: 'We connect your tools through APIs and advise on which technology fits the problem. See <a href="services.html#s7">API Integration & Consulting</a>.' },
      { k: ['process', 'how do you work', 'steps', 'start'], a: 'We work in six steps: Discover, Strategize, Design, Develop, Deploy and Improve. See <a href="index.html#process">How we work</a>.' },
      { k: ['price', 'cost', 'quote', 'budget', 'charge', 'fee', 'time', 'long', 'deadline'], a: 'Cost and timeline depend on the project, so we do not list fixed prices. Share your requirement on WhatsApp or the <a href="contact.html">contact form</a> and we will reply with an approach.' },
      { k: ['where', 'location', 'address', 'pune', 'office'], a: 'We are based in Pune, Maharashtra, India.' },
      { k: ['phone', 'email', 'contact', 'reach', 'number'], a: 'Phone: <a href="tel:+919890964512">+91 9890964512</a>. Email: <a href="mailto:shrikantmaid9@gmail.com">shrikantmaid9@gmail.com</a>.' },
      { k: ['service', 'offer', 'do you', 'what'], a: 'We offer AI agents, voice AI, WhatsApp automation, CRM workflows, clinic software, custom web apps and API integration. See <a href="services.html">all services</a>.' }
    ];
    var CHIPS = ['Services', 'Clinic software', 'Pricing', 'How we work', 'Contact'];

    var fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML =
      '<button class="fab-btn bot" type="button" data-tip="Ask a question" aria-label="Open assistant" aria-expanded="false" aria-controls="bot-panel">' + ICON.bot + '</button>' +
      '<a class="fab-btn wa" href="' + WA + '" target="_blank" rel="noopener" data-tip="WhatsApp us" aria-label="Chat on WhatsApp">' + ICON.wa + '</a>' +
      '<a class="fab-btn call" href="tel:+919890964512" data-tip="Call +91 9890964512" aria-label="Call +91 9890964512">' + ICON.call + '</a>';
    var panel = document.createElement('div');
    panel.className = 'bot-panel'; panel.id = 'bot-panel';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Website assistant');
    panel.innerHTML =
      '<div class="bot-head"><div><b>Ask about ShrikantAI</b><small>Automated answers. Not a live person.</small></div><button class="bot-close" type="button" aria-label="Close assistant">&times;</button></div>' +
      '<div class="bot-log" role="log" aria-live="polite"></div><div class="chips"></div>' +
      '<form class="bot-form"><label class="skip" for="bot-in">Your question</label><input id="bot-in" autocomplete="off" placeholder="Type your question"><button type="submit">Send</button></form>';
    document.body.appendChild(panel); document.body.appendChild(fab);

    var openBtn = fab.querySelector('.bot'), log = panel.querySelector('.bot-log'),
        chips = panel.querySelector('.chips'), input = panel.querySelector('input'), started = false;

    function add(cls, html) {
      var d = document.createElement('div'); d.className = 'msg ' + cls;
      if (cls === 'u') d.textContent = html; else d.innerHTML = html;
      log.appendChild(d); log.scrollTop = log.scrollHeight;
    }
    function handoff(q) {
      var t = 'Hello ShrikantAI Innovation, I have a question' + (q ? ': ' + q : '.');
      return WA + '?text=' + encodeURIComponent(t);
    }
    function answer(q) {
      var s = q.toLowerCase(), hit = null;
      TOPICS.some(function (t) { return t.k.some(function (w) { if (s.indexOf(w) > -1) { hit = t; return true; } }); });
      add('b', hit ? hit.a : 'I do not have a ready answer for that. A person can help: <a href="' + handoff(q) + '" target="_blank" rel="noopener">send your question on WhatsApp</a>.');
    }
    function ask(q) { q = q.trim(); if (!q) return; add('u', q); setTimeout(function () { answer(q); }, 250); }
    function setOpen(o) {
      panel.classList.toggle('open', o);
      openBtn.setAttribute('aria-expanded', String(o));
      if (o) {
        if (!started) { started = true; add('b', 'Hello. Ask about our services, clinic software, process or how to reach us. Choose a topic or type a question.'); }
        input.focus();
      } else openBtn.focus();
    }
    CHIPS.forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = c;
      b.addEventListener('click', function () { ask(c); }); chips.appendChild(b);
    });
    openBtn.addEventListener('click', function () { setOpen(!panel.classList.contains('open')); });
    panel.querySelector('.bot-close').addEventListener('click', function () { setOpen(false); });
    panel.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); input.value = ''; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });
  })();

  // Enquiry form -> WhatsApp
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var rules = {
    name: function (v) { return v.length >= 2 ? '' : 'Enter your full name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email address, for example name@company.com.'; },
    phone: function (v) { return /^\+?[\d\s\-()]{10,15}$/.test(v) ? '' : 'Enter a phone number with 10 to 15 digits.'; },
    service: function (v) { return v ? '' : 'Choose the service you need.'; },
    message: function (v) { return v.length >= 20 ? '' : 'Describe your project in at least 20 characters.'; }
  };
  function check(name) {
    var f = form.elements[name], wrap = f.closest('.field'), msg = rules[name](f.value.trim());
    wrap.classList.toggle('invalid', !!msg);
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    wrap.querySelector('.err').textContent = msg;
    return !msg;
  }
  Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener('blur', function () { check(n); }); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = ''; status.textContent = '';
    var valid = true, first = null;
    Object.keys(rules).forEach(function (n) { if (!check(n)) { valid = false; if (!first) first = form.elements[n]; } });
    if (!valid) {
      status.className = 'bad';
      status.textContent = 'Some details are missing or incorrect. Fix the highlighted fields and send again.';
      first.focus();
      return;
    }
    var v = function (n) { return form.elements[n].value.trim(); };
    var text = [
      'Hello ShrikantAI Innovation,',
      'I would like to discuss a project.',
      '',
      'Name: ' + v('name'),
      'Company: ' + (v('company') || 'Not provided'),
      'Email: ' + v('email'),
      'Phone: ' + v('phone'),
      'Service required: ' + v('service'),
      '',
      'Project description:',
      v('message')
    ].join('\n');
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
    var w = window.open(url, '_blank', 'noopener');
    status.className = 'ok';
    status.innerHTML = '';
    if (w) {
      status.textContent = 'WhatsApp has opened with your enquiry. Press send in WhatsApp to deliver it. Nothing is stored on this website.';
    } else {
      status.appendChild(document.createTextNode('Your browser blocked the WhatsApp window. '));
      var a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open WhatsApp with your enquiry';
      status.appendChild(a);
    }
  });
})();
