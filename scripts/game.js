"use strict";

window.onbeforeunload = function() {
  return "Данные могут быть потеряны. Продолжить?";
};

function GameProcess(word, input, enteredLetter) {
  let self = this;
  let storage = {};
  // возвращает длину слова
  self.getWordLength = function(word) {
    let arr = word.split('');
    let lenght = arr.length;
    return lenght;
  };
  // возвращает положение буквы в слове, если она есть, если нет - пустой массив
  self.getLettersLocation = function(word, enteredLetter) {
    let array = [];
    let presentLetters = word.split('');
    for (let i=0; i < presentLetters.length; i++) {
      if (presentLetters[i] == enteredLetter) {
        array.push(i+1);
      }
    }
    return array;
  };
  // возвращает букву, если она отсутствует в слове, если присутствует - null
  self.getAbsentLetters = function(word, enteredLetter){
    let absentLetter = null;
    let presentLetters = word.split('');
    if (presentLetters.includes(enteredLetter)) {
      absentLetter = null;
    }
    else {
      absentLetter = enteredLetter;
    }
    return absentLetter;
  };
  // выбирает слово из массива и записывает его в storage
  self.getRandomWord = function() {
    let words = ["собака", "лестница", "оглавление", "погода", "телевизор", "досуг", "карамель", "линейка", "озеро", "гладиолус", "снеговик", "берлога", "критика", "колено", "капуста"];
    let randomIndex = Math.floor(Math.random() * words.length);
    return (words[randomIndex]);
  };
  // проверяет введенное слово
  self.checkWord = function(word) {
    if( (word.search(/[А-яЁё]/g) != 0) || word === '' || word.lenght > 15) {
      return false;
    }
    else {
      return true;
    }
  };
  // записывает слово в storage
  self.saveWord = function(word) {
    storage['wordToGuess'] = word;
  };
  // извлекает слово из storage и возвращает его
  self.getWordFromStorage = function() {
    let word = storage['wordToGuess'];
    return word;
  };
  // проверяет введенную букву (русская/нет), выводит/прячет ошибку, возвращает букву, если верная
  self.checkEnteredLetter = function(enteredLetter) {
    if( enteredLetter.search(/[А-яЁё]/) === -1 || enteredLetter === "") {
      return false;
    }
    else {
      return true;
    }
  };
  // считывает и возвращает вписанную букву
  self.readEnteredLetter = function(input) {
    let enteredLetter = (input.value).toLowerCase();
    return enteredLetter;
  };
  // обновляет количество попыток(9)
  self.setLeftAttempts = function() {
    let attempts = 9;
    storage['leftAttempts'] = 9;
  };
  // уменьшает количество попыток
  self.decreaseAttempts = function() {
    let attempts = storage['leftAttempts'];
    attempts--;
    storage['leftAttempts'] = attempts;
  };
  // возвращает количество оставшихся попыток
  self.getAttemptsFromStorage = function() {
    let attempts = storage['leftAttempts'];
    return attempts;
  };
  // если все буквы слова вписаны, возвращает true, иначе - false
  self.isGuessed = function(word) {
    let el = document.querySelectorAll('.letters-lines-full');
    let arr = word.split('');
    let neededLength = arr.length;
    let factLength = el.length;
    if (neededLength === factLength) {
      return true;
    }
    else if (factLength > neededLength) {
      console.log ('Ошибка в методе isGuessed');
    }
    else {
      return false;
    }
  };
  
}

function GameView(word, wordLength, enteredLetter, attempts, lettersLocation, absentLetter) {
  let self = this;

  // рисует количество букв полосочками
  self.drawLines = function(wordLength) {
    let wordField = document.querySelector(".letters-lines");
    let countId = 1;
    while ( wordLength > 0) {
      let wordLine = document.createElement('span');
      wordLine.className = 'letters-lines-empty';
      wordField.appendChild(wordLine);
      wordLine.id = countId;
      wordLength--;
      countId++;
    }
  };
  // рисует элементы виселицы в зависимости от оставшихся попыток
  self.drawHangman = function(attempts) {
    let hangmanArea = document.querySelector(".hangman-image");
    if (attempts == 8) {
      let base = document.createElementNS("http://www.w3.org/2000/svg",'line');
      base.setAttribute("stroke","black");
      base.setAttribute("stroke-width",5);
      base.setAttribute("x1",45);
      base.setAttribute("y1",420);
      base.setAttribute("x2",120);
      base.setAttribute("y2",420);
      hangmanArea.appendChild(base);
    }
    else if (attempts == 7) {
      let steam = document.createElementNS("http://www.w3.org/2000/svg",'line');
      steam.setAttribute("stroke","black");
      steam.setAttribute("stroke-width",5);
      steam.setAttribute("x1",55);
      steam.setAttribute("y1",45);
      steam.setAttribute("x2",55);
      steam.setAttribute("y2",420);
      hangmanArea.appendChild(steam);
      
    }
    else if (attempts == 6) {
      let branch = document.createElementNS("http://www.w3.org/2000/svg",'line');
      branch.setAttribute("stroke","black");
      branch.setAttribute("stroke-width",5);
      branch.setAttribute("x1",45);
      branch.setAttribute("y1",45);
      branch.setAttribute("x2",340);
      branch.setAttribute("y2",45);
      hangmanArea.appendChild(branch);
    }
    else if (attempts == 5) {
      let connector = document.createElementNS("http://www.w3.org/2000/svg",'line');
      connector.setAttribute("stroke","black");
      connector.setAttribute("stroke-width",5);
      connector.setAttribute("x1",55);
      connector.setAttribute("y1",130);
      connector.setAttribute("x2",150);
      connector.setAttribute("y2",45);
      hangmanArea.appendChild(connector);
    }
    else if (attempts == 4) {
      let rope = document.createElementNS("http://www.w3.org/2000/svg",'line');
      rope.setAttribute("stroke","black");
      rope.setAttribute("stroke-width",5);
      rope.setAttribute("x1",220);
      rope.setAttribute("y1",47);
      rope.setAttribute("x2",220);
      rope.setAttribute("y2",107);
      hangmanArea.appendChild(rope);
    }
    else if (attempts == 3) {
      let head = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
      head.setAttribute("stroke","black");
      head.setAttribute("stroke-width",3);
      head.setAttribute("fill","white");
      head.setAttribute("cx",220);
      head.setAttribute("cy",140);
      head.setAttribute("rx",29);
      head.setAttribute("ry",32);
      hangmanArea.appendChild(head);
    }
    else if (attempts == 2) {
      let body = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
      body.setAttribute("stroke","black");
      body.setAttribute("stroke-width",5);
      body.setAttribute("fill","white");
      body.setAttribute("cx",222);
      body.setAttribute("cy",224);
      body.setAttribute("rx",26);
      body.setAttribute("ry",51);
      hangmanArea.appendChild(body);
    }
    else if (attempts == 1) {
      let leftHand = document.createElementNS("http://www.w3.org/2000/svg",'line');
      leftHand.setAttribute("stroke","black");
      leftHand.setAttribute("stroke-width",3);
      leftHand.setAttribute("x1",245);
      leftHand.setAttribute("y1",199);
      leftHand.setAttribute("x2",289);
      leftHand.setAttribute("y2",167);
      hangmanArea.appendChild(leftHand);
      let rightHand = document.createElementNS("http://www.w3.org/2000/svg",'line');
      rightHand.setAttribute("stroke","black");
      rightHand.setAttribute("stroke-width",3);
      rightHand.setAttribute("x1",197);
      rightHand.setAttribute("y1",210);
      rightHand.setAttribute("x2",159);
      rightHand.setAttribute("y2",176);
      hangmanArea.appendChild(rightHand);
    }
    else {
      let leftLeg = document.createElementNS("http://www.w3.org/2000/svg",'line');
      leftLeg.setAttribute("stroke","black");
      leftLeg.setAttribute("stroke-width",3);
      leftLeg.setAttribute("x1",236);
      leftLeg.setAttribute("y1",268);
      leftLeg.setAttribute("x2",267);
      leftLeg.setAttribute("y2",318);
      hangmanArea.appendChild(leftLeg);
      let rightLeg = document.createElementNS("http://www.w3.org/2000/svg",'line');
      rightLeg.setAttribute("stroke","black");
      rightLeg.setAttribute("stroke-width",3);
      rightLeg.setAttribute("x1",212);
      rightLeg.setAttribute("y1",269);
      rightLeg.setAttribute("x2",178);
      rightLeg.setAttribute("y2",325);
      hangmanArea.appendChild(rightLeg);
    }
  };
  // отображает совпадающую букву в слове
  self.drawLetter = function(enteredLetter, lettersLocation) {
    if (lettersLocation.length > 0) {
      for ( let i=0; lettersLocation.length > i; i++ ) {
        let position = document.getElementById(lettersLocation[i]);
        position.textContent = enteredLetter;
        position.className = 'letters-lines-full';
      }
    }
    else {
      console.log('В слове нет введенной буквы!');
    }
  };
  // отображает отсутствующую букву в специальном поле
  self.drawAbsentLetter = function(absentLetter) {
    let absentLettersField = document.querySelector('.absent-letters');
    let absentLettersSpan = document.createElement('p');
    absentLettersSpan.textContent = absentLetter;
    absentLettersSpan.className = 'absent-letters-section';
    absentLettersField.appendChild(absentLettersSpan);
  };
  // отображает финальное окно с результатом игры
  self.endGame = function(word) {
    let modalWindow = document.querySelector('.end-block-layer');
    modalWindow.style.visibility = 'visible';
    let resultWord = document.querySelector('.result-word');
    resultWord.innerHTML = word;
  };
}


let newGame = new GameProcess();
let newView = new GameView();
let recordsList;

function onePlayerGame() {
  startStop();
  read();
  let modalLayer = document.querySelector('.block-layer');
  modalLayer.style.visibility = 'hidden';
  let choosenWord = newGame.getRandomWord();
  newGame.saveWord(choosenWord);
  let attemptsLeft = newGame.setLeftAttempts();
  let wordLength = newGame.getWordLength(choosenWord);
  newView.drawLines(wordLength);
}

function twoPlayersGame() {
  let modalLayer = document.querySelector('.block-layer');
  modalLayer.style.visibility = 'hidden';
  let wordRequest = document.querySelector('.word-block-layer');
  wordRequest.style.visibility = 'visible';
}

let checkButtonWord = document.querySelector('.word-read');
checkButtonWord.addEventListener('click', wordHandling);

function wordHandling() {
  let inputResult = document.querySelector('.word-input');
  let enteredWord = (inputResult.value).toLowerCase();
  let checkWordResult = newGame.checkWord(enteredWord);
  if (checkWordResult) {
    document.querySelector('.word-input-error').innerHTML = '';  
    newGame.saveWord(enteredWord);
    let wordLength = newGame.getWordLength(enteredWord);
    let attemptsLeft = newGame.setLeftAttempts();
    newView.drawLines(wordLength);
    let wordRequest = document.querySelector('.word-block-layer');
    wordRequest.style.visibility = 'hidden';
    startStop();
    read();
  }
  else {
    document.querySelector('.word-input-error').innerHTML = 'Введите слово на руском не более 15 символов';
  }
}

let onePlayerButton = document.querySelector('.players-number__button-one');
onePlayerButton.addEventListener('click', onePlayerGame);
let twoPlayersButton = document.querySelector('.players-number__button-two');
twoPlayersButton.addEventListener('click', twoPlayersGame);


function letterHandling() {
  let input = document.querySelector(".letters-input");
  let enteredLetter = newGame.readEnteredLetter(input);
  let checkResult = newGame.checkEnteredLetter(enteredLetter);
  if (checkResult) {
    document.querySelector('.letters-input-error').innerHTML = '';
    let choosenWord = newGame.getWordFromStorage();
    let absentLetter = newGame.getAbsentLetters(choosenWord, enteredLetter);
    let attemptsLeft = newGame.getAttemptsFromStorage();
    if ((absentLetter === null) && (attemptsLeft > 0)) {
      let lettersLocation = newGame.getLettersLocation(choosenWord, enteredLetter);
      newView.drawLetter(enteredLetter, lettersLocation);
      if (newGame.isGuessed(choosenWord)) {
        startStop();
        let timeStop = document.querySelector('.game-timer-board').value;
        let timeStopMs = getMilliseconds(timeStop);
        let recordKeys = [];
        recordsList = JSON.parse(listInfo);
        for (let key in recordsList) {
	        recordKeys.push(key);
        }
        if (recordKeys.length < 10) {
          document.querySelector('.new-record-block-layer').style.visibility = 'visible';
          document.querySelector('.record-name-submit').addEventListener('click', saveToStorage);
          document.querySelector('.new-record-block-close').addEventListener('click', saveRefusal);
          function saveRefusal() {
            document.querySelector('.new-record-block-layer').style.visibility = 'hidden';
            newView.endGame(choosenWord);
            let resultCongrats = document.querySelector('.result-game');
            resultCongrats.innerHTML = 'Вы выиграли';
          }
          function saveToStorage() {
            let nameRecord = document.querySelector('.record-name-input').value;
            recordsList[timeStopMs] = nameRecord;
            storeInfo();
            document.querySelector('.new-record-block-layer').style.visibility = 'hidden';
            newView.endGame(choosenWord);
            let resultCongrats = document.querySelector('.result-game');
            resultCongrats.innerHTML = 'Вы выиграли';
          }
        }
        else if (recordKeys[9] > timeStopMs) {
          document.querySelector('.new-record-block-layer').style.visibility = 'visible';
          document.querySelector('.record-name-submit').addEventListener('click', saveToStorage);
          document.querySelector('.record-name-submit').addEventListener('click', saveRefusal);
          function saveRefusal() {
            newView.endGame(choosenWord);
            document.querySelector('.new-record-block-layer').style.visibility = 'hidden';
            let resultCongrats = document.querySelector('.result-game');
            resultCongrats.innerHTML = 'Вы выиграли';
          }
          function saveToStorage() {
            let nameRecord = document.querySelector('.record-name-input').value;
            delete recordsList[recordKeys[9]];
            recordsList[timeStopMs] = nameRecord;
            storeInfo();
            document.querySelector('.new-record-block-layer').style.visibility = 'hidden';
            newView.endGame(choosenWord);
            let resultCongrats = document.querySelector('.result-game');
            resultCongrats.innerHTML = 'Вы выиграли';
          }
        }
        else {
          newView.endGame(choosenWord);
          let resultCongrats = document.querySelector('.result-game');
          resultCongrats.innerHTML = 'Вы выиграли';
        }
      }
    }
    else if (attemptsLeft > 0) {
      newView.drawAbsentLetter(absentLetter);
      newGame.decreaseAttempts();
      attemptsLeft = newGame.getAttemptsFromStorage();
      newView.drawHangman(attemptsLeft);
      if (attemptsLeft == 0) {
        startStop();
        let stopTime = document.querySelector
        newView.endGame(choosenWord);
        let resultLose = document.querySelector('.result-game');
        resultLose.innerHTML = 'Вы проиграли';
      }
    }
  }
  else {
    document.querySelector('.letters-input-error').innerHTML = "Введите русскую букву";
    input.focus();
  }
}

let checkButton = document.querySelector('.letters-read');
checkButton.addEventListener('click', letterHandling);

