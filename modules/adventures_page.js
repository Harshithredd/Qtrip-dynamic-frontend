import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 // console.log(JSON.stringify(search));
  let givenURL=search.split("=");
  console.log(givenURL[1]);
  return givenURL[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let url=config.backendEndpoint+"/adventures/?city="+city;
      console.log(url);
      let adventures= await fetch(url);
      let advCities=await adventures.json();
    //  console.log(advCities);
      return advCities;
  }catch(err){
      return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let dataDiv=document.getElementById("data");
  adventures.forEach(element => {
  let  str=` 
    <div class="col-6 col-lg-3 mb-3" >
      <a href="detail/?adventure=${element.id}" id=${element.id}>
        <div class="card activity-card">
          <span class="category-banner">${element.category}</span>
          <img src="${element.image}" class="activity-card-image" alt="${element.id}" />
          <div class="d-md-flex justify-content-between w-100 px-3">
            <p>${element.name}</p>
            <p>₹${element.costPerHead}</p> 
          </div>
          <div class="d-md-flex justify-content-between w-100 px-3">
            <p>Duration</p>
            <p>${element.duration}&nbsp;Hours</p> 
          </div>     
        </div>
      </a>
    </div>`;
    dataDiv.innerHTML+=str;
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurationList=list.filter(value =>{
    return value.duration>=low && value.duration<=high;
  });
  console.log(filteredDurationList);
  return filteredDurationList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log("inside filterByCategory");
  let filteredList=[];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<categoryList.length;j++){
      if(list[i].category==categoryList[j]){
        filteredList.push(list[i]);
      }
    }
  }
  //  console.log(typeof filteredList);
  //  console.log(filteredList);
    return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log("inside the filterFunction");
  console.log(list);
  console.log(filters.category);
  if(filters.category.length==0){
    console.log("length is zero");

  }else{
    console.log("length is not zero");
    console.log(filters.category);
  }
  if(filters.duration===""){
    console.log("duration is empty");
  }else{
    console.log("duration is not empty");
    console.log(filters.duration);
  }
 
  if(!filters.duration=="" && filters.category.length==0){
  //  console.log("inside 1st condition");
   // console.log(filters.duration);
    let durationRange=filters.duration.split("-");
    let low=durationRange[0];
    let high=durationRange[1];
    let filterByDur=filterByDuration(list,low,high);
    return filterByDur;

  }else if(!filters.category.length==0 && filters.duration===""){

    let filteredBycat =filterByCategory(list,filters.category);
    return filteredBycat;

  }else if(!filters.category.length==0 && !filters.duration==""){
    console.log("inside both");
    let durationRange=filters.duration.split("-");
    let low=durationRange[0];
    let high=durationRange[1];
    let filteredBycat =filterByCategory(list,filters.category);
    console.log(filteredBycat);
    let filterByboth=filterByDuration(filteredBycat,low,high);
    console.log(filterByboth);
    
    return filterByboth;
  }else{
  //Place holder for functionality to work in the Stubs
  return list;

  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  try{
    localStorage.setItem("filters",JSON.stringify(filters));
  }catch{
    return false;
  }
 
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
// let fduration= localStorage.getItem("duration");
// let fcategory= localStorage.getItem("category");
// if(fduration)
// let localSData={
// "duration":JSON.parse(fduration),
// "Category":JSON.parse(fcategory)
// };
//   // Place holder for functionality to work in the Stubs
//   return localSData;
try{
   let localData= localStorage.getItem("filters");
   return JSON.parse(localData);
}catch{

}
return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=document.getElementById("category-list");
  filters.category.forEach(element=>{
    let divEle=document.createElement("div");
    divEle.setAttribute("class","category-filter");
    divEle.innerHTML=element;
    categoryList.appendChild(divEle);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
