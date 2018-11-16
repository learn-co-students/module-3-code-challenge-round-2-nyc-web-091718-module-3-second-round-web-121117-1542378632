allBeersArray = []
const beerListContainer = document.querySelector('#list-group')
const beerDetailContainer = document.querySelector('#beer-detail')

fetch('http://localhost:3000/beers')
.then(res => res.json())
.then(allBeers => {
  console.log(allBeers)
  allBeersArray = allBeers
  renderAllBeersToPage(allBeersArray)
})

beerListContainer.addEventListener('click', function(event) {
  if (event.target.id === "beer-name") {
    let id = event.target.dataset.id
    fetch(`http://localhost:3000/beers/${id}`)
    .then(res => res.json())
    .then(oneBeer => {
      console.log(oneBeer)
      renderBeerDetail(oneBeer)
    })
  }
})



function renderBeerDetail(oneBeer) {
  beerDetailContainer.innerHTML = `
    <h1>${oneBeer.name}</h1>
    <img src="${oneBeer.image_url}">
    <h3>${oneBeer.tagline}</h3>
    <textarea id="beer-desc">${oneBeer.description}</textarea>
    <button id="edit-beer" data-id="${oneBeer.id}" class="btn btn-info">
      Save
    </button>
    `
    console.log(`${oneBeer.description}`)
    const saveEditBeerButton = document.querySelector('#edit-beer')
    saveEditBeerButton.addEventListener('click', function(event) {
      let id = parseInt(event.target.dataset.id)
      // debugger
      console.log(event.target.parentElement.querySelector('#beer-desc').innerText)
    })
}

function renderAllBeersToPage(beersArray) {
  beersArray.forEach(function(beer) {
    renderSingleBeerToPage(beer)
  })
}

function renderSingleBeerToPage(singleBeer) {
  beerListContainer.innerHTML += `
    <li id="beer-name" data-id="${singleBeer.id}" class="list-group-item">${singleBeer.name}</li>
    `
}
