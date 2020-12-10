"use strict"

window.addEventListener("DOMContentLoaded", () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        pageCards = require('./modules/pageCards'),
        forms = require('./modules/forms'),
        pageTimer = require('./modules/pageTimer'),
        slider = require('./modules/slider'),
        pageCalculator = require('./modules/pageCalculator');

    tabs();
    modal();
    pageCards();
    forms();
    pageTimer();
    slider();
    pageCalculator();
})
