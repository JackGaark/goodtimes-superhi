export const VanillaTilt = (function () {
  "use strict";
  class t {
    constructor(t, e = {}) {
      if (!(t instanceof Node))
        throw "Can't initialize VanillaTilt because " + t + " is not a Node.";
      (this.width = null),
        (this.height = null),
        (this.left = null),
        (this.top = null),
        (this.transitionTimeout = null),
        (this.updateCall = null),
        (this.updateBind = this.update.bind(this)),
        (this.resetBind = this.reset.bind(this)),
        (this.element = t),
        (this.settings = this.extendSettings(e)),
        (this.reverse = this.settings.reverse ? -1 : 1),
        (this.glare = this.isSettingTrue(this.settings.glare)),
        (this.glarePrerender = this.isSettingTrue(
          this.settings["glare-prerender"]
        )),
        this.glare && this.prepareGlare(),
        this.addEventListeners();
    }
    isSettingTrue(t) {
      return "" === t || !0 === t || 1 === t;
    }
    addEventListeners() {
      (this.onMouseEnterBind = this.onMouseEnter.bind(this)),
        (this.onMouseMoveBind = this.onMouseMove.bind(this)),
        (this.onMouseLeaveBind = this.onMouseLeave.bind(this)),
        (this.onWindowResizeBind = this.onWindowResizeBind.bind(this)),
        this.element.addEventListener("mouseenter", this.onMouseEnterBind),
        this.element.addEventListener("mousemove", this.onMouseMoveBind),
        this.element.addEventListener("mouseleave", this.onMouseLeaveBind),
        this.glare &&
          window.addEventListener("resize", this.onWindowResizeBind);
    }
    removeEventListeners() {
      this.element.removeEventListener("mouseenter", this.onMouseEnterBind),
        this.element.removeEventListener("mousemove", this.onMouseMoveBind),
        this.element.removeEventListener("mouseleave", this.onMouseLeaveBind),
        this.glare &&
          window.removeEventListener("resize", this.onWindowResizeBind);
    }
    destroy() {
      clearTimeout(this.transitionTimeout),
        null !== this.updateCall && cancelAnimationFrame(this.updateCall),
        this.reset(),
        this.removeEventListeners(),
        (this.element.vanillaTilt = null),
        delete this.element.vanillaTilt,
        (this.element = null);
    }
    onMouseEnter(t) {
      this.updateElementPosition(),
        (this.element.style.willChange = "transform"),
        this.setTransition();
    }
    onMouseMove(t) {
      null !== this.updateCall && cancelAnimationFrame(this.updateCall),
        (this.event = t),
        (this.updateCall = requestAnimationFrame(this.updateBind));
    }
    onMouseLeave(t) {
      this.setTransition(),
        this.settings.reset && requestAnimationFrame(this.resetBind);
    }
    reset() {
      (this.event = {
        pageX: this.left + this.width / 2,
        pageY: this.top + this.height / 2,
      }),
        (this.element.style.transform =
          "perspective(" +
          this.settings.perspective +
          "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"),
        this.glare &&
          ((this.glareElement.style.transform =
            "rotate(180deg) translate(-50%, -50%)"),
          (this.glareElement.style.opacity = "0"));
    }
    getValues() {
      let t = (this.event.clientX - this.left) / this.width,
        e = (this.event.clientY - this.top) / this.height;
      return (
        (t = Math.min(Math.max(t, 0), 1)),
        (e = Math.min(Math.max(e, 0), 1)),
        {
          tiltX: (
            this.reverse *
            (this.settings.max / 2 - t * this.settings.max)
          ).toFixed(2),
          tiltY: (
            this.reverse *
            (e * this.settings.max - this.settings.max / 2)
          ).toFixed(2),
          percentageX: 100 * t,
          percentageY: 100 * e,
          angle:
            Math.atan2(
              this.event.clientX - (this.left + this.width / 2),
              -(this.event.clientY - (this.top + this.height / 2))
            ) *
            (180 / Math.PI),
        }
      );
    }
    updateElementPosition() {
      let t = this.element.getBoundingClientRect();
      (this.width = this.element.offsetWidth),
        (this.height = this.element.offsetHeight),
        (this.left = t.left),
        (this.top = t.top);
    }
    update() {
      let t = this.getValues();
      (this.element.style.transform =
        "perspective(" +
        this.settings.perspective +
        "px) rotateX(" +
        ("x" === this.settings.axis ? 0 : t.tiltY) +
        "deg) rotateY(" +
        ("y" === this.settings.axis ? 0 : t.tiltX) +
        "deg) scale3d(" +
        this.settings.scale +
        ", " +
        this.settings.scale +
        ", " +
        this.settings.scale +
        ")"),
        this.glare &&
          ((this.glareElement.style.transform = `rotate(${t.angle}deg) translate(-50%, -50%)`),
          (this.glareElement.style.opacity = `${
            (t.percentageY * this.settings["max-glare"]) / 100
          }`)),
        this.element.dispatchEvent(
          new CustomEvent("tiltChange", { detail: t })
        ),
        (this.updateCall = null);
    }
    prepareGlare() {
      if (!this.glarePrerender) {
        const t = document.createElement("div");
        t.classList.add("js-tilt-glare");
        const e = document.createElement("div");
        e.classList.add("js-tilt-glare-inner"),
          t.appendChild(e),
          this.element.appendChild(t);
      }
      (this.glareElementWrapper = this.element.querySelector(".js-tilt-glare")),
        (this.glareElement = this.element.querySelector(
          ".js-tilt-glare-inner"
        )),
        this.glarePrerender ||
          (Object.assign(this.glareElementWrapper.style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }),
          Object.assign(this.glareElement.style, {
            position: "absolute",
            top: "50%",
            left: "50%",
            "pointer-events": "none",
            "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
            width: `${2 * this.element.offsetWidth}px`,
            height: `${2 * this.element.offsetWidth}px`,
            transform: "rotate(180deg) translate(-50%, -50%)",
            "transform-origin": "0% 0%",
            opacity: "0",
          }));
    }
    updateGlareSize() {
      Object.assign(this.glareElement.style, {
        width: `${2 * this.element.offsetWidth}`,
        height: `${2 * this.element.offsetWidth}`,
      });
    }
    onWindowResizeBind() {
      this.updateGlareSize();
    }
    setTransition() {
      clearTimeout(this.transitionTimeout),
        (this.element.style.transition =
          this.settings.speed + "ms " + this.settings.easing),
        this.glare &&
          (this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`),
        (this.transitionTimeout = setTimeout(() => {
          this.element.style.transition = "";
          this.glare && (this.glareElement.style.transition = "");
        }, this.settings.speed));
    }
    extendSettings(t) {
      let e = {
          reverse: !1,
          max: 35,
          perspective: 1e3,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          scale: "1",
          speed: "300",
          transition: !0,
          axis: null,
          glare: !1,
          "max-glare": 1,
          "glare-prerender": !1,
          reset: !0,
        },
        i = {};
      for (var s in e)
        if (s in t) i[s] = t[s];
        else if (this.element.hasAttribute("data-tilt-" + s)) {
          let t = this.element.getAttribute("data-tilt-" + s);
          try {
            i[s] = JSON.parse(t);
          } catch (e) {
            i[s] = t;
          }
        } else i[s] = e[s];
      return i;
    }
    static init(e, i) {
      e instanceof Node && (e = [e]),
        e instanceof NodeList && (e = [].slice.call(e)),
        e instanceof Array &&
          e.forEach((e) => {
            "vanillaTilt" in e || (e.vanillaTilt = new t(e, i));
          });
    }
  }
  return (
    "undefined" != typeof document &&
      ((window.VanillaTilt = t),
      t.init(document.querySelectorAll("[data-tilt]"))),
    t
  );
})();
