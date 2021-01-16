const countriesListURL = 'https://api.jsonbin.io/b/5fff60faf98f6e35d5fc2daa'; // This is on some json hosting site
const countriesDataURL = 'https://api.jsonbin.io/b/6002f41bf98f6e35d5fd39af'; // This is on some json hosting site

let countriesList = {};
let countriesData = {}; 

// Get countries list
request('GET', countriesListURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
  .then(function (e) { // .then is done on resolve (successful connection)
      const json = e.target.response; // get the string from the response
      countriesList = JSON.parse(json).countries; // convert it to an object
      console.log(countriesList);
      populateCountriesList(countriesList);
  })
  .catch( function (e) { // this is called on reject when an error happens on the connection
    console.log("Failed to retreive countries.json", e); 
    document.querySelector('#error').innerHTML= e;
    document.getElementById("explore").setAttribute("class", "hidden");
    document.getElementById("page404").setAttribute("class", "container resultField");
  });

// Get countries data
request('GET', countriesDataURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
  .then(function (e) { // .then is done on resolve (successful connection)
      const json = e.target.response; // get the string from the response
      const data = JSON.parse(json).countriesData; // convert it to an object

      for (var i = 0, countryData; i < data.length; i++) {
        countryData = data[i];
        countriesData[ countryData.name ] = countryData;
     }
  })
  .catch( function (e) { // this is called on reject when an error happens on the connection
    console.log("Failed to retreive countriesData.json", e); 
    document.querySelector('#error').innerHTML= e;
    document.getElementById("explore").setAttribute("class", "hidden");
    document.getElementById("page404").setAttribute("class", "container resultField");
  });

function request(method, url) { // this function wraps a XMLHttpRequest into a promise
  return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'text'; 
      xhr.setRequestHeader("secret-key", "$2b$10$2jEprRIUBcKggPU2j56mR.zxLQo8ryjDQA6iNxSwYnS5jqwyanYbq"); // API key to get access to the json file
      xhr.onload = resolve;
      xhr.onerror = reject;
      xhr.send();
  });
}
    
function populateCountriesList(countries){
  //populate drop down - current location with a country list
  countries.map((country)=>{
    const currentDest = document.querySelector('#currentDestination');
    let countryElem = document.createElement('option');
    countryElem.innerHTML = country;
    
    if(country !== 'Germany'){
        countryElem.setAttribute('disabled', true);
    }
    
    currentDest.appendChild(countryElem);
  })

  //populate drop down - destination with a country list
  countries.map((country)=>{
    const plannedDest = document.querySelector('#plannedDestination');
    let countryElem = document.createElement('option');
    countryElem.innerHTML = country;
    plannedDest.appendChild(countryElem);
  })
}

//Germany selected automatically when drop-down clicked (temporary)
const currentDest = document.querySelector('#currentDestination');
currentDest.addEventListener('click', ()=>{
    currentDest.value="Germany";

    //enable destination dropdown only once current destination selected
    document.querySelector('#plannedDestination').toggleAttribute('disabled');
})

//Go button functionality

function onGoButtonClicked() {
  const currentDest = document.querySelector('#currentDestination').value;
  const plannedDest = document.querySelector('#plannedDestination').value;
  
  let currentDestData;
  let plannedDestData;
  
  // If there is data for that country then retrieve it from the dictionary
  if (currentDest in countriesData)
    currentDestData = countriesData[currentDest];

  // If there is data for that country then retrieve it from the dictionary
  if (plannedDest in countriesData)
    plannedDestData = countriesData[plannedDest];

  UpdateCurrentDestinationElements(currentDest, currentDestData);
  UpdatePlannedDestinationElements(plannedDest, plannedDestData);

  // Disable explore frame and show result frame
  document.getElementById("explore").setAttribute("class", "hidden");
  document.getElementById("result").setAttribute("class", "container resultField");
}

function UpdateCurrentDestinationElements(countryName, countryData)
{
  const resultDeparture = document.querySelector('#resultDeparture');
  resultDeparture.innerHTML = countryName;

  if ((countryData === undefined) || (countryData === null)) 
  {
      // TODO. Need to show no data for this country
      console.log("No data for " + countryName);
      return;
  }

  console.log(countryData);

  // Hook up rest of elements using data from countryData
}

function UpdatePlannedDestinationElements(countryName, countryData)
{
  const resultDest = document.querySelector('#resultDestination');
  resultDest.innerHTML = countryName;

  if ((countryData === undefined) || (countryData === null)) 
  {
      // TODO. Need to show no data for this country
      console.log("No data for " + countryName);
      return;
  }

  console.log(countryData);

  // Hook up rest of elements using data from countryData
}

// refresh button
function onRefreshClicked (){
  window.location.reload();
}