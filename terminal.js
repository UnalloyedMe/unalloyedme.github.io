document.addEventListener("DOMContentLoaded", () => {
  const cmdEl = document.querySelector(".terminal-line .cmd-text");
  const cursorEl = document.querySelector(".terminal-line .cursor");
  const outputEl = document.querySelector(".terminal-output");
  if (!cmdEl) return;

  const command = cmdEl.getAttribute("data-cmd") || "";
  cmdEl.textContent = "";
  let i = 0;

  function type() {
    if (i <= command.length) {
      cmdEl.textContent = command.slice(0, i);
      i++;
      setTimeout(type, 45);
    } else {
      if (cursorEl) cursorEl.classList.add("hidden");
      if (outputEl) {
        setTimeout(() => outputEl.classList.add("show"), 150);
      }
    }
  }
  type();
});
