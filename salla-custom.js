/* ============================================================
   COZY STYLE — Salla Raed Theme JavaScript  v7
   الصقه في: محرر الثيم ← تخصيص متقدم ← تخصيص باستخدام JavaScript
   ============================================================ */
(function(){
'use strict';

var GH = 'https://raw.githubusercontent.com/Waleedkhadrawy/Crozy_store/main/images/';

/* ── helper: run after DOM ready ───────────────────────────── */
function ready(fn){
  if(document.readyState!=='loading') fn();
  else document.addEventListener('DOMContentLoaded',fn);
}

/* ══ 1. CUSTOM HEADER ══════════════════════════════════════ */
function injectHeader(){
  if(document.getElementById('cozy-header')) return;

  var hdr = document.createElement('div');
  hdr.id = 'cozy-header';
  hdr.innerHTML =
    /* Announcement bar */
    '<div class="ch-announce">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>'+
      '<span>شحن مجاني على الطلبات التي تزيد عن 200 ريال</span>'+
    '</div>'+
    /* Header strip — logo only (no text), clickable → homepage */
    '<div class="ch-strip">'+
      '<div class="ch-brand">'+
        '<a href="/" class="ch-brand-top" style="text-decoration:none">'+
          '<img class="ch-logo" src="'+GH+'logo-header-new.png" alt="Cozy Style" '+
               'onerror="if(!this.dataset.fallback){this.dataset.fallback=\'1\';this.src=\''+GH+'logo-header.png\';}else{this.style.display=\'none\'}"/>'+
        '</a>'+
        '<div class="ch-sub">'+
          '<div class="ch-line"></div>'+
          '<span class="ch-sub-text">Home Decor &amp; Accessories</span>'+
          '<div class="ch-line"></div>'+
        '</div>'+
      '</div>'+
    '</div>';

  document.body.insertBefore(hdr, document.body.firstChild);
}

/* ══ 2. CUSTOM HERO ════════════════════════════════════════ */
function injectHero(){
  if(document.getElementById('cozy-hero')) return;

  var hdr = document.getElementById('cozy-header');
  if(!hdr){ setTimeout(injectHero, 600); return; }

  var hero = document.createElement('div');
  hero.id = 'cozy-hero';
  hero.innerHTML =
    '<div class="ch-body">'+
      /* Topbar */
      '<div class="ch-topbar">'+
        '<div class="ch-topbar-left">'+
          '<a href="/login" class="ch-ibtn" aria-label="Login">'+
            '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4.5"/><path d="M3.5 21c0-5 3.8-8.5 8.5-8.5s8.5 3.5 8.5 8.5"/></svg>'+
          '</a>'+
          '<a href="/cart" class="ch-ibtn" aria-label="Cart">'+
            '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>'+
          '</a>'+
        '</div>'+
        '<button class="ch-ibtn" id="cozy-menu-open-btn" style="width:auto;border:none;cursor:pointer;background:transparent" aria-label="Menu">'+
          '<div class="ch-menu-btn"><span></span><span></span></div>'+
        '</button>'+
      '</div>'+
      /* 2-col grid */
      '<div class="ch-grid">'+
        '<div>'+
          '<h1 class="ch-title">Home<br>Decor<br>And More</h1>'+
          '<p class="ch-desc">All home decor and<br>accessories and all<br>things you need</p>'+
        '</div>'+
        '<div class="ch-right">'+
          /* Search */
          '<div class="ch-search">'+
            '<svg viewBox="0 0 24 24" fill="none" stroke="#755C4C" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>'+
            '<input type="text" placeholder="Search…" id="cozySearchInput"/>'+
          '</div>'+
          /* Glass carousel */
          '<div class="pk-wrap" id="pkWrap">'+
            '<div class="pk-stage" id="pkStage"></div>'+
            '<button class="pk-arr prev" id="pkPrev" aria-label="Previous">'+
              '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'+
            '</button>'+
            '<button class="pk-arr next" id="pkNext" aria-label="Next">'+
              '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'+
            '</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';

  hdr.insertAdjacentElement('afterend', hero);

  /* Search enter key */
  var inp = document.getElementById('cozySearchInput');
  if(inp) inp.addEventListener('keydown', function(e){
    if(e.key==='Enter' && this.value)
      window.location = '/search?q=' + encodeURIComponent(this.value);
  });

  /* Menu button */
  var menuBtn = document.getElementById('cozy-menu-open-btn');
  if(menuBtn) menuBtn.addEventListener('click', openMenuOverlay);

  initCarousel();
}

/* ── Glass Peek Carousel ────────────────────────────────── */
function initCarousel(){
  var stage = document.getElementById('pkStage');
  var prev  = document.getElementById('pkPrev');
  var next  = document.getElementById('pkNext');
  if(!stage || !prev || !next) return;

  var LABELS = ['%','Sale','New','🛋️','🪴','🏠'];
  var cur = 0, N = LABELS.length;

  function mod(v){ return (v % N + N) % N; }
  function render(){
    stage.innerHTML = '';
    var lEl = document.createElement('div');
    lEl.className = 'pk-card pk-side pk-left';
    lEl.textContent = LABELS[mod(cur - 1)];
    stage.appendChild(lEl);
    var rEl = document.createElement('div');
    rEl.className = 'pk-card pk-side pk-right';
    rEl.textContent = LABELS[mod(cur + 1)];
    stage.appendChild(rEl);
    var cEl = document.createElement('div');
    cEl.className = 'pk-card pk-center';
    cEl.textContent = LABELS[cur];
    stage.appendChild(cEl);
  }
  prev.addEventListener('click', function(){ cur = mod(cur - 1); render(); });
  next.addEventListener('click', function(){ cur = mod(cur + 1); render(); });
  setInterval(function(){ cur = mod(cur + 1); render(); }, 3900);
  render();
}

/* ══ 3. BANNER SLIDER ══════════════════════════════════════ */
function injectSlider(){
  if(document.getElementById('cozy-slider')) return;

  var hero = document.getElementById('cozy-hero');
  if(!hero){ setTimeout(injectSlider, 600); return; }

  var sl = document.createElement('div');
  sl.id = 'cozy-slider';
  sl.innerHTML =
    '<div class="sl-vp" id="slVp">'+
      '<div class="sl-track" id="slTrack"></div>'+
    '</div>';

  hero.insertAdjacentElement('afterend', sl);
  initSlider();
}

function initSlider(){
  var track = document.getElementById('slTrack');
  var stage = document.getElementById('slVp');
  if(!track || !stage) return;

  var SLIDES = ['New In','Sale','Decor','Offer','Banar'];
  var cur = 0, n = SLIDES.length;

  SLIDES.forEach(function(label, i){
    var card = document.createElement('div');
    card.className = 'sl-card' + (i === 0 ? ' active' : '');
    var span = document.createElement('span');
    span.className = 'sl-label';
    span.textContent = label;
    card.appendChild(span);
    (function(idx){ card.addEventListener('click', function(){ goTo(idx); }); })(i);
    track.appendChild(card);
  });

  var cards = track.querySelectorAll('.sl-card');

  function getW(){
    var c = cards[0];
    var s = getComputedStyle(c);
    return c.offsetWidth + parseFloat(s.marginLeft) + parseFloat(s.marginRight);
  }

  function goTo(idx){
    cur = (idx + n) % n;
    track.style.transform = 'translateX(calc(-50% + ' + (-cur * getW()) + 'px))';
    cards.forEach(function(c, i){ c.classList.toggle('active', i === cur); });
  }

  stage.addEventListener('touchstart', function(e){ stage._tx = e.touches[0].clientX; }, {passive:true});
  stage.addEventListener('touchend', function(e){
    var dx = e.changedTouches[0].clientX - (stage._tx || 0);
    if(dx > 50) goTo(cur - 1);
    if(dx < -50) goTo(cur + 1);
  }, {passive:true});

  setInterval(function(){ goTo(cur + 1); }, 4000);

  track.style.transition = 'none';
  goTo(0);
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ track.style.transition = ''; });
  });
}

/* ══ 4. ACC PILL — before products ═════════════════════════ */
function injectAccPill(){
  if(document.getElementById('cozy-acc')) return;

  var target = document.querySelector(
    'salla-product-card, .s-product-card, [class*="products-grid"], [class*="product-list"]'
  );
  if(!target){ setTimeout(injectAccPill, 1000); return; }

  var section = target.closest('section, [class*="section"], [class*="products"]') || target.parentElement;

  var wrap = document.createElement('div');
  wrap.id = 'cozy-acc';
  wrap.style.cssText = 'padding:clamp(4px,1.2vw,8px) clamp(12px,3vw,20px) 0';
  wrap.innerHTML =
    '<div class="cozy-acc-pill">'+
      '<span class="cozy-acc-title">Home&nbsp;Accessories</span>'+
    '</div>'+
    '<div class="cozy-acc-footer">'+
      '<div class="cozy-acc-line"></div>'+
      '<a class="cozy-acc-more" href="/categories">more '+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'+
      '</a>'+
    '</div>';

  section.parentNode.insertBefore(wrap, section);
}

/* ══ 5. CONTACT SECTION — before footer ════════════════════ */
function injectContactSection(){
  if(document.getElementById('cozy-cs')) return;

  var footer = document.querySelector('footer, salla-footer, .s-footer, #footer');
  if(!footer){ setTimeout(injectContactSection, 1000); return; }

  var cs = document.createElement('div');
  cs.id = 'cozy-cs';
  cs.className = 'cozy-cs';
  cs.innerHTML =

    '<div class="cozy-divider"></div>'+

    '<div class="cozy-social-section">'+
      '<p class="cozy-follow-title">Follow Us On:</p>'+
      '<div class="cozy-social-icons">'+

        /* Instagram */
        '<button class="cozy-soc-btn" onclick="window.open(\'https://www.instagram.com/\',\'_blank\')" aria-label="Instagram">'+
          '<img src="'+GH+'instagram.png" alt="Instagram" '+
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"/>'+
          '<svg style="display:none" viewBox="0 0 24 24" fill="none" stroke="#1A1411" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+
            '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#1A1411" stroke="none"/>'+
          '</svg>'+
        '</button>'+

        /* TikTok */
        '<button class="cozy-soc-btn" onclick="window.open(\'https://www.tiktok.com/\',\'_blank\')" aria-label="TikTok">'+
          '<img src="'+GH+'tiktok.png" alt="TikTok" '+
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"/>'+
          '<svg style="display:none" viewBox="0 0 24 24" fill="#1A1411">'+
            '<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.2 8.2 0 004.79 1.53V6.84a4.85 4.85 0 01-1.02-.15z"/>'+
          '</svg>'+
        '</button>'+

        /* WhatsApp */
        '<button class="cozy-soc-btn" onclick="window.open(\'https://wa.me/966503676809\',\'_blank\')" aria-label="WhatsApp">'+
          '<img src="'+GH+'whatsapp.png" alt="WhatsApp" '+
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"/>'+
          '<svg style="display:none" viewBox="0 0 24 24" fill="#1A1411">'+
            '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>'+
          '</svg>'+
        '</button>'+

      '</div>'+
    '</div>'+

    /* Phone CTA */
    '<a class="cozy-phone-cta" href="tel:+966503676809">'+
      '<span class="cozy-phone-number">tel:+966503676809</span>'+
      '<div class="cozy-call-circle">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="#1A1411" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+
          '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.57a16 16 0 006.29 6.29l.96-.9a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>'+
        '</svg>'+
      '</div>'+
    '</a>'+

    /* Info panel */
    '<div class="cozy-info-panel">'+
      '<div class="cozy-logos-row">'+
        '<div class="cozy-store-logo">'+
          '<img src="'+GH+'logo-menu.png" alt="Cozy Style" '+
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"/>'+
          '<span class="cozy-logo-name" style="display:none">Cozy Style</span>'+
        '</div>'+
        '<div class="cozy-ministry">'+
          '<img src="'+GH+'ministryofcommerce.png" alt="وزارة التجارة" '+
               'onerror="this.style.display=\'none\'"/>'+
        '</div>'+
      '</div>'+
      '<div class="cozy-pay-row">'+
        '<div class="cozy-pay-badge"><img src="'+GH+'stcbank.png"  alt="STC Bank"/></div>'+
        '<div class="cozy-pay-badge"><img src="'+GH+'madapay.png"  alt="mada"/></div>'+
        '<div class="cozy-pay-badge"><img src="'+GH+'apple-pay.png" alt="Apple Pay"/></div>'+
        '<div class="cozy-pay-badge"><img src="'+GH+'visa.png"     alt="VISA"/></div>'+
      '</div>'+
    '</div>';

  footer.parentNode.insertBefore(cs, footer);
}

/* ══ 6. TRANSPARENT BACKGROUNDS ════════════════════════════ */
function fixBackgrounds(){
  var els = document.querySelectorAll(
    'main, #main, .s-layout, [class*="layout"],[class*="page-wrapper"],[class*="main-content"]'
  );
  els.forEach(function(el){
    el.style.background = 'transparent';
    el.style.backgroundColor = 'transparent';
    el.style.backgroundImage = 'none';
  });
}

/* ══ 7. FLOATING BOTTOM NAV (all pages) ════════════════════ */
function injectBottomNav(){
  if(document.getElementById('cozy-bottom-nav')) return;

  var nav = document.createElement('nav');
  nav.id = 'cozy-bottom-nav';
  nav.setAttribute('aria-label','Main navigation');
  nav.innerHTML =
    /* Profile */
    '<a href="/profile" class="cnb-btn" aria-label="Profile">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4.5"/><path d="M3.5 21c0-5 3.8-8.5 8.5-8.5s8.5 3.5 8.5 8.5"/></svg>'+
    '</a>'+
    /* Home */
    '<a href="/" class="cnb-btn" aria-label="Home">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>'+
    '</a>'+
    /* Cart */
    '<a href="/cart" class="cnb-btn" aria-label="Cart">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>'+
    '</a>'+
    /* Menu toggle */
    '<button class="cnb-btn" id="cnb-menu-btn" aria-label="Menu" style="border:none;cursor:pointer;background:transparent">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'+
    '</button>';

  document.body.appendChild(nav);

  /* bind menu button after appended */
  var mb = document.getElementById('cnb-menu-btn');
  if(mb) mb.addEventListener('click', openMenuOverlay);
}

/* ══ 8. MENU OVERLAY ═══════════════════════════════════════ */
var _menuItems = null;

/* Default fallback nav items */
var DEFAULT_MENU = [
  { icon:'🏠', name:'الرئيسية',     url:'/'             },
  { icon:'🛋️', name:'أثاث',         url:'/categories'   },
  { icon:'🪴', name:'إكسسوارات',    url:'/categories'   },
  { icon:'✨', name:'وصل حديثاً',   url:'/products/new' },
  { icon:'🔥', name:'عروض خاصة',    url:'/products/sale'},
  { icon:'❤️', name:'المفضلة',      url:'/wishlist'     }
];

function buildMenuItems(items){
  return items.map(function(item){
    return '<a href="'+item.url+'" class="cmo-cat-item">'+
      '<div class="cmo-cat-left">'+
        '<span class="cmo-cat-icon">'+(item.icon||'🏷️')+'</span>'+
        '<span class="cmo-cat-name">'+item.name+'</span>'+
      '</div>'+
      '<svg class="cmo-cat-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1411" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'+
    '</a>';
  }).join('');
}

function loadSallaNavigation(cb){
  if(_menuItems){ cb(_menuItems); return; }

  /* Try Salla store menus object first */
  try {
    var sallaMenus = window.salla && window.salla.store && window.salla.store.menus;
    if(sallaMenus && sallaMenus.length){
      var items = sallaMenus.map(function(m){
        return { icon:'🏷️', name: m.name || m.title || m.label, url: m.url || m.link || '#' };
      });
      _menuItems = items;
      return cb(items);
    }
  } catch(e){}

  /* Try Salla categories API */
  fetch('/api/store/v1/categories', { credentials:'same-origin' })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data){
      if(data && data.data && data.data.length){
        var icons = ['🏠','🛋️','🪴','✨','🔥','❤️','🎁','🏷️'];
        var items = data.data.slice(0,8).map(function(cat, i){
          return { icon: icons[i] || '🏷️', name: cat.name, url: cat.url || ('/categories/'+cat.id) };
        });
        _menuItems = items;
        cb(items);
      } else {
        throw new Error('no categories');
      }
    })
    .catch(function(){
      /* Try menus API */
      fetch('/api/store/v1/menus', { credentials:'same-origin' })
        .then(function(r){ return r.ok ? r.json() : null; })
        .then(function(data){
          if(data && data.data && data.data.length){
            var items = data.data.slice(0,8).map(function(m){
              return { icon:'🏷️', name: m.name, url: m.url || '#' };
            });
            _menuItems = items;
            cb(items);
          } else {
            throw new Error('no menus');
          }
        })
        .catch(function(){
          _menuItems = DEFAULT_MENU;
          cb(DEFAULT_MENU);
        });
    });
}

function injectMenuOverlay(){
  if(document.getElementById('cmo-overlay')) return;

  /* Backdrop */
  var backdrop = document.createElement('div');
  backdrop.id = 'cmo-backdrop';
  backdrop.addEventListener('click', closeMenuOverlay);
  document.body.appendChild(backdrop);

  /* Overlay wrap */
  var ov = document.createElement('div');
  ov.id = 'cmo-overlay';
  ov.setAttribute('aria-modal','true');
  ov.setAttribute('role','dialog');
  ov.setAttribute('aria-label','القائمة الرئيسية');
  ov.innerHTML =
    '<div class="cmo-wrap">'+

      /* Header */
      '<div class="cmo-header">'+
        '<img class="cmo-brand-logo" src="'+GH+'logo-menu.png" alt="Cozy Style" onerror="this.style.display=\'none\'">'+
        '<button class="cmo-close-btn" id="cmo-close-btn" aria-label="Close">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="#1A1411" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">'+
            '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'+
          '</svg>'+
        '</button>'+
      '</div>'+

      /* Category list placeholder */
      '<div class="cmo-cat-list" id="cmo-cat-list">'+
        '<div class="cmo-loading">Loading…</div>'+
      '</div>'+

      /* Footer */
      '<div class="cmo-footer">'+
        '<div class="cmo-sub-links">'+
          '<a href="/contactus" class="cmo-sub-link">تواصل معنا</a>'+
          '<a href="/profile"   class="cmo-sub-link">حسابي</a>'+
          '<a href="/orders"    class="cmo-sub-link">تتبع الطلب</a>'+
          '<a href="#"          class="cmo-sub-link">من نحن</a>'+
          '<a href="/policy"    class="cmo-sub-link">الشروط والأحكام</a>'+
        '</div>'+
        '<div class="cmo-social-row">'+
          '<a href="https://www.instagram.com/" target="_blank" class="cmo-soc-icon" aria-label="Instagram">'+
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="#fff" stroke="none"/></svg>'+
          '</a>'+
          '<a href="https://www.tiktok.com/" target="_blank" class="cmo-soc-icon" aria-label="TikTok">'+
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.85 1.55V6.79a4.84 4.84 0 01-1.08-.1z"/></svg>'+
          '</a>'+
          '<a href="https://wa.me/966503676809" target="_blank" class="cmo-soc-icon" aria-label="WhatsApp">'+
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'+
          '</a>'+
        '</div>'+
      '</div>'+

    '</div>';

  document.body.appendChild(ov);

  /* Close button */
  document.getElementById('cmo-close-btn').addEventListener('click', closeMenuOverlay);

  /* ESC key */
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenuOverlay();
  });

  /* Load navigation items */
  loadSallaNavigation(function(items){
    var list = document.getElementById('cmo-cat-list');
    if(list) list.innerHTML = buildMenuItems(items);
  });
}

function openMenuOverlay(){
  if(!document.getElementById('cmo-overlay')) injectMenuOverlay();

  var ov = document.getElementById('cmo-overlay');
  var bd = document.getElementById('cmo-backdrop');
  if(!ov) return;

  document.body.style.overflow = 'hidden';
  if(bd){ bd.style.display = 'block'; requestAnimationFrame(function(){ bd.style.opacity = '1'; }); }
  ov.classList.add('cmo-open');
}

function closeMenuOverlay(){
  var ov = document.getElementById('cmo-overlay');
  var bd = document.getElementById('cmo-backdrop');
  if(ov) ov.classList.remove('cmo-open');
  if(bd){ bd.style.opacity = '0'; setTimeout(function(){ bd.style.display = 'none'; }, 300); }
  document.body.style.overflow = '';
}

/* ══ 9. PRODUCT CARDS — Shadow DOM injection ════════════════ */
/* Matches designer p-card exactly:
   LEFT  = wishlist (red circle)
   RIGHT = quick-add (dark gradient square)
   IMAGE = white square (aspect-ratio 1:1)
   PILL  = "اضافة للسلة" gradient full-width
   NAME  = clean text (no box bg)
   PRICE = clean brown text (no box bg)
*/
var SHADOW_CSS =
  /* ── Card base ── */
  ':host{'+
    'background:rgba(252,248,244,.95)!important;'+
    'border-radius:clamp(14px,3.5vw,22px)!important;'+
    'padding:clamp(10px,2.5vw,16px)!important;'+
    'display:flex!important;flex-direction:column!important;align-items:center!important;'+
    'box-shadow:0 2px 14px rgba(0,0,0,.09)!important;'+
    'overflow:hidden!important;border:1px solid rgba(196,168,130,.18)!important;'+
  '}'+

  /* ── NUKE duplicate inner-card backgrounds (the ugly layered boxes) ── */
  '[class*="content"],[class*="info"],[class*="footer"],[class*="details"],'+
  '[class*="body"],[class*="text"],[class*="meta"],[class*="bottom"],'+
  '[class*="data"],[class*="wrap"],[class*="block"],[class*="section"]{'+
    'background:transparent!important;box-shadow:none!important;'+
    'border-radius:0!important;border:none!important;padding:0!important;'+
  '}'+

  /* ── Image – transparent container, image fills card cleanly ── */
  '[part="image"],[class*="image"],[class*="img"],[class*="media"],'+
  '[class*="thumb"],[class*="photo"],[class*="picture"]{'+
    'background:transparent!important;'+
    'border-radius:clamp(10px,2.5vw,16px)!important;'+
    'aspect-ratio:1/1!important;width:100%!important;'+
    'display:flex!important;align-items:center!important;justify-content:center!important;'+
    'padding:clamp(4px,1vw,8px)!important;'+
    'margin-bottom:clamp(8px,2vw,14px)!important;'+
    'overflow:hidden!important;'+
  '}'+
  'img{max-width:100%!important;max-height:100%!important;object-fit:contain!important;}'+

  /* ── Wishlist – RED circle (left) ── */
  '[part="wishlist"],salla-wishlist-btn,'+
  'button[class*="wish"],button[class*="fav"],'+
  '[class*="wishlist-btn"],[class*="favourite-btn"]{'+
    'background:rgba(255,71,87,.12)!important;'+
    'border-radius:50%!important;'+
    'width:clamp(32px,8vw,40px)!important;height:clamp(32px,8vw,40px)!important;'+
    'border:none!important;cursor:pointer!important;'+
    'display:flex!important;align-items:center!important;justify-content:center!important;'+
    'flex-shrink:0!important;transition:background .2s!important;'+
    'outline:none!important;box-shadow:none!important;'+
  '}'+
  '[part="wishlist"]::before,[part="wishlist"]::after,'+
  'salla-wishlist-btn::before,salla-wishlist-btn::after,'+
  'button[class*="wish"]::before,button[class*="wish"]::after,'+
  '[class*="wishlist-btn"]::before,[class*="wishlist-btn"]::after{'+
    'display:none!important;content:none!important;'+
  '}'+
  '[part="wishlist"] svg,button[class*="wish"] svg,salla-wishlist-btn svg,'+
  '[class*="wishlist-btn"] svg{stroke:#ff4757!important;fill:none!important;'+
    'width:clamp(16px,4vw,20px)!important;height:clamp(16px,4vw,20px)!important;}'+

  /* ── Quick-add top-right – dark gradient SQUARE ── */
  '[part="add"],[class*="quick-add"],button[class*="fast"],[class*="add-quick"]{'+
    'background:linear-gradient(135deg,#1A1411 0%,#755C4C 100%)!important;'+
    'border-radius:clamp(10px,2.5vw,15px)!important;'+
    'width:clamp(32px,8vw,40px)!important;height:clamp(32px,8vw,40px)!important;'+
    'border:none!important;cursor:pointer!important;'+
    'display:flex!important;align-items:center!important;justify-content:center!important;'+
    'box-shadow:0 4px 12px rgba(26,20,17,.30)!important;flex-shrink:0!important;'+
  '}'+
  '[part="add"] svg,[class*="quick-add"] svg{stroke:#fff!important;fill:none!important;}'+

  /* ── Add-to-cart pill (bottom, full-width) ── */
  '[part="add-to-cart"],salla-add-product-button button,'+
  'button[class*="add-to-cart"],button[class*="add-cart"],'+
  '[class*="add-product"] button,[class*="cart-btn"]{'+
    'background:linear-gradient(135deg,#1A1411 0%,#755C4C 100%)!important;'+
    'border-radius:999px!important;width:100%!important;'+
    'color:#fff!important;font-weight:800!important;'+
    'padding:clamp(10px,2.5vw,14px) 6px!important;'+
    'border:none!important;cursor:pointer!important;'+
    'font-size:clamp(11px,2.8vw,15px)!important;'+
    'margin:clamp(6px,1.5vw,10px) 0 clamp(3px,.8vw,5px)!important;'+
    'display:block!important;text-align:center!important;'+
    'box-shadow:0 4px 14px rgba(26,20,17,.24)!important;'+
  '}'+

  /* ── Product name – clean text, NO box ── */
  '[part="name"],[class*="name"],[class*="title"]{'+
    'font-weight:700!important;font-size:clamp(11px,2.8vw,15px)!important;'+
    'color:#1A1411!important;text-align:center!important;'+
    'margin-bottom:clamp(2px,.6vw,4px)!important;'+
    'background:transparent!important;box-shadow:none!important;'+
    'border-radius:0!important;border:none!important;padding:2px 0!important;'+
  '}'+

  /* ── Price – clean brown text, NO box ── */
  '[part="price"],[class*="price"],salla-price{'+
    'font-weight:800!important;font-size:clamp(11px,2.8vw,15px)!important;'+
    'color:#755C4C!important;text-align:center!important;'+
    'background:transparent!important;box-shadow:none!important;'+
    'border-radius:0!important;border:none!important;padding:0!important;'+
  '}';

function styleProductCards(){
  var cards = document.querySelectorAll('salla-product-card');
  cards.forEach(function(card){
    if(card._cozyStyled) return;
    card._cozyStyled = true;

    function injectShadow(){
      if(!card.shadowRoot) return;
      var existing = card.shadowRoot.querySelector('#cozy-shadow-style');
      if(existing) return;
      var st = document.createElement('style');
      st.id = 'cozy-shadow-style';
      st.textContent = SHADOW_CSS;
      card.shadowRoot.appendChild(st);
    }

    /* If shadow root already open, inject now */
    if(card.shadowRoot){ injectShadow(); return; }

    /* Wait for shadow root via MutationObserver on the card */
    var ob = new MutationObserver(function(){
      if(card.shadowRoot){ injectShadow(); ob.disconnect(); }
    });
    ob.observe(card, {childList:true, subtree:true, attributes:true});

    /* Also watch for custom element upgrade */
    customElements.whenDefined(card.localName).then(function(){
      setTimeout(function(){ if(card.shadowRoot) injectShadow(); }, 100);
    }).catch(function(){});
  });
}

/* ══ 10. MUTATION OBSERVER — re-run on dynamic load ════════ */
function observe(){
  var ob = new MutationObserver(function(){
    injectHeader();
    injectAccPill();
    injectContactSection();
    injectBottomNav();
    fixBackgrounds();
    styleProductCards();
    /* Hero only on homepage */
    if(isHomepage()){
      injectHero();
    }
  });
  ob.observe(document.body, {childList:true, subtree:true});
}

/* ══ RUN ════════════════════════════════════════════════════ */
function isHomepage(){
  var p = window.location.pathname;
  return p === '/' || p === '/index.html' || p === '';
}

ready(function(){
  fixBackgrounds();
  injectHeader();
  injectBottomNav();
  styleProductCards();
  if(isHomepage()){
    injectHero();
    injectAccPill();
    injectContactSection();
    fixNativeCategories();
  } else {
    injectContactSection();
  }
  observe();
  /* re-run after lazy content */
  setTimeout(function(){
    injectHeader();
    injectBottomNav();
    fixBackgrounds();
    styleProductCards();
    if(isHomepage()){
      injectHero();
      injectAccPill();
      injectContactSection();
      fixNativeCategories();
    }
  }, 2000);
});

/* ══ FIX NATIVE CATEGORIES LINKS ════════════════════════ */
function fixNativeCategories(){
  /* Find category images/titles within the native categories section */
  var cats = document.querySelectorAll('salla-slider[type="carousel"] .swiper-slide, [class*="categories"] [class*="item"]');
  cats.forEach(function(cat){
    if(cat._cozyFixed) return;
    
    /* Make the whole card clickable if it isn't an <a> tag */
    if(cat.tagName !== 'A' && !cat.querySelector('a')){
      var title = cat.querySelector('[class*="title"], h3');
      if(title && title.textContent){
        var name = title.textContent.trim();
        cat.style.cursor = 'pointer';
        cat.addEventListener('click', function(){
          window.location.href = '/category/' + encodeURIComponent(name); // Basic fallback matching
        });
        cat._cozyFixed = true;
      }
    }
  });
}

})();
