"use strict";

//Make navbar transparent when it is  on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height; // navbar의 높이
window.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//scroll to section
// const menus = document.querySelectorAll(".navbar__menu__item");
// menus.forEach((menu) => {
//   menu.addEventListener("click", () => {
//     menus.forEach((m) => {
//       m.classList.remove("active");
//     });
//     const dataId = menu.dataset.id;
//     const targetElement = document.querySelector(`#${dataId}`);
//     const location = targetElement.getBoundingClientRect().top;
//     window.scrollBy({
//       top: location,
//       behavior: "smooth",
//     });
//     menu.classList.add("active");
//   });
// });
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
  const target = event.target;
  const link = target.dataset.id;
  if (link == null) {
    return;
  }

  const scrollTo = document.querySelector(`#${link}`);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
});
