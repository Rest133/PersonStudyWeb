"use strict"

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

    const deadline = '2020-11-22';

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

    function toggleModal(){
        modalElement.classList.toggle('hide');
    }

    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.hasAttribute('data-modal')) {
            toggleModal();
            document.body.style.overflow = 'hidden';
        }
        if (target && target.hasAttribute('data-close') || target && target === modalElement) {
            toggleModal();
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown',(event)=>{
        if(event.code==='Escape' && !modalElement.classList.contains('hide')){
            toggleModal();
        }
    })
})
