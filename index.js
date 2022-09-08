let filmsArray = []
const apiKey = "37bc5e94"

const filmsList = document.getElementById("films-list")
const form = document.getElementById("form")
const filmName = document.getElementById("movie-name")



form.addEventListener("submit", function(e){
    e.preventDefault()
    let filmsNam = filmName.value
    
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${filmsNam}`)
        .then(res => res.json())
        .then(data => {console.log(data.Response)
        if(data.Response === "True"){
            filmsList.innerHTML = ""
            data.Search.map((data) => {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${data.imdbID}`)
                .then(res => res.json())
                .then(data => {
                    filmsList.innerHTML += `
                    <div class="container-films">
                        <img src="${data.Poster}">
                        <div>
                            <div class="line-one">
                                <h1>${data.Title}</h1>
                                <p>${data.Ratings[0].Value}</p>
                            </div>
                            <div class="line">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button id="save-film">Add to Watchlist</button>
                            </div>
                            <div>
                                <p class="plot">${data.Plot}</p>
                            </div>
                        </div>
                    </div>    
                        `
                })
            })
        } else if (data.Response === "False"){
            document.getElementById("films-list").innerHTML = `
            <div class="not-found">
            <h1>Unable to find what you looking for.Please try another search</h1>
            </div>
            ` 
        }
    })
})