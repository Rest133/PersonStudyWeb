import forms from "./forms";
import {getResources} from "../services/services";

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

export default pageCards;