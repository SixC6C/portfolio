// =========================================================
// UN SOPANHA — PORTFOLIO INTERACTIVE SCRIPT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Background Particle Canvas Animation
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.floor((width * height) / 18000);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('theme-light');
      const dotColor = isLight ? '2, 132, 199' : '56, 189, 248';
      const lineColor = isLight ? '2, 132, 199' : '56, 189, 248';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(${dotColor}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(${lineColor}, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 3. Theme Switcher (Dark / Light)
  function applyTheme(themeName) {
    const isLight = themeName === 'light';
    if (isLight) {
      document.body.classList.add('theme-light');
      document.documentElement.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      document.documentElement.classList.remove('theme-dark');
    } else {
      document.body.classList.remove('theme-light');
      document.documentElement.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      document.documentElement.classList.add('theme-dark');
    }
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
      icon.textContent = isLight ? '☀️' : '🌙';
    });
  }

  window.toggleTheme = function() {
    const isLight = document.body.classList.contains('theme-light');
    const nextTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('sopanha-theme', nextTheme);
    applyTheme(nextTheme);
  };

  const savedTheme = localStorage.getItem('sopanha-theme') || 'dark';
  applyTheme(savedTheme);

  // 4. Mobile Navigation Drawer
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Active Tab Observer on Scroll
  const sectionIds = ['about', 'education', 'skills', 'work', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const tabs = document.querySelectorAll('.nav-links .tab');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach(tab => {
          tab.classList.toggle('active', tab.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  // 6. Hero Role Typing Loop
  const roles = [
    'Web Applications.',
    'Responsive UI/UX Interfaces.',
    'Computer Science Solutions.',
    'Digital Content & Media.'
  ];
  const typedRoleEl = document.getElementById('typedRole');

  if (typedRoleEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeTick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedRoleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeTick, 1800);
          return;
        }
      } else {
        charIndex--;
        typedRoleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeTick, deleting ? 40 : 80);
    }
    typeTick();
  }

  // 7. Hero Terminal Initial Typing
  const termTypingEl = document.getElementById('terminalTyping');
  if (termTypingEl) {
    const cmd = 'open skills.md';
    let i = 0;
    function typeCmd() {
      if (i <= cmd.length) {
        termTypingEl.textContent = cmd.slice(0, i);
        i++;
        setTimeout(typeCmd, 90);
      }
    }
    setTimeout(typeCmd, 800);
  }

  // 8. Skills Category Filter
  const skillBtns = document.querySelectorAll('[data-skill-cat]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-skill-cat');
      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. Work / Projects Category Filter
  const projectBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-project-cat]');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-project-cat');
        if (filter === 'all' || cardCat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 10. Interactive Terminal Section Command Processor
  const termInput = document.getElementById('termInput');
  const termOutput = document.getElementById('interactiveTermOutput');
  const helpTrigger = document.getElementById('termHelpTrigger');

  const commandHandler = {
    help: () => `
      <div style="color: var(--accent-cyan); font-weight: bold;">Available Commands:</div>
      <div>• <span style="color: var(--accent-amber);">whoami</span> — Display bio & profile details</div>
      <div>• <span style="color: var(--accent-amber);">skills</span> — View technical skills & toolbox</div>
      <div>• <span style="color: var(--accent-amber);">education</span> — View academic background</div>
      <div>• <span style="color: var(--accent-amber);">projects</span> — View portfolio projects</div>
      <div>• <span style="color: var(--accent-amber);">contact</span> — Show contact details & links</div>
      <div>• <span style="color: var(--accent-amber);">cv</span> — Download PDF Resume</div>
      <div>• <span style="color: var(--accent-amber);">theme</span> — Toggle dark/light mode</div>
      <div>• <span style="color: var(--accent-amber);">date</span> — Display current system timestamp</div>
      <div>• <span style="color: var(--accent-amber);">clear</span> — Clear terminal screen</div>
    `,
    whoami: () => `
      <div><strong>Name:</strong> Un Sopanha</div>
      <div><strong>Education:</strong> Western University — B.S. Computer Science (Year 3/4)</div>
      <div><strong>Location:</strong> Sen Sok, Phnom Penh, Cambodia</div>
      <div><strong>Languages:</strong> Khmer (Native), English (Advanced L10C)</div>
      <div><strong>Summary:</strong> Orderly and responsible developer focused on building fast web apps and digital media solutions.</div>
    `,
    skills: () => `
      <div><strong>Web & Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Web Design, Responsive UI</div>
      <div><strong>Programming & IT:</strong> C/C++, Java, OOP, Data Structures, Networking Fundamentals</div>
      <div><strong>Design & Media:</strong> Photoshop, CapCut, Canva</div>
      <div><strong>Office & Digital:</strong> MS Office Applications, Facebook Page Management & Boosting</div>
    `,
    education: () => `
      <div>🎓 <strong>Western University</strong> — Bachelor's Degree of Computer Science (Present)</div>
      <div>📜 <strong>ETEC CENTER</strong> — Programming & Networking Fundamentals (2023 - 2024)</div>
      <div>🗣️ <strong>Sovannaphumi School</strong> — General English Program L10C (2021 - 2023)</div>
      <div>🏫 <strong>Hun Sen Borey 100 Khnang High School</strong> — Diploma (2021 - 2023)</div>
    `,
    projects: () => `
      <div>1. <strong>Valorant Masterpiece Collection</strong> — PHP / CSS3 Glassmorphism Web App</div>
      <div>2. <strong>Laravel Food Ordering System</strong> — Full-Stack Laravel / Vite / MySQL App</div>
      <div>3. <strong>Loan & Borrower Management System (LMS)</strong> — PHP / MySQL Enterprise System</div>
      <div>4. <strong>Human Resource Management (HRM) System</strong> — Admin Portal & Database System</div>
    `,
    contact: () => `
      <div>📧 <strong>Email:</strong> panha2288@gmail.com</div>
      <div>📱 <strong>Phone/Telegram:</strong> +855 96 461 5123</div>
      <div>📍 <strong>Location:</strong> Phnom Penh, Cambodia</div>
      <div>🐙 <strong>GitHub:</strong> github.com/SixC6C</div>
    `,
    cv: () => {
      const link = document.createElement('a');
      link.href = 'CV_Un_Sopanha.pdf';
      link.download = 'CV_Un_Sopanha.pdf';
      link.click();
      return '<div style="color: var(--accent-green);">✓ Triggering CV PDF Download...</div>';
    },
    theme: () => {
      if (themeToggle) themeToggle.click();
      return '<div style="color: var(--accent-purple);">✓ Theme toggled successfully!</div>';
    },
    date: () => `<div>⏰ Current Date & Time: ${new Date().toLocaleString()}</div>`,
    clear: () => {
      if (termOutput) termOutput.innerHTML = '';
      return '';
    }
  };

  function processCommand(rawInput) {
    const input = rawInput.trim().toLowerCase();
    if (!input) return;

    // Append user input line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line-out';
    cmdLine.innerHTML = `<span class="prompt">visitor@sopanha.dev:~$</span> <strong>${escapeHtml(rawInput)}</strong>`;
    termOutput.appendChild(cmdLine);

    // Run command or return fallback
    let responseHtml = '';
    if (commandHandler[input]) {
      responseHtml = commandHandler[input]();
    } else {
      responseHtml = `<div style="color: var(--accent-red);">Command not found: '${escapeHtml(input)}'. Type <span style="color: var(--accent-amber);">'help'</span> for list of commands.</div>`;
    }

    if (responseHtml) {
      const resLine = document.createElement('div');
      resLine.className = 'term-line-out';
      resLine.innerHTML = responseHtml;
      termOutput.appendChild(resLine);
    }

    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        processCommand(val);
      }
    });
  }

  if (helpTrigger) {
    helpTrigger.addEventListener('click', () => processCommand('help'));
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
  }

  // 11. Project Details Modal Popup
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');

  const projectDetails = {
    p1: {
      title: "Valorant Masterpiece Collection",
      category: "Web Application / Gaming Showcase",
      tech: ["PHP", "HTML5", "CSS3 Glassmorphism", "JavaScript", "FontAwesome"],
      desc: "A custom gaming web showcase application for Valorant collections. Features dynamic loading screen animations, cart count tracking, dynamic collection items, and an integrated PHP contact handler.",
      highlights: [
        "Custom gold & sapphire design system with frosted glass backdrop blur.",
        "Smooth CSS keyframe animations and responsive navigation header.",
        "Integrated backend handler (`contact_handler.php`) and interactive cart counter."
      ],
      github: "https://github.com/SixC6C"
    },
    p2: {
      title: "Laravel Food Ordering System",
      category: "Full-Stack Web Application",
      tech: ["PHP / Laravel Framework", "Vite", "JavaScript", "MySQL", "Composer"],
      desc: "A full-stack food ordering platform built on Laravel MVC architecture. Includes database migrations, RESTful routing, menu item management, checkout workflows, and Vite asset bundling.",
      highlights: [
        "Structured Laravel MVC architecture with custom database seeders & migrations.",
        "Modern Vite asset bundling for high-performance frontend compilation.",
        "Relational database schemas for food items, categories, and customer orders."
      ],
      github: "https://github.com/SixC6C"
    },
    p3: {
      title: "Loan & Borrower Management System (LMS)",
      category: "Enterprise Web Application",
      tech: ["PHP", "MySQL Relational DB", "HTML5/CSS3", "Session Authentication", "FontAwesome"],
      desc: "A web-based financial loan management system that automates borrower registration, loan plan calculations, payment recording, and administrative user controls.",
      highlights: [
        "Complete CRUD system for borrowers, loan types, loan plans, and payment logs.",
        "PHP session authentication for secure admin access control (`session.php`, `config.php`).",
        "Automated payment tracking and borrower credit history logs."
      ],
      github: "https://github.com/SixC6C"
    },
    p4: {
      title: "Human Resource Management (HRM) System",
      category: "Enterprise Management Portal",
      tech: ["PHP", "MySQL Database", "HTML5", "CSS3", "JavaScript"],
      desc: "An enterprise administrative portal designed for HR teams to manage employee records, organizational department structures, staff status monitoring, and access roles.",
      highlights: [
        "Centralized employee database with search and filtering features.",
        "Administrative user role management for HR personnel.",
        "Clean management dashboard interface designed for daily enterprise tasks."
      ],
      github: "https://github.com/SixC6C"
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project-id');
      const data = projectDetails[pid];
      if (!data) return;

      modalContent.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">${data.category}</div>
        <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 0.8rem;">${data.title}</h2>
        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.2rem;">${data.desc}</p>

        <h4 style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent-amber); margin-bottom: 0.6rem;">Key Features &amp; Highlights:</h4>
        <ul style="margin-left: 1.2rem; color: var(--text-muted); margin-bottom: 1.4rem; line-height: 1.7;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <h4 style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent-purple); margin-bottom: 0.6rem;">Technologies Used:</h4>
        <div class="tag-list" style="margin-bottom: 1.6rem;">
          ${data.tech.map(t => `<span class="tag tag-fn">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">View Code on GitHub →</a>
          <button onclick="document.getElementById('projectModal').classList.remove('open')" class="btn btn-ghost btn-sm">Close Window</button>
        </div>
      `;

      projectModal.classList.add('open');
      projectModal.setAttribute('aria-hidden', 'false');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
    });
  }

  // 12. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();

      formStatus.innerHTML = `<span style="color: var(--accent-green);">&gt; message sent successfully! Thanks, ${escapeHtml(name || 'friend')} — I will reply shortly.</span>`;
      contactForm.reset();

      setTimeout(() => { formStatus.textContent = ''; }, 7000);
    });
  }

  // 13. Back to Top Button
  const toTopBtn = document.getElementById('toTop');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
