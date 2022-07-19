tvShowID = location.hash.substring(1)

getShowDetails().then((item)=>{
    tvShowDomCard(item)
})


const tvShowDomCard = (item)=>{
    const wrapperDiv = document.getElementById('wrapper-div')



    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card','mb-3')
    //cardDiv.setAttribute('style','max-width: 500px;')
    cardDiv.setAttribute('id','movie-card-div')
    wrapperDiv.appendChild(cardDiv)

    const cardDivWrapper = document.createElement('div')
    cardDivWrapper.classList.add('row','g-0')
    cardDiv.appendChild(cardDivWrapper)

    const imgDiv = document.createElement('div')
    imgDiv.classList.add('col-md-4')
    cardDivWrapper.appendChild(imgDiv)

    const imgEl = document.createElement('img')
    //imgEl.setAttribute('id','movie-poster')
    imgEl.classList.add('img-fluid','rounded','mx-auto')
    imgEl.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
    imgDiv.appendChild(imgEl)

    const cardBodyWrapper = document.createElement('div')
    cardBodyWrapper.classList.add('col-md-8','my-auto')
    cardDivWrapper.appendChild(cardBodyWrapper)

    const cardBodyDiv = document.createElement('div')
    cardBodyDiv.classList.add('card-body')
    cardBodyWrapper.appendChild(cardBodyDiv)

    const cardTitleEl = document.createElement('h1')
    cardTitleEl.classList.add('card-tile')
    cardTitleEl.textContent = item.name
    cardBodyDiv.appendChild(cardTitleEl)


    const cardDetails = document.createElement('p')
    cardDetails.classList.add('card-text')
    cardDetails.textContent = item.overview
    cardBodyDiv.appendChild(cardDetails)

    return wrapperDiv
}


document.querySelector('#clear-cart').addEventListener('click',()=>{
    localStorage.removeItem('renting-cart')
    rentingCart = []
    cartCheckoutDOM(rentingCart)
})

document.querySelector('#website-redirector').addEventListener('click',(e)=>{
    location.assign("../tv-shows.html")
})