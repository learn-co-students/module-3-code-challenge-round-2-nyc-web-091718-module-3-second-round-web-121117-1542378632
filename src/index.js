//Step 1 - Display All Beer Names
document.addEventListener("DOMContentLoaded", function(event) {
   console.log("DOM fully loaded and parsed");
   fetchAllBeers();
   let allBeers = []

document.addEventListener('click', event => {
  if(event.target.class ='list-group-item') {
    addSingleBeerToPage(event);
  } else if(event.target ='editBtn') {
    editBeer(event)
  }
})

//Step 2 - Display Single Beer Details
function addSingleBeerToPage(event) {
  let singleBeer = allBeers.find(beer => event.target.id == `${beer.id}`);
  let beerDetails = document.querySelector('#beer-detail');
  debugger
  //Not sure why the HTML within the back ticks are not showing properly. Spacing issue??
  beerDetails.innerHTML =
  `
  <h1>${singleBeer.name}</h1>
  <img src= ${singleBeer.image_url}>
  <h3>${singleBeer.tagline}</h3>
  <textarea>${singleBeer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
  `;
}

function fetchAllBeers() {
   fetch(`http://localhost:3000/beers`)
   .then(res => res.json())
   .then(beers => {
     allBeers = beers;
     renderAllBeers(beers);
   })
}

function renderAllBeers(beers) {
  let beersList = document.querySelector('.list-group');
  beers.forEach(beer => beersList.innerHTML += `<li id =${beer.id} class="list-group-item">${beer.name}</li>`);
}

//Step 3 - Edit Beer Details
// let editBtn = document.querySelector('#edit-beer');
//   editBtn.addEventListener('click', event => {
function editBeer(event) {
  //grab user input
  let userInput = document.querySelector('textarea').value;
  let textArea = document.querySelector('textarea');
  //update the DOM with userInput
  textArea.innerHTML = userInput;
  //update the API/server with the user input with a PATCH request.
  fetch(`http://localhost:3000/beers/${beer.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: userInput })
  })
  .then(res => res.json());
}

}); //end of DOMContentLoaded
