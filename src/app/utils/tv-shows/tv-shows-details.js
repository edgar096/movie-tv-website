tvShowID = location.hash.substring(1)

getShowDetails().then((item)=>{
    domCard(item)
})

clearCart()

document.querySelector('#website-redirector').addEventListener('click',(e)=>{
    location.assign("./tv-shows.html")
})