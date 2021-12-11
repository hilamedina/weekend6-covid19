const chartContinent = document
  .getElementById('chartContinent')
  .getContext('2d');
const myChart = new Chart(chartContinent, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const Asiabutton = document.querySelector('.Asiabutton');
const Americabutton = document.querySelector('.Americabutton');
const Europebutton = document.querySelector('.Europebutton');
const Africabutton = document.querySelector('.Africabutton');
const worldbutton = document.querySelector('.worldbutton');

Asiabutton.addEventListener('click', () => {
  console.log('hila');
});

let arrEurope = [];
let arrAfrica = [];
let arrAsia = [];
let arrOceania = [];
let arrAmerica = [];
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
  // await graphfunction(arrEurope);
  // console.log(arrEurope);
  console.log(arrAsia);
  // console.log(arrOceania);
}
main();
