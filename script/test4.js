// const chartContinent = document
//   .getElementById('#chartContinent')
//   .getContext('2d');

const graph = document.getElementById('chartContinent').getContext('2d');

const Asiabutton = document.querySelector('.Asiabutton');
const Americabutton = document.querySelector('.Americabutton');
const Europebutton = document.querySelector('.Europebutton');
const Africabutton = document.querySelector('.Africabutton');
const worldbutton = document.querySelector('.worldbutton');
const buttonconti = document.querySelector('.buttonconti');
const contiDiv2 = document.querySelector('.contiDiv2');
const contiDiv1 = document.querySelector('.contiDiv1');

let chartContinent = new Chart(graph, {});

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
let world = {
  Asia: {},
  America: {},
  Africa: {},
  Europe: {},
};
let flag = 0;
async function newArrOfRegion(allCountriesArr) {
  allCountriesArr.forEach((state) => {
    if (flag === 0) {
      world[state.region].countries = [];
      world[state.region].confirmed = [];
      world[state.region].deaths = [];
      world[state.region].critical = [];
      world[state.region].recovered = [];
    }
    flag = 1;

    // console.log(world.Asia.countries);
    switch (state.region) {
      case 'Asia':
        world.Asia.countries.push(state.name);
        world.Asia.confirmed.push(state.ConfirmedCases);
        world.Asia.deaths.push(state.NumberofDeaths);
        world.Asia.critical.push(state.NumberOfCriticalCondition);
        world.Asia.recovered.push(state.NumberOfRecovered);
        // arrAsia.push(state);
        // asiaConfirmed.push(state.ConfirmedCases);
        // asiaName.push(state.name);
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
const changeGraph = (dataGraph) => {
  drawChart(dataGraph, asiaName);
};

async function showStat2(object) {
  contiDiv1.addEventListener('click', (event) => {
    if (event.target.innerText === 'Confirmed') {
      chartContinent.destroy();
      drawChart(object[confirmed], object[countries]);
    }
    if (event.target.innerText === 'Deaths') {
      chartContinent.destroy();
      drawChart(object[deaths], object[countries]);
    }
    if (event.target.innerText === 'Recoverd') {
      chartContinent.destroy();
      drawChart(object[recovered], object[countries]);
    }
    if (event.target.innerText === 'Critical') {
      chartContinent.destroy();
      drawChart(object.critical, object[countries]);
    }
  });
}
async function showStat() {
  // const arrOfConti = ['Asia', 'Africa', 'Europe', 'America'];
  contiDiv2.addEventListener('click', (event) => {
    // for (let conti of arrOfConti)
    if (event.target.innerText === 'Asia') {
      chartContinent.destroy();
      // drawChart(world.Asia.confirmed, world.Asia.countries);
      await showStat2(
        world[event.target.innerText],
        world[event.target.innerText]
      );
    }
  });
}
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

// getCountry().then((allCountriesArr) => {
//   getConti(allCountriesArr).then((allCountriesArr) => {
//     newArrOfRegion(allCountriesArr);
//     console.log(arrAsia);
//   });
// });

async function main() {
  let allCountriesArr = await getCountry();
  allCountriesArr = await getConti(allCountriesArr);
  allCountriesArr = await newArrOfRegion(allCountriesArr);
  await showStat();

  // console.log(allCountriesArr);
  // await graphfunction(arrEurope);
  // console.log(arrEurope);

  console.log(arrAsia);
  console.log(arrAfrica);

  // console.log(arrOceania);
}
main();
