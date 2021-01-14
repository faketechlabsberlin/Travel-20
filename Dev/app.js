const requestURL = 'https://api.jsonbin.io/b/5fff60faf98f6e35d5fc2daa'; // This is on some json hosting site

request('GET', requestURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
    .then(function (e) { // .then is done on resolve (successful connection)
        const countriesText = e.target.response; // get the string from the response
        const countries = JSON.parse(countriesText).countries; // convert it to an object
        populateCountriesList(countries);
    }, function (e) { // this is called on reject when an error happens on the connection
        console.log("Failed to retreive countries.json"); // TODO: add error message in the website itself
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

