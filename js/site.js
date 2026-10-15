(function () {
  var header = document.querySelector("header");
  var toggle = document.getElementById("nav-toggle");
  var menuBtn = document.querySelector(".menu-btn");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  function syncMenu() {
    if (!menuBtn || !toggle) return;
    menuBtn.setAttribute("aria-expanded", toggle.checked ? "true" : "false");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var cloths = document.querySelectorAll(".hero-visual .cloth");
  if (cloths.length) {
    var sway = Array.prototype.map.call(cloths, function (el, i) {
      return { el: el, dir: i % 2 ? -1 : 1, speed: 0.6 + i * 0.14, phase: i * 1.1 };
    });
    var start = performance.now();
    function animateCloths(now) {
      var t = (now - start) / 1000;
      sway.forEach(function (o) {
        var a = 4.5 * o.dir * Math.sin(t * o.speed + o.phase);
        var y = 9 * (0.5 + 0.5 * Math.sin(t * o.speed * 0.8 + o.phase));
        o.el.style.transform = "rotate(" + a.toFixed(2) + "deg) translateY(" + y.toFixed(1) + "px)";
      });
      requestAnimationFrame(animateCloths);
    }
    requestAnimationFrame(animateCloths);
  }

  var ticker = document.querySelector(".ticker");
  var track = ticker && ticker.querySelector(".ticker-track");
  if (track) {
    track.innerHTML += track.innerHTML;
    var offset = 0;
    var last = 0;
    function loop(now) {
      if (!last) last = now;
      var dt = Math.min(now - last, 40);
      last = now;
      offset += dt * 0.045;
      var half = track.scrollWidth / 2;
      if (half > 0 && offset >= half) offset -= half;
      track.style.transform = "translateX(" + (-offset) + "px)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (toggle && menuBtn) {
    menuBtn.setAttribute("aria-controls", "site-nav");
    menuBtn.setAttribute("aria-expanded", "false");
    toggle.addEventListener("change", syncMenu);
  }

  document.querySelectorAll("a[href^='#']").forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    link.addEventListener("click", function () {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
})();
