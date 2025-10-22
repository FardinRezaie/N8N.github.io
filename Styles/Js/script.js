/* -------------------- Nav part -------------------- */
const container = document.querySelector(".image-container");
const images = container.querySelectorAll(".nav-logo");

container.addEventListener("mouseenter", function () {
  images[0].classList.remove("active");
  images[1].classList.add("active");
});
container.addEventListener("mouseleave", function () {
  images[1].classList.remove("active");
  images[0].classList.add("active");
});

/*  Dropdown functionality for navigation items */
const navItems = document.querySelectorAll(".nav-item.dropdown");
navItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const dropdown = item.querySelector(".drop-list");
    if (dropdown) {
      dropdown.classList.add("show");
    }
  });

  item.addEventListener("mouseleave", function () {
    const dropdown = item.querySelector(".drop-list");
    if (dropdown) {
      dropdown.classList.remove("show");
    }
  });
});

/* Accordian List */
// const accor = function (Item, dropdown) {
//   const menuItems = document.querySelectorAll(Item);

//   menuItems.forEach((item) => {
//     item.addEventListener("click", function () {
//       // Get the panel inside this menu item

//       const panel = this.querySelector(dropdown);

//       if (panel) {
//         if (panel.style.maxHeight) {
//           panel.style.maxHeight = null;
//         } else {
//           panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//       }
//     });
//   });
// };
// accor("menu-icon", "menu-list");

const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Get the panel and chevron icon inside this menu item
    const panel = this.querySelector(".menu-accordian-list");

    // Toggle chevron rotation for clicked item
    const chevron = this.querySelector(".chevron-menu");
    if (chevron) {
      chevron.classList.toggle("chevronActive");
    }

    // Close all other panels
    menuItems.forEach((otherItem) => {
      if (otherItem !== this) {
        const otherPanel = otherItem.querySelector(".menu-accordian-list");
        if (otherPanel && otherPanel.style.maxHeight) {
          otherPanel.style.maxHeight = null;
          otherItem.classList.remove("active");
          // Reset other chevrons
          const otherChevron = otherItem.querySelector(".chevron-menu");
          if (otherChevron) {
            otherChevron.classList.remove("chevronActive");
          }
        }
      }
    });

    // Toggle current panel
    if (panel) {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      // After any submenu toggle, re-measure container for smooth animation
      updateMenuListMaxHeight();
    }
  });
});

const menuIcon = document.querySelector(".menu-icon");
const collapseEl = document.getElementById("navbarSupportedContent");

if (collapseEl) {
  collapseEl.addEventListener("show.bs.collapse", () => {
    // Switch icon to X
    if (menuIcon) {
      menuIcon.classList.remove("bi-list");
      menuIcon.classList.add("bi-x", "active");
    }
    // Prevent body scroll behind expanded nav
    document.body.style.overflow = "hidden";
    navContainer.classList.remove("nav-hidden");
  });
  collapseEl.addEventListener("hidden.bs.collapse", () => {
    if (menuIcon) {
      menuIcon.classList.add("bi-list");
      menuIcon.classList.remove("bi-x", "active");
    }
    document.body.style.overflow = "";
  });
}

// Hide-on-scroll behavior
let lastScrollTop = 0;
const navContainer = document.getElementById("nav-container");
const menuList = document.querySelector(".menu-list");
window.addEventListener("scroll", function () {
  // Don't hide nav if mobile menu is open
  if (menuList.classList.contains("menuActive")) {
    navContainer.classList.remove("nav-hidden");
    return;
  }

  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // Only apply hide/show behavior below 992px viewport width
  if (window.innerWidth < 992) {
    if (currentScroll > 60) {
      // Show/hide threshold
      if (currentScroll > lastScrollTop) {
        // Scrolling down
        navContainer.classList.add("nav-hidden");
      } else {
        // Scrolling up (even just 2px)
        navContainer.classList.remove("nav-hidden");
      }
    } else {
      // Always show nav when near the top
      navContainer.classList.remove("nav-hidden");
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scrolling
});

/* -------------------- Templates part -------------------- */
// ...existing code...

/* -------------------- Templates part -------------------- */
const templateItems = document.querySelectorAll(".template-items");
const templateImages = document.querySelectorAll(".template-images img");

templateItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    // Activate clicked item
    templateItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    // Show matching image by index
    templateImages.forEach((img) => img.classList.remove("active"));
    if (templateImages[idx]) {
      templateImages[idx].classList.add("active");
      // console.log("Active template image:", templateImages[idx]);
    }
  });

  // Press visual feedback
  const press = () => item.classList.add("pressed");
  const release = () => item.classList.remove("pressed");
  item.addEventListener("mousedown", press);
  item.addEventListener("mouseup", release);
  item.addEventListener("mouseleave", release);
  item.addEventListener("touchstart", press, { passive: true });
  item.addEventListener("touchend", release);
  item.addEventListener("touchcancel", release);
});

// Cursor-following tooltip for elements with [data-tooltip]
(function () {
  const OFFSET = 12; // px from cursor
  let activeEl = null;

  // Create singleton tooltip
  const tip = document.createElement("div");
  tip.className = "cursor-tooltip";
  document.body.appendChild(tip);

  function positionTip(clientX, clientY) {
    const { innerWidth: vw, innerHeight: vh } = window;
    const rect = tip.getBoundingClientRect();
    let x = clientX + OFFSET;
    let y = clientY + OFFSET;

    // Keep inside viewport
    if (x + rect.width + 8 > vw) x = clientX - rect.width - OFFSET;
    if (y + rect.height + 8 > vh) y = clientY - rect.height - OFFSET;

    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }

  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest("[data-tooltip]");
    if (!el) return;
    activeEl = el;
    tip.textContent = el.getAttribute("data-tooltip") || "";
    tip.classList.add("show");
    positionTip(e.clientX, e.clientY);
  });

  document.addEventListener("mousemove", (e) => {
    if (!activeEl) return;
    positionTip(e.clientX, e.clientY);
  });

  document.addEventListener("mouseout", (e) => {
    if (!activeEl) return;
    if (
      e.relatedTarget &&
      (e.relatedTarget === activeEl || activeEl.contains(e.relatedTarget))
    )
      return;
    activeEl = null;
    tip.classList.remove("show");
  });

  // Basic touch support: show near touch, hide on end
  document.addEventListener(
    "touchstart",
    (e) => {
      const t = e.target.closest("[data-tooltip]");
      if (!t) return;
      activeEl = t;
      tip.textContent = t.getAttribute("data-tooltip") || "";
      const touch = e.touches[0];
      tip.classList.add("show");
      positionTip(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  document.addEventListener("touchend", () => {
    activeEl = null;
    tip.classList.remove("show");
  });
})();

/* -------------------- Vertical Slider -------------------- */

function verticalSlider(sliderTrack, slides, delayOffset = 0) {
  // Function takes 3 parameters:
  // sliderTrack: the container element that holds all slides (will move up/down)
  // slides: array of individual slide elements (the 3 images)
  // delayOffset: time in milliseconds to maintain stagger between sliders permanently

  if (!sliderTrack || !slides.length) return;
  // Safety check: if slider doesn't exist or has no slides, exit the function

  let currentIndex = 1; // Start at middle
  // Tracks which slide is currently visible (0=top, 1=middle, 2=bottom)

  let isAnimating = false;
  // Boolean flag that prevents multiple animations from running at once

  // Sequence: middle(5s)→top(10s)→middle(5s)→bottom(10s)→repeat
  const timeline = [
    { target: 0, waitBefore: 5000 }, // Step 1: Wait 5s at middle, then go to top
    { target: 1, waitBefore: 10000 }, // Step 2: Wait 10s at top, then go to middle
    { target: 2, waitBefore: 5000 }, // Step 3: Wait 5s at middle, then go to bottom
    { target: 1, waitBefore: 10000 }, // Step 4: Wait 10s at bottom, then go to middle
  ];
  // Array defines the animation roadmap with target slides and wait times

  let stepIndex = 0;
  // Tracks which step in the timeline array we're currently on

  function slideTo(targetIndex) {
    // This function performs the actual slide animation to a specific slide

    if (isAnimating || targetIndex === currentIndex) return;
    // Exit if animation is running or already on target slide

    isAnimating = true;
    // Set flag to block other animations until this one finishes

    sliderTrack.classList.remove(`pos-${currentIndex}`);
    // Remove the CSS class for current position

    currentIndex = targetIndex;
    // Update to the new target slide number

    sliderTrack.classList.add(`pos-${currentIndex}`);
    // Add CSS class for new position (CSS handles animation)

    setTimeout(() => {
      isAnimating = false;
    }, 800);
    // After 800ms (CSS transition duration), allow next animation
  }

  function runSequence() {
    // This function manages the automatic progression through the timeline

    const step = timeline[stepIndex];
    // Get the current step object from the timeline array

    setTimeout(() => {
      // Wait for the time specified in step.waitBefore + persistent delayOffset

      slideTo(step.target);
      // Animate to the target slide specified in this step

      stepIndex = (stepIndex + 1) % timeline.length;
      // Move to next step (wraps back to 0 after last step)

      runSequence();
      // Recursively call to schedule the next step (infinite loop)
    }, step.waitBefore + delayOffset);
    // KEY FIX: Add delayOffset to EVERY step, not just the first one
    // This maintains the stagger permanently across all cycles
    // Example: if delayOffset is 2000ms, every transition happens 2s later than slider 1
  }

  // Set initial position
  sliderTrack.classList.add("pos-1");
  // Add "pos-1" class to show middle slide initially

  // Start with delay offset for stagger effect
  setTimeout(() => {
    runSequence();
  }, delayOffset);
  // Initial delay before first cycle starts
}
// Initialize sliders with staggered delays
const sliders = [
  {
    track: document.querySelector(".vertical-slider .slider-track"),
    slides: document.querySelectorAll(".vertical-slider .slider-track .slide"),
    delay: 0, // First slider: no delay
  },
  {
    track: document.querySelector(".vertical-slider .slider-track2"),
    slides: document.querySelectorAll(".vertical-slider .slider-track2 .slide"),
    delay: 100, // Second slider: always 2s behind first
  },
  {
    track: document.querySelector(".vertical-slider .slider-track3"),
    slides: document.querySelectorAll(".vertical-slider .slider-track3 .slide"),
    delay: 200, // Third slider: always 2s behind first (same as second)
  },
  {
    track: document.querySelector(".vertical-slider .slider-track4"),
    slides: document.querySelectorAll(".vertical-slider .slider-track4 .slide"),
    delay: 250, // Fourth slider: always 4s behind first
  },
];
// Start all sliders with their respective delays
sliders.forEach((slider) => {
  if (slider.track && slider.slides.length) {
    verticalSlider(slider.track, slider.slides, slider.delay);
  }
});

/* -------------------- Integration logo -------------------- */
/* Tilt on Scroll Effect - starts tilted when entering viewport, straightens as you scroll through */
(function progressiveTilt() {
  // Wait for DOM to be fully loaded
  function init() {
    const tiltElements = document.querySelectorAll(".tilt-element");

    if (!tiltElements.length) {
      console.warn("No .tilt-element found!");
      return;
    }

    function handleScroll() {
      tiltElements.forEach((element) => {
        const hasCompleted = element.dataset.tiltCompleted === "true";
        // Get element position relative to viewport
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        const isInViewport = elementTop < windowHeight && elementBottom > 0;

        // Initial state values (match CSS)
        const initialTranslateX = 5; // percent
        const initialRotateZ = 5;
        const initialRotateY = 15;
        const initialRotateX = 60;
        const initialOpacity = 0;
        const finalTransform =
          "translate3d(0%, 0px, 0px) rotate(0deg) rotateY(0deg) rotateX(0deg)";
        const finalOpacity = 1;

        if (!isInViewport) {
          if (hasCompleted) {
            element.style.transform = finalTransform;
            element.style.webkitTransform = finalTransform;
            element.style.opacity = finalOpacity;
          } else if (elementTop >= windowHeight) {
            // Ensure pre-entry state when element hasn't animated yet
            const initialTransform = `translate3d(${initialTranslateX}%, 0px, 0px) rotate(${initialRotateZ}deg) rotateY(${initialRotateY}deg) rotateX(${initialRotateX}deg)`;
            element.style.transform = initialTransform;
            element.style.webkitTransform = initialTransform;
            element.style.opacity = initialOpacity;
          }
          return;
        }

        if (hasCompleted) {
          element.style.transform = finalTransform;
          element.style.webkitTransform = finalTransform;
          element.style.opacity = finalOpacity;
          return;
        }

        // Calculate progress based on element center position relative to viewport center
        // When element center is at bottom of viewport: progress = 0 (fully tilted)
        // When element center is at middle of viewport: progress = 1 (fully straight)

        const elementCenter = elementTop + elementHeight / 2;
        const viewportCenter = windowHeight / 2;

        // Distance from viewport center to bottom
        const maxDistance = windowHeight / 2;

        // Current distance (when element center is at bottom = maxDistance, at center = 0)
        const currentDistance = elementCenter - viewportCenter;

        // Calculate progress (0 = at bottom/tilted, 1 = at center/straight)
        let progress = 1 - currentDistance / maxDistance;

        // Clamp between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Calculate current transform values based on progress
        const translateX = initialTranslateX * (1 - progress);
        const rotateX = initialRotateX * (1 - progress);
        const rotateY = initialRotateY * (1 - progress);
        const rotateZ = initialRotateZ * (1 - progress);

        // Apply transform and opacity
        if (progress >= 1) {
          element.style.transform = finalTransform;
          element.style.webkitTransform = finalTransform;
          element.style.opacity = finalOpacity;
          element.dataset.tiltCompleted = "true";
        } else {
          const transform = `translate3d(${translateX}%, 0px, 0px) rotate(${rotateZ}deg) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
          element.style.transform = transform;
          element.style.webkitTransform = transform; // Safari support
          element.style.opacity = progress;
        }
      });
    }

    // Use requestAnimationFrame for smooth animation
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll);
    handleScroll(); // Initial call
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* -------------------- Gradient Hover Effect -------------------- */
document.querySelectorAll(".gradient-hover").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--mouse-x", "50%");
    el.style.setProperty("--mouse-y", "50%");
  });
});
document.querySelectorAll(".gradient-hover-right").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--mouse-x", "50%");
    el.style.setProperty("--mouse-y", "50%");
  });
});

/* -------------------- Floating Bubble Animation -------------------- */
(function bubbleAnimation() {
  const leftTopCards = document.querySelectorAll(".left-top");

  leftTopCards.forEach((card) => {
    const floatingTexts = card.querySelectorAll(".floating-text");
    card.addEventListener("mouseenter", () => {
      // Reset all animations and make invisible
      floatingTexts.forEach((text) => {
        text.classList.remove("animating");
        // Force immediate reset without transition
        text.style.transition = "none";
        text.style.opacity = "1";
        text.style.transform = "scale(0.8) translateY(10px)";
      });

      // Force reflow to restart animation
      card.offsetHeight;

      // Re-enable transitions for animation
      floatingTexts.forEach((text) => {
        text.style.transition = "";
      });

      // Stagger the animations
      floatingTexts.forEach((text, index) => {
        setTimeout(() => {
          text.classList.add("animating");
        }, index * 300); // 300ms delay between each bubble
      });
    });

    // No mouseleave handler - bubbles stay visible after animation completes
    card.addEventListener("mouseleave", () => {
      floatingTexts.forEach((text) => {
        // text.style.opacity = "1";
        text.style.transform = "scale(1) translateY(0)";
        text.classList.remove("animating");
      });
    });
    floatingTexts.forEach((text) => {
      text.classList.remove("animating");
    });
  });
})();

/* -------------------- scrollStack part -------------------- */
/* -------------------- Light Canvas Animation -------------------- */
(function lightCanvasAnimation() {
  const canvas = document.getElementById("lightCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const stackContent = document.querySelector(".stackContent");

  // Set canvas size
  function resizeCanvas() {
    canvas.width = stackContent.offsetWidth;
    canvas.height = stackContent.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Light expansion radius
  let lightRadius = 0; // 0 to 1

  function drawLight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (lightRadius === 0) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);

    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      lightRadius * maxRadius
    );
    gradient.addColorStop(0, "rgba(254,247,237,1)");
    gradient.addColorStop(0.25, "rgba(254,247,237,0.95)");
    gradient.addColorStop(0.45, "rgba(215,248,239,0.85)");
    gradient.addColorStop(0.7, "rgba(79,101,220,0.75)");
    gradient.addColorStop(0.9, "rgba(79,101,220,0.45)");
    gradient.addColorStop(1, "rgba(79,101,220,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      lightRadius * maxRadius * 0.75
    );
    glow.addColorStop(0, "rgba(255,255,255,0.6)");
    glow.addColorStop(0.4, "rgba(254,247,237,0.4)");
    glow.addColorStop(1, "rgba(254,247,237,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Update light expansion on scroll
  function updateLightOnScroll() {
    const rect = stackContent.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    // viewport bottom has reached the element
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const distanceFromStart = windowHeight - rect.top; // start when bottom touches top
      const distanceToMid = elementHeight / 2; // complete when bottom hits middle
      const progress = Math.max(
        0,
        Math.min(1, distanceFromStart / distanceToMid)
      );

      lightRadius = progress;
      drawLight();
    } else if (rect.bottom < 0) {
      lightRadius = 1;
      drawLight();
    } else {
      lightRadius = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Listen to scroll with requestAnimationFrame for smooth animation
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateLightOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", () => {
    resizeCanvas();
    updateLightOnScroll();
  });

  // Initial draw
  updateLightOnScroll();
})();

function updateParallaxScroll() {
  const scrollContent = document.querySelector(".Scroll");
  const stack = document.querySelector(".Stack");

  if (!scrollContent || !stack) return;

  // Only apply parallax for large screens
  if (window.innerWidth <= 992) {
    scrollContent.style.transform = ""; // Reset transform for small screens
    stack.style.position = "static";
    return;
  }

  // Calculate trigger pixel: when bottom of page reaches bottom of .Stack
  const stackRect = stack.getBoundingClientRect();
  const stackBottom = stackRect.bottom + window.pageYOffset;
  // Use stackBottom as dynamic trigger
  const bottomPixel = window.pageYOffset + window.innerHeight;
  // console.log(`This is the bottom pixel: ${bottomPixel}`);

  // Calculate the max translate so .Scroll never goes above .stackContent
  const stackContentTop =
    stack.getBoundingClientRect().top + window.pageYOffset;
  const maxTranslate = stackContentTop - scrollContent.offsetTop - 5;
  if (bottomPixel >= stackBottom && bottomPixel <= stackBottom + maxTranslate) {
    scrollContent.style.transform = `translateY(-${
      bottomPixel - stackBottom
    }px)`;
  } else if (bottomPixel > stackBottom + maxTranslate) {
    scrollContent.style.transform = `translateY(-${maxTranslate}px)`; // Stop at top of .stackContent
  } else {
    scrollContent.style.transform = ""; // Reset before the range
  }
}

// Listen for scroll and resize
window.addEventListener("scroll", updateParallaxScroll);
window.addEventListener("resize", updateParallaxScroll);

// Initial call
if (window.innerWidth >= 992) {
  updateParallaxScroll();
}

/* -------------------- Studies card part -------------------- */
const stuCard = document.querySelectorAll(".studies-card");
function updateStudiesCardGradientHover() {
  stuCard.forEach((card) => {
    if (window.innerWidth <= 992) {
      card.classList.remove("gradient-hover");
    } else {
      card.classList.add("gradient-hover");
    }
  });
}
updateStudiesCardGradientHover();
window.addEventListener("resize", updateStudiesCardGradientHover);

/* -------------------- Automation card part -------------------- */
// ...existing code...
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

document
  .querySelectorAll(".automation-gradient-hover, .automate-gradient-hover")
  .forEach((glow) => {
    const container = glow.parentElement;
    if (!container) return;

    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    glow.style.setProperty("--mouse-x", "50%");
    glow.style.setProperty("--mouse-y", "50%");
    glow.style.visibility = "hidden";
    glow.style.opacity = "0";
    glow.style.transform = "translate(-50%, -50%)";

    container.addEventListener("mouseenter", () => {
      glow.style.visibility = "visible";
      glow.style.opacity = "1";
      glow.style.zIndex = "-1";
    });

    container.addEventListener("mousemove", (event) => {
      const rect = container.getBoundingClientRect();
      const relX = event.clientX - rect.left;

      const percentX = (relX / rect.width) * 100;
      glow.style.setProperty("--mouse-x", `${percentX}%`);

      const maxTravel = Math.max(0, (rect.width - glow.offsetWidth) / 2);
      const rawShift = relX - rect.width / 2;
      const clampedShift = clamp(rawShift, -maxTravel, maxTravel);

      glow.style.transform = `translate(-50%, -50%) translateX(${clampedShift}px)`;
    });

    container.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
      setTimeout(() => {
        if (parseFloat(getComputedStyle(glow).opacity) === 0) {
          glow.style.visibility = "hidden";
          glow.style.setProperty("--mouse-x", "50%");
          glow.style.transform = "translate(-50%, -50%)";
        }
      }, 200);
    });
  });

const automationGlow = document.querySelectorAll(".automation-gradient-hover");
const automateGlow = document.querySelectorAll(".automate-gradient-hover");
if (window.innerWidth <= 992) {
  automationGlow.forEach((glow) => {
    glow.classList.add("hidden");
  });
  automateGlow.forEach((glow) => {
    glow.classList.add("hidden");
  });
}
