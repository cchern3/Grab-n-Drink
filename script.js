var containerforbrew = document.querySelector("#brewery-container");
var searchforbrew = document.querySelector("#city-search-term");
var formforbrew = document.querySelector("#brew-form");
var textforcity = document.querySelector("#city");
var historyofsearches =document.querySelector("#searchHistory")

// Get the modal
var modal = document.getElementById('id01');
modal.style.display= "block"

//If the user clicks Not 21, take them to responsibility.org
 let button = document.querySelector('.deletebtn');
 button.addEventListener("click", () => {
     location.href="https://www.responsibility.org/";
 })
 
var cities = []

var submittingtheform = function (event) {
    event.preventDefault();


// get value from input element

    var discoverthecity = textforcity.value.trim();

    if (discoverthecity) {
        acquirecity(discoverthecity);
        textforcity.value = "";
   return
    }
};

var acquirecity = function (city) {
    // format the api url
    var brewapi = "https://api.openbrewerydb.org/breweries?by_city=" + city;

    if (city !== '') {
        fetch(brewapi).then(function(response) {
            response.json().then(function(data) {
                allbrews(data, city);
            });

        });
    }
    // make a request to the url
   
};

formforbrew.addEventListener("submit", submittingtheform);

var allbrews = function (data, elements) {
    console.log(data);
    apiData = data;
    console.log(elements)
    // clear old content
    containerforbrew.textContent = "";
    searchforbrew.textContent = "Breweries near: " + elements.charAt(0).toUpperCase() + elements.slice(1);
    if (cities.indexOf(elements)=== -1) {
        cities.push(elements)
    }



    localStorage.setItem("cities", JSON.stringify(cities))
    localStorage.getItem("cities")  
    console.log(cities)
    previouscitysearch()
    // loop over data
    for (var i = 0; i < data.length; i++) {
        // format data
        var { name, brewery_type, street, city, state, phone, postal_code, website_url } = data[i];


    // Phone number formating, use 'j' because 'i' was already used above
    const arrayforphone = (phone|| '').split('');

    var phonenumberformat = [];
    for(var j = 0; j < arrayforphone.length; j++){
        // if it's the 2nd or 5th position in an array, push '-' afterwards
      if (j == 2 || j === 5 ){
          phonenumberformat.push(arrayforphone[j])
        phonenumberformat.push('-')
        //otherwise push regular numbers in array
      } else {
        phonenumberformat.push(arrayforphone[j])
      }
    }

    phone = phonenumberformat.join('');    
        let details = `
    <div class="card column is-one-quarter has-background-warning mt-2">
        <div class="card-content">
        <p class="title is-4">${name}</p>
            <div class="content">
                <h6>Brewery Type: ${brewery_type}</h6>
                <h6>${street}</h6>
                <h6>${city}, ${state}</h6>
                <h6>Postal Code: ${postal_code}</h6>
                <h6>Phone: ${phone}</h6>
                <h6>Website: ${website_url ||''}</h6>
                
            </div>
        </div>
    </div>
    `

        document.getElementById('brewery-container').innerHTML += details;
    }
};

console.log(cities)
function historylist(entry) {
    var node = document.createElement("option");
    var textnode = document.createTextNode(entry);
    if (entry !== "Select") {
        node.setAttribute("value", entry)
    } else {
        node.setAttribute("value", '')
    }
    //create on option element
    node.appendChild(textnode)
    historyofsearches.appendChild(node)
    //append element to search history
    
}

function previouscitysearch () {
   

  let citiesList = JSON.parse(localStorage.getItem("cities"))
  
  if (citiesList) {
      while (historyofsearches.firstChild) {
          historyofsearches.removeChild(historyofsearches.firstChild);
      }
      cities=citiesList
      historylist("Select")
  for (var i = 0; i < cities.length; i++) {
      historylist(cities[i]) 
      
  }}
  
  }
  
  previouscitysearch()
