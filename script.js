document.addEventListener("DOMContentLoaded", function () {
  getVisitorData();
  animate();
});

// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function () {
  const scrollToTopButton = document.getElementById("scrollToTopButton");
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / scrollHeight, 1);

  if (scrollTop > 200) {
    scrollToTopButton.classList.add("show");
  } else {
    scrollToTopButton.classList.remove("show");
  }

  scrollProgress.style.transform = `scaleY(${progress})`;
  scrollToTopButton.style.borderRadius = `${50 * (1 - progress)}%`;
});

document
  .getElementById("scrollToTopButton")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

function CustomScroll(id) {
  const element = document.getElementById(id);

  const btn = document.getElementById("flipButton");
  if (btn && btn.click) {
    btn.click();
  }
  let position = element.offsetTop;

  window.scrollTo({
    left: 0,
    top: position,
    behavior: "smooth",
  });
}

function animate() {
  // Select all elements with the class 'animate__animated'
  const animatedElements = document.querySelectorAll(".animate__animated");

  // Create an Intersection Observer instance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add an animation class when the element comes into view
          const classList = entry.target.classList;
          classList.remove("hid");

          if (classList.contains("fadeInUp")) {
            classList.add("animate__fadeInUp"); // or other animation classes
          } else if (classList.contains("fadeIn")) {
            classList.add("animate__fadeIn"); // or other animation classes
          } else if (classList.contains("zoomIn")) {
            classList.add("animate__zoomIn"); // or other animation classes
          } else if (classList.contains("fadeInDown")) {
            classList.add("animate__fadeInDown"); // or other animation classes
          }
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.5, // Adjust based on when you want the animation to trigger
    }
  );

  // Observe each animated element
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

async function getVisitorData() {
  try {
    await fetch("http://localhost:3000/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  } catch (error) {}
}

document.getElementById("flipButton").addEventListener("click", function () {
  this.classList.add("clicked");

  // Remove the 'flip' class after the animation ends
  this.addEventListener(
    "animationend",
    () => {
      this.classList.remove("clicked");
    },
    { once: true }
  );
});
