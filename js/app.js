/* Задание на урок:

1) Создать переменную numberOfFilms и в неё поместить ответ от пользователя на вопрос:
'Сколько фильмов вы уже посмотрели?'

2) Создать объект personalMovieDB и в него поместить такие свойства:
    - count - сюда передается ответ на первый вопрос
    - movies - в это свойство поместить пустой объект
    - actors - тоже поместить пустой объект
    - genres - сюда поместить пустой массив
    - privat - в это свойство поместить boolean(логическое) значение false

3) Задайте пользователю по два раза вопросы:
    - 'Один из последних просмотренных фильмов?'
    - 'На сколько оцените его?'
Ответы стоит поместить в отдельные переменные
Записать ответы в объект movies в формате:
    movies: {
        'logan': '8.1'
    }

Проверить, чтобы все работало без ошибок в консоли */
"use strict";

let numberOfFilms = prompt("Сколько фильмов вы уже просмотрели?", "");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private: false
}

let nameOfMovie = prompt("Назовите один из последних просмотренных фильмов?", "");
let rateOfMovie = prompt("На сколько оцените его?", "");

personalMovieDB.movies[nameOfMovie]=rateOfMovie;

let nameOfMovie2 = prompt("Назовите еще один из последних просмотренных фильмов?", "");
let rateOfMovie2 = prompt("На сколько оцените уже его?", "");

personalMovieDB.movies[nameOfMovie2]=rateOfMovie2;

console.log(personalMovieDB);

