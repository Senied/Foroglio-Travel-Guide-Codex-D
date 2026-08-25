(() => {
  const DAYS = [
    {
      label: "Day 01 · Arrival",
      title: "Milan to Bergamo Città Alta",
      description: "Settle into the Upper City for Venetian walls, evening light and dinner above the plain at Il Pianone.",
      stay: "Stay · Fuori Porta House",
      image: "assets/images/module-bergamo.jpg",
      alt: "Historic Bergamo on a hillside at dusk",
      href: "guide/#module-bergamo",
    },
    {
      label: "Day 02 · Stone and water",
      title: "Bergamo to Foroglio",
      description: "Cross into Val Bavona for the stone village, the waterfall, Camera Alpina and supper at Ristorante La Froda.",
      stay: "Stay · Camera Alpina",
      image: "assets/images/module-waterfall.jpg",
      alt: "Foroglio stone houses below the village waterfall",
      href: "guide/#module-foroglio",
    },
    {
      label: "Day 03 · Valley walking",
      title: "Val Calnègia, with Cròsa only if confirmed",
      description: "Follow the lower valley among granite pools and stone shelters. Consider the high basin only with suitable conditions and written approval.",
      stay: "Plan · Lower valley by default",
      image: "assets/images/module-calnegia.jpg",
      alt: "Stone bridge and rushing water in Val Calnègia",
      href: "guide/#module-calnegia",
    },
    {
      label: "Day 04 · Lake pause",
      title: "Descent to Ascona",
      description: "Move down to Lake Maggiore for a slower afternoon, spa time and an evening along the waterfront.",
      stay: "Stay · Hotel La Meridiana",
      image: "assets/images/module-lake.jpg",
      alt: "Lake Maggiore at dusk",
      href: "guide/#module-ascona",
    },
    {
      label: "Day 05 · Valley circuit",
      title: "Val Verzasca day trip",
      description: "Travel from the dam to Lavertezzo and Sonogno, with time for stone lanes, bridges and the valley’s clear green water.",
      stay: "Base · Ascona",
      image: "assets/images/module-verzasca.jpg",
      alt: "Clear green water in a granite gorge",
      href: "guide/#module-verzasca",
    },
    {
      label: "Day 06 · Return",
      title: "Ascona to Milan",
      description: "Keep the final lake morning unhurried before returning to Milan and closing the route.",
      stay: "Return · Milan",
      image: "assets/images/atmosphere-mist.jpg",
      alt: "Mist over alpine forest ridges",
      href: "guide/#complete-itinerary",
    },
  ];

  const PLANS = {
    bergamo: {
      label: "Città Alta · Urban opening",
      title: "Bergamo Città Alta",
      description: "A measured first day among the Venetian walls, funicular lanes and evening views over the plain.",
      facts: ["Stay at Fuori Porta House", "Dinner at Il Pianone", "Works as the opening or a day on its own"],
      image: "assets/images/module-bergamo.jpg",
      alt: "Historic Bergamo on a hillside at dusk",
      href: "guide/#module-bergamo",
    },
    foroglio: {
      label: "Val Bavona · Stone village",
      title: "Foroglio and Val Bavona",
      description: "The central valley day: stone houses, the waterfall and a gentle introduction to Val Calnègia.",
      facts: ["Stay at Camera Alpina", "Dinner at Ristorante La Froda", "Allow time to walk beyond the waterfall"],
      image: "assets/images/module-waterfall.jpg",
      alt: "Foroglio stone houses below the village waterfall",
      href: "guide/#module-foroglio",
    },
    calnegia: {
      label: "Lower valley · Day walk",
      title: "Lower Val Calnègia",
      description: "Stone shelters, footbridges and granite pools on the reliable lower route through the valley.",
      facts: ["Designed as a one-day walk", "Preferred when high conditions are uncertain", "Timing and turn-around points included"],
      image: "assets/images/module-calnegia.jpg",
      alt: "Stone bridge and rushing water in Val Calnègia",
      href: "guide/#module-calnegia",
    },
    crosa: {
      label: "High basin · Conditional",
      title: "Laghi della Cròsa",
      description: "A proposed high-basin bivouac that should only be considered after weather, access and written approval are confirmed.",
      facts: ["Not a casual addition", "Use the lower-valley plan when uncertain", "Reconfirm every condition before departure"],
      image: "assets/images/module-crosa.jpg",
      alt: "Laghi della Cròsa high above Val Calnègia",
      href: "guide/#module-crosa",
    },
    ascona: {
      label: "Lake Maggiore · Rest day",
      title: "Ascona and Lake Maggiore",
      description: "A deliberate slower day with spa time, lakeside dining and a quiet evening after the valleys.",
      facts: ["Stay at Hotel La Meridiana", "Alternative lakefront accommodation", "Dinner options within walking distance"],
      image: "assets/images/module-lake.jpg",
      alt: "Lake Maggiore and distant mountains at dusk",
      href: "guide/#module-ascona",
    },
    verzasca: {
      label: "Emerald water · Day circuit",
      title: "Val Verzasca",
      description: "A day route linking the dam, Lavertezzo, Ponte dei Salti and the stone village of Sonogno.",
      facts: ["Start early for quieter stops", "Optional walking variation", "Return to Ascona in the evening"],
      image: "assets/images/module-verzasca.jpg",
      alt: "Clear green river among pale granite rocks",
      href: "guide/#module-verzasca",
    },
  };

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileActions = document.querySelector("[data-mobile-actions]");
  const parallaxImage = document.querySelector("[data-parallax]");

  const closeMenu = (returnFocus = false) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
    if (returnFocus) menuButton.focus();
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    mobileMenu.hidden = false;
    document.body.classList.add("menu-open");
    requestAnimationFrame(() => mobileMenu.querySelector("a")?.focus());
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu(true);
    else openMenu();
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      closeMenu(true);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (menuButton?.getAttribute("aria-expanded") !== "true") return;
    if (header?.contains(event.target) || mobileMenu?.contains(event.target)) return;
    closeMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) closeMenu(false);
  });

  const handleScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 30);
    mobileActions?.classList.toggle("is-visible", y > Math.max(520, window.innerHeight * 0.7));
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parallaxImage && !reduceMotion) {
    window.addEventListener("scroll", () => {
      const offset = Math.min(window.scrollY, 500) * 0.08;
      parallaxImage.style.transform = `scale(1.035) translate3d(0, ${offset}px, 0)`;
    }, { passive: true });
  }

  const dayTabs = [...document.querySelectorAll("[data-day]")];
  const dayPanel = document.querySelector("[data-day-panel]");
  const dayImage = document.querySelector("[data-day-image]");
  const dayLabel = document.querySelector("[data-day-label]");
  const dayTitle = document.querySelector("[data-day-title]");
  const dayDescription = document.querySelector("[data-day-description]");
  const dayStay = document.querySelector("[data-day-stay]");
  const dayLink = document.querySelector("[data-day-link]");

  const selectDay = (index, moveFocus = false) => {
    const day = DAYS[index];
    if (!day || !dayPanel) return;
    dayTabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    dayPanel.setAttribute("aria-labelledby", dayTabs[index].id);
    dayLabel.textContent = day.label;
    dayTitle.textContent = day.title;
    dayDescription.textContent = day.description;
    dayStay.textContent = day.stay;
    if (dayLink) dayLink.href = day.href;
    if (dayImage) {
      dayImage.classList.add("is-changing");
      window.setTimeout(() => {
        dayImage.src = day.image;
        dayImage.alt = day.alt;
        dayImage.classList.remove("is-changing");
      }, reduceMotion ? 0 : 150);
    }
    if (moveFocus) dayTabs[index].focus();
  };

  const handleTabKeys = (event, tabs, select) => {
    const current = tabs.indexOf(event.currentTarget);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  };

  dayTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectDay(index));
    tab.addEventListener("keydown", (event) => handleTabKeys(event, dayTabs, selectDay));
  });

  const planTabs = [...document.querySelectorAll("[data-plan]")];
  const planPanel = document.querySelector("[data-plan-panel]");
  const planImage = document.querySelector("[data-plan-image]");
  const planLabel = document.querySelector("[data-plan-label]");
  const planTitle = document.querySelector("[data-plan-title]");
  const planDescription = document.querySelector("[data-plan-description]");
  const planFacts = document.querySelector("[data-plan-facts]");
  const planLink = document.querySelector("[data-plan-link]");

  const selectPlan = (index, moveFocus = false) => {
    const tab = planTabs[index];
    const plan = PLANS[tab?.dataset.plan];
    if (!tab || !plan || !planPanel) return;
    planTabs.forEach((item, tabIndex) => {
      const selected = tabIndex === index;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    planPanel.setAttribute("aria-labelledby", tab.id);
    planLabel.textContent = plan.label;
    planTitle.textContent = plan.title;
    planDescription.textContent = plan.description;
    planFacts.replaceChildren(...plan.facts.map((fact) => {
      const item = document.createElement("li");
      item.textContent = fact;
      return item;
    }));
    planLink.href = plan.href;
    if (planImage) {
      planImage.classList.add("is-changing");
      window.setTimeout(() => {
        planImage.src = plan.image;
        planImage.alt = plan.alt;
        planImage.classList.remove("is-changing");
      }, reduceMotion ? 0 : 150);
    }
    if (moveFocus) tab.focus();
  };

  planTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectPlan(index));
    tab.addEventListener("keydown", (event) => handleTabKeys(event, planTabs, selectPlan));
  });

  const revealItems = document.querySelectorAll(".section-heading, .route-summary, .timeline, .plan-browser, .check-card, .guide-intro, .format-card, .earlier-edition");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-revealed"));
  } else {
    revealItems.forEach((item) => item.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    revealItems.forEach((item) => observer.observe(item));
  }
})();
