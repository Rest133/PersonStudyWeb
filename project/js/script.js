/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

// const adv_block = document.querySelector(".promo__adv");
// adv_block.remove();

let adv_blocks = document.querySelectorAll(".promo__adv img")
adv_blocks.forEach(item => {
    item.remove();
})

// adv_blocks.forEach(function (item) {
//     item.remove();
// })

let genre = document.querySelector(".promo__genre");
genre.innerHTML = "Драма";

let promoBackground = document.querySelector(".promo__bg");
promoBackground.style.cssText = `background: url(img/bg.jpg);`

let movieList = document.querySelectorAll(".promo__interactive-item");
movieDB.movies.sort();
for (let i = 0; i < movieDB.movies.length; i++) {
    movieList[i].textContent = `${i + 1}. ` + `${movieDB.movies[i]}`;
}

