import pets from './pets.json'

const CARDS = document.querySelector('.our-friends__cards')
const CARD_TRACK = document.querySelector('.our-friends__card-track')
let cards = []

const generateRandomNumberOfCard = (arr, count) => {
    const cards = []
    while (cards.length < count) {
        const numberOfCard = Math.floor(Math.random() * pets.length)

        if (!arr.includes(numberOfCard) && !cards.includes(numberOfCard)) {
            cards.push(numberOfCard)
        }
    }
    return cards
}

const updateCards = (count, direction) => {
    if (direction === 'left') {
        for (let i = 0; i < count * 2; i++) {
            cards.pop()
            CARD_TRACK.children[count].remove()
        }
    
        const currentNumbersOfCard = cards
        const leftNumbersOfCard = generateRandomNumberOfCard(currentNumbersOfCard, count)
        const rightNumbersOfCard = generateRandomNumberOfCard(currentNumbersOfCard, count)
        cards = [...leftNumbersOfCard, ...currentNumbersOfCard, ...rightNumbersOfCard]
    
        leftNumbersOfCard.forEach(number => insertCard('afterbegin', number))
        rightNumbersOfCard.forEach(number => insertCard('beforeend', number))
    }

    if (direction === 'right') {
        for (let i = 0; i < count * 2; i++) {
            cards.shift()
            CARD_TRACK.children[0].remove()
        }
    
        const currentNumbersOfCard = cards
        const leftNumbersOfCard = generateRandomNumberOfCard(currentNumbersOfCard, count)
        const rightNumbersOfCard = generateRandomNumberOfCard(currentNumbersOfCard, count)
        cards = [...leftNumbersOfCard, ...currentNumbersOfCard, ...rightNumbersOfCard]
    
        leftNumbersOfCard.forEach(number => insertCard('afterbegin', number))
        rightNumbersOfCard.forEach(number => insertCard('beforeend', number))
    }
}

const insertCard = (position, numberOfCard) => {
    const imageSource = pets[numberOfCard].img
    const petName = pets[numberOfCard].name
    let imageTmp = new Image()
    imageTmp.src = imageSource
    const petCardTemplate = `
        <div class="our-friends__card pet__card" data-pet-number="${numberOfCard}">
        <img class="pet__card-image" src="${imageTmp.src}" alt="${petName}">
        <h4 class="pet__card-name">${petName}</h4>
        <button class="button button__outline">Learn more</button>
        </div>
    `
    CARD_TRACK.insertAdjacentHTML(position, petCardTemplate)
}

const slide = (event) => {
    let blockClick = false
    if (event.target.dataset.sliderButton === 'left' && !blockClick) {
        blockClick = true

        CARD_TRACK.classList.add('animation__slide-to-left')
        
        setTimeout(() => {
            if (window.matchMedia('(min-width: 1280px)').matches) updateCards(3, 'left')
            if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) updateCards(2, 'left')
            if (window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches) updateCards(1, 'left')

            CARD_TRACK.classList.remove('animation__slide-to-left')
            blockClick = false
        }, 280)
    }

    if (event.target.dataset.sliderButton === 'right' && !blockClick) {
        blockClick = true

        CARD_TRACK.classList.add('animation__slide-to-right')
        
        setTimeout(() => {
            if (window.matchMedia('(min-width: 1280px)').matches) updateCards(3, 'right')
            if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) updateCards(2, 'right')
            if (window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches) updateCards(1, 'right')

            CARD_TRACK.classList.remove('animation__slide-to-right')
            blockClick = false
        }, 280)
    }
}

const initCard = () => {
    if (window.matchMedia('(min-width: 1280px)').matches) {
        cards = []

        cards.push(...generateRandomNumberOfCard([], 3))
        cards.push(...generateRandomNumberOfCard(cards.slice(0,3), 3))
        cards.push(...generateRandomNumberOfCard(cards.slice(3,6), 3))

        cards.forEach(el => insertCard('beforeend', el))
    }
    
    if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
        cards = []

        while(CARD_TRACK.children.length > 0) {
            CARD_TRACK.lastElementChild.remove()
        }

        cards.push(...generateRandomNumberOfCard([], 2))
        cards.push(...generateRandomNumberOfCard(cards.slice(0,2), 2))
        cards.push(...generateRandomNumberOfCard(cards.slice(2,4), 2))

        cards.forEach(el => insertCard('beforeend', el))
    }

    if (window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches) {
        cards = []

        while(CARD_TRACK.children.length > 0) {
            CARD_TRACK.lastElementChild.remove()
        }

        cards.push(...generateRandomNumberOfCard([], 1))
        cards.push(...generateRandomNumberOfCard(cards.slice(0,1), 1))
        cards.push(...generateRandomNumberOfCard(cards.slice(0,2), 1))

        cards.forEach(el => insertCard('beforeend', el))
    }

    CARDS.addEventListener('click', (event) => slide(event))
}

export { CARDS, initCard, slide }






