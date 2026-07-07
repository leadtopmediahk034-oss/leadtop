const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.documentElement.classList.add("motion-ready");
  const revealItems = document.querySelectorAll(
    ".section-heading, .diagnostic-card, .pain-list article, .system-card, .system-workbench, .service-brief, .service-row, .timeline article, .proof-ledger article, .fit-panel, .diagnosis-copy, .diagnosis-form"
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
    observer.observe(item);
  });
}

const canUseGsap = !prefersReducedMotion && window.gsap && window.ScrollTrigger;

if (canUseGsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-header", {
    y: -24,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".hero-copy > *", {
    y: 36,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power3.out",
  });

  gsap.from(".hero-panel", {
    y: 42,
    scale: 0.94,
    opacity: 0,
    duration: 1,
    delay: 0.15,
    ease: "power3.out",
  });

  gsap.to(".inline-type-image", {
    backgroundPosition: "70% 50%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.utils.toArray(".bento-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 50, scale: 0.94 },
      {
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          end: "top 38%",
          scrub: true,
        },
      }
    );

    card.style.setProperty("--bento-delay", `${index * 60}ms`);
  });

  if (window.matchMedia("(min-width: 901px)").matches) {
    gsap.utils.toArray(".service-row").forEach((row) => {
      gsap.fromTo(
        row,
        { y: 44, scale: 0.97, opacity: 0.72 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            end: "top 48%",
            scrub: true,
          },
        }
      );
    });

    const timelineCards = gsap.utils.toArray(".timeline article");
    if (timelineCards[0]) timelineCards[0].classList.add("is-current");

    timelineCards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 68%",
        end: "bottom 32%",
        onEnter: () => {
          timelineCards.forEach((item, itemIndex) => {
            item.classList.remove("is-current");
            item.classList.toggle("is-passed", itemIndex < index);
          });
          card.classList.add("is-current");
        },
        onEnterBack: () => {
          timelineCards.forEach((item, itemIndex) => {
            item.classList.remove("is-current");
            item.classList.toggle("is-passed", itemIndex < index);
          });
          card.classList.add("is-current");
        },
        onLeaveBack: () => {
          if (index === 0) {
            timelineCards.forEach((item) => item.classList.remove("is-current", "is-passed"));
            card.classList.add("is-current");
          }
        },
      });
    });
  }
}

const stageCards = document.querySelectorAll("[data-stage-card]");
const mapStages = document.querySelectorAll("[data-stage]");
const loopSteps = document.querySelectorAll(".loop-step[data-stage]");
const stageCopy = {
  traffic: "从搜索词、广告账户和 SEO/GEO 内容开始，找到真正有采购意图的海外客户。",
  conversion: "把流量导向能解释价值、建立信任并促成询盘的页面和表单路径。",
  trust: "用案例、资质、工厂实力和社媒内容降低陌生客户的采购顾虑。",
};

const panelTopline = document.querySelector(".panel-topline span");
const setStage = (stage) => {
  mapStages.forEach((node) => node.classList.toggle("is-active", node.dataset.stage === stage));
  loopSteps.forEach((node) => node.classList.toggle("is-active", node.dataset.stage === stage));
  stageCards.forEach((card) => card.classList.toggle("is-linked", card.dataset.stageCard === stage));
  if (panelTopline && stageCopy[stage]) panelTopline.textContent = stageCopy[stage];
};

stageCards.forEach((card) => {
  card.addEventListener("mouseenter", () => setStage(card.dataset.stageCard));
  card.addEventListener("focusin", () => setStage(card.dataset.stageCard));
});

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const form = document.querySelector("[data-diagnosis-form]");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  if (!button) return;
  button.disabled = true;
  button.textContent = "已收到，顾问将联系你";
  form.classList.add("is-submitted");
});
