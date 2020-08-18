'use strict';

read();

// records
let recordsButton = document.querySelector('.records-button');
recordsButton.addEventListener('click', showRecords);

function showRecords() {
  let recordsBlock = document.querySelector('.records-table-layer');
  recordsBlock.style.visibility = 'visible';
  let recordsList = JSON.parse(listInfo);
  let recordsTable = document.querySelector('.records-table');
  let counter = 1;
  let tableElements = document.querySelectorAll('.records-table-string');
  if (tableElements.length == 0) {
    for (let key in recordsList) {
      let recordString = document.createElement('tr');
      let recordCellResult = document.createElement('th');
      let recordCellName = document.createElement('th');
      recordString.className = 'records-table-string';
      recordCellResult.className = 'records-table-cell-result';
      recordCellName.className = 'records-table-cell-name';
      let resultTime = getTime(parseInt(key));
      recordCellResult.textContent = counter + '.    ' + resultTime;
      recordCellName.textContent = recordsList[key];
      recordsTable.appendChild(recordString);
      recordString.appendChild(recordCellResult);
      recordString.appendChild(recordCellName);
      counter++;
    }
  }
}

let recordsBlock = document.querySelector('.records-close');
recordsBlock.addEventListener('click', hideRecords);

function hideRecords() {
  let recordsBlock = document.querySelector('.records-table-layer');
  recordsBlock.style.visibility = 'hidden';
}

// settings
let settingsButton = document.querySelector('.settings-button');
settingsButton.addEventListener('click', showSettings);

function showSettings() {
  let settingsBlock = document.querySelector('.settings-layer');
  settingsBlock.style.visibility = 'visible';
}

let settingsBlock = document.querySelector('.settings-close');
settingsBlock.addEventListener('click', hideSettings);

function hideSettings() {
  let settingsBlock = document.querySelector('.settings-layer');
  settingsBlock.style.visibility = 'hidden';
}

// rules
let rulesButton = document.querySelector('.rules-button');
rulesButton.addEventListener('click', showRules);

function showRules() {
  let rulesBlock = document.querySelector('.rules-layer');
  rulesBlock.style.visibility = 'visible';
}

let rulesBlock = document.querySelector('.rules-close');
rulesBlock.addEventListener('click', hideRules);

function hideRules() {
  let rulesBlock = document.querySelector('.rules-layer');
  rulesBlock.style.visibility = 'hidden';
}

document.querySelector('.settings-mute').onclick = function() {
  if (!soundOn) {
    document.querySelector('.settings-mute').innerHTML = 'Отключить звук'
    soundOn = true;
  } else {
    document.querySelector('.settings-mute').innerHTML = 'Включить звук'
    soundOn = false;
  }
}
