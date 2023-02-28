"use strict";

// Utility Functions
function getRandomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
// Objects for store locations
const seattle = {
  minCustPerHr: 23,
  maxCustPerHr: 65,
  avgCookiePerCust: 6.3,
  randomCustPerHr: function () {
    return Math.floor(
      getRandomNumberBetween(this.minCustPerHr, this.maxCustPerHr)
    );
  },
};

const tokyo = {
  minCustPerHr: 3,
  maxCustPerHr: 24,
  avgCookiePerCust: 1.2,
  randomCustPerHr: function () {
    return Math.floor(
      getRandomNumberBetween(this.minCustPerHr, this.maxCustPerHr)
    );
  },
};

const dubai = {
  minCustPerHr: 11,
  maxCustPerHr: 38,
  avgCookiePerCust: 3.7,
  randomCustPerHr: function () {
    return Math.floor(
      getRandomNumberBetween(this.minCustPerHr, this.maxCustPerHr)
    );
  },
};

const paris = {
  minCustPerHr: 20,
  maxCustPerHr: 38,
  avgCookiePerCust: 2.3,
  randomCustPerHr: function () {
    return Math.floor(
      getRandomNumberBetween(this.minCustPerHr, this.maxCustPerHr)
    );
  },
};

const lima = {
  minCustPerHr: 2,
  maxCustPerHr: 16,
  avgCookiePerCust: 4.6,
  randomCustPerHr: function () {
    return Math.floor(
      getRandomNumberBetween(this.minCustPerHr, this.maxCustPerHr)
    );
  },
};

// function to store hourly sales at each location

function storeHourlySales(location) {
  const hoursOfOperation = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
  ];

  location.hourlySales = [];
  let totalSales = 0;
  for (let hour of hoursOfOperation) {
    let cookiesSold = Math.round(
      location.randomCustPerHr() * location.avgCookiePerCust
    );
    totalSales += cookiesSold;
    location.hourlySales.push(`${hour}: ${cookiesSold} cookies`);
  }
  location.hourlySales.push(`Total: ${totalSales} cookies`);
}

storeHourlySales(seattle);
storeHourlySales(tokyo);
storeHourlySales(dubai);
storeHourlySales(paris);
storeHourlySales(lima);

function displayHourlySales (location, id) {
    let ul = document.querySelector(`#${id}`);

    location.hourlySales.forEach(elem => {
        let li = htmlToElement(`<li>${elem}</li>`);
        ul.append(li);
    })
}

displayHourlySales(seattle, 'seattle-hourly-sales');
displayHourlySales(tokyo, 'tokyo-hourly-sales');
displayHourlySales(dubai, 'dubai-hourly-sales');
displayHourlySales(paris, 'paris-hourly-sales');
displayHourlySales(lima, 'lima-hourly-sales');