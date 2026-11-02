/* Ypografi - Christos S Magides - 2026 - έκδοση 2-11-2026 (διακριτική / discreet) */
(function () {
  if (window.__ypografiCSM) return;
  window.__ypografiCSM = true;

  var onoma = "Christos S Magides";
  var u = ["cyp", "11111"].join("");
  var d = ["gmail", "com"].join(".");
  var mail = u + "@" + d;
  var etos = "2026";

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
      "#ypografi-csm a{font:inherit;color:inherit;text-decoration:none}" +
      "#ypografi-csm a:hover{text-decoration:underline}";
    document.head.appendChild(css);

    var f = document.createElement("footer");
    f.id = "ypografi-csm";
    f.setAttribute("translate", "no");
    f.setAttribute("data-no-translate", "1");
    f.className = "notranslate";

    var a = document.createElement("a");
    a.href = "mailto:" + mail;
    a.textContent = mail;

    f.appendChild(document.createTextNode("\u00A9 " + etos + " " + onoma + " \u00B7 "));
    f.appendChild(a);
    document.body.appendChild(f);
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
