/* ---------------- Project data ---------------- */
const TOPCODER_SVG = `<svg viewBox="0 0 700 460" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">
  <defs>
    <linearGradient id="tcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B3B2E"/>
      <stop offset="55%" stop-color="#0C5C46"/>
      <stop offset="100%" stop-color="#0E3A63"/>
    </linearGradient>
    <linearGradient id="tcGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#39FFA0"/>
      <stop offset="100%" stop-color="#4CC9FF"/>
    </linearGradient>
  </defs>
  <rect width="700" height="460" fill="url(#tcGrad)"/>
  <circle cx="600" cy="70" r="150" fill="#39FFA0" opacity="0.12"/>
  <circle cx="90" cy="410" r="130" fill="#4CC9FF" opacity="0.12"/>
  <!-- grid texture -->
  <g opacity="0.08" stroke="#EFFFF7" stroke-width="1">
    <line x1="0" y1="80" x2="700" y2="80"/>
    <line x1="0" y1="160" x2="700" y2="160"/>
    <line x1="0" y1="240" x2="700" y2="240"/>
    <line x1="0" y1="320" x2="700" y2="320"/>
    <line x1="0" y1="400" x2="700" y2="400"/>
    <line x1="100" y1="0" x2="100" y2="460"/>
    <line x1="220" y1="0" x2="220" y2="460"/>
    <line x1="340" y1="0" x2="340" y2="460"/>
    <line x1="460" y1="0" x2="460" y2="460"/>
    <line x1="580" y1="0" x2="580" y2="460"/>
  </g>
  <!-- terminal card -->
  <g transform="translate(150,90)">
    <rect x="0" y="0" width="400" height="280" rx="18" fill="#081A16" stroke="url(#tcGlow)" stroke-width="2" opacity="0.95"/>
    <circle cx="26" cy="28" r="6" fill="#FF3D9A"/>
    <circle cx="46" cy="28" r="6" fill="#FFE156"/>
    <circle cx="66" cy="28" r="6" fill="#39FFA0"/>
    <line x1="0" y1="48" x2="400" y2="48" stroke="#123a30" stroke-width="2"/>
    <!-- code line blocks, no real text -->
    <rect x="30" y="72" width="120" height="10" rx="5" fill="#39FFA0" opacity="0.85"/>
    <rect x="30" y="96" width="220" height="10" rx="5" fill="#EFFFF7" opacity="0.5"/>
    <rect x="30" y="120" width="170" height="10" rx="5" fill="#EFFFF7" opacity="0.35"/>
    <rect x="60" y="144" width="140" height="10" rx="5" fill="#4CC9FF" opacity="0.75"/>
    <rect x="60" y="168" width="190" height="10" rx="5" fill="#EFFFF7" opacity="0.35"/>
    <rect x="30" y="196" width="90" height="10" rx="5" fill="#FFE156" opacity="0.8"/>
    <rect x="30" y="224" width="240" height="10" rx="5" fill="#EFFFF7" opacity="0.3"/>
    <rect x="30" y="248" width="150" height="10" rx="5" fill="#EFFFF7" opacity="0.3"/>
  </g>
  <!-- angle bracket motif -->
  <g stroke="url(#tcGlow)" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
    <path d="M 585 330 L 525 375 L 585 420"/>
    <path d="M 615 420 L 675 375 L 615 330"/>
  </g>
  <circle cx="95" cy="95" r="7" fill="#39FFA0"/>
  <circle cx="115" cy="95" r="4" fill="#4CC9FF"/>
</svg>`;

const projects = [
  {
    id:'rm', route:'case-rm', title:'ReimburseMe', tag:'Enterprise fintech · Walmart Global Tech',
    hook:'Turning a 45-minute paperwork chore into a 30-second task for 9,000+ associates.',
    cover:'assets/img/rm_person_cover.jpg', tint:'linear-gradient(160deg, var(--blue), var(--green))', accent:'var(--blue)'
  },
  {
    id:'wpp', route:'case-wpp', title:'Workforce Planning Portal', tag:'Scheduling & AI · Walmart Global Tech',
    hook:"Rebuilding Walmart's scheduling backbone — with AI woven into the moment it's needed.",
    cover:'assets/img/wpp_laptop.jpg', tint:'linear-gradient(160deg, var(--violet), var(--blue))', accent:'var(--violet)'
  },
  {
    id:'ani', route:'case-ani', title:'Ani', tag:'0→1 social product · Founding designer',
    hook:'A social platform for anime & manga fans — 10,000+ downloads in month one.',
    cover:'assets/img/ani_illustration.jpg', tint:'linear-gradient(160deg, var(--pink), var(--yellow))', accent:'var(--pink)'
  },
  {
    id:'tc', route:'case-topcoder', title:'Topcoder', tag:'B2B platform · Contributor dashboard',
    hook:'Reworking how contributors browse challenges and submit ideas.',
    svgCover: TOPCODER_SVG, accent:'var(--green)'
  }
];

function cardHTML(p, small){
  const media = p.svgCover
    ? `${p.svgCover}<div class="tint2"></div>`
    : `<img src="${p.cover}" alt="${p.title} project cover"><div class="tint" style="background:${p.tint};"></div><div class="tint2"></div>`;
  return `<a class="proj-card ${small?'small':''}" href="#/${p.route}" style="--accent-card:${p.accent}">
    <div class="cover">
      ${media}
      <span class="arrow">↗</span>
    </div>
    <div class="body">
      <div class="ptag">${p.tag}</div>
      <h3>${p.title}</h3>
      <p class="hookline">${p.hook}</p>
    </div>
  </a>`;
}
document.getElementById('homeProjGrid').innerHTML = projects.slice(0,2).map(p=>cardHTML(p,false)).join('');
document.getElementById('workProjGrid').innerHTML = projects.map(p=>cardHTML(p,false)).join('');

/* ---------------- Router ---------------- */
const routeToPageId = {
  '': 'page-home',
  'about':'page-about',
  'work':'page-work',
  'case-rm':'page-case-rm',
  'case-wpp':'page-case-wpp',
  'case-ani':'page-case-ani',
  'case-topcoder':'page-case-topcoder',
  'contact':'page-contact'
};
function currentRoute(){
  return (location.hash || '#/').replace(/^#\/?/, '');
}
function render(){
  const route = currentRoute();
  const pageId = routeToPageId.hasOwnProperty(route) ? routeToPageId[route] : 'page-home';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if(target) target.classList.add('active');
  window.scrollTo({top:0, behavior:'auto'});
  document.querySelectorAll('#navLinks a, #mobileMenu a').forEach(a=>{
    a.classList.toggle('active', a.dataset.route === route);
  });
  document.getElementById('mobileMenu').classList.remove('open');
  // re-trigger reveal for newly shown page
  requestAnimationFrame(()=>{
    if(target) target.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  });
}
function goTo(route){
  const hash = '#/' + route;
  if(location.hash === hash){ render(); }
  else { location.hash = hash; }
}
// Delegate ALL internal navigation clicks through one bulletproof handler.
// This does not depend on the native hashchange event firing reliably —
// it navigates and re-renders immediately, every time.
document.addEventListener('click', function(e){
  const link = e.target.closest('a[href^="#/"]');
  if(!link) return;
  e.preventDefault();
  const route = link.getAttribute('href').replace(/^#\/?/, '');
  goTo(route);
}, false);
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
render();

/* ---------------- Nav scroll shadow ---------------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', ()=>{
  nav.style.boxShadow = window.scrollY>40 ? '0 20px 50px rgba(0,0,0,0.6)' : 'var(--shadow-md)';
}, {passive:true});

/* ---------------- Mobile menu ---------------- */
document.getElementById('navBurger').addEventListener('click', ()=>{
  document.getElementById('mobileMenu').classList.toggle('open');
});

/* ---------------- Progress bar ---------------- */
const progress = document.getElementById('progress');
function updateProgress(){
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = max>0 ? (h.scrollTop/max*100)+'%' : '0%';
}
document.addEventListener('scroll', updateProgress, {passive:true});

/* ---------------- Reveal on scroll (for home/work/about cards) ---------------- */
const revealIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealIO.unobserve(e.target); } });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revealIO.observe(el));

/* ---------------- Tabs ---------------- */
document.querySelectorAll('.tabs-wrap').forEach(wrap=>{
  const buttons = wrap.querySelectorAll('.tab-btn');
  const panels = wrap.querySelectorAll('.tab-panel');
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      wrap.querySelector('.tab-panel[data-tab-panel="'+btn.dataset.tab+'"]').classList.add('active');
    });
  });
});

/* ---------------- Ticker ---------------- */
const stats = [
  ['45m → 30s','Submission time reduced'],
  ['$21M+','Annual value realized'],
  ['824K+','Reports submitted / year'],
  ['9K+','Associates supported'],
  ['10K+','Ani downloads, month one'],
  ['100K+','Launch video views in 30 days'],
  ['29K+','Weekly platform users'],
  ['89 ASUS','Usability satisfaction score'],
];
const track = document.getElementById('tickerTrack');
let tHtml = '';
stats.forEach(([num,label])=>{ tHtml += `<div class="ticker-item"><b>${num}</b><span>${label}</span></div><span class="ticker-item div">/</span>`; });
track.innerHTML = tHtml + tHtml;

/* ---------------- Copy email ---------------- */
const toast = document.getElementById('toast');
function showToast(msg){
  toast.textContent = msg; toast.classList.add('show');
  clearTimeout(window._t); window._t = setTimeout(()=>toast.classList.remove('show'), 2200);
}
const copyBtn = document.getElementById('copyEmailBtn');
if(copyBtn){
  copyBtn.addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText('Campbellkennedy09@gmail.com'); showToast('Copied to clipboard ✓'); }
    catch(e){ showToast('Email: Campbellkennedy09@gmail.com'); }
  });
}
const copyLinkedinBtn = document.getElementById('copyLinkedinBtn');
if(copyLinkedinBtn){
  copyLinkedinBtn.addEventListener('click', async ()=>{
    const url = 'https://www.linkedin.com/in/kennedypcampbell/';
    try{ await navigator.clipboard.writeText(url); showToast('LinkedIn link copied ✓'); }
    catch(e){ showToast(url); }
  });
}

/* ---------------- Year ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Skateboard kickflip ---------------- */
const skateFab = document.getElementById('skateFab');
skateFab.addEventListener('click', ()=>{
  window.scrollTo({top:0, behavior:'smooth'});
  if(!skateFab.classList.contains('flip')){
    skateFab.classList.add('flip');
    skateFab.addEventListener('animationend', ()=>skateFab.classList.remove('flip'), {once:true});
  }
});
