import pets from './pets.json'

BODY = document.querySelector('body')
CARDS = document.querySelector('.pet__cards')

const showPopUp = (numberOfPet) => {    
    const popUpTemplate = `
        <section class="popup">
        <div class="popup__container">
            <button class="popup__button button button__outline button__round">×</button>
            <div class="popup__content">
                <div class="popup__column">
                    <img src="${pets[numberOfPet].img}" alt="${pets[numberOfPet].name}" class="popup__image">
                </div>
                <div class="popup__column">
                    <h3 class="popup__title">${pets[numberOfPet].name}</h3>
                    <h4 class="popup__subtitle">${pets[numberOfPet].type} - ${pets[numberOfPet].breed}</h4>
                    <h5 class="popup__description">${pets[numberOfPet].description}</h5>
                    <ul class="popup__list">
                        <li class="popup__item">
                            <strong>Age:</strong> ${pets[numberOfPet].age}
                        </li>
                        <li class="popup__item">
                            <strong>Inoculations:</strong> ${pets[numberOfPet].inoculations}
                        </li>
                        <li class="popup__item">
                            <strong>Diseases:</strong> ${pets[numberOfPet].diseases}
                        </li>
                        <li class="popup__item">
                            <strong>Parasites:</strong> ${pets[numberOfPet].parasites}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    `
    BODY.style.overflow = 'hidden'
    BODY.insertAdjacentHTML('afterbegin', popUpTemplate)

    const POPUP = document.querySelector('.popup')
    const BUTTON = POPUP.querySelector('.popup__button')

    POPUP.classList.add('animation__pop-up-show')
    POPUP.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__button')) {
            closePopUp()
        }
    })

    POPUP.addEventListener('mouseover', (event) => {
        if(event.target.classList.contains('popup') || event.target.classList.contains('popup__container')) {
            BUTTON.classList.add('button__fill')
            BUTTON.classList.remove('button__outline')
        } else {
            BUTTON.classList.add('button__outline')
            BUTTON.classList.remove('button__fill')
        }
    })
}

const closePopUp = () => {
    const POPUP = document.querySelector('.popup')
    POPUP.classList.add('animation__pop-up-close')
    setTimeout(() => {
        POPUP.remove()
        BODY.style.overflow = 'auto'
    }, 300)
}

const popUp = (event) => {
    if (event.target.classList.contains('pet__card') || event.target.parentElement.classList.contains('pet__card')) {
        const petNumber = event.target.dataset.petNumber === undefined ? event.target.parentElement.dataset.petNumber : event.target.dataset.petNumber
        if (petNumber !== undefined) {
            showPopUp(petNumber)
        }
    }
}

export { CARDS, popUp }