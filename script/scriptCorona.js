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

const asiabutton = document.querySelector('.asiabutton');
const Americabutton = document.querySelector('.Americabutton');
const Europebutton = document.querySelector('.Europebutton');
const Africabutton = document.querySelector('.Africabutton');
const worldbutton = document.querySelector('.worldbutton');

Asiabutton.addEventListener('click', () => {
  console.log('hila');
});

const urlCountries =
  'https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries';
const urlCountries =
  'https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries';
async function getCountry() {
  const response = await fetch(urlCountries);
  const res = await response.json();
  for (let item of res.data) {
    newArr.push({
      name: item.name,
      code: item.code,
      ConfirmedCases: item.latest_data.confirmed,
      NumberofDeaths: item.latest_data.deaths,
      NumberOfRecovered: item.latest_data.recovered,
      NumberOfCriticalCondition: item.latest_data.critical,
    });
  }
  console.log(newArr);
}
let newArr = [];
getCountry();
