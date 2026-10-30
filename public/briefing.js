(() => {
  const overlay = document.getElementById("briefingOverlay");
  const app = document.getElementById("app");
  const confirm = document.getElementById("briefingConfirm");
  if (!overlay || !app || !confirm) return;

  app.inert = true;
  document.body.classList.add("briefing-open");

  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    confirm.focus();
  };

  document.addEventListener("keydown", keepFocusInside);
  requestAnimationFrame(() => confirm.focus());

  confirm.addEventListener("click", () => {
    overlay.remove();
    document.body.classList.remove("briefing-open");
    app.inert = false;
    document.removeEventListener("keydown", keepFocusInside);
    app.tabIndex = -1;
    app.focus({ preventScroll: true });
  });
})();
