document.addEventListener('DOMContentLoaded', (event) => {
 let allBeers = []

  const beerList = document.getElementById('list-group')
  const beerShow = document.getElementById('beer-detail')

fetch('http://localhost:3000/beers')
.then((res) => res.json())
.then(json => {
allBeers = json
beerList.innerHTML = renderBeers(allBeers)
})

beerList.addEventListener('click', (event) => {
  if(event.target.dataset.action === "show"){

    const beerId = event.target.dataset.id

  function findBeer(id){
    return allBeers.find((beer) => {
      return beer.id == id
    })
  }
 let beer = findBeer(beerId)
 beerShow.innerHTML =  renderDeets(beer)

}
})

beerShow.addEventListener('click', (event) => {
let id = parseInt(event.target.dataset.id)
let newDesc = document.getElementById('text').value
let data = { description: newDesc }
  if(event.target.dataset.id == id) {
    fetch(`http://localhost:3000/beers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(json => {
      let updated = json.description
       beerShow.innerHTML = renderDeets(json)
  ///have to refresh to reflect the changes persists on backend as instructed, out of time to debug why frontend does not persist
    })
  }

})
}) //END DOM CONTENT LOADED


function renderBeers(beers) {
  return beers.map((beer) => {
    return `<li data-action="show" data-id="${beer.id}" id="list-group-item">${beer.name}</li>`
  }).join('')
}


function renderDeets(beer){
  return `<h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id="text">${beer.description}</textarea>
  <button data-id="${beer.id}" "data-action="edit" class="btn btn-info" value="save"> Save
  </button>`
}
