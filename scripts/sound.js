"use strict";

let soundButton = new Audio('media/sound/mechanic-button.mp3');
let soundOn = true;
let supportsVibrate = "vibrate" in navigator;

function soundOnClick() {
  if(supportsVibrate) {
    navigator.vibrate(100);
  }
  if(soundOn){
    soundButton.play();
  }
}

