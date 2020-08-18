'use strict';

let self = this;

let base = 60;
let clocktimer, startDate, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;

let h = 1;
let m = 1;
let tm = 1;
let s = 0;
let ts = 0;
let ms = 0;
let init = 0;

//функция для очистки поля
function clearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  document.clockForm.stopwatch.value = '00:00:00.000';
}

//функция для старта секундомера
function startTime() {
  let currentDate = new Date();
  let difference = (currentDate.getTime() - startDate.getTime());

  if (difference > 999) {
    milliseconds = difference % 1000;
    seconds = parseInt(difference / 1000);
  } else {
    milliseconds = difference;
  }

  if (seconds > 0) {
    minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
  }
  
  if (minutes > 0) {
    hours = parseInt(minutes / 60);
    minutes = minutes % 60;
  }
  
  document.clockForm.stopwatch.value = prepareTime(hours, minutes, seconds, milliseconds);
  clocktimer = setTimeout("startTime()", 1);
}

//преобразует время в строку
function prepareTime(hours, minutes, seconds, milliseconds) {
  let strMinutes = minutes < 10 ? '0' + minutes : minutes;
  let strSeconds = seconds < 10 ? '0' + seconds : seconds;
  let strMilliseconds = milliseconds < 10 ? '00' + milliseconds : 
  milliseconds < 100 ? '0' + milliseconds : milliseconds;
  return hours + ':' + strMinutes + ':' + strSeconds + '.' + strMilliseconds;
}

// преобразует строку со времененм в миллисекунды
function getMilliseconds(time) {
  let parsedTime = time.split('.');
  let withoutMilliseconds = parsedTime[0].split(':');
  return parseInt(withoutMilliseconds[0]) * 3600 + parseInt(withoutMilliseconds[1]) * 60 + 
  parseInt(withoutMilliseconds[2]) + parsedTime[1];
}

//преобразует миллисекунды в строку со временем
function getTime(milliseconds) {
  let timeZoneOffsetMilliseconds = new Date().getTimezoneOffset() * 60000;
  let date = new Date(milliseconds + timeZoneOffsetMilliseconds);
  let rusult = prepareTime(parseInt(date.getHours()), parseInt(date.getMinutes()), parseInt(date.getSeconds()), parseInt(date.getMilliseconds()));
  let parsedTime = rusult.split('.');
  return parsedTime[0];
}

//функция запуска и остановки
function startStop() {
  if (init == 0) {
    clearСlock();
    startDate = new Date();
    startTime();
    init = 1;
    document.querySelector('.game-timer').style.visibility = 'visible';
  } else {
    init = 0;
    document.querySelector('.game-timer').style.visibility = 'hidden';
  }
}


