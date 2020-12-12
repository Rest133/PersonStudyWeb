/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/forms.js":
/*!*****************************!*
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(selectorForm) {
    //Forms

    const forms = document.querySelectorAll(selectorForm);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    })


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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.toggleModal)();
        }, 4000)
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "toggleModal": () => /* binding */ toggleModal
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");



function toggleModal(modalElement) {
    modalElement.classList.toggle('hide');
    document.body.style.overflow = '';
}

const modalTimerId = setTimeout(toggleModal, 10000);

function modal(modalSelector) {
    const modalElement = document.querySelector(modalSelector);

    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.hasAttribute('data-modal')) {
            toggleModal(modalElement);
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }
        if (target && target.hasAttribute('data-close') || target && target === modalElement) {
            toggleModal(modalElement);
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && !modalElement.classList.contains('hide')) {
            toggleModal(modalElement);
        }
    })


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            toggleModal(modalElement);
            document.body.style.overflow = 'hidden';
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/pageCalculator.js":
/*!**************************************!*
  !*** ./js/modules/pageCalculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");


function pageCalculator() {

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pageCalculator);

/***/ }),

/***/ "./js/modules/pageCards.js":
/*!*********************************!*
  !*** ./js/modules/pageCards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function pageCards() {
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

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, alt, title, descr, price}) => {
                new Menu(img, alt, title, descr, price).render('.menu__field');
            });
        })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pageCards);

/***/ }),

/***/ "./js/modules/pageTimer.js":
/*!*********************************!*
  !*** ./js/modules/pageTimer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");


function pageTimer(timerSelector, deadline) {

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

    setClock(timerSelector, deadline);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pageTimer);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");


function slider() {
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
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./js/modules/forms.js");


function tabs(tabsSelector,tabsContentSelector, tabsParentSelector,activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.style.display = "none";
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains(tabsSelector.slice(1))) {
                tabs.forEach((element, i) => {
                    if (target === element) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            }
        }
    )
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_pageCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/pageCards */ "./js/modules/pageCards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_pageTimer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/pageTimer */ "./js/modules/pageTimer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_pageCalculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/pageCalculator */ "./js/modules/pageCalculator.js");


;







window.addEventListener("DOMContentLoaded", () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('.modal');
    (0,_modules_pageCards__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__.default)('form');
    (0,_modules_pageTimer__WEBPACK_IMPORTED_MODULE_4__.default)('.timer','2020-12-31');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_pageCalculator__WEBPACK_IMPORTED_MODULE_6__.default)();
})


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResources": () => /* binding */ getResources
/* harmony export */ });
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

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map