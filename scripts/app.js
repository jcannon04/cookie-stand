'use strict';

// Utility Functions
function getRandomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const hoursOfOperation = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
];

function Store(location, min, max, avg, hours) {
  this.location = location;
  this.minCustPerHr = min;
  this.maxCustPerHr = max;
  this.avgCookiePerCust = avg;
  this.hoursOfOperation = hours;
  this.hourlySalesEstimates = this.storeHourlySales();
}

Store.prototype.storeHourlySales = function () {
  let hourlySales = [];
  let totalSales = 0;
  for (let i = 0; i < this.hoursOfOperation.length; i++) {
    let cookiesSold = Math.round(
      this.randomCustPerHr() * this.avgCookiePerCust
    );
    totalSales += cookiesSold;
    hourlySales.push(cookiesSold);
  }
  hourlySales.push(totalSales);
  return hourlySales;
};

Store.prototype.randomCustPerHr = function () {
  return Math.floor(
    getRandomNumberBetween(this.minCustPerHr, this.maxCustPerHr)
  );
};

Store.prototype.render = function () {
  let salesTable = document.querySelector('#sales-estimates');

  let storeRow = document.createElement('tr');
  let storeName = document.createElement('td');
  storeName.innerHTML = this.location;
  storeRow.append(storeName);

  this.hourlySalesEstimates.forEach((hour) => {
    let td = document.createElement('td');
    td.innerHTML = hour;
    storeRow.append(td);
  });
  salesTable.append(storeRow);
};

let seattle = new Store('Seattle', 23, 65, 6.3, hoursOfOperation);
let tokyo = new Store('Tokyo', 3, 24, 1.2, hoursOfOperation);
let dubai = new Store('Dubai', 11, 38, 3.7, hoursOfOperation);
let paris = new Store('Paris', 20, 38, 2.3, hoursOfOperation);
let lima = new Store('Lima', 2, 16, 4.6, hoursOfOperation);

function createTableHoursHeader() {
  let table = document.querySelector('#sales-estimates');
  let tr = document.createElement('tr');
  tr.append(document.createElement('th'));

  for(let i = 0; i < hoursOfOperation.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = hoursOfOperation[i];
    tr.append(th);
  }

  let totalHeader = document.createElement('th');
  totalHeader.innerHTML = 'Daily Location Total';
  tr.append(totalHeader);

  table.append(tr);
}

function createTotalsFooter() {
  let table = document.querySelector('#sales-estimates');
  let tableRow = document.createElement('tr');
  let totalRowName = document.createElement('td');
  totalRowName.innerHTML = 'Totals';
  tableRow.append(totalRowName);

  let numOfRows = table.children.length;
  let numOfColumns = hoursOfOperation.length + 2;
  for(let i = 1; i < numOfColumns; i++) {
    let sum = 0;
    for(let j = 1; j < numOfRows; j++) {
      let num = parseInt(table.children[j].children[i].innerHTML);
      sum += num;
    }
    let td = document.createElement('td');
    td.innerHTML = sum;
    tableRow.append(td);
  }
  table.append(tableRow);
}

createTableHoursHeader();
seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();
createTotalsFooter();
