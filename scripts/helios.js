(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealBlocks = Array.from(document.querySelectorAll(".reveal-block"));

  revealBlocks.forEach((block, index) => {
    block.classList.add("reveal");
    block.style.setProperty("--delay", `${Math.min(index * 70, 240)}ms`);
  });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    revealBlocks.forEach((block) => revealObserver.observe(block));
  }

  const engineCards = Array.from(document.querySelectorAll(".engine-card"));

  const setActiveEngine = (card) => {
    engineCards.forEach((item) => item.classList.toggle("is-active", item === card));
  };

  engineCards.forEach((card) => {
    card.addEventListener("pointerenter", () => setActiveEngine(card));
    card.addEventListener("focusin", () => setActiveEngine(card));
  });

  if (engineCards.length) {
    setActiveEngine(engineCards[0]);
  }

  const form = document.querySelector("[data-helios-form]");

  if (form) {
    const status = form.querySelector(".form-status");
    const button = form.querySelector(".form-button");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "已提交";
      }

      if (status) {
        status.textContent = "已收到，我们会根据店铺链接给出初步判断。";
        status.classList.add("is-success");
      }
    });
  }
})();
