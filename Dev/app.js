const countriesDataURL = 'https://adac-scraper-dev-scraperfeedbucket-16nuzvfai8pr8.s3.eu-central-1.amazonaws.com/adac/adac.json';
const covidDataURL = 'https://api.jsonbin.io/b/601c269c06934b65f52e7593'; // This is on some json hosting site

let countriesData = {}; 
let countriesCovidData = {}; 

const casesPer7DaysKey = "Cases7D100K";

// Get countries data
request('GET', countriesDataURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
  .then(function (e) { // .then is done on resolve (successful connection)
    const json = e.target.response; // get the string from the response
    const data = JSON.parse(json); // convert it to an object

    // HACK TO ADD GERMAN DATA
    countriesData[ "Germany" ] = {
      "Entry_form": 0,
      "Land": "deutschland",
      "Name": "Germany",
      "Quarantine": 1,
      "Reisewarnung": 1,
      "Riskzone": 1,
      "Test_entry": 0,
      "Mask": 1,
      "Accomodation": 0
    };

    for (var i = 0, countryData; i < data.length; i++) {
      countryData = data[i];
      
      if ((countryData.Land === undefined) || (countryData.Land === null)) 
        continue;

      let engCountryName = getEnglishName(countryData.Land);

      if (engCountryName === "ERROR") 
        continue;

        // HACK TO ADD MISSING DATA
      countryData.Mask = Math.random() < 0.5;
      countryData.Accomodation = Math.random() < 0.5;

      countriesData[ engCountryName ] = countryData;
      countriesData[ engCountryName ].Name = engCountryName;
    }

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
        countriesCovidData[ covidData.Name ] = covidData;
     }

     populateSafestLocations(false);
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
 
//Germany selected automatically when drop-down clicked (temporary)   
  }else if(isCurrent && countryName === 'Germany'){
    countryElement.setAttribute('selected', true);
  }
}


// const currentDest = document.querySelector('#currentDestination');
// currentDest.value= "Germany";
// currentDest.addEventListener('click', ()=>{
//     currentDest.value= "Germany";
//     //enable destination dropdown only once current destination selected
//     document.querySelector('#plannedDestination').disabled = false;
// });

// currentDest.addEventListener('change', ()=>{
//   currentDest.value= "Germany";
//   //enable destination dropdown only once current destination selected
//   document.querySelector('#plannedDestination').disabled = false;
// });

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
  document.getElementById("result").setAttribute("class", "visible");
}

function UpdateCurrentDestinationElements(countryName, countryData)
{
  const resultDeparture = document.querySelector('#resultDeparture');
  resultDeparture.innerHTML = "From: " + countryName;

  // countryData not used in this function
  if ((countryData === undefined) || (countryData === null)) 
  {
      // TODO. Need to show no data for this country
      console.log("No data for " + countryName);
      return;
  }

  updateCases(countryName, "casePer100KDeparture");
  updateElement("returnTest", getCorrectString(countryData, "Test_entry", true), updateTick(countryData, "Test_entry"));
  updateElement("returnQuarantine", getCorrectString(countryData, "Quarantine", true), updateTick(countryData, "Quarantine"));
}

function UpdatePlannedDestinationElements(countryName, countryData)
{
  const resultDest = document.querySelector('#resultDestination');
  resultDest.innerHTML = "To: " + countryName;

  updateElement("destRisk", getCorrectString(countryData, "Riskzone", false), updateTick(countryData, "Riskzone"));
  updateElement("destMask", getCorrectString(countryData, "Mask", false), updateTick(countryData, "Mask"));
  updateElement("destTest", getCorrectString(countryData, "Test_entry", false),updateTick(countryData, "Test_entry"));
  updateElement("destForm", getCorrectString(countryData, "Entry_form", false),updateTick(countryData, "Entry_form"));
  updateElement("destQuarantine", getCorrectString(countryData, "Quarantine", false),updateTick(countryData, "Quarantine"));
  updateElement("destAccomodation", getCorrectString(countryData, "Accomodation", false),updateTick(countryData, "Accomodation"));

  updateCases(countryName, "casePer100KDestination");
  
  let imgSrc;
  if(countryName.indexOf(' ')!==-1){
    let cleanName= countryName.replace(/\s/g, '-');
    imgSrc = `./assets/country-flags/png/${cleanName.toLowerCase()}.png`;
  }else{
    imgSrc = `./assets/country-flags/png/${countryName.toLowerCase()}.png`;
  }

  let flag = document.querySelector('#destinationFlag');

  loadImage(imgSrc)
  .then(img => {
    flag.src = imgSrc;
  })
  .catch(error => {
    console.log(error);
    flag.src ='./assets/globe.png'}
  );
}

function getCorrectString(countryData, key, isReturn) {
  let value = countryData[key];

  if (value === undefined || value === null)
  {
    return "No Data";
  }

  let location = "return";

  if (!isReturn)
  {
    location = "entry";
  }

  switch(key)
  {
    case "Riskzone":
      return value ? "This is a <b>risk zone</b>" : "This is not a <b>risk zone</b>";
    case "Mask":
      return "Wearing a <b>mask</b> is mandatory in public"; //value ? "Wearing a <b>mask</b> is mandatory in public" : "It is not mandatory to wear a <b>mask</b> in public";
    case "Test_entry":
      return value ? `A <b>test</b> is requested upon ${location}` : `A <b>test</b> is not requested upon ${location}`;
    case "Entry_form":
      return value ? "You will need an <b>entry form</b> on arrival" : "You do not need an <b>entry form</b> on arrival";
    case "Quarantine":
      return value ? `<b>Quarantine</b> is requested upon ${location}` : `<b>Quarantine</b> is not requested upon ${location}`;
    case "Accomodation":
      return countryData["Riskzone"] ? "<b>Accomodation</b> cannot be booked" : "<b>Accomodation</b> can be booked";
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {

    let img = new Image();
    img.addEventListener('load', e => resolve(img));
    img.addEventListener('error', () => reject('Flag not found'));
    img.src = url;
  });
}

function updateTick(countryData, key){
  if ( key==="Accomodation"){
    if(countryData[key] === true || countryData[key] === 0){
      return 1
    }else if (countryData[key] === false || countryData[key] === 1){
      return 0
    }
  }else if (key==='Mask'){
    return 1
  }
  else{
      return countryData[key];
  }
}

function updateElement(elementName, elementValue, isTick) {
  const element = document.querySelector(`#${elementName}`);

  if (element === undefined || element === null)
  {
    console.log("Element not found: ", elementName);
    return;
  }

  element.innerHTML = elementValue;
  const elementTick = document.querySelector(`#${elementName}Tick`);

  if (isTick===1){
    elementTick.src = './assets/check.png';
  }else if (isTick===0){
    elementTick.src = './assets/x.png';
  }
}

function updateCases(countryName, elementName) {
  const covidData = countriesCovidData[countryName];

  let casePer100K = "Reported cases in the last 7 days:<br>No Data";

  if (covidData !== undefined && covidData !== null)
  {
    let cases = countriesCovidData[countryName][casesPer7DaysKey];
    casePer100K = `Reported cases in the last 7 days:<br><b>${parseFloat(cases).toFixed(1)}</b> per <b>100k</b>*`;
  }

  updateElement(elementName, casePer100K, false);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//populate Safe Location section
function populateSafestLocations(filterByEU){
  // Create items array
  var items = Object.keys(countriesCovidData).map(function(key) {
    return [key, countriesCovidData[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return first[1][casesPer7DaysKey] - second[1][casesPer7DaysKey];
  });

  var countryIndex = 0;

  var countriesFiltered = [];

  // Filter based on cases and is part of EU
  for( var i = 0; i < items.length; i++) { 
    if (items[i][1][casesPer7DaysKey] >= 10 
      && (!filterByEU || filterByEU && isCountryPartOfEU(items[i][1].Name)))
      countriesFiltered.push(items[i][1]);
  }

  var table = document.getElementById("safestLocationsTable");
  for (var i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; col = row.cells[j]; j++) {

      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      let cases = getCasesString(countriesFiltered[countryIndex][casesPer7DaysKey]);
      cases = cases.small();

      let countryName = countriesFiltered[countryIndex].Name;

      if (countryName.length > 20){
        countryName = countryName.substring(0, 19) + "...";
      }

      col.innerHTML = "<image class='pin' src='./assets/pin.png'/>" + `${countryName} ${cases}`;
      countryIndex++;
    }  
  }
}

//aboutLink - open about page section
document.querySelector('#aboutLink').addEventListener('click', ()=>{
    // Disable explore frame and show about frame
    document.getElementById("explore").setAttribute("class", "hidden");
    document.getElementById("safestLocations").setAttribute("class", "hidden");
    document.getElementById("faqs").setAttribute("class", "hidden");
    document.getElementById("result").setAttribute("class", "hidden");
    document.getElementById("aboutPage").setAttribute("class", "container mainField");
})

//go back from about section
function onAboutBack (){
  document.getElementById("explore").setAttribute("class", "mainField" );
  document.getElementById("safestLocations").setAttribute("class", "");
  document.getElementById("faqs").setAttribute("class", "");
  document.getElementById("aboutPage").setAttribute("class", "hidden");
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// refresh button
function onRefreshClicked (){
  window.location.reload();
}

// latest update - date stamp
let dateStamp = new Date().toLocaleString('en-US', {month: 'long', day: 'numeric', year:'numeric'})
document.querySelector('#latestUpdateDeparture').innerHTML = document.querySelector('#latestUpdateDeparture').innerHTML + dateStamp;

function getCasesString(cases) {
  return `${parseFloat(cases).toFixed(1)} per 100k*`;
}

// // FAQ buttons
let FAQbuttons = document.getElementsByClassName('FAQbutton');

for (let i = 0; i<FAQbuttons.length; i++){
  FAQbuttons[i].addEventListener('click', (event)=>{
    event.target.nextElementSibling.toggleAttribute("hidden");

    if(FAQbuttons[i].innerHTML === "Show answer"){
      FAQbuttons[i].innerHTML = "Hide answer";
    }else{
      FAQbuttons[i].innerHTML = "Show answer";
    }
  })
}

// safest locations - eu filter
const countriesFilterCheckbox = document.querySelector('#countriesFilterCheckbox');
countriesFilterCheckbox.addEventListener('change', ()=>{
  populateSafestLocations(countriesFilterCheckbox.checked);
});

//logo click
const logo = document.querySelector('#logo');

logo.addEventListener('click', ()=>{
    // Disable all frames but explore
    document.getElementById("explore").setAttribute("class", "mainField");
    document.getElementById("safestLocations").setAttribute("class", "");
    document.getElementById("faqs").setAttribute("class", "");
    document.getElementById("result").setAttribute("class", "hidden");
    document.getElementById("aboutPage").setAttribute("class", "hidden");
})
