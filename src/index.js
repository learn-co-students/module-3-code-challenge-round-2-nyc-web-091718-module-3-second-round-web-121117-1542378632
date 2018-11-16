document.addEventListener('DOMContentLoaded', runPage)

let beerData = []
let id


function runPage() {
getBeerData()

//----------Deal with API Data

  function getBeerData() {
    fetch('http://localhost:3000/beers')
    .then(respObj => respObj.json())
    .then(resJSON => beerData = resJSON)
    .then( beerData => {
      renderDOM(beerData)
    })
  }

  function updateBeerDetails(beerData){
      let bId = event.target.name
      console.log(parseInt(bId) + 1)
      let data = {

          description: document.getElementById('txt').value
      }

      fetch(`http://localhost:3000/beers/${id + 1}`,{ //-----the id is staying static at 1. Need to figure out how to make it change with event target
          method: "PATCH",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
    } //end of updateBeerDetails

//----------Render DOM-------------------

  function renderDOM(beerArray) {

  beerArray.forEach( (beer) => {

  document.getElementById('list-group').innerHTML +=
  `<li class="list-group-item" id=${beer.id}>${beer["name"]}</li>`
  }) //end of forEach

  document.querySelectorAll('.list-group-item').forEach( (li) => {
    li.addEventListener('click', (event) => {
      id = event.target.id - 1
      document.getElementById('beer-detail').innerHTML =
          `<h1>${beerData[id].name}</h1>
          <img src="${beerData[id].image_url}">
          <h3>${beerData[id].tagline}</h3>
          <textarea id="txt">${beerData[id].description}</textarea>
          <button name="${id}" id="edit-beer" class="btn btn-info">
            Save
          </button>`
          document.getElementById('edit-beer').addEventListener('click', (event) => {
            updateBeerDetails()
            })
          })
        })
      }//end of renderDOM

}//end of runPage
