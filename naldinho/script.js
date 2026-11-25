const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const yearEl = document.getElementById('year');
const revealElements = document.querySelectorAll('.reveal');
const leadForm = document.getElementById('leadForm');

yearEl.textContent = new Date().getFullYear();

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      navItems.forEach((item) => {
        const active = item.getAttribute('href') === `#${id}`;
        item.classList.toggle('is-active', active);
      });
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => sectionObserver.observe(section));

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const interesse = document.getElementById('interesse').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !interesse || !mensagem) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const destinatario = 'seuemail@exemplo.com'; // Troque pelo seu e-mail real
    const assunto = encodeURIComponent(`Contato pelo site - ${interesse}`);
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone || 'Não informado'}\nAssunto: ${interesse}\n\nMensagem:\n${mensagem}`
    );

    const mailtoLink = `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;
    window.location.href = mailtoLink;
  });
}