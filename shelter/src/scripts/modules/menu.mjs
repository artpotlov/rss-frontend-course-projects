const HEADER = document.querySelector('.header')
const BURGER = document.querySelector('.burger')
const CONTAINER = HEADER.querySelector('.container')
const BODY = document.querySelector('body')

const openMenu = () => {
    HEADER.classList.add('header--active')
    BURGER.classList.add('burger--active')
    CONTAINER.classList.add('animation__move-left')
    BODY.style.overflow = 'hidden'
}

const closeMenu = () => {
    CONTAINER.classList.add('animation__move-right')
    BODY.style.overflow = 'auto'
    setTimeout(() => {
        CONTAINER.classList.remove('animation__move-left')
        CONTAINER.classList.remove('animation__move-right')
        HEADER.classList.remove('header--active')
        BURGER.classList.remove('burger--active')
    }, 300)
    
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