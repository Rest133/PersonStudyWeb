"use strict"

class Menu {
    constructor(srcImage, alt, title, text, price, ...classes) {
        this.srcImage = srcImage;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
        this.classes = classes;
        this.transfer = 1;

        this.transferTo();
    }

    transferTo() {
        this.price = this.price * this.transfer;
    }

    render(parentElement) {
        let childElement = document.querySelector(parentElement).firstElementChild;
        let classString = '';
        this.classes.forEach(className => classString += ` ${className}`);
        if (classString == '') {
            classString = 'menu__item';
        }
        childElement.innerHTML += `
                <div class="${classString}">
                <img src=${this.srcImage} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                </div>`
    }
}

window.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.style.display = "none";
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((element, i) => {
                    if (target === element) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            }
        }
    )

    //Timer

    const deadline = '2020-12-31';

    function getTimeRemaining(deadline) {
        let time, days, hours, minutes, seconds;
        time = Date.parse(deadline) - Date.parse(new Date());
        days = Math.floor(time / (1000 * 60 * 60 * 24));
        hours = Math.floor((time / (1000 * 60 * 60) % 24)) - 3;
        minutes = Math.floor((time / 1000 / 60) % 60);
        seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        let days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = `${getZero(t.days)}`
            hours.innerHTML = `${getZero(t.hours)}`
            minutes.innerHTML = `${getZero(t.minutes)}`
            seconds.innerHTML = `${getZero(t.seconds)}`

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal
    const modalElement = document.querySelector('.modal')

    function toggleModal() {
        modalElement.classList.toggle('hide');
        document.body.style.overflow = '';
    }

    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.hasAttribute('data-modal')) {
            toggleModal();
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }
        if (target && target.hasAttribute('data-close') || target && target === modalElement) {
            toggleModal();
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && !modalElement.classList.contains('hide')) {
            toggleModal();
        }
    })

    const modalTimerId = setTimeout(toggleModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            toggleModal();
            document.body.style.overflow = 'hidden';
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. ' +
        'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        "229",
        'menu__item',
    ).render('.menu__field')

    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и ' +
        'качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        "550",
        'menu__item'
    ).render('.menu__field')

    new Menu(
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного ' +
        'происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу ' +
        'и импортных вегетарианских стейков.',
        "430",
    ).render('.menu__field')


    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // чтобы страница не перезагружалась при отправки формы, так как это стандартное поведени браузера

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); // при верстке важно указывать аттрибут name в инпутах формы

            const object = {};

            formData.forEach(function (value, key) {
                object[key] = value;
            })

            fetch('server.php', {
                method: "POST",

                headers: {
                    'Content-type': 'application/json'
                },

                body: JSON.stringify(object)
            }).then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        thanksModal.parentElement.classList.remove('hide');
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            toggleModal();
        }, 4000)
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({name: "Alex"}),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
})
