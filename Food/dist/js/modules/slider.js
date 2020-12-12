import forms from "./forms";

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


export default slider;