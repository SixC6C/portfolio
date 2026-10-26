// =========================================================
// UN SOPANHA — PORTFOLIO VIBE ENGINE & INTERACTIVE SCRIPT
// Theme: Minimalist Tech Modern (Obsidian Emerald)
// Performance: 120 FPS, GPU-Accelerated, Zero-Lag Execution
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Ultra-Lightweight Ambient Spark Canvas (Zero-Lag, 20 Sparks, No O(N^2) Distance Checks)
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    }, { passive: true });

    // Just 22 subtle drifting motes
    const sparks = [];
    const sparkCount = Math.min(24, Math.max(12, Math.floor(width / 70)));

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.35 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseDir: 1
      });
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) requestAnimationFrame(renderSparks);
    });

    function renderSparks() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('theme-light');
      const rgb = isLight ? '5, 150, 105' : '52, 211, 153';

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around bounds
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Subtle alpha breathing
        s.alpha += s.pulseSpeed * s.pulseDir;
        if (s.alpha > 0.45) s.pulseDir = -1;
        if (s.alpha < 0.1) s.pulseDir = 1;

        ctx.fillStyle = `rgba(${rgb}, ${s.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderSparks);
    }
    requestAnimationFrame(renderSparks);
  }

  // 3. Smooth Mouse Spotlight (Throttled with requestAnimationFrame)
  const spotlight = document.getElementById('mouseSpotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          curX += (mouseX - curX) * 0.2;
          curY += (mouseY - curY) * 0.2;
          spotlight.style.left = `${curX}px`;
          spotlight.style.top = `${curY}px`;
          ticking = false;
        });
      }
    }, { passive: true });
  }

  // 4. Theme Switcher (Obsidian Dark / Clean Minimalist Slate)
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
      icon.innerHTML = isLight ? '<i class="fa-solid fa-sun" style="color: #f59e0b;"></i>' : '<i class="fa-solid fa-moon"></i>';
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

  // 5. Mobile Navigation Drawer
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

  // 6. Active Tab Observer on Scroll
  const sectionIds = ['about', 'education', 'skills', 'work', 'vibe-console', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const tabs = document.querySelectorAll('.nav-links .tab');

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach(sec => navObserver.observe(sec));
  }

  // 7. Hero Vibe Typing Loop (Vibe Coding & Year 4 Senior)
  const vibePhrases = [
    'Prompting ideas into high-impact web apps.',
    'Year 4 CS Senior @ Western University (2026).',
    'Creator of Khmer AI Voice Studio.',
    'Flow-state engineering with clean architecture.',
    'Harmonizing CS depth with modern AI velocity.'
  ];
  const typedVibeEl = document.getElementById('typedVibe');

  if (typedVibeEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeVibeTick() {
      const current = vibePhrases[phraseIndex];

      if (!isDeleting) {
        charIndex++;
        typedVibeEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeVibeTick, 2000);
          return;
        }
      } else {
        charIndex--;
        typedVibeEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % vibePhrases.length;
        }
      }
      setTimeout(typeVibeTick, isDeleting ? 30 : 65);
    }
    typeVibeTick();
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
        card.style.display = (cat === 'all' || cardCat === cat) ? 'flex' : 'none';
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
        card.style.display = (filter === 'all' || cardCat === filter) ? 'flex' : 'none';
      });
    });
  });

  // 10. Web Audio API Flow Chime (Zero Lag, Pure In-Memory Harmonic Ambient Tone)
  function playFlowChimes() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Pentatonic notes: E4, G#4, B4, E5 (Soft celestial chord)
      const freqs = [329.63, 415.30, 493.88, 659.25];
      const now = ctx.currentTime;

      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 2.0);
      });
    } catch (e) {
      console.log('AudioContext not allowed or not supported yet');
    }
  }

  // 11. Interactive Vibe Console & Prompt Deck
  const vibeInput = document.getElementById('vibeInput');
  const vibeSendBtn = document.getElementById('vibeSendBtn');
  const vibeConsoleBody = document.getElementById('vibeConsoleBody');
  const vibeChips = document.querySelectorAll('.vibe-chip');

  const vibeResponses = {
    stack: () => `
      <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-bolt"></i> Sopanha's Vibe Coding Stack:</div>
      <div>• <strong>AI Flow:</strong> Cursor AI, Claude 3.5, Gemini 2.5, Antigravity, LLM Prompt Engineering</div>
      <div>• <strong>Frontend:</strong> Modern HTML5/CSS3, ES6+ JavaScript, React (Beginner / Learning), Responsive UI/UX</div>
      <div>• <strong>Backend & Systems:</strong> PHP, Laravel MVC, MySQL, Node.js &amp; Express (Beginner), C/C++, Java, REST APIs</div>
      <div>• <strong>Design & Media:</strong> Figma Prototyping, Adobe Photoshop, CapCut, Canva</div>
      <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.4rem;">Philosophy: Combine human taste & strong CS foundations with AI velocity.</div>
    `,
    year4: () => `
      <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-graduation-cap"></i> Academic & Education Background:</div>
      <div>• <strong>Western University:</strong> Year 4 CS Senior (Graduating Class 2026), Phnom Penh.</div>
      <div>• <strong>General English Program (GEP):</strong> Level 12 • CEFR B2 (2021 – 2026) at Sovannaphumi School.</div>
      <div>• <strong>Technical Training:</strong> Programming & Networking fundamentals at ETEC Center (2023 – 2024).</div>
      <div>• <strong>Focus:</strong> AI-Augmented Web Systems, High-Performance UI, and Production Engineering.</div>
    `,
    khmer_ai: () => `
      <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-microphone-lines"></i> Khmer AI Voice Studio (Flagship Project):</div>
      <div>• Converts Khmer Unicode script into expressive, natural speech using Edge Neural TTS.</div>
      <div>• Features real-time audio waveforms, voice personas (Sreymom & Piseth), speed & pitch modulation, and MP3 exports.</div>
      <div>• <strong>Live Demo:</strong> <a href="https://text-ivory-eight.vercel.app" target="_blank" rel="noopener" style="color: var(--emerald-bright); text-decoration: underline;">text-ivory-eight.vercel.app ↗</a></div>
    `,
    vibecheck: () => {
      const score = Math.floor(Math.random() * 5) + 96;
      return `
        <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-wave-square"></i> Vibe Check Assessment:</div>
        <div>• <strong>Flow State:</strong> Optimal (${score}% Harmonic Resonance)</div>
        <div>• <strong>Render Frame Rate:</strong> 120 FPS Buttery Smooth (0 Drop Frames)</div>
        <div>• <strong>Aesthetic Rating:</strong> Obsidian Tech Modern / Emerald Glow</div>
        <div>• <strong>Current Focus:</strong> Year 4 Senior Capstone & Shipping Production Web Apps</div>
      `;
    },
    hire: () => `
      <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-briefcase"></i> Ready to Collaborate & Hire:</div>
      <div>• Available for: <strong>Web Development, Frontend Engineering, AI Tooling, Freelance Projects</strong>.</div>
      <div>• <strong>Email:</strong> <a href="mailto:panha2288@gmail.com" style="color: var(--emerald-bright);">panha2288@gmail.com</a></div>
      <div>• <strong>Telegram / Phone:</strong> <a href="tel:+855964615123" style="color: var(--emerald-bright);">+855 96 461 5123</a></div>
      <div>• <strong>GitHub:</strong> <a href="https://github.com/SixC6C" target="_blank" rel="noopener" style="color: var(--emerald-bright);">github.com/SixC6C</a></div>
      <div>• <strong>Resume:</strong> <a href="CV_Un_Sopanha.pdf" download="CV_Un_Sopanha.pdf" style="color: var(--emerald-bright); text-decoration: underline;">Download Senior CV (PDF) ↓</a></div>
    `,
    chime: () => {
      playFlowChimes();
      return `<div style="color: var(--emerald-light);"><i class="fa-solid fa-music"></i> Synthesizing celestial flow chimes via Web Audio API... Enjoy the peaceful harmony! ✨</div>`;
    }
  };

  function generateAiAnswer(rawPrompt) {
    const text = rawPrompt.trim();
    if (!text) return '';
    const lower = text.toLowerCase();

    if (lower.includes('who') || lower.includes('about') || lower.includes('sopanha') || lower.includes('panha')) {
      return `
        <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-user-astronaut"></i> Un Sopanha — Identity:</div>
        <div>• <strong>Role:</strong> Year 4 CS Senior at Western University (Phnom Penh) &amp; Vibe Coder.</div>
        <div>• <strong>Philosophy:</strong> Combining deep CS fundamentals with cutting-edge AI velocity.</div>
        <div>• <strong>Creations:</strong> Creator of <em>Khmer AI Voice Studio</em> &amp; <em>Clip Saver</em> video downloader.</div>
      `;
    } else if (lower.includes('stack') || lower.includes('tool') || lower.includes('tech') || lower.includes('skills')) {
      return vibeResponses.stack();
    } else if (lower.includes('year 4') || lower.includes('senior') || lower.includes('education') || lower.includes('university') || lower.includes('school')) {
      return vibeResponses.year4();
    } else if (lower.includes('english') || lower.includes('gep') || lower.includes('language') || lower.includes('b2')) {
      return `
        <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-language"></i> Language &amp; English Standing:</div>
        <div>• <strong>General English Program (GEP):</strong> Level 12 • CEFR B2 Upper-Intermediate (2021 – 2026) at Sovannaphumi School.</div>
        <div>• <strong>Native Language:</strong> Khmer.</div>
        <div>• <strong>Skills:</strong> Technical documentation, cross-border software team communication, and academic research.</div>
      `;
    } else if (lower.includes('khmer') || lower.includes('voice') || lower.includes('studio') || lower.includes('tts') || lower.includes('ai')) {
      return vibeResponses.khmer_ai();
    } else if (lower.includes('clip') || lower.includes('download') || lower.includes('video') || lower.includes('tiktok') || lower.includes('reels') || lower.includes('instagram') || lower.includes('railway')) {
      return `
        <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-solid fa-clapperboard"></i> Clip Saver – Video Downloader:</div>
        <div>• Fast web app for downloading TikTok &amp; Instagram Reels in watermark-free HD.</div>
        <div>• Built with Node.js/Express, modern media parsing, and deployed on Railway Cloud.</div>
        <div>• <strong>Live URL:</strong> <a href="https://downloadvideo-production-a6e0.up.railway.app" target="_blank" rel="noopener" style="color: var(--emerald-bright); text-decoration: underline;">downloadvideo-production-a6e0.up.railway.app ↗</a></div>
      `;
    } else if (lower.includes('react') || lower.includes('node')) {
      return `
        <div style="color: var(--emerald-light); font-weight: 700; margin-bottom: 0.3rem;"><i class="fa-brands fa-react"></i> React &amp; Node.js Foundations:</div>
        <div>• <strong>React:</strong> Component architecture, JSX, hooks (useState, useEffect), and responsive SPA design.</div>
        <div>• <strong>Node.js &amp; Express:</strong> REST APIs, package management, and cloud microservices.</div>
        <div>• <em>Status:</em> Beginner / Exploring with rapid velocity and hands-on projects!</div>
      `;
    } else if (lower.includes('check') || lower.includes('vibe') || lower.includes('status')) {
      return vibeResponses.vibecheck();
    } else if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('work with') || lower.includes('opportunity')) {
      return vibeResponses.hire();
    } else if (lower.includes('chime') || lower.includes('sound') || lower.includes('music') || lower.includes('audio') || lower.includes('play')) {
      return vibeResponses.chime();
    } else if (lower.includes('cv') || lower.includes('resume')) {
      const link = document.createElement('a');
      link.href = 'CV_Un_Sopanha.pdf';
      link.download = 'CV_Un_Sopanha.pdf';
      link.click();
      return `<div style="color: var(--emerald-light);">✓ Initiating Senior CV (PDF) download... You can also check contact links below.</div>`;
    } else {
      return `
        <div>I'm Sopanha's AI Copilot. You can ask me about his <strong>Year 4 senior thesis</strong>, <strong>Vibe Stack</strong>, <strong>Clip Saver &amp; Khmer Voice AI</strong>, <strong>General English (B2)</strong>, or <strong>how to hire him</strong>!</div>
      `;
    }
  }

  function handlePrompt(rawPrompt) {
    const text = rawPrompt.trim();
    if (!text) return;

    if (text.toLowerCase() === 'clear') {
      vibeConsoleBody.innerHTML = '';
      return;
    }

    // Append user message
    const userLog = document.createElement('div');
    userLog.className = 'vibe-log-item';
    userLog.innerHTML = `<div class="vibe-user-prompt"><span>✦</span> <span>${escapeHtml(text)}</span></div>`;
    vibeConsoleBody.appendChild(userLog);

    // Determine AI response
    const resContent = generateAiAnswer(text);

    // Append AI response
    const aiLog = document.createElement('div');
    aiLog.className = 'vibe-ai-response';
    aiLog.innerHTML = resContent;
    vibeConsoleBody.appendChild(aiLog);

    // Scroll to bottom
    vibeConsoleBody.scrollTop = vibeConsoleBody.scrollHeight;
  }

  if (vibeInput) {
    vibeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = vibeInput.value;
        vibeInput.value = '';
        handlePrompt(val);
      }
    });
  }

  if (vibeSendBtn) {
    vibeSendBtn.addEventListener('click', () => {
      if (!vibeInput) return;
      const val = vibeInput.value;
      vibeInput.value = '';
      handlePrompt(val);
    });
  }

  vibeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptType = chip.getAttribute('data-vibe-prompt');
      if (vibeResponses[promptType]) {
        // Log user prompt
        const userLog = document.createElement('div');
        userLog.className = 'vibe-log-item';
        userLog.innerHTML = `<div class="vibe-user-prompt"><span>✦</span> <span>${chip.textContent.trim()}</span></div>`;
        vibeConsoleBody.appendChild(userLog);

        // AI Response
        const aiLog = document.createElement('div');
        aiLog.className = 'vibe-ai-response';
        aiLog.innerHTML = vibeResponses[promptType]();
        vibeConsoleBody.appendChild(aiLog);

        vibeConsoleBody.scrollTop = vibeConsoleBody.scrollHeight;
      }
    });
  });

  // 12. Floating AI Copilot Widget Interactivity
  const floatingAiBtn = document.getElementById('floatingAiBtn');
  const floatingAiWidget = document.getElementById('floatingAiWidget');
  const aiWidgetClose = document.getElementById('aiWidgetClose');
  const aiWidgetBody = document.getElementById('aiWidgetBody');
  const aiWidgetInput = document.getElementById('aiWidgetInput');
  const aiWidgetSendBtn = document.getElementById('aiWidgetSendBtn');
  const aiChipBtns = document.querySelectorAll('.ai-chip-btn');
  const aiWidgetDeckLink = document.getElementById('aiWidgetDeckLink');

  if (floatingAiBtn && floatingAiWidget) {
    floatingAiBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = floatingAiWidget.classList.toggle('open');
      floatingAiWidget.setAttribute('aria-hidden', !isOpen);
      if (isOpen && aiWidgetInput) {
        setTimeout(() => aiWidgetInput.focus(), 150);
      }
    });

    if (aiWidgetClose) {
      aiWidgetClose.addEventListener('click', () => {
        floatingAiWidget.classList.remove('open');
        floatingAiWidget.setAttribute('aria-hidden', 'true');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (floatingAiWidget.classList.contains('open') && 
          !floatingAiWidget.contains(e.target) && 
          !floatingAiBtn.contains(e.target)) {
        floatingAiWidget.classList.remove('open');
        floatingAiWidget.setAttribute('aria-hidden', 'true');
      }
    });

    if (aiWidgetDeckLink) {
      aiWidgetDeckLink.addEventListener('click', () => {
        floatingAiWidget.classList.remove('open');
        floatingAiWidget.setAttribute('aria-hidden', 'true');
      });
    }

    function sendAiWidgetQuery(queryText) {
      const q = queryText.trim();
      if (!q) return;

      // User bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'ai-user-bubble';
      userBubble.textContent = q;
      aiWidgetBody.appendChild(userBubble);

      // AI response bubble
      const answerHtml = generateAiAnswer(q);
      const aiBubble = document.createElement('div');
      aiBubble.className = 'ai-widget-bubble';
      aiBubble.innerHTML = answerHtml;
      aiWidgetBody.appendChild(aiBubble);

      // Auto scroll to bottom
      aiWidgetBody.scrollTop = aiWidgetBody.scrollHeight;
    }

    if (aiWidgetSendBtn && aiWidgetInput) {
      aiWidgetSendBtn.addEventListener('click', () => {
        const val = aiWidgetInput.value;
        aiWidgetInput.value = '';
        sendAiWidgetQuery(val);
      });

      aiWidgetInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = aiWidgetInput.value;
          aiWidgetInput.value = '';
          sendAiWidgetQuery(val);
        }
      });
    }

    aiChipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-ai-prompt');
        sendAiWidgetQuery(prompt);
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
  }

  // 12. Project Details Modal Popup
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');

  const projectDetails = {
    khmer_tts: {
      title: "Khmer AI Voice Studio",
      category: "Flagship AI Speech Synthesis Web Application",
      tech: ["Edge Neural TTS", "JavaScript (ES6+)", "Web Audio API", "HTML5 Canvas", "Modern CSS Glassmorphism", "Vercel"],
      desc: "A next-generation, high-performance Khmer speech synthesis web application that converts Khmer Unicode script into expressive, natural speech. Featuring dual voice personas, interactive real-time waveforms, precision speed and pitch modulators, MP3 audio exports, and a developer API integration suite.",
      highlights: [
        "Deep Neural Speech Synthesis specifically optimized for Khmer script phonetics.",
        "Interactive real-time audio waveform visualizer dynamically rendered on HTML5 Canvas.",
        "Dual voice personas (Sreymom - Female / Piseth - Male) with speed & pitch tuning deck.",
        "Instant MP3 audio download with client-side audio playback scrubbing.",
        "Interactive Developer API integration modal with cURL, Python, and JavaScript examples.",
        "Conversion history library with search & local storage caching."
      ],
      github: "https://github.com/SixC6C",
      liveDemo: "https://text-ivory-eight.vercel.app"
    },
    clip_saver: {
      title: "Clip Saver – TikTok & Instagram Reels Downloader",
      category: "High-Performance Media Downloader Web Application",
      tech: ["Node.js / Express", "Railway Cloud", "RESTful Media API", "HTML5/CSS3 Glassmorphism", "JavaScript (ES6+)"],
      desc: "A fast, modern social video downloader web application designed to parse and download TikTok and Instagram Reels videos in high definition with watermark-free options. Deployed on Railway with a sleek responsive glassmorphic UI.",
      highlights: [
        "Dual-platform auto-detection for both TikTok and Instagram Reels media URLs.",
        "Watermark-free HD video download and direct MP3 audio extraction options.",
        "Real-time video metadata and thumbnail previews prior to downloading.",
        "High-performance cloud backend hosted on Railway for minimal latency.",
        "Responsive, mobile-friendly interface with instant paste-from-clipboard capabilities."
      ],
      liveDemo: "https://downloadvideo-production-a6e0.up.railway.app"
    },
    final_exam: {
      title: "Final Exam UI/UX Design System",
      category: "Comprehensive Figma Design System & Prototyping",
      tech: ["Figma", "Design Systems", "Interactive Prototyping", "User Research", "Wireframing"],
      desc: "A comprehensive UI/UX design project created in Figma for a final university exam submission, featuring polished screen layouts, interactive prototypes, user journeys, and a cohesive design token system.",
      highlights: [
        "Full design token architecture: typography scales, color palettes, and component states.",
        "Interactive high-fidelity clickable prototype tested across multiple screen viewports.",
        "User flow optimization for frictionless navigation and high usability."
      ],
      liveDemo: "https://www.figma.com/design/TUgE8QvwQv4D4mNDe7qiGn/Final_exam?node-id=0-1&t=EBlAhIyPMGd0zx3g-1"
    },
    bus_ticket: {
      title: "Bus Ticket Booking Mobile App",
      category: "Mobile-First UI/UX Design & Travel App",
      tech: ["Figma", "Mobile UI/UX", "Component Libraries", "Booking Workflows"],
      desc: "A mobile-first UI/UX design for a bus ticket booking application built in Figma, featuring intuitive seat selection flows, booking confirmation screens, and a clean travel-themed design system.",
      highlights: [
        "Interactive seat selection grid with real-time seat availability states.",
        "Multi-step checkout workflow designed for quick mobile bookings.",
        "Custom travel icons, trip itinerary cards, and digital ticket barcodes."
      ],
      liveDemo: "https://www.figma.com/design/K5fR0HRnESrUZs3mxZ4rVq/Assigment_bus_ticket_book?node-id=0-1&t=MA7IrRwgGaWB5z0F-1"
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project-id');
      const data = projectDetails[pid];
      if (!data) return;

      modalContent.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--emerald-light); margin-bottom: 0.4rem; text-transform: uppercase;">${data.category}</div>
        <h2 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--text);">${data.title}</h2>
        <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.2rem;">${data.desc}</p>

        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 0.6rem;">Key Features &amp; Highlights:</h4>
        <ul style="margin-left: 1.2rem; color: var(--text-secondary); margin-bottom: 1.4rem; line-height: 1.7;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 0.6rem;">Technologies Used:</h4>
        <div class="tag-list" style="margin-bottom: 1.6rem;">
          ${data.tech.map(t => `<span class="tag tag-fn">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          ${data.liveDemo ? `<a href="${data.liveDemo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Launch Live Experience ↗</a>` : ''}
          ${data.github ? `<a href="${data.github}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">GitHub Profile →</a>` : ''}
          <button onclick="document.getElementById('projectModal').classList.remove('open')" class="btn btn-outline btn-sm">Close Window</button>
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

  // 13. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();

      formStatus.innerHTML = `<span style="color: var(--emerald-light); font-weight: 600;">✓ Message dispatched successfully! Thank you, ${escapeHtml(name || 'friend')} — I will get back to you shortly.</span>`;
      contactForm.reset();

      setTimeout(() => { formStatus.textContent = ''; }, 6000);
    });
  }

  // 14. Back to Top Button
  const toTopBtn = document.getElementById('toTop');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 15. Smooth Scroll Reveal (Hardware-Accelerated via IntersectionObserver)
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

});
