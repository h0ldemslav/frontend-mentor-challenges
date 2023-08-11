const styleClasses = {
    hidden: "hidden",
    headerMenu: "header__menu",
    burgerButtonExpanded: "burger-button_expanded"
};

const mediaPaths = {
    burgerOpen: "./images/icon-menu.svg",
    burgerClose: "./images/icon-close-menu.svg",
    arrowUp: "./images/icon-arrow-up.svg",
    arrowDown: "./images/icon-arrow-down.svg",
    featureSublistIcons: [
        "./images/icon-todo.svg",
        "./images/icon-calendar.svg",
        "./images/icon-reminders.svg",
        "./images/icon-planning.svg"
    ],
    previewImageMobile: "./images/image-hero-mobile.png",
    previewImageDesktop: "./images/image-hero-desktop.png"
};

document.querySelectorAll(".menu__features .menu__sublist-item").forEach((subitem, index) => {
    subitem.style.background = `url("${mediaPaths.featureSublistIcons[index]}") no-repeat left 0.6em`;
});

const headerMenu = document.querySelector(".menu");
const burgerButton = document.querySelector(".header__burger-button");
const menuItemButtons = document.querySelectorAll(".menu__list .menu__button");
const previewSectionImage = document.querySelector(".content__preview-image");

function expandOrCollapseList(list) {
    if (list.classList.contains(styleClasses.hidden)) {
        list.classList.remove(styleClasses.hidden);
        list.parentNode.style.backgroundImage = `url("${mediaPaths.arrowUp}")`;
    } else {
        list.classList.add(styleClasses.hidden);
        list.parentNode.style.backgroundImage = `url("${mediaPaths.arrowDown}")`;
    }
};

menuItemButtons.forEach((btn) => {
    const list = btn.nextElementSibling;

    btn.addEventListener("click", () => expandOrCollapseList(list));
});

function expandOrCollapseBurger() {
    const burgerIcon = burgerButton.firstElementChild;

    if (!burgerButton.classList.contains(styleClasses.burgerButtonExpanded)) {
        burgerIcon.src = mediaPaths.burgerClose;
        burgerButton.classList.add(styleClasses.burgerButtonExpanded);

        headerMenu.classList.add(styleClasses.headerMenu);
        headerMenu.classList.remove(styleClasses.hidden);        
    } else {
        headerMenu.classList.add(styleClasses.hidden);
        headerMenu.classList.remove(styleClasses.headerMenu);

        menuItemButtons.forEach((btn) => { 
            const list = btn.nextElementSibling;
            
            if (!list.classList.contains(styleClasses.hidden)) {
                expandOrCollapseList(list); 
            }
        });

        burgerIcon.src = mediaPaths.burgerOpen;
        burgerButton.classList.remove(styleClasses.burgerButtonExpanded);
    }
};

burgerButton.addEventListener("click", expandOrCollapseBurger);

const mediaQuery = window.matchMedia("(min-width: 768px)");

function handleQuery(e) {
    if (e.matches) {
        burgerButton.classList.add(styleClasses.hidden);
        headerMenu.classList.remove(styleClasses.headerMenu);
        headerMenu.classList.remove(styleClasses.hidden);

        previewSectionImage.src = mediaPaths.previewImageDesktop;
    } else {
        burgerButton.classList.remove(styleClasses.hidden);
        
        if (!burgerButton.classList.contains(styleClasses.burgerButtonExpanded)) {
            headerMenu.classList.add(styleClasses.hidden);
        }

        headerMenu.classList.add(styleClasses.headerMenu);
        
        previewSectionImage.src = mediaPaths.previewImageMobile;
    }
};

mediaQuery.addEventListener("change", handleQuery);

handleQuery(mediaQuery);