const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

const leaveAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circle = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(
      product,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, "<"),
    tlLeave.fromTo(
      circle,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

const enterAnimation = (next, done, gradient) => {
  const product = next.querySelector(".image-container");
  const text = next.querySelector(".showcase-text");
  const circle = next.querySelectorAll(".circle");
  const arrow = next.querySelector(".showcase-arrow");

  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(
      product,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      "<"
    ),
    tlEnter.fromTo(text, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "<"),
    tlEnter.fromTo(
      circle,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

//Run Animation

barba.init({
  preventRunning: true,
  //showcase transition
  transitions: [
    {
      name: "default",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },

    //product page animation

    {
      name: "product-transition",
      sync: true,
      from: { namespace: ["handbag", "product"] },
      to: { namespace: ["product", "handbag"] },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done);
      },
    },
  ],
});

//change background of body

const getGradient = (name) => {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
      break;
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
      break;
    case "hat":
      return "linear-gradient(260deg, #b75d62, #7f5450)";
      break;
  }
};

//product Animation

const productEnterAnimation = (next, done) => {
  tlEnter.fromTo(next, { y: "100%" }, { y: "0%" }),
    tlEnter.fromTo(
      ".card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, onComplete: done }
    );
};

const productLeaveAnimation = (current, done) => {
  tlLeave.fromTo(current, { y: "0%" }, { y: "100%", onComplete: done });
};
