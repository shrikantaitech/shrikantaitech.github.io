(function () {
  'use strict';
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
