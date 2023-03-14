'use strict';

/* Background fish placement */

let fishbg = document.querySelector('.fish-bg');

let renderFish = function () {
  let fishWidth = 262;
  let fishHeight = 82;

  fishbg.replaceChildren();

  let xfish = Math.floor(window.innerWidth / fishWidth);
  let yfish = Math.floor(window.innerHeight / fishHeight);
  let numberOfFishes = xfish * yfish;

  for (let i = 0; i < numberOfFishes; i++) {
    let fish = document.createElement('div');
    fish.classList.add('fish');
    if (i % 2 === 0) fish.classList.add('fish2');
    fishbg.append(fish);
  }
};

window.onload = renderFish;
window.onresize = renderFish;

/* rocketfish animation */

let fiftyFifty = function () {
  return Math.round(Math.random()) ? true : false;
};

function randomYpos(fishRocket) {
  let screenHeight = window.innerHeight;
  let fishHeight = parseInt(fishRocket.style.height);
  return (
    Math.floor(Math.random() * (screenHeight - fishHeight) + fishHeight) + 'px'
  );
}

function styleRocketFish() {
  let fishRocket = document.createElement('div');
  fishRocket.id = 'fish-rocket';
  fishRocket.style.width = '241px';
  fishRocket.style.height = '91px';
  fishRocket.style.backgroundImage = 'url(../assets/img/chinook.jpg)';
  fishRocket.style.backgroundSize = 'cover';
  fishRocket.style.backgroundRepeat = 'no-repeat';
  fishRocket.style.transform = 'rotateY(30deg)';
  fishRocket.style.position = 'absolute';
  fishRocket.classList.add('fish-rocket');
  let msg = document.createElement('p');
  msg.innerHTML = 'Click Me!';
  msg.style.color = 'red';
  fishRocket.append(msg);
  fishRocket.style.display = 'flex';
  fishRocket.style.justifyContent = 'center';
  fishRocket.style.alignItems = 'center';
  fishRocket.style.top = randomYpos(fishRocket);
  fishRocket.style.left = fiftyFifty() ? 'calc(100vw - 250px)' : '12px';

  fishRocket.addEventListener('click', (e) => {
    let popup = document.createElement('div');
    popup.style.height = '324px';
    popup.style.width = '324px';
    popup.style.backgroundImage = 'url(../assets/img/shirt.jpg)';
    popup.style.position = 'absolute';
    popup.style.left = 'calc(50vw - 162px)';
    popup.style.top = 'calc(50vh - 162px)';
    let msg = document.createElement('p');
    msg.innerHTML = 'You Won!';
    msg.style.color = 'red';
    popup.append(msg);
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    document.body.append(popup);
    e.target.style.display = 'none';
    function clearPopup() {
      return popup.remove();
    }
    setTimeout(clearPopup, 3000);
    clearInterval(intervalID);
  });

  document.body.append(fishRocket);
}

function animateRocketFish() {
  styleRocketFish();
  const element = document.querySelector('#fish-rocket');

  let start;

  let xSpeed =
    element.style.left === 'calc(100vw - 250px)'
      ? -Math.random()/3 + 0.01
      : Math.random()/3 + 0.01;

  let ySpeed = fiftyFifty() ? Math.random()/3 + 0.1 : -Math.random()/3 + 0.1;

  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;
    let deltaX = xSpeed * elapsed;
    let deltaY = ySpeed * elapsed;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    if (!isElementInViewport(element) || elapsed >= 2000) {
      element.remove();
    } else {
      window.requestAnimationFrame(step);
    }
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  window.requestAnimationFrame(step);
}

let intervalID = setInterval(animateRocketFish, 10000);
