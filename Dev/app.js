const countriesDataURL = 'https://adac-scraper-dev-scraperfeedbucket-16nuzvfai8pr8.s3.eu-central-1.amazonaws.com/adac/adac.json';
const covidDataURL = 'https://api.jsonbin.io/b/60072108eb2fee239b5ee9ab'; // This is on some json hosting site

let countriesData = {}; 
let countriesCovidData = {}; 

// Get countries data
request('GET', countriesDataURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
  .then(function (e) { // .then is done on resolve (successful connection)
    const json = e.target.response; // get the string from the response
    const data = JSON.parse(json); // convert it to an object

    for (var i = 0, countryData; i < data.length; i++) {
      countryData = data[i];
      
      if ((countryData.Land === undefined) || (countryData.Land === null)) 
        continue;

      let engCountryName = getEnglishName(countryData.Land);

      if (engCountryName === "ERROR") 
        continue;

      countriesData[ engCountryName ] = countryData;
      countriesData[ engCountryName ].Name = engCountryName;
    }

    // HACK TO ADD GERMAN DATA
    countriesData[ "Germany" ] = {
      "Entry_form": 0,
      "Land": "deutschland",
      "Name": "Germany",
      "Quarantine": 1,
      "Reisewarnung": 1,
      "Riskzone": 1,
      "Test_entry": 0
    };

    populateCountriesList();
  })
  .catch( function (e) { // this is called on reject when an error happens on the connection
    console.log("Failed to retreive countriesData.json", e); 
    document.querySelector('#error').innerHTML= e;
    document.getElementById("explore").setAttribute("class", "hidden");
    document.getElementById("page404").setAttribute("class", "container resultField");
  });

// Get covid data
request('GET', covidDataURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
  .then(function (e) { // .then is done on resolve (successful connection)
      const json = e.target.response; // get the string from the response
      const data = JSON.parse(json); // convert it to an object
   
      for (var i = 0, covidData; i < data.length; i++) {
        covidData = data[i];
        countriesCovidData[ covidData.name ] = covidData;
     }
  })
  .catch( function (e) { // this is called on reject when an error happens on the connection
    console.log("Failed to retreive countriesCovidData.json", e); 
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
  
function populateCountriesList() {
  for (let country in countriesData){
    //populate drop down - current location with countriesData object
    setCountryDropdownElement("#currentDestination", country, true);
    //populate drop down - destination with countriesData object
    setCountryDropdownElement("#plannedDestination", country, false);
  }
}

function setCountryDropdownElement(dropdownTag, countryName, isCurrent) {
  const dropdownElement = document.querySelector(dropdownTag);
  let countryElement = document.createElement('option');
  countryElement.innerHTML = countryName;
  dropdownElement.appendChild(countryElement);

  if (isCurrent && countryName !== 'Germany') {
    countryElement.setAttribute('disabled', true);
  }
}

//Germany selected automatically when drop-down clicked (temporary)
const currentDest = document.querySelector('#currentDestination');

currentDest.addEventListener('change', ()=>{
    //enable destination dropdown only once current destination selected
    document.querySelector('#plannedDestination').toggleAttribute('disabled');
})

const plannedDest = document.querySelector('#plannedDestination');
plannedDest.addEventListener('change', ()=>{
  //enable go button when both selected
  if(plannedDest.value !== "Where do you want to go?"){
    document.querySelector('#goButton').disabled = false;
  }else{
    document.querySelector('#goButton').disabled = true;
  }
  
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

  const fromTitle = document.querySelector('#fromTitle');
  fromTitle.innerHTML = `From: ${currentDest} to ${plannedDest}`;
}

function UpdateCurrentDestinationElements(countryName, countryData)
{
  const resultDeparture = document.querySelector('#resultDeparture');
  resultDeparture.innerHTML = countryName;

  // countryData not used in this function
  if ((countryData === undefined) || (countryData === null)) 
  {
      // TODO. Need to show no data for this country
      console.log("No data for " + countryName);
      return;
  }

  updateCases(countryName, "casePer100KDeparture");
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

  updateElement("riskZone", countryData["Riskzone"], true);
  updateElement("travelWarning", countryData["Reisewarnung"], true);
  updateElement("entryTest", countryData["Test_entry"], true);
  updateElement("entryForm", countryData["Entry_form"], true);
  updateElement("quarantineReturn", countryData["Quarantine"], true);

  updateCases(countryName, "casePer100KDestination");

  //plannedDestData();

  // NOT USED - Hook up rest of elements using data from countryData
  function plannedDestData(){
    const properties = Object.keys(countryData);
    for (let property of properties){ //accessing each property for selected country seperately
      if (property !== 'Name'){ //exclude first property - name
        console.log(property)
        console.log(countryData[property])

        
        if(countryData[property]!==undefined && countryData[property]!==null ){ //if property has a value
            console.log(`#${property}`);
            const x = document.querySelector(`#${property}`); //select it in the DOM

            if (x === undefined || x === null)
              continue;

            if(countryData[property]){ //translate bool to 'yes' or 'no'
              x.innerHTML='Yes'
            }else{
              x.innerHTML='No'
            }
        }else{ //else indicate empty value
          x.innerHTML='No data';
          x.setAttribute("class", "noData");
        }
      }
    }
  }
}

function updateElement(elementName, elementValue, isBool) {
  const element = document.querySelector(`#${elementName}`);

  if (element === undefined || element === null)
  {
    console.log("Element not found: ", elementName);
    return;
  }

  let value = elementValue;

  if (isBool) {
    if(value){ //translate bool to 'yes' or 'no'
      value = 'Yes';
    }else{
      value = 'No';
    }
  }

  element.innerHTML = value;
}
  
function updateCases(countryName, elementName) {
  let cases = Math.round(countriesCovidData[countryName].cumulativeTotalPer1Million / 1000);

  let casePer100K = `${cases}k cases per 100k`;

  updateElement(elementName, casePer100K, false);
}


//   const isBorderOpen = document.querySelector('#isBorderOpen');
//   if(countryData['entryBan']!==undefined){
//       if(countryData['entryBan']){
//         isBorderOpen.innerHTML='No'
//       }else{
//         isBorderOpen.innerHTML='Yes'
//       }
//   }else{
//     isBorderOpen.innerHTML='No data';
//     isBorderOpen.setAttribute("class", "noData");
//   }
  


//   const isAccomodationOpen = document.querySelector('#isAccomodationOpen');
//   if(countryData['isAccomodation']!==undefined){
//       if(countryData['isAccomodation']){
//         isAccomodationOpen.innerHTML='No'
//       }else{
//         isAccomodationOpen.innerHTML='Yes'
//       }
//   }else{
//     isAccomodationOpen.innerHTML='No data';
//     isAccomodationOpen.setAttribute("class", "noData");

//   }
// }


// refresh button
function onRefreshClicked (){
  window.location.reload();
}