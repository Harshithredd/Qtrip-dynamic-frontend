import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
 // console.log(search);
  let givenURL=search.split("=");
  let id=givenURL[1];
//  console.log(id);
  return id;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url=config.backendEndpoint+"/adventures/detail?adventure="+adventureId;
  console.log(url);
  try{
    const advDetails = await fetch(url);
    let resolvedAdvDetails= await advDetails.json();
    // Place holder for functionality to work in the Stubs
    return resolvedAdvDetails;
  }catch{
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let advName= document.getElementById("adventure-name");
  advName.textContent=adventure.name;
  let advSubTitle= document.getElementById("adventure-subtitle");
  advSubTitle.textContent=adventure.subtitle;
  let photoGalleryEle = document.getElementById("photo-gallery");
  adventure.images.forEach(element => {
    let imageEle = document.createElement("img");
    imageEle.src = element;
    imageEle.className = "activity-card-image";
    photoGalleryEle.appendChild(imageEle);
  });
  let advContent= document.getElementById("adventure-content");
  advContent.textContent=adventure.content;
  

  // let photoGalary= document.getElementById("photo-gallery");
  // let bootstrapPhotoGalary=addBootstrapPhotoGallery(adventure.images);
  // photoGalary.appendChild(bootstrapPhotoGalary);

  // let advContent= document.getElementById("adventure-content");
  // advContent.textContent=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGalary= document.getElementById("photo-gallery");
  photoGalary.innerHTML="";
  //refer carousel from the bootstrap page
  let carouselDiv=document.createElement("div");
  carouselDiv.setAttribute("class","carousel slide");
  carouselDiv.setAttribute("data-ride","carousel");
  carouselDiv.setAttribute("id","carouselExampleIndicators");

  let indDiv=document.createElement("div");
  indDiv.setAttribute("class","carousel-indicators");

  images.forEach((element,index) => {
    let btn=document.createElement("button");
    btn.setAttribute("data-bs-target","#carouselExampleIndicators");
    btn.setAttribute("data-bs-slide-to",index);
    btn.setAttribute("aria-current","true");
    btn.setAttribute("aria-label","slide "+index);
    btn.setAttribute("type","button");
    if(index==0){
      btn.setAttribute("class","active");
    }
    indDiv.appendChild(btn);
  });
  carouselDiv.appendChild(indDiv);

  let carouselDivInner=document.createElement("div");
  carouselDivInner.setAttribute("class","carousel-inner");
  images.forEach((element,index)=>{
    let imgDiv=document.createElement("div");
    if(index==0){
      imgDiv.className="carousel-item active";
     // imgDiv.setAttribute("class","carousel-item active");
    }else{
      imgDiv.className = "carousel-item";
      //imgDiv.setAttribute("class","carousel-item");
      
    }
    let img=document.createElement("img");
    img.setAttribute("src",element);
    img.setAttribute("class","d-block w-100");
   // img.setAttribute("height","400px");
    img.setAttribute("class","activity-card-image");

    imgDiv.appendChild(img);
    carouselDivInner.appendChild(imgDiv);
  });
  carouselDiv.appendChild(carouselDivInner);
    let arrowsElementsStr=`  
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;

  carouselDiv.innerHTML+=arrowsElementsStr;
  photoGalary.appendChild(carouselDiv);
  //return carouselDiv;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  //  document.getElementById("reservation-panel-sold-out").display;
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalcost=adventure.costPerHead *persons;
  document.getElementById("reservation-cost").innerHTML=totalcost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form=document.getElementById("myForm");
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
  let name=form.elements["name"].value;
  console.log(name);
  let date=form.elements["date"].value;
  console.log(date);
  let person=form.elements["person"].value;
  console.log(person);
  let adventureID=adventure.id;
  console.log(adventure.id);
  let data={
    name:name,
    date:date,
    person:person,
    adventure:adventureID
  }
  if(new Date() > new Date(date)){
    alert("Invalid Date : can't book for the past! DAH!");
    return;
  }
  
  const sendDataRequest =async ()=>{
    try{
      let url=config.backendEndpoint+"/reservations/new";
      let reponse= await fetch(url,{
      method :"POST",
      body :JSON.stringify(data),
      headers :{
       "content-type": "application/json"
      }
      });
      let responseData= await reponse.json(); 
      alert("Success!");
      return responseData;

    }catch(e){
      alert("Failed",e);
    }
    
  }
  sendDataRequest();
});

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
