const continentApi =
  'https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/asia';
async function getContinents() {
  const response = await fetch(continentApi);
  const data = await response.json();
  console.log(data);
}
getContinents();

let arrOfContinent1 = [];
async function continent1() {
  const fetchContinentFromUrl = await getContinents();
  for (let item of fetchContinentFromUrl) {
    let continentObj = {};
    continentObj['nameFromContinent'] = item.name.common;
    continentObj['codeFromContinent'] = item.cca2;
    arrOfContinent.push(continentObj);
  }
  return arrOfContinent1;
}
console.log(continent1());
