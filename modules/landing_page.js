import config from "../conf/index.js";

async function init() {
  console.log("inside init method");
 // debugger;
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  console.log(config.backendEndpoint+"/cities");
  try{
    let data= await fetch(config.backendEndpoint+"/cities");
    let cities=await data.json();
    //console.log(cities);
    return cities;
  }catch(err){
    return null;
  }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let dataDiv=document.getElementById("data");
  let str=`
  <div class="col-12 col-sm-6 col-lg-3 mb-4">
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <img src="${image}" alt="${id}"/>
          <div class="tile-text text-center">
            <h5>${city}</h5>
            <p>${description}</p>
          </div>
      </div>
    </a>
  </div> 
  `;
  dataDiv.innerHTML+=str;

}

export { init, fetchCities, addCityToDOM };
