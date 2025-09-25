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
