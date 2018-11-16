
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded!");

  const beerUrl = "http://localhost:3000/beers"
  let allBeers = [];
  const beerList = document.getElementById('list-group')
  const beerDetail = document.getElementById('beer-detail')
  let beerContent;

  fetch(beerUrl)
  .then(res => res.json())
  .then(beersJSON => {
    allBeers = beersJSON
    beerList.innerHTML = renderBeerstoList(allBeers)

  })

  beerList.addEventListener("click", (event) => {
    if (event.target.dataset.id) {
      let targetBeer = allBeers.find(beer => beer.id == event.target.dataset.id)
      beerDetail.innerHTML = renderBeerToDetail(targetBeer)
      document.getElementById('edit-beer').addEventListener('click', changeDes)
    }
  })

  function changeDes(e) {
    e.preventDefault()
    beerContent = document.getElementById('beer-content').value
    let beerToUpdate = allBeers.find(beer => beer.id == event.target.dataset.id)
    beerToUpdate.description = beerContent
    let data = { description: beerContent }
      fetch(`${beerUrl}/${beerToUpdate.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // .then(res => res.json())
      // .then(json => console.log(json))

  }

  function renderBeerstoList(data){
    return data.map(beer => {
      return `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
    }).join("")
  }

  function renderBeerToDetail(beer) {
    return `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id="beer-content">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">Save
    </button>
    `
  }

}) // end of DOMContentLoaded
