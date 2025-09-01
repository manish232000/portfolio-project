/* ===== Helper: DOM ===== */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

/* ===== Theme Toggle ===== */
const themeToggle = $('#themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.classList.toggle('dark', savedTheme === 'dark');
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.classList.add('dark');
}
themeToggle?.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});

/* ===== Mobile Nav ===== */
const navToggle = $('.nav-toggle');
const navLinks = $('.nav-links');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('show');
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('show');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

/* ===== Back to Top ===== */
const backToTop = $('#backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 600 ? 'inline-flex' : 'none';
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== Year ===== */
$('#year').textContent = new Date().getFullYear();

/* ===== Reveal on Scroll ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => observer.observe(el));

/* ===== Projects Data & Rendering ===== */
const projects = [
  {
    title: "Weather Application",
    image: "assets/img/project-weather.jpg",
    desc: "Dynamic real-time weather app delivering global weather info using API integration.",
    tags: ["web"],
    live: "https://github.com/manish232000/Weather-App.git",
    code: "https://github.com/manish232000/Weather-App.git"
  },
  {
    title: "Spotify Clone",
    image: "assets/img/project-spotify.png",
    desc: "A responsive Spotify clone replicating core features with engaging UI.",
    tags: ["web", "ui"],
    live: "https://github.com/manish232000/spotify_clone.git",
    code: "https://github.com/manish232000/spotify_clone.git"
  }
];

const projectGrid = $('#projectGrid');
function renderProjects(filter = 'all') {
  projectGrid.innerHTML = '';
  const filtered = projects.filter(p => filter === 'all' || p.tags.includes(filter));
  for (const p of filtered) {
    const card = document.createElement('article');
    card.className = 'card project';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="p-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span>#${t}</span>`).join(' ')}</div>
        <div style="margin-top:10px; display:flex; gap:10px">
          <button class="btn view" data-title="${p.title}">View</button>
          <a class="btn btn-ghost" href="${p.code}" target="_blank" rel="noopener">Code</a>
        </div>
      </div>`;
    projectGrid.appendChild(card);
  }
  $$('.view', projectGrid).forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.title)));
}
renderProjects();

// Modal logic
const modal = $('#projectModal');
const closeBtn = $('.close', modal);
function openModal(title){
  const p = projects.find(p => p.title === title);
  if (!p) return;
  $('#modalTitle').textContent = p.title;
  $('#modalImage').src = p.image;
  $('#modalImage').alt = p.title;
  $('#modalDesc').textContent = p.desc;
  $('#modalLive').href = p.live;
  $('#modalCode').href = p.code;
  modal.showModal();
}
closeBtn?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => { if (e.target === modal) modal.close(); });

/* ===== Testimonials Slider ===== */
const slides = $('#slides');
$('.slider-prev')?.addEventListener('click', () => slides.scrollBy({left: -slides.clientWidth, behavior: 'smooth'}));
$('.slider-next')?.addEventListener('click', () => slides.scrollBy({left: slides.clientWidth, behavior: 'smooth'}));

/* ===== Contact Form ===== */
const form = $('#contactForm');
const status = $('#formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name').toString().trim();
  const email = formData.get('email').toString().trim();
  const message = formData.get('message').toString().trim();
  if (!name || !email || !message) {
    status.textContent = "Please fill out all fields.";
    return;
  }
  status.textContent = "Opening your mail client…";
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:my987654321manish@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
  setTimeout(() => status.textContent = "Thanks! If your mail client didn't open, email me at my987654321manish@gmail.com.", 1000);
});

/* ===== Register Service Worker (PWA) ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(console.error);
  });
}
