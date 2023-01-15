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
  const target = e.target;
  const link = target.dataset.id;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
  // setActiveMenu(link);
  selectNavItem(target);
  navbarMenu.classList.remove("open");
});

//handle click on contact me button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView(`#contact`);
  selectNavItem(document.querySelector(`[data-id="#contact"]`));
  // setActiveMenu("contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
}

const home = document.querySelector(".home_container");
const homeHeight = home.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  home.style.setProperty("opacity", `${1 - scrollY / homeHeight}`);
});

const arrowBtn = document.querySelector(".arrow__button");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scrollY > 400) {
    arrowBtn.classList.add("active");
  } else {
    arrowBtn.classList.remove("active");
  }
});

arrowBtn.addEventListener("click", () => {
  scrollIntoView("#home");
  selectNavItem(document.querySelector(`[data-id="#home"]`));
  // setActiveMenu("home");
});

const categorys = document.querySelector(".work__categorys");
const projectContainer = document.querySelector(".work__projects");
categorys.addEventListener("click", (e) => {
  const target = e.target;
  const id = target.dataset.id || target.parentNode.dataset.id;
  if (!id) {
    return;
  }

  for (let a = 0; a < categorys.children.length; a++) {
    const categoryBtn = categorys.children[a];
    const targetId = categoryBtn.dataset.id;
    if (id == targetId) {
      categoryBtn.classList.add("active");
    } else {
      categoryBtn.classList.remove("active");
    }
  }

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    showWorksForCategory(id);
    projectContainer.classList.remove("anim-out");
  }, 300);
});

showWorksForCategory("all");
function showWorksForCategory(category) {
  const projects = document.querySelectorAll(".project");

  projects.forEach((project) => {
    const targetCategory = project.dataset.id;
    if (category === targetCategory) {
      project.classList.add("visible");
    } else {
      project.classList.remove("visible");
      if (category === "all") {
        project.classList.add("visible");
      }
    }
  });
}

const menuButtons = document.querySelectorAll(".navbar__menu__item");
function setActiveMenu(menuName) {
  const prevActiveButton = document.querySelector(".navbar__menu__item.active");
  prevActiveButton.classList.remove("active");

  menuButtons.forEach((menu) => {
    if (menu.dataset.id === menuName) {
      menu.classList.add("active");
    }
  });
}

const navbarToggleButton = document.querySelector(".navbar__toggle-btn");
navbarToggleButton.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//섹션을 다 가져옴.
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-id="${id}"]`)
);
let selectedNavItem = navItems[0];
let selectedNavIndex;

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        //해당 섹션이 위로 빠졌음.
        selectedNavIndex = index + 1;
      } else {
        //해당 섹션이 밑으로 빠졌음.
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) + 1 >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
