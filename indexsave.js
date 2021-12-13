//   .getContext('2d');
// const chartContinent = document
//   .getElementById('#chartContinent')

const graph = document.getElementById('chartContinent').getContext('2d');
const buttonConti = document.querySelector('.buttonConti');
const contiDiv2 = document.querySelector('.contiDiv2');
const contiDiv1 = document.querySelector('.contiDiv1');
const asiaButton = document.querySelector('.asiaButton');
const europeButton = document.querySelector('.europeButton');
const oceaniaButton = document.querySelector('.oceaniaButton');
const americaButton = document.querySelector('.americaButton');
const africaButton = document.querySelector('.africaButton');

let chartContinent = new Chart(graph, {});

// Asiabutton.addEventListener('click', () => {
//   console.log('hila');
// });

let arrEurope = [];
let europeConfirmed = [];
let europeName = [];
let europeDeaths = [];
let europeRecoverd = [];
let europeCriticalCondition = [];

let arrAfrica = [];
let africaConfirmed = [];
let africaName = [];
let africaDeaths = [];
let africaRecoverd = [];
let africaCriticalCondition = [];

let arrAmerica = [];
let americaConfirmed = [];
let americaName = [];
let americaDeaths = [];
let americaRecoverd = [];
let americaCriticalCondition = [];

let arrAsia = [];
let asia = [];
let asiaName = [];
let asiaConfirmed = [];
let asiaRecoverd = [];
let asiaDeaths = [];
let asiaCriticalCondition = [];

let arrOceania = [];
let oceaniaConfirmed = [];
let oceaniaName = [];
let oceaniaDeaths = [];
let oceaniaRecoverd = [];
let oceaniaCriticalCondition = [];

let restOfTheWorld = [];

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
      numberofDeaths: item.latest_data.deaths,
      numberOfRecovered: item.latest_data.recovered,
      numberOfCriticalCondition: item.latest_data.critical,
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
// const world = {
//   asia: {},
//   america: {},
//   africa: {},
//   europe: {},
// };
function newArrOfRegion(allCountriesArr) {
  allCountriesArr.forEach((state) => {
    switch (state.region) {
      case 'Asia':
        // world.asia[countries].push(state.name);
        // world.asia[confirmed].push(state.ConfirmedCases);
        // world.asia[deaths].push(state.NumberofDeaths);
        // world.asia[critical].push(state.NumberOfCriticalCondition);
        // world.asia[recovered].push(state.NumberOfRecovered);
        arrAsia.push(state);
        asiaConfirmed.push(state.ConfirmedCases);
        asiaName.push(state.name);
        asiaDeaths.push(state.numberofDeaths);
        asiaRecoverd.push(state.numberOfRecovered);
        asiaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Europe':
        arrEurope.push(state);
        europeConfirmed.push(state.ConfirmedCases);
        europeName.push(state.name);
        europeDeaths.push(state.numberofDeaths);
        europeRecoverd.push(state.numberOfRecovered);
        europeCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'America':
        arrAmerica.push(state);
        americaConfirmed.push(state.ConfirmedCases);
        americaName.push(state.name);
        americaDeaths.push(state.numberofDeaths);
        americaRecoverd.push(state.numberOfRecovered);
        americaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Africa':
        arrAfrica.push(state);
        africaConfirmed.push(state.ConfirmedCases);
        africaName.push(state.name);
        africaDeaths.push(state.numberofDeaths);
        africaRecoverd.push(state.numberOfRecovered);
        africaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Oceania':
        arrOceania.push(state);
        oceaniaConfirmed.push(state.ConfirmedCases);
        oceaniaName.push(state.name);
        oceaniaDeaths.push(state.numberofDeaths);
        oceaniaRecoverd.push(state.numberOfRecovered);
        oceaniaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      default:
        restOfTheWorld.push(state);
    }
  });
}
// const changeGraph = (dataGraph) => {
//   drawChart(dataGraph, asiaName);
// };

// async function showStat2(object) {
//   contiDiv1.addEventListener('click', (event) => {
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//   });
// }
async function showStat() {
  // const arrOfConti = ['Asia', 'Africa', 'Europe', 'America'];
  // const buttons = document.getElementsByClassName('buttonConti');
  // for (button in buttons) {

  // asiaButton.addEventListener('click', () => {
  //   chartContinent.destroy();
  //   drawChart(asiaConfirmed, asiaName);
  // });
  // europeButton.addEventListener('click', () => {
  //   chartContinent.destroy();
  //   drawChart(europeConfirmed, europeName);
  //   });
  //   africaButton.addEventListener('click', () => {
  //     chartContinent.destroy();
  //     drawChart(africaConfirmed, africaName);
  //   });
  //   oceaniaButton.addEventListener('click', () => {
  //     chartContinent.destroy();
  //     drawChart(oceaniaConfirmed, oceaniaName);
  //   });
  //   americaButton.addEventListener('click', () => {
  //     chartContinent.destroy();
  //     drawChart(americaConfirmed, americaName);
  //   });
  // }

  function drawChart(covidData, continent) {
    chartContinent = new Chart(graph, {
      type: 'bar',
      data: {
        labels: continent,
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

  async function main() {
    let allCountriesArr = await getCountry();
    allCountriesArr = await getConti(allCountriesArr);
    allCountriesArr = newArrOfRegion(allCountriesArr);
    await showStat();

    // console.log(allCountriesArr);
    // await graphfunction(arrEurope);
    // console.log(arrEurope);
    // console.log(arrAsia);
    // console.log(arrAfrica);

    // console.log(arrOceania);
  }
}
main();
