const burgerButton = document.querySelector(".burger-menu__button");
const burgerMenuList = document.querySelector(".burger-menu__list");
const burgerMenuListHidden = "burger-menu__list_hidden";

const resourceUrls = {
    burgerClose: "./images/icon-close.svg",
    burgerExpand: "./images/icon-hamburger.svg"
};

function expandBurgerMenuList() {
    if (burgerMenuList.classList.contains(burgerMenuListHidden)) {
        burgerButton.firstElementChild.src = resourceUrls.burgerClose;
        burgerMenuList.classList.remove(burgerMenuListHidden);
    } else {
        burgerButton.firstElementChild.src = resourceUrls.burgerExpand;
        burgerMenuList.classList.add(burgerMenuListHidden);
    }
}

burgerButton.addEventListener("click", expandBurgerMenuList);