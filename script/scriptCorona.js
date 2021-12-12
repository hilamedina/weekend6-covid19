// const chartContinent = document
//   .getElementById('#chartContinent')
//   .getContext('2d');

const gra = document.getElementById('chartContinent').getContext('2d');

const Asiabutton = document.querySelector('.Asiabutton');
const Americabutton = document.querySelector('.Americabutton');
const Europebutton = document.querySelector('.Europebutton');
const Africabutton = document.querySelector('.Africabutton');
const worldbutton = document.querySelector('.worldbutton');
const buttonconti = document.querySelector('.buttonconti');
const contiDiv2 = document.querySelector('.contiDiv2');

// Asiabutton.addEventListener('click', () => {
//   console.log('hila');
// });

let arrEurope = [];
let arrAfrica = [];
let arrAsia = [];
let arrOceania = [];
let arrAmerica = [];
let restOfTheWorld = [];
let asiaConfirmed = [];
let asiaName = [];

const urlCountries =
  'https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries';
async function getCountry() {
  const newArr = await fetch(urlCountries);
  const res = await newArr.json();
  let allCountriesArr = [];
  for (let item of res.data) {
    allCountriesArr.push({
      name: item.name,
      code: item.code,
      ConfirmedCases: item.latest_data.confirmed,
      NumberofDeaths: item.latest_data.deaths,
      NumberOfRecovered: item.latest_data.recovered,
      NumberOfCriticalCondition: item.latest_data.critical,
    });
  }

  return allCountriesArr;
}

const urlContinent =
  'https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1';
async function getConti(allCountriesArr) {
  const fetchContinentFromUrl = await fetch(urlContinent);
  const fetchcontinentFromUrlJson = await fetchContinentFromUrl.json();
  for (let i = 0; i < fetchcontinentFromUrlJson.length; i++) {
    for (let j = 0; j < allCountriesArr.length; j++) {
      if (
        allCountriesArr[j].name === fetchcontinentFromUrlJson[i].name.common
      ) {
        allCountriesArr[j].region = fetchcontinentFromUrlJson[i].region;
      }
    }
  }
  return allCountriesArr;
}
function newArrOfRegion(allCountriesArr) {
  allCountriesArr.forEach((state) => {
    switch (state.region) {
      case 'Asia':
        arrAsia.push(state);
        asiaConfirmed.push(state.ConfirmedCases);
        asiaName.push(state.name);
        break;
      case 'Europe':
        arrEurope.push(state);
        break;
      case 'America':
        arrAmerica.push(state);
        break;
      case 'Africa':
        arrAfrica.push(state);
        break;
      case 'Oceania':
        arrOceania.push(state);
        break;
      default:
        restOfTheWorld.push(state);
    }
  });
}
async function showStat() {
  contiDiv2.addEventListener('click', (event) => {
    // console.log(event.target);
    if (event.target.innerText === 'Asia') {
      drawChart(asiaConfirmed, asiaName);
    }
  });
}
function drawChart(covidData, region) {
  const chartContinent = new Chart(gra, {
    type: 'bar',
    data: {
      labels: region,
      datasets: [
        {
          label: 'covid statisitc',
          data: covidData,
        },
      ],
    },
    options: {},
  });
}
// getCountry().then((allCountriesArr) => {
//   getConti(allCountriesArr).then((allCountriesArr) => {
//     newArrOfRegion(allCountriesArr);
//     console.log(arrAsia);
//   });
// });

async function main() {
  let allCountriesArr = await getCountry();
  allCountriesArr = await getConti(allCountriesArr);
  allCountriesArr = newArrOfRegion(allCountriesArr);
  await showStat();
  // console.log(allCountriesArr);
  // await graphfunction(arrEurope);
  // console.log(arrEurope);
  console.log(arrAsia);
  console.log(arrAfrica);

  // console.log(arrOceania);
}
main();
