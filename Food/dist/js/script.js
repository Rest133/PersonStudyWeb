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

    const getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, alt, title, descr, price}) => {
                new Menu(img, alt, title, descr, price).render('.menu__field');
            });
        })

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', JSON.stringify(object))
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


    //Slider
    let slider = document.querySelector('.offer__slider'),
        allSlides = slider.querySelectorAll('.offer__slide'),
        currentSlideIndex = slider.querySelector('#current'),
        totalSlideIndex = slider.querySelector('#total');
    const prevSlideButton = slider.querySelector('.offer__slider-prev'),
        nextSlideButton = slider.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let index = 0;
    let offset = 0;

    sliderField.style.width = allSlides.length * 100 + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    allSlides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < allSlides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == index) dot.style.opacity = 1;
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextSlideButton.addEventListener('click', event => {
        if (offset == deleteNotDigits(width) * (allSlides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        index++;
        if (index >= allSlides.length) index = 0;
        changeCurrentSlideIndex(index + 1);
        sliderField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index].style.opacity = 1;
    });

    prevSlideButton.addEventListener('click', event => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (allSlides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        index--;
        if (index < 0) index = allSlides.length - 1;
        changeCurrentSlideIndex(index + 1);
        sliderField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to');
            index = slideTo - 1;
            offset = deleteNotDigits(width) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;
            changeCurrentSlideIndex(index + 1);

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[index].style.opacity = 1;
        })
    })

    function changeCurrentSlideIndex(index) {
        if (index < 10) {
            currentSlideIndex.textContent = `0${index}`;
        } else currentSlideIndex.textContent = index;
    }

    function initialiseSlider() {
        if (allSlides.length < 10) {
            totalSlideIndex.textContent = `0${allSlides.length}`;
        } else totalSlideIndex.textContent = `${allSlides.length}`;
        //changeSlide();
        changeCurrentSlideIndex(1);
    }

    initialiseSlider();

    //Calc
    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, weight, age, ratio = 1.375;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');

    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', event => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                })

                event.target.classList.add(activeClass);
                calcTotal();
            })
        })

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none;'
            }

            switch (input.getAttribute('id')) {
                case 'age':
                    age = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
            }
            calcTotal();
        })
    }

    getDynamicInformation('#age');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
})
