'use strict';

// Utility Functions
function getRandomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const militaryTime = {
  '06:00': '6am',
  '07:00': '7am',
  '08:00': '8am',
  '09:00': '9am',
  '10:00': '10am',
  '11:00': '11am',
  '12:00': '12pm',
  '13:00': '1pm',
  '14:00': '2pm',
  '15:00': '3pm',
  '16:00': '4pm',
  '17:00': '5pm',
  '18:00': '6pm',
  '19:00': '7pm',
};

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
  this.minCustPerHr = parseInt(min);
  this.maxCustPerHr = parseInt(max);
  this.avgCookiePerCust = parseInt(avg);
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
    if(this.hoursOfOperation[i] === 0) cookiesSold = 0;
    totalSales += cookiesSold;
    hourlySales.push(cookiesSold);
  }
  hourlySales.push(totalSales);
  return hourlySales;
};

Store.prototype.randomCustPerHr = function () {
  return Math.round(
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

  for (let i = 0; i < hoursOfOperation.length; i++) {
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
  for (let i = 1; i < numOfColumns; i++) {
    let sum = 0;
    for (let j = 1; j < numOfRows; j++) {
      let num = parseInt(table.children[j].children[i].innerHTML);
      sum += num;
    }
    let td = document.createElement('td');
    td.innerHTML = sum;
    tableRow.append(td);
  }
  table.append(tableRow);
}

function makeTable(stores) {
  let table = document.querySelector('table');
  table.replaceChildren();
  createTableHoursHeader();
  stores.forEach((store) => {
    store.render();
  });
  createTotalsFooter();
}

function createObjectFrom(form) {
  let location = form.querySelector('#location').value;
  let max = form.querySelector('#max').value;
  let min = form.querySelector('#min').value;
  let avg = form.querySelector('#avg').value;

  let hours = timeInputsToHours();
  return new Store(location, min, max, avg, hours);
}

function timeInputsToHours() {
  let open = form.querySelector('#openTime').value;
  let close = form.querySelector('#closeTime').value;
  let hours = [];
  let i = 0;
  while (hoursOfOperation[i] !== militaryTime[open]) {
    hours.push(0);
    i++;
  }
  while (hoursOfOperation[i] !== militaryTime[close]) {
    hours.push(hoursOfOperation[i]);
    i++;
  }
  while ( i < hoursOfOperation.length) {
    hours.push(0);
    i++;
  }
  return hours;
}

let stores = [seattle, tokyo, dubai, paris, lima];

// wire up form submit button
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let memphis = createObjectFrom(form);
  stores.push(memphis);
  makeTable(stores);
  form.reset();
});

/* cannot set close time before open time and vise versa */
let openTimeInput = document.querySelector('#openTime');
let closeTimeInput = document.querySelector('#closeTime');

openTimeInput.addEventListener('change', () => {
  closeTimeInput.setAttribute('min', openTimeInput.value);
});

closeTimeInput.addEventListener('change', () => {
  openTimeInput.setAttribute('max', closeTimeInput.value);
});

/* cannot set minimum customers per hour more than max customer per hour and vise versa */
let min = document.querySelector('#min');
let max = document.querySelector('#max');

min.addEventListener('change', () => {
  max.setAttribute('min', min.value);
});

max.addEventListener('change', () => {
  min.setAttribute('max', max.value);
});

// makes table from all store objects
makeTable(stores);
