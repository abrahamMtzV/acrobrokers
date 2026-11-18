/* ==========================================================
   Acro Brokers & Dispatch — main.js
   ========================================================== */
(() => {
  'use strict';

  /* ---------- CONFIGURACIÓN ---------- */
  // Para recibir los mensajes del formulario, pega aquí la URL de tu servicio
  // (Formspree, Make.com webhook, etc.). Si se deja vacío, se abre el correo del usuario.
  const FORM_ENDPOINT = '';
  const FORM_TO = 'servicio@acrobrokers.com';
  const SLIDE_MS = 4000;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- TRADUCCIONES ---------- */
  const I18N = {
    es: {
      'nav.home': 'Inicio', 'nav.about': 'Acro Brokers', 'nav.us': 'Nosotros', 'nav.services': 'Servicios', 'nav.values': 'Valores', 'nav.contact': 'Contacto',
      'hero.title': 'Soluciones Integrales en Comercio Internacional.',
      'hero.motto': 'Experiencia para servir, compromiso para servir',
      'hero.cta1': 'Contáctanos', 'hero.cta2': 'Conoce nuestros servicios',
      'hero.slides': [
        'Asesoría Legal Aduanera (EEUU)',
        'Consolidación de mercancías',
        'Control de inventarios, Distribución y Reexpedición de mercancías (EEUU)',
        'Trámites aduaneros (MEX - EEUU)',
        'Almacenamiento de Mercancías',
        'Servicios Integrales puerta a puerta'
      ],
      'about.p1': 'Por más de 25 años Acro Brokers & Dispatch ha forjado un nivel de excelencia en Comercio Internacional, Despacho Aduanal y Logística gracias a la calidad y seguridad de nuestros servicios.',
      'about.p2': 'Empresa Líder en soluciones integrales de comercio internacional, con tecnología de vanguardia, un servicio seguro, de excelencia, ágil y amigable.',
      'about.s1': 'años de experiencia', 'about.s2': 'servicios integrales', 'about.s3': 'circuito cerrado en instalaciones',
      'us.title': 'Nosotros',
      'us.quote': '“Somos una Empresa Líder al servicio de la industria del Comercio Internacional, y nos enorgullecemos de ser una organización basada en soluciones.”',
      'us.p': 'Dedicamos el tiempo necesario a entender las necesidades comerciales e individuales de cada cliente y trabajamos dentro del Marco de una Serie de Valores en todas nuestras actividades, destacando:',
      'us.p2': 'Estos valores nos han permitido no solo crecer, sino mantener relaciones de negocio a largo plazo con nuestros clientes.',
      'v.leadership': 'Liderazgo', 'v.commitment': 'Compromiso', 'v.team': 'Trabajo en equipo', 'v.honesty': 'Honestidad', 'v.loyalty': 'Lealtad', 'v.resp': 'Responsabilidad', 'v.respect': 'Respeto',
      'svc.title': 'Servicios',
      'svc.1': 'Asesoría Legal Aduanera (MEX Y EEUU)', 'svc.2': 'Trámites Aduaneros (MEX Y EEUU)', 'svc.3': 'Almacenamiento de Mercancías (EEUU)',
      'svc.4': 'Control de Inventarios, Distribución y Reexpedición de mercancías (EEUU)', 'svc.5': 'Consolidación de Mercancías', 'svc.6': 'Servicios Integrales Puerta a Puerta',
      'adv.title': 'Ventajas competitivas',
      'adv.1t': 'Visibilidad', 'adv.1p': 'Sistema de rastreo que permite a nuestros clientes el acceso en línea a sus operaciones para monitorear el estatus en tiempo real.',
      'adv.2t': 'Disponibilidad', 'adv.2p': 'Sólida plataforma de personal, ejecutivos dedicados para cada Cliente, lo cual garantiza nuestro compromiso de disponibilidad para cubrir las necesidades per cápita.',
      'adv.3t': 'Vanguardista', 'adv.3p': 'Reportes automáticos en línea / Notificaciones REPOMAILS informando el estatus de sus movimientos en tiempo real.',
      'adv.4t': 'Seguridad', 'adv.4p': 'Instalaciones seguras con circuito cerrado 24/7, personal calificado, moderno software de servicio que impide malware y asegura la confidencialidad de cada proyecto.',
      'adv.5t': 'Tarifas competitivas', 'adv.5p': 'Nuestra infraestructura propia nos permite ofertar tarifas agresivas sin afectar el nivel de servicio.',
      'val.title': 'Valores',
      'val.1t': 'Honestidad', 'val.1p': 'Enfrentar problemas y proveer soluciones con transparencia.',
      'val.2t': 'Perseverancia', 'val.2p': 'Buscar la mejora continua para ofrecer una alta calidad en nuestros productos y servicios.',
      'val.3t': 'Responsabilidad', 'val.3p': 'Generar un alto impacto positivo en la sociedad y en el medio ambiente.',
      'val.4t': 'Trabajo en equipo', 'val.4p': 'Escuchar las necesidades de los clientes para alcanzar una solución conjunta.',
      'ct.title': 'Contacto', 'ct.name': 'Nombre', 'ct.email': 'Email', 'ct.subject': 'Asunto', 'ct.message': 'Mensaje', 'ct.captcha': 'No soy un robot', 'ct.send': 'Enviar',
      'ct.errFields': 'Completa todos los campos con un correo válido.',
      'ct.errCaptcha': 'Confirma que no eres un robot.',
      'ct.ok': 'Mensaje enviado. Te responderemos a la brevedad.',
      'ct.mailto': 'Se abrirá tu aplicación de correo para enviar el mensaje.',
      'ct.errSend': 'No se pudo enviar. Inténtalo de nuevo o escríbenos por correo.',
      'ft.about': 'Sobre Nosotros', 'ft.addr': 'Dirección',
      'ft.addrText': 'Jesús Carranza # 2233, Col. Guerrero, CP 88260, Nuevo Laredo, Tamaulipas, México.',
      'ft.hours': 'Horario', 'ft.h1': 'Lunes a Viernes: 09:00 am a 06:00 pm', 'ft.h2': 'Sábado: 10:00 am a 01:00 pm',
      'ft.more': 'Información Adicional', 'ft.rights': 'Todos los derechos reservados.'
    },
    en: {
      'nav.home': 'Home', 'nav.about': 'Acro Brokers', 'nav.us': 'About us', 'nav.services': 'Services', 'nav.values': 'Values', 'nav.contact': 'Contact',
      'hero.title': 'Comprehensive Solutions in International Trade.',
      'hero.motto': 'Experience to serve, commitment to serve',
      'hero.cta1': 'Contact us', 'hero.cta2': 'Explore our services',
      'hero.slides': [
        'Customs Legal Advisory (USA)',
        'Cargo consolidation',
        'Inventory control, Distribution and Re-shipping of goods (USA)',
        'Customs procedures (MEX - USA)',
        'Goods storage',
        'Comprehensive door-to-door services'
      ],
      'about.p1': 'For more than 25 years Acro Brokers & Dispatch has built a level of excellence in International Trade, Customs Brokerage and Logistics thanks to the quality and security of our services.',
      'about.p2': 'A leading company in comprehensive international trade solutions, with cutting-edge technology and a safe, excellent, agile and friendly service.',
      'about.s1': 'years of experience', 'about.s2': 'comprehensive services', 'about.s3': 'closed-circuit surveillance at our facilities',
      'us.title': 'About us',
      'us.quote': '“We are a leading company serving the international trade industry, and we are proud to be a solutions-based organization.”',
      'us.p': 'We take the time needed to understand the business and individual needs of each client, and we work within a framework of values in everything we do, most notably:',
      'us.p2': 'These values have allowed us not only to grow, but to maintain long-term business relationships with our clients.',
      'v.leadership': 'Leadership', 'v.commitment': 'Commitment', 'v.team': 'Teamwork', 'v.honesty': 'Honesty', 'v.loyalty': 'Loyalty', 'v.resp': 'Responsibility', 'v.respect': 'Respect',
      'svc.title': 'Services',
      'svc.1': 'Customs Legal Advisory (MEX & USA)', 'svc.2': 'Customs Procedures (MEX & USA)', 'svc.3': 'Goods Storage (USA)',
      'svc.4': 'Inventory Control, Distribution and Re-shipping of goods (USA)', 'svc.5': 'Cargo Consolidation', 'svc.6': 'Comprehensive Door-to-Door Services',
      'adv.title': 'Competitive advantages',
      'adv.1t': 'Visibility', 'adv.1p': 'A tracking system that gives our clients online access to their operations to monitor status in real time.',
      'adv.2t': 'Availability', 'adv.2p': 'A solid staff platform with dedicated executives for each client, guaranteeing our commitment to cover every individual need.',
      'adv.3t': 'Cutting-edge', 'adv.3p': 'Automatic online reports / REPOMAILS notifications reporting the status of your shipments in real time.',
      'adv.4t': 'Security', 'adv.4p': 'Secure facilities with 24/7 closed-circuit surveillance, qualified staff and modern service software that blocks malware and protects the confidentiality of every project.',
      'adv.5t': 'Competitive rates', 'adv.5p': 'Our own infrastructure lets us offer aggressive rates without compromising service quality.',
      'val.title': 'Values',
      'val.1t': 'Honesty', 'val.1p': 'Facing problems and providing solutions with transparency.',
      'val.2t': 'Perseverance', 'val.2p': 'Pursuing continuous improvement to deliver high quality in our products and services.',
      'val.3t': 'Responsibility', 'val.3p': 'Creating a strong positive impact on society and the environment.',
      'val.4t': 'Teamwork', 'val.4p': 'Listening to our clients’ needs to reach a joint solution.',
      'ct.title': 'Contact', 'ct.name': 'Name', 'ct.email': 'Email', 'ct.subject': 'Subject', 'ct.message': 'Message', 'ct.captcha': 'I’m not a robot', 'ct.send': 'Send',
      'ct.errFields': 'Please fill in all fields with a valid email.',
      'ct.errCaptcha': 'Please confirm you are not a robot.',
      'ct.ok': 'Message sent. We will get back to you shortly.',
      'ct.mailto': 'Your email app will open to send the message.',
      'ct.errSend': 'We could not send it. Please try again or email us directly.',
      'ft.about': 'About us', 'ft.addr': 'Address',
      'ft.addrText': 'Jesús Carranza # 2233, Col. Guerrero, ZIP 88260, Nuevo Laredo, Tamaulipas, Mexico.',
      'ft.hours': 'Hours', 'ft.h1': 'Monday to Friday: 9:00 am to 6:00 pm', 'ft.h2': 'Saturday: 10:00 am to 1:00 pm',
      'ft.more': 'Additional information', 'ft.rights': 'All rights reserved.'
    }
  };

  let lang = 'es';
  try { const s = localStorage.getItem('acro-lang'); if (s === 'en' || s === 'es') lang = s; } catch (e) {}
  const t = k => I18N[lang][k];

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (typeof v === 'string') el.textContent = v; });
    $('#lang').innerHTML = lang === 'es' ? '<strong>ES</strong> | EN' : 'ES | <strong>EN</strong>';
    $('#toTop').setAttribute('aria-label', lang === 'es' ? 'Volver arriba' : 'Back to top');
    if (hero.ready) hero.render(false);
  }

  /* ---------- LOGO (con respaldo en texto) ---------- */
  const logo = $('#logo');
  logo.addEventListener('error', () => { logo.remove(); $('#logoFallback').hidden = false; });

  /* ---------- HERO: fondos + frases ---------- */
  const hero = (() => {
    const bg = $('#heroBg'), txt = $('#tickText'), cnt = $('#tickCount'), bar = $('#tickBar');
    const fallbacks = [
      ['#082863', '#171719'], ['#0b3680', '#082863'], ['#171719', '#082863'],
      ['#082863', '#0a1f4a'], ['#123a82', '#171719'], ['#0a1f4a', '#082863']
    ];
    // Coloca tus fotos en /img como hero-1.jpg … hero-6.jpg (una por cada servicio, en el mismo orden)
    const slides = fallbacks.map((c, i) => {
      const d = document.createElement('div');
      d.className = 'slide';
      d.style.background = `url("img/hero-${i + 1}.jpg") center/cover no-repeat, linear-gradient(135deg, ${c[0]}, ${c[1]})`;
      bg.appendChild(d);
      return d;
    });
    let i = 0, timer = null;
    const api = { ready: true };

    api.render = (animate = true) => {
      const list = t('hero.slides');
      const paint = () => {
        txt.textContent = list[i];
        cnt.innerHTML = `${String(i + 1).padStart(2, '0')}<small> / ${String(list.length).padStart(2, '0')}</small>`;
        txt.classList.remove('is-out');
      };
      slides.forEach((s, n) => s.classList.toggle('is-on', n === i));
      if (animate) { txt.classList.add('is-out'); setTimeout(paint, 380); } else paint();
      bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run');
    };
    api.next = () => { i = (i + 1) % slides.length; api.render(true); };
    api.start = () => { clearInterval(timer); timer = setInterval(api.next, SLIDE_MS); };
    document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : api.start());
    return api;
  })();

  /* ---------- SCROLL SUAVE con espacio por encima ---------- */
  const header = $('#top');
  const headerH = () => header.getBoundingClientRect().bottom;
  let anim = null;
  const ease = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  function scrollToY(y, dur = 1000) {
    cancelAnimationFrame(anim);
    if (reduceMotion) { window.scrollTo(0, y); return; }
    const start = scrollY, dist = y - start, t0 = performance.now();
    const d = clamp(Math.abs(dist) / 2.2, 600, 1400) || dur;
    const cancel = () => cancelAnimationFrame(anim);
    addEventListener('wheel', cancel, { once: true, passive: true });
    addEventListener('touchstart', cancel, { once: true, passive: true });
    const step = now => {
      const p = clamp((now - t0) / d, 0, 1);
      window.scrollTo(0, start + dist * ease(p));
      if (p < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = id === 'inicio' ? 0 : el.getBoundingClientRect().top + scrollY - headerH();
    scrollToY(Math.max(0, y));
    history.replaceState(null, '', '#' + id);
  }

  const menu = $('#menu'), burger = $('#burger');
  const closeMenu = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); closeMenu(); goTo(a.getAttribute('href').slice(1));
  }));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  $('#toTop').addEventListener('click', () => scrollToY(0));
  $('#lang').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('acro-lang', lang); } catch (e) {}
    applyLang();
  });

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Tilt sutil en tarjetas (solo con mouse) ---------- */
  if (matchMedia('(hover: hover)').matches && !reduceMotion) {
    $$('[data-tilt]').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateZ(0)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
  }

  /* ---------- Fotos: si falta el archivo, se muestra el espacio reservado ---------- */
  $$('.photo img').forEach(img => {
    const empty = () => { img.closest('.photo').classList.add('is-empty'); img.remove(); };
    img.addEventListener('error', empty);
    if (img.complete && !img.naturalWidth) empty();
  });

  /* ---------- Camión (PNG) que entra deslizando con el scroll ---------- */
  const drives = $$('[data-drive] img');
  function updateDrive() {
    if (reduceMotion) return;
    const vh = innerHeight;
    drives.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = clamp((vh - r.top) / (vh * .75), 0, 1);
      img.style.transform = `translateX(${((1 - ease(p)) * 30).toFixed(2)}%)`;
    });
  }

  /* ---------- Ventajas: acordeón (una abierta a la vez) ---------- */
  const acc = $('#acc');
  if (acc) acc.addEventListener('click', e => {
    const btn = e.target.closest('.acc__btn');
    if (!btn) return;
    const item = btn.closest('.acc__item'), willOpen = !item.classList.contains('is-open');
    $$('.acc__item', acc).forEach(it => {
      it.classList.remove('is-open');
      $('.acc__btn', it).setAttribute('aria-expanded', 'false');
    });
    if (willOpen) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
  });

  /* ---------- Scroll: progreso, spy, FAB, camión ---------- */
  const progress = $('#progress'), toTop = $('#toTop');
  const sections = $$('[data-section]'), links = $$('.menu a');
  let ticking = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    toTop.classList.toggle('show', scrollY > 600);
    const mark = headerH() + innerHeight * .3;
    let cur = sections[0].id;
    sections.forEach(s => { if (s.getBoundingClientRect().top <= mark) cur = s.id; });
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur));
    updateDrive();
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------- Formulario ---------- */
  const form = $('#contactForm'), msg = $('#formMsg');
  const say = (k, cls) => { msg.textContent = t(k); msg.className = 'form__msg ' + (cls || ''); };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    if (f.website) return; // honeypot
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email || '');
    if (!f.nombre?.trim() || !okEmail || !f.asunto?.trim() || !f.mensaje?.trim()) return say('ct.errFields', 'err');
    if (!$('#captcha').checked) return say('ct.errCaptcha', 'err');

    if (!FORM_ENDPOINT) {
      const body = `${f.mensaje}\n\n— ${f.nombre} (${f.email})`;
      location.href = `mailto:${FORM_TO}?subject=${encodeURIComponent(f.asunto)}&body=${encodeURIComponent(body)}`;
      return say('ct.mailto', 'ok');
    }
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) });
      if (!res.ok) throw new Error(res.status);
      form.reset(); say('ct.ok', 'ok');
    } catch (err) { say('ct.errSend', 'err'); }
  });

  /* ---------- Init ---------- */
  $('#year').textContent = new Date().getFullYear();
  applyLang();
  hero.render(false);
  hero.start();
  onScroll();
  if (location.hash && $(location.hash)) setTimeout(() => goTo(location.hash.slice(1)), 300);
})();