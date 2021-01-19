const covidDataURL = 'https://api.jsonbin.io/b/60072108eb2fee239b5ee9ab'; // This is on some json hosting site

let countriesData = {}; 

// Get countries data
request('GET', covidDataURL, true) // this is calling the request function which returns a promise of XMLHttpRequest. We use GET because we are retreiving a JSON (REST API)
  .then(function (e) { // .then is done on resolve (successful connection)
      const json = e.target.response; // get the string from the response
      const data = JSON.parse(json); // convert it to an object
   
      for (var i = 0, countryData; i < data.length; i++) {
        countryData = data[i];
        countriesData[ countryData.name ] = countryData;
     }
     populateCountriesList(countriesData);
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
  
function populateCountriesList(countriesData){

  setCountryDropdownElement("#currentDestination", "Germany");

  //populate drop down - current location with countriesData object
  for (let country in countriesData){

    //populate drop down - destination with countriesData object
    setCountryDropdownElement("#plannedDestination", country);
  }
}

function setCountryDropdownElement(dropdownTag, countryName)
{
  const dropdownElement = document.querySelector(dropdownTag);
  let countryElement = document.createElement('option');
  countryElement.innerHTML = countryName;
  dropdownElement.appendChild(countryElement);
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

  if ((countryData === undefined) || (countryData === null)) 
  {
      // TODO. Need to show no data for this country
      console.log("No data for " + countryName);
      return;
  }

  console.log(countryData);

  // Hook up rest of elements using data from countryData - currently not available
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

  //plannedDestData();

  /*
  // Hook up rest of elements using data from countryData
  function plannedDestData(){
    const properties = Object.keys(countryData);
    for (let property of properties){ //accessing each property for selected country seperately
      if (property !== 'name'){ //exclude first property - name
        console.log(property)
        console.log(countryData[property])

        
        if(countryData[property]!==undefined && countryData[property]!==null ){ //if property has a value
            const x = document.querySelector(`#${property}`); //select it in the DOM
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
  }*/
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