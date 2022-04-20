const HEADER = document.querySelector('.header')
const BURGER = document.querySelector('.burger')

const openMenu = () => {
    HEADER.classList.add('header--active')
    BURGER.classList.add('burger--active')
}

const closeMenu = () => {
    HEADER.classList.remove('header--active')
    BURGER.classList.remove('burger--active')
}

const openCloseMenu = (event) => {
    const classOfElement = event.target.classList

    if (classOfElement.contains('burger') || classOfElement.contains('burger__line')) {
        if (HEADER.classList.contains('header--active')) {
            closeMenu()
        } else {
            openMenu()
        }
    }

    if (classOfElement.contains('header') && classOfElement.contains('header--active')) {
        closeMenu()
    }

    if (classOfElement.contains('link') && HEADER.classList.contains('header--active')) {
        closeMenu()
    }
}

export { HEADER, openCloseMenu }