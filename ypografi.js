/* Ypografi - Christos S Magides - 2026 */
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
      "#ypografi-csm{all:initial;display:block;box-sizing:border-box;width:100%;margin:40px 0 0 0;" +
      "padding:22px 16px 26px;background:#E1F5EE;border-top:3px solid #1D9E75;text-align:center;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.5;clear:both}" +
      "#ypografi-csm *{box-sizing:border-box;font-family:inherit}" +
      "#ypografi-csm .yp-l{display:block;font-size:15px;color:#0F6E56;margin:0}" +
      "#ypografi-csm .yp-o{display:block;font-size:22px;font-weight:600;color:#085041;margin:4px 0 10px}" +
      "#ypografi-csm a{font-size:18px;color:#085041;text-decoration:underline;word-break:break-all}" +
      "#ypografi-csm .yp-c{display:block;font-size:15px;color:#0F6E56;margin-top:10px}" +
      "@media (prefers-color-scheme: dark){#ypografi-csm{background:#085041;border-top-color:#5DCAA5}" +
      "#ypografi-csm .yp-l,#ypografi-csm .yp-c{color:#9FE1CB}#ypografi-csm .yp-o,#ypografi-csm a{color:#E1F5EE}}";
    document.head.appendChild(css);

    var f = document.createElement("footer");
    f.id = "ypografi-csm";

    var l = document.createElement("span");
    l.className = "yp-l";
    l.textContent = "Δημιουργία";

    var o = document.createElement("span");
    o.className = "yp-o";
    o.textContent = onoma;

    var a = document.createElement("a");
    a.href = "mailto:" + mail;
    a.textContent = "✉ " + mail;

    var c = document.createElement("span");
    c.className = "yp-c";
    c.textContent = "© " + etos + " " + onoma;

    f.appendChild(l);
    f.appendChild(o);
    f.appendChild(a);
    f.appendChild(c);
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
