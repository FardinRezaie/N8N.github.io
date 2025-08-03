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
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const dropdown = item.querySelector(".drop-down");
    if (dropdown) {
      dropdown.classList.add("show");
    }
  });

  item.addEventListener("mouseleave", function () {
    const dropdown = item.querySelector(".drop-down");
    if (dropdown) {
      dropdown.classList.remove("show");
    }
  });
});
