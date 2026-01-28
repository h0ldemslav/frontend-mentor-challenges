# Frontend Mentor - Clipboard landing page solution

This is a solution to the [Clipboard landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/clipboard-landing-page-5cc9bccd6c4c91111378ecb9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)

## Overview

### The challenge

Users should be able to:

-   View the optimal layout for the site depending on their device's screen size
-   See hover states for all interactive elements on the page

### Screenshot

![](screenshots/preview-desktop.png)

### Links

-   Solution URL: [GitHub repository](https://github.com/h0ldemslav/frontend-mentor-challenges/tree/master/junior/clipboard-landing-page-master)
-   Live Site URL: [GitHub Pages](https://h0ldemslav.github.io/frontend-mentor-challenges/junior/clipboard-landing-page-master/index.html)

## My process

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   Flexbox
-   CSS Grid
-   Mobile-first workflow
-   [BEM](https://getbem.com/introduction/)

### What I learned

This time around I was practicing BEM since I haven't really used it in a while. Although the challenge was in the junior category, I struggled a bit. I didn't really know what namings I should pick for my classes. The biggest issue was if the namings are general or not. And to what extent I should generalize.

Especially I had issues with the image and three headings and texts (Quick Search, iCloud Sync, Complete History). I ended up with the following markup:

```html
<div class="container clearfix">
    <img src="images/image-computer.png" alt="" class="container__image" />
    <ul class="container__list">
        <li class="container__item">
            <h3 class="container__heading3">Quick Search</h3>
            ...
        </li>
        <li class="container__item">
            <h3 class="container__heading3">iCloud Sync</h3>
            ...
        </li>
        <li class="container__item">
            <h3 class="container__heading3">Complete History</h3>
            ...
        </li>
    </ul>
</div>
```

Which is probably too general and may not be reused (not every container is the same). I was thinking too much about it and how to wrap these elements because logically and visually they belong to the section. However, I decided to do the way above.

Btw I learned that you can change the flow of the grid. Something that sounds very natural but I only discovered this while plaything with the challenge. I used it for the links in the footer:

```css
.footer__links {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
    column-gap: 6rem;
}
```

### Continued development

Use more BEM and combine it with utilities.

### Useful resources

-   [HTML validator](https://validator.w3.org/#validate_by_input)
-   [CSS validator](https://jigsaw.w3.org/css-validator/validator.html.en#validate_by_input)
-   [MDN docs](https://developer.mozilla.org/en-US/)
-   [CSS Grid breakdown by CSS Tricks](https://css-tricks.com/css-grid-layout-guide/)

## Author

-   GitHub - [h0ldemslav](https://github.com/h0ldemslav)
-   Frontend Mentor - [@h0ldemslav](https://www.frontendmentor.io/profile/h0ldemslav)
