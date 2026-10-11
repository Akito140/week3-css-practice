const sections = [...document.querySelectorAll("[data-scene]")];
const layers = [...document.querySelectorAll(".scene-layer")];

if (sections.length && layers.length) {
  document.body.classList.add("scene-aware");

  let scheduled = false;

  const updateScene = () => {
    const midpoint = window.innerHeight / 2;
    const currentSection = sections.reduce((closest, section) => {
      const bounds = section.getBoundingClientRect();
      const distance = midpoint < bounds.top
        ? bounds.top - midpoint
        : midpoint > bounds.bottom
          ? midpoint - bounds.bottom
          : 0;
      return distance < closest.distance ? { section, distance } : closest;
    }, { section: sections[0], distance: Infinity }).section;

    layers.forEach((layer) => {
      layer.classList.toggle("is-visible", layer.classList.contains(`scene-layer--${currentSection.dataset.scene}`));
    });
    scheduled = false;
  };

  const scheduleUpdate = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateScene);
    }
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  updateScene();
}
