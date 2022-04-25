import pets from './pets.json'

const CARDS = document.querySelector('.pet__cards')
const PAGINATION = document.querySelector('.pagination')
const CURRENT = PAGINATION.querySelector('[data-page="current"]')
let cards = []
let countCards = 0
let pages = 0
let currentPage = 0

const genCards = () => {
    let cards = []
    let cardsTmp = []

    while (cards.length < 48) {
        while (cardsTmp.length < 8) {
            const numberOfCard = Math.floor(Math.random() * pets.length)
            if (!cardsTmp.includes(numberOfCard)) {
                cardsTmp.push(numberOfCard)
            }
        }
        cards.push(...cardsTmp)
        cardsTmp = []
    }

    return cards
}

const insertCards = (cards, posSt, posEn) => {
    CARDS.classList.add('animation__fade')
    

    setTimeout(() => {
        while (CARDS.children.length !== 0) {
            CARDS.lastElementChild.remove()
        }
        cards.slice(posSt, posEn).forEach(num => {
            const petImage = new Image()
            petImage.src = pets[num].img
            let cardTemplate = `
                <div class="pet__card" data-pet-number="${num}">
                    <img class="pet__card-image" src="${petImage.src}" alt="${pets[num].name}">
                    <h4 class="pet__card-name">${pets[num].name}</h4>
                    <button class="button button__outline">Learn more</button>
                </div>
            `
    
            CARDS.insertAdjacentHTML('beforeend', cardTemplate)
        })
        CARDS.classList.remove('animation__fade')
    }, 250)

    
}

const checkPagBtn = () => {
    const START = PAGINATION.querySelector('[data-page="start"]')
    const PREV = PAGINATION.querySelector('[data-page="prev"]')
    const NEXT = PAGINATION.querySelector('[data-page="next"]')
    const END = PAGINATION.querySelector('[data-page="end"]')
    
    if (currentPage === 0) {
        START.classList.add('button--disabled')
        PREV.classList.add('button--disabled')
        NEXT.classList.remove('button--disabled')
        END.classList.remove('button--disabled')
    }

    if (currentPage === pages - 1) {
        START.classList.remove('button--disabled')
        PREV.classList.remove('button--disabled')
        NEXT.classList.add('button--disabled')
        END.classList.add('button--disabled')
    }

    if (currentPage > 0 && currentPage < pages - 1) {
        START.classList.remove('button--disabled')
        PREV.classList.remove('button--disabled')
        NEXT.classList.remove('button--disabled')
        END.classList.remove('button--disabled')
    }
}

const updateCards = (event) => {
    if (event.target.dataset.page === 'start') {
        if (currentPage !== 0) {
            currentPage = 0
            insertCards(cards, currentPage, currentPage + countCards)
            CURRENT.textContent = currentPage + 1
            checkPagBtn()
        }
    }
    
    if (event.target.dataset.page === 'prev') {
        if (currentPage > 0) {
            currentPage -= 1
            insertCards(cards, currentPage * countCards, currentPage * countCards + countCards)
            CURRENT.textContent = currentPage + 1
            checkPagBtn()
        }
    }

    if (event.target.dataset.page === 'next') {
        if (currentPage < pages - 1) {
            currentPage += 1
            insertCards(cards, currentPage * countCards, currentPage * countCards + countCards)
            CURRENT.textContent = currentPage + 1
            checkPagBtn()
        }
    }

    if (event.target.dataset.page === 'end') {
        if (currentPage !== pages - 1) {
            currentPage = pages - 1
            insertCards(cards, currentPage * countCards, currentPage * countCards + countCards)
            CURRENT.textContent = currentPage + 1
            checkPagBtn()
        }
    }
}

const initCards = () => {
    cards = genCards()

    if (window.matchMedia('(min-width: 1280px)').matches) {
        countCards = 8
        pages = 48 / 8
    }
    if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
        countCards = 6
        pages = 48 / 6
    }
    if (window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches) {
        countCards = 3
        pages = 48 / 3
    }

    insertCards(cards, 0, countCards)
    PAGINATION.addEventListener('click', (event) => updateCards(event))


}

export { initCards }