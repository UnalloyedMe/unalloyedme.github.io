(function () {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  const cmdEl = document.getElementById("cmd-text");
  const titleEl = document.getElementById("terminal-title");
  const targetEl = document.getElementById("md-target");

  if (!file) {
    cmdEl.setAttribute("data-cmd", "cat writeup.md");
    targetEl.innerHTML = '<p class="md-error">Aucun fichier spécifié. Retourne à la liste des writeups.</p>';
    return;
  }

  const niceName = file.split("/").pop();
  cmdEl.setAttribute("data-cmd", "cat " + niceName);
  if (titleEl) titleEl.textContent = "unalloyedme@portfolio: " + niceName;

  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error("Fichier introuvable (" + res.status + ")");
      return res.text();
    })
    .then((md) => {
      if (window.marked) {
        targetEl.innerHTML = marked.parse(md);
      } else {
        const pre = document.createElement("pre");
        pre.textContent = md;
        targetEl.innerHTML = "";
        targetEl.appendChild(pre);
      }
    })
    .catch((err) => {
      targetEl.innerHTML =
        '<p class="md-error">Erreur lors du chargement du writeup : ' + err.message + '</p>';
    });
})();
