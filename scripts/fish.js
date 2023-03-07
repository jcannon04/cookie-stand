'use strict';
let fishbg = document.querySelector('.fish-bg');

let renderFish = function () {
  fishbg.replaceChildren();
  let xfish = Math.floor(window.innerWidth / 262);
  let yfish = Math.floor(window.innerHeight / 82);
  let numberOfFishes = xfish * yfish;

  for (let i = 0; i < numberOfFishes; i++) {
    let fish = document.createElement('div');
    if (i % 2 === 0) {
      fish.classList.add('fish');
    } else {
      fish.classList.add('fish2');
    }
    fishbg.append(fish);
  }
};

let fishRocket = document.createElement('div');
fishRocket.style.width = '241px';
fishRocket.style.height = '91px';
fishRocket.style.backgroundImage = 'url(../assets/img/chinook.jpg)';
fishRocket.style.backgroundSize = 'cover';
fishRocket.style.backgroundRepeat = 'no-repeat';
fishRocket.style.transform = 'rotateY(30deg)';
fishRocket.style.position = 'absolute';
fishRocket.classList.add('fish-rocket');

function randomYpos(fishRocket) {
  let screenHeight = window.innerHeight;
  let fishHeight = parseInt(fishRocket.style.height);
  return (
    Math.floor(Math.random() * (screenHeight - fishHeight) + fishHeight) + 'px'
  );
}

let startSide = function() {
  let zeroOrOne = Math.round(Math.random());
  if (zeroOrOne === 1) return '0vw';
  else { return '100vw'; }
};
startSide();

let yPos = randomYpos(fishRocket);
fishRocket.style.top = yPos;
fishRocket.style.left = 'calc(100vw - 250px)';
document.body.append(fishRocket);
window.onload = renderFish;
window.onresize = renderFish;

const element = document.querySelector('.fish-rocket');
let start, previousTimeStamp;
let done = false;

let xSpeed = Math.random();
let ySpeed = Math.random();
function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    const deltaX = xSpeed * elapsed;
    const deltaY = ySpeed * elapsed;
    console.log(element.style.top);
    element.style.transform = `translate(${-deltaX}px, ${deltaY}px)`;
    if (!isElementInViewport(element)) {
      element.remove();
      done = true;
    }
  }
  if (!done) {
    window.requestAnimationFrame(step);
  }
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}
window.requestAnimationFrame(step);
