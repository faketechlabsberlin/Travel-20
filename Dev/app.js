
const request = new XMLHttpRequest();
const requestURL = 'https://api.jsonbin.io/b/5fff60faf98f6e35d5fc2daa'; // This is on some json hosting site

request.open('GET', requestURL, true);
request.setRequestHeader("secret-key", "$2b$10$2jEprRIUBcKggPU2j56mR.zxLQo8ryjDQA6iNxSwYnS5jqwyanYbq"); // API key to get access to the json file
request.responseType = 'text'; // Text formnat because we are getting a json file
request.send();

request.onload = function() {
  const countriesText = request.response; // get the string from the response
  const countries = JSON.parse(countriesText).countries; // convert it to an object
  populateCountriesList(countries);
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
    currentDest.value="Germany"
})

//Go button functionality

function onGoButtonClicked() {
    const currentDest = document.querySelector('#currentDestination').value;
    const plannedDest = document.querySelector('#plannedDestination').value;
    const resultDest = document.querySelector('#resultDestination');
    const resultDeparture = document.querySelector('#resultDeparture');
    
    resultDeparture.innerHTML= currentDest;
    resultDest.innerHTML = plannedDest;
    document.getElementById("explore").setAttribute("class", "hidden");
    document.getElementById("result").setAttribute("class", "container resultField");
  }

