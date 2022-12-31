import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  let url=config.backendEndpoint+"/reservations/";
  let response=await fetch(url);
  let respoData=await response.json();
  //console.log(respoData);
  return respoData;
}catch{
   // Place holder for functionality to work in the Stubs
   return null;
}

//return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length>0){
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";
    let table=document.getElementById("reservation-table");
    reservations.forEach(element => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];  
      let d=new Date(element.date);
      let month=d.getMonth()+1;
      let resDate=d.getDate()+"/"+month+"/"+d.getUTCFullYear();

      let t=new Date(element.time);
      let resTime=t.getDate()+" "+monthNames[t.getMonth()]+" "+t.getUTCFullYear()+", "+t.toLocaleTimeString().toLowerCase();
      let url="../detail/?adventure="+element.adventure;
   //<td><button onclick="location.href='${url}'" id="${element.id}" class="reservation-visit-button">Visit Adventure</button></td>
   
    let str=`
        <tr>
            <td><b>${element.id}</b></a></td>
            <td>${element.name}</td>
            <td>${element.adventureName}</td>
            <td>${element.person}</td>
            <td>${resDate}</td>
            <td>${element.price}</td>
            <td>${resTime}</td>
            <td><button id="${element.id}" class="reservation-visit-button"><a href="${url}">Visit Adventure</a></button></td>
        </tr>
      
      `;
      table.innerHTML+=str;
    });

  }else{
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
