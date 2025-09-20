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
const navItems = document.querySelectorAll(".nav-item.drop-down");
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
const menuList = document.querySelector(".menu-list");

menuIcon.addEventListener("click", function () {
  this.classList.toggle("fa-bars");
  this.classList.toggle("fa-xmark");
  this.classList.toggle("active");
  menuList.classList.toggle("menuActive");

  // Toggle body scroll lock
  document.body.style.overflow = menuList.classList.contains("menuActive")
    ? "hidden"
    : "";

  // Ensure nav is visible when menu is open
  if (menuList.classList.contains("menuActive")) {
    navContainer.classList.remove("nav-hidden");
  }

  // Clear any inline sizing so it can auto-size naturally
  menuList.style.maxHeight = "";
  menuList.style.height = "";
});

// Hide-on-scroll behavior
let lastScrollTop = 0;
const navContainer = document.getElementById("nav-container");

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

// ...existing code...

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
