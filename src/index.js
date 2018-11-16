BEERSURL = "http://localhost:3000/beers"
let beerlist = document.querySelector("#list-group")
let beerdetails = document.querySelector("#beer-detail")
let selectedBeerid = null
let newtext = null


fetch(BEERSURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    appendMultipleBeerNameToList(myJson)
});


function appendBeerNameToList(beerobject) {
  beerlist.innerHTML +=  `<li data-id=${beerobject.id} class="list-group-item">${beerobject.name}</li>`
}

function appendMultipleBeerNameToList(beerobjects){
  beerobjects.forEach((beer)=>{
    appendBeerNameToList(beer)
  })
}// end of appendMultipleBeerNameToList

beerlist.addEventListener("click", (e)=>{
  selectedBeerid = e.target.dataset.id
  fetch(`${BEERSURL}/${selectedBeerid}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      addingBeerDetails(myJson)
  });

})

function addingBeerDetails(beerobject){
      beerdetails.innerHTML = `<div data-id=${beerobject.id}>
      <h1>${beerobject.name}</h1>
    <img src=${beerobject.image_url}>
    <h3>${beerobject.tagline}</h3>
    <textarea>${beerobject.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>
    </div>`
}

beerdetails.addEventListener("click", (e)=>{
  if(e.target.id = "edit-beer"){

    selectedBeerid = e.target.parentElement.dataset.id
    newtext = e.target.parentElement.children[3].value
    let data = {description: newtext}

    fetch(`${BEERSURL}/${selectedBeerid}`, {
      method: 'PATCH', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))///end of fetch
  }///end of if
})
