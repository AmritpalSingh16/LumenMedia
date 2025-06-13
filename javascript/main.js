document.addEventListener("DOMContentLoaded", () => {
  /** ------------------------
   * Animate Hero Text On Load
   * ------------------------ */
  const heading = document.querySelector('.animated-heading');
  const subheading = document.querySelector('.animated-subheading');

  heading?.classList.add('animate');
  subheading?.classList.add('animate');

  /** ------------------------
   * Smooth Scrolling for Nav
   * ------------------------ */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.hash;
      if (targetId) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /** ------------------------
   * Theme Toggle with localStorage
   * ------------------------ */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.checked = true;
  }

  function toggleTheme() {
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (themeToggle) themeToggle.checked = isDark;
  }

  themeToggle?.addEventListener('change', toggleTheme);

  /** ------------------------
   * Portfolio Filters
   * ------------------------ */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      portfolioItems.forEach(item => {
        const itemCategory = item.dataset.category;
        item.style.display = (category === "all" || category === itemCategory) ? "block" : "none";
      });
    });
  });

  /** ------------------------
   * Video Modal Logic
   * ------------------------ */
  const thumbnails = document.querySelectorAll('.portfolio-item .overlay');
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalCaption = document.getElementById('videoCaption');
  const closeModal = document.getElementById('closeModal');

  function closeVideoModal() {
    modal?.classList.remove('active');
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
      modalVideo.src = '';
    }
  }

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const videoSrc = thumb.dataset.video;
      const caption = thumb.dataset.caption;

      if (modal && modalVideo) {
        modal.classList.add('active');
        modalVideo.src = videoSrc;
        if (modalCaption) modalCaption.textContent = caption;
      }
    });
  });

  closeModal?.addEventListener('click', closeVideoModal);
  window.addEventListener('click', e => {
    if (e.target === modal) closeVideoModal();
  });

  /** ------------------------
   * Hamburger Menu Toggle
   * ------------------------ */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const hamburgerIcon = document.getElementById("hamburger-icon");

  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("active");

    if (hamburgerIcon?.classList.contains("fa-bars")) {
      hamburgerIcon.classList.replace("fa-bars", "fa-times");
    } else {
      hamburgerIcon?.classList.replace("fa-times", "fa-bars");
    }
  });
});

/** ------------------------
 * Animated Counters on Window Load
 * ------------------------ */
window.addEventListener('load', () => {
  const animateCounter = (id, endValue) => {
    const el = document.getElementById(id);
    if (!el) return;

    let count = 0;
    const step = Math.ceil(endValue / 100);
    const interval = setInterval(() => {
      count += step;
      if (count >= endValue) {
        el.textContent = endValue;
        clearInterval(interval);
      } else {
        el.textContent = count;
      }
    }, 20);
  };

  animateCounter('uniqueVisitors', 523594);
  animateCounter('watchTime', 94867215);
});
