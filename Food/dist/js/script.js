"use strict"

import tabs from './modules/tabs';
import modal from './modules/modal';
import pageCards from './modules/pageCards';
import forms from './modules/forms';
import pageTimer from './modules/pageTimer';
import slider from './modules/slider';
import pageCalculator from './modules/pageCalculator';

window.addEventListener("DOMContentLoaded", () => {

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('.modal');
    pageCards();
    forms('form');
    pageTimer('.timer','2020-12-31');
    slider();
    pageCalculator();
})
