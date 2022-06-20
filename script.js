const searchterm = document.querySelector("#name")
const submit = document.querySelector("#submit") //submit button 
const rdiv = document.querySelector("#results")
const form = document.querySelector("#form")
const loadmore = document.querySelector("#loadmore")
const reset = document.querySelector("#reset")

var executed = false; 
var more = false; 
var page = 1;
var homepage = true;  
var term = ""

//add functionality for load more on first page 

async function firstpage(){
    let res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=cba48e1c6a9dc48f272518294f77342b&language=en-US&page=${page}`)
    resData = await res.json() 
    console.log(resData)
    displayResults(resData.results)
}

async function getResults(searchterm){
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cba48e1c6a9dc48f272518294f77342b&language=en-US&query=${searchterm}&page=${page}&include_adult=false`)
    resData = await res.json() 
    console.log(resData)
    displayResults(resData.results)
}

function displayResults(results){
    if(more != true)
    {
        rdiv.innerHTML = ""
    }
    //rdiv.innerHTML = ""
    for(let i =0; i < results.length; i++)
    {
        rdiv.innerHTML += `<div id="movieblock"> 
            <img src="https://images.tmdb.org/t/p/w500${results[i].poster_path}">
            <h1 id="titles"> ${results[i].title} <br/> ⭐️ ${results[i].vote_count} </h1>  
        <div>`
    }
    searchterm.value = ''
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    page = 1
    homepage = false 
    let tempsearch = event.target.searchterm.value
    term = tempsearch.replace(/ /g, "+")
    getResults(term)
    console.log(term)
    searchterm.innerHTML = " "
})

loadmore.addEventListener("click", async (event) => {
    event.preventDefault()
    page++ 
    more = true;
    if(homepage)
    {
        firstpage()
    } 
    else
    {
        getResults(term)
    }
})

reset.addEventListener("click", async (event) => {
    event.preventDefault()
    rdiv.innerHTML = ""
    page = 1
    firstpage()
    homepage = true 
})

window.onload = () =>{
    if(executed == false)
    {
        firstpage()
    }
    executed = true;
    console.log(executed) 
}
