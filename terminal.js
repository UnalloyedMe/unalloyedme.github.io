document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".terminal .cmd-text");
  if (!el) return;
  const command = el.getAttribute("data-cmd") || "";
  el.textContent = "";
  let i = 0;
  function type() {
    if (i <= command.length) {
      el.textContent = command.slice(0, i);
      i++;
      setTimeout(type, 45);
    }
  }
  type();
});
