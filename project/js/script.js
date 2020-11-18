/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

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

let adv_blocks = document.querySelectorAll(".promo__adv, img")
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

let movieList = document.querySelector(".promo__interactive-list");
movieDB.movies.sort();

let addMovieForm = document.querySelector('.add');
let submitMovieFormButton = addMovieForm.querySelector('button');

function addMovieOnPage() {
    movieList.innerHTML = "";

    movieDB.movies.forEach(movie => {
        movieList.innerHTML += `<li class="promo__interactive-item">${movie} <div class="delete"></div> </li>`
    });
}

function addMovieToDB() {
    let inputMovieForm = addMovieForm.querySelector('.adding__input').value;
    if (inputMovieForm == null || inputMovieForm == ''){
        return;
    }else if (inputMovieForm.length >= 21) {
        inputMovieForm = inputMovieForm.slice(0, 21) + "...";
    }

    if (addMovieForm.querySelectorAll('input')[1].checked) { // addMovieForm.querySelectorAll('[type="checkbox"]').checked
        console.log('Добавляем любимый фильм');
    }
    movieDB.movies.push(inputMovieForm);
    movieDB.movies.sort();

    addMovieOnPage();
    addMoveToTrash();
}

submitMovieFormButton.addEventListener("click", (event) => { //.addEventListener("submit", ()=>{})
    event.preventDefault();
    addMovieToDB();
});

function addMoveToTrash() {
    let trashOfMovies = movieList.querySelectorAll('.delete');
    trashOfMovies.forEach(trash => {
        trash.addEventListener('click', (event) => {
            for (let i = 0; i < movieDB.movies.length; i++) {
                if (movieDB.movies[i] == trash.parentElement.textContent) {
                    movieDB.movies.splice(i, 1);
                }
            }
            trash.parentElement.remove();
        })
    })
}
