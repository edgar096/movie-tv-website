movieID = location.hash.substring(1)

getMovieDetails().then((item)=>{
    domCard(item,'movie')
})


clearCart()


document.querySelector('#website-redirector').addEventListener('click',(e)=>{
    location.assign("./movie-website.html")
})