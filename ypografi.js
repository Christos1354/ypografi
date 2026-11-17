/* Ypografi - Christos S Magides - 2026 - έκδοση 16-11-2026 («✏️ Γράψε μου» αντί για διεύθυνση) */
(function () {
  if (window.__ypografiCSM) return;
  window.__ypografiCSM = true;

  var onoma = "Christos S Magides";
  var etos = "2026";

  /* [κουμπί, θέμα μηνύματος, αρχή μηνύματος] */
  var L = {
    el: ["Γράψε μου", "Μήνυμα από", "Γεια σας κύριε Χρίστο,"],
    en: ["Write to me", "Message from", "Hello Mr Christos,"],
    de: ["Schreiben Sie mir", "Nachricht von", "Guten Tag Herr Christos,"],
    fr: ["Écrivez-moi", "Message de", "Bonjour M. Christos,"],
    es: ["Escríbame", "Mensaje desde", "Hola Sr. Christos,"],
    it: ["Scrivimi", "Messaggio da", "Buongiorno Sig. Christos,"],
    ru: ["Напишите мне", "Сообщение из", "Здравствуйте, господин Христос!"],
    ar: ["راسلني", "رسالة من", "مرحباً سيد خريستوس،"],
    tr: ["Bana yazın", "Mesaj", "Merhaba Bay Christos,"]
  };

  function glossa() {
    var l = (document.documentElement.lang || navigator.language || "el").slice(0, 2).toLowerCase();
    return L[l] ? l : "en";
  }

  function grapse(e) {
    if (e) e.preventDefault();
    var t = L[glossa()];
    var n = document.title || location.hostname;
    var pros = ["cyp", "11111"].join("") + "@" + ["gmail", "com"].join(".");
    location.href = "mailto:" + pros +
      "?subject=" + encodeURIComponent(t[1] + ": " + n) +
      "&body=" + encodeURIComponent(t[2] + "\n\n");
  }

  function vapse() {
    var a = document.getElementById("ypografi-grapse");
    if (!a) return;
    var t = "✏️ " + L[glossa()][0];
    if (a.textContent !== t) a.textContent = t;
  }

  function valeMeta() {
    try {
      if (!document.querySelector('meta[name="author"]')) {
        var m = document.createElement("meta");
        m.name = "author";
        m.content = onoma;
        document.head.appendChild(m);
      }
    } catch (e) {}
  }

  function valeYpografi() {
    if (document.getElementById("ypografi-csm")) return;

    var css = document.createElement("style");
    css.textContent =
      "#ypografi-csm{all:initial;display:block;box-sizing:border-box;width:100%;margin:28px 0 0 0;" +
      "padding:10px 12px 14px;background:transparent;border:0;text-align:center;clear:both;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;" +
      "font-size:12px;line-height:1.5;color:#8a8a8a;opacity:.85}" +
      "#ypografi-csm a{font:inherit;font-size:14px;color:inherit;text-decoration:underline;cursor:pointer;" +
      "display:inline-block;padding:6px 4px}";
    document.head.appendChild(css);

    var f = document.createElement("footer");
    f.id = "ypografi-csm";
    f.setAttribute("translate", "no");
    f.setAttribute("data-no-translate", "1");
    f.className = "notranslate";

    var a = document.createElement("a");
    a.id = "ypografi-grapse";
    a.href = "#";
    a.addEventListener("click", grapse);

    f.appendChild(document.createTextNode("© " + etos + " " + onoma + " · "));
    f.appendChild(a);
    document.body.appendChild(f);
    vapse();
    try {
      new MutationObserver(vapse).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    } catch (e) {}
  }

  function ksekina() {
    valeMeta();
    valeYpografi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ksekina);
  } else {
    ksekina();
  }
})();
