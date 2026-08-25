(() => {
  const DAYS = [
    {
      kicker: "Day 01 · Arrival",
      title: "Milan to Bergamo Città Alta",
      body: "Settle into the Upper City. Venetian walls, evening light, and dinner above the plain at Il Pianone — the quiet overture before the valleys.",
      stay: "Stay · Fuori Porta House",
      img: "assets/images/module-bergamo.jpg",
      alt: "Historic hillside city atmosphere",
    },
    {
      kicker: "Day 02 · Stone & water",
      title: "Bergamo to Foroglio",
      body: "Cross into Val Bavona. Stone houses under forested cliffs, the 110-metre fall, Camera Alpina, and supper at Ristorante La Froda.",
      stay: "Stay · Camera Alpina",
      img: "assets/images/module-waterfall.jpg",
      alt: "Alpine waterfall and stone village setting",
    },
    {
      kicker: "Day 03 · Conditional branch",
      title: "Val Calnègia or Cròsa",
      body: "Lower-loop hiking among granite pools — or, only after every gate passes, the high basin and proposed tent bivouac at Laghi della Cròsa.",
      stay: "Branch · GO / CAUTION / NO-GO gates",
      img: "assets/images/module-alpine.jpg",
      alt: "High alpine lake and ridge terrain",
    },
    {
      kicker: "Day 04 · Recovery",
      title: "Descent to Ascona",
      body: "Lake Maggiore, spa stillness, and a waterfront evening. The soft counterweight after stone valleys and conditional altitude.",
      stay: "Stay · Hotel La Meridiana",
      img: "assets/images/module-lake.jpg",
      alt: "Lake Maggiore dusk atmosphere",
    },
    {
      kicker: "Day 05 · Emerald circuit",
      title: "Val Verzasca day trip",
      body: "Dam, Lavertezzo’s Ponte dei Salti, Sonogno stone lanes, and clear green water — a road-trip loop from Ascona with an optional hiking variant.",
      stay: "Base · Ascona",
      img: "assets/images/module-verzasca.jpg",
      alt: "Emerald river and granite gorge",
    },
    {
      kicker: "Day 06 · Close",
      title: "Ascona to Milan",
      body: "A composed return. The planner closes the arc without rushing the last lake morning — then the city again.",
      stay: "Return · Milan",
      img: "assets/images/atmosphere-mist.jpg",
      alt: "Mist over alpine forest ridges",
    },
  ];

  const MODULES = {
    bergamo: {
      tag: "Città Alta · Urban prelude",
      title: "Bergamo Città Alta",
      body: "A one-day Upper City immersion — walls, funicular light, and a hillside dinner — that works alone or as the Friday opening of the full itinerary.",
      facts: [
        "Primary stay: Fuori Porta House",
        "Dinner: Il Pianone",
        "Standalone or complete-trip Friday",
      ],
      img: "assets/images/module-bergamo.jpg",
    },
    foroglio: {
      tag: "Val Bavona · Signature village",
      title: "Foroglio & Val Bavona",
      body: "The emotional centre of the journey: a handful of stone houses, a thunderous fall, and the gateway into Val Calnègia.",
      facts: [
        "Primary stay: Camera Alpina",
        "Restaurant: La Froda",
        "Saturday spine of the complete trip",
      ],
      img: "assets/images/module-waterfall.jpg",
    },
    calnegia: {
      tag: "Lower valley · Reliable hike",
      title: "Lower Val Calnègia",
      body: "Splüi shelters, rushing bridges, and granite pools. The confident choice when Cròsa gates do not clear.",
      facts: [
        "One-day hiking schedule",
        "Weather Fallback A",
        "Who should choose this instead of Cròsa",
      ],
      img: "assets/images/hero-foroglio.jpg",
    },
    crosa: {
      tag: "High basin · Conditional only",
      title: "Laghi della Cròsa bivouac",
      body: "A proposed tent night above Val Calnègia. Use only after weather, access, and written approval all pass — otherwise take a designed fallback.",
      facts: [
        "GO / CAUTION / NO-GO framework",
        "Not a casual add-on",
        "Live checks required before departure",
      ],
      img: "assets/images/module-alpine.jpg",
    },
    ascona: {
      tag: "Lake Maggiore · Soft landing",
      title: "Ascona & Lake Maggiore",
      body: "Spa recovery, lakeside dining, and night music options — the deliberate exhale after alpine intensity.",
      facts: [
        "Primary: Hotel La Meridiana",
        "Alt: Vista Lakefront",
        "Dinner: Osteria Nostrana",
      ],
      img: "assets/images/module-lake.jpg",
    },
    verzasca: {
      tag: "Emerald gorge · Day circuit",
      title: "Val Verzasca",
      body: "What photographs omit: logistics, timing, and how to keep the emerald water feeling discovered rather than crowded.",
      facts: [
        "Dam → Lavertezzo → Sonogno",
        "Optional hiking version",
        "Road-trip from Ascona",
      ],
      img: "assets/images/module-verzasca.jpg",
    },
  };

  const nav = document.querySelector("[data-nav]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const drawer = document.querySelector("[data-drawer]");
  const toast = document.querySelector("[data-toast]");
  const parallax = document.querySelector("[data-parallax]");
  const mobileBar = document.querySelector("[data-mobile-bar]");

  /* Nav solid + mobile drawer */
  const onScroll = () => {
    if (!nav) return;
    const y = window.scrollY;
    nav.classList.toggle("is-solid", y > 24);
    if (mobileBar) {
      const heroH = Math.max(320, window.innerHeight * 0.72);
      mobileBar.classList.toggle("is-visible", y > heroH);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && drawer) {
    menuToggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      drawer.hidden = !open;
    });

    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        drawer.hidden = true;
      });
    });
  }

  /* Subtle hero parallax */
  if (parallax && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY, 600);
        parallax.style.transform = `scale(1.06) translate3d(0, ${y * 0.18}px, 0)`;
      },
      { passive: true }
    );
  }

  /* Timeline */
  const dayButtons = [...document.querySelectorAll("[data-day]")];
  const dayImg = document.querySelector("[data-day-img]");
  const dayKicker = document.querySelector("[data-day-kicker]");
  const dayTitle = document.querySelector("[data-day-title]");
  const dayBody = document.querySelector("[data-day-body]");
  const dayStay = document.querySelector("[data-day-stay]");

  const setDay = (index) => {
    const day = DAYS[index];
    if (!day) return;
    dayButtons.forEach((btn, i) => {
      const on = i === index;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", String(on));
    });
    dayKicker.textContent = day.kicker;
    dayTitle.textContent = day.title;
    dayBody.textContent = day.body;
    dayStay.textContent = day.stay;
    if (dayImg) {
      dayImg.classList.add("is-swap");
      window.setTimeout(() => {
        dayImg.src = day.img;
        dayImg.alt = day.alt;
        dayImg.classList.remove("is-swap");
      }, 180);
    }
  };

  dayButtons.forEach((btn) => {
    btn.addEventListener("click", () => setDay(Number(btn.dataset.day)));
  });

  /* Modules */
  const modButtons = [...document.querySelectorAll("[data-mod]")];
  const modImg = document.querySelector("[data-mod-img]");
  const modTag = document.querySelector("[data-mod-tag]");
  const modTitle = document.querySelector("[data-mod-title]");
  const modBody = document.querySelector("[data-mod-body]");
  const modFacts = document.querySelector("[data-mod-facts]");

  const setMod = (key) => {
    const mod = MODULES[key];
    if (!mod) return;
    modButtons.forEach((btn) => {
      const on = btn.dataset.mod === key;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", String(on));
    });
    modTag.textContent = mod.tag;
    modTitle.textContent = mod.title;
    modBody.textContent = mod.body;
    modFacts.innerHTML = mod.facts.map((f) => `<li>${f}</li>`).join("");
    if (modImg) {
      modImg.classList.add("is-swap");
      window.setTimeout(() => {
        modImg.src = mod.img;
        modImg.classList.remove("is-swap");
      }, 180);
    }
  };

  modButtons.forEach((btn) => {
    btn.addEventListener("click", () => setMod(btn.dataset.mod));
  });

  /* Count-up stats */
  const counters = [...document.querySelectorAll("[data-count]")];
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* Reveal on scroll */
  document.querySelectorAll(".section__head, .timeline, .module-board, .stats, .checks, .hashes, .dl-grid, .caution__inner").forEach((el) => {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealIo.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  /* Copy hashes */
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 1600);
  };

  document.querySelectorAll("[data-hash-row]").forEach((row) => {
    const btn = row.querySelector("[data-copy]");
    const value = row.querySelector(".hash__value");
    if (!btn || !value) return;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(value.textContent.trim());
        btn.textContent = "Copied";
        btn.classList.add("is-done");
        showToast("Hash copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-done");
        }, 1400);
      } catch {
        showToast("Copy failed");
      }
    });
  });

  /* Keyboard left/right on timeline when focused */
  const track = document.querySelector("[data-timeline]");
  if (track) {
    track.addEventListener("keydown", (e) => {
      const active = dayButtons.findIndex((b) => b.classList.contains("is-active"));
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setDay(Math.min(DAYS.length - 1, active + 1));
        dayButtons[Math.min(DAYS.length - 1, active + 1)]?.focus();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDay(Math.max(0, active - 1));
        dayButtons[Math.max(0, active - 1)]?.focus();
      }
    });
  }
})();
