const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search)
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {

    let response = await fetch(`http://www.omdbapi.com/?apikey=3eed3bad&i=${imdbID}&plot=full`);
    let data = await response.json()
    console.log(data);

    if (data.Response === "True") {
        displayMovie(data)
    } else {
        console.log(data.Error);
    }

}


function displayMovie(data){

   movieDetail.innerHTML =  `<div class="detail-grid">
        <div>
            <img src=${data.Poster} alt="">
        </div>

        <div>
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>IMDb: ${data.imdbRating} / 10</p>
            </section>

            <div>
                <p>Plot Overview</p>
                <p>${data.Plot}</p>
            </div>

            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p>Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>

            <div>
                 <p>Actors</p>
                    <p>${data.Actors}</p>
            </div>

             <div>
                <section>
                    <p>Language</p>
                    <p>${data.Language}</p>
                </section>
                <section>
                    <p>Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>

            <button>
            <a href=https://www.imdb.com/title/${data.imdbID} target="_blank" >View on IMDb</a>
            </button>

        </div>
    </div>

    <div class="movie-footer">
        <div>
            <p>Awards</p>
            <p>${data.Awards}</p>
        </div>
        <div>
            <p>Box Office</p>
            <p>${data.BoxOffice}</p>
        </div>
        <div>
            <p>Metascore</p>
            <p>${data.Metascore}</p>
        </div>
        <div>
            <p>Production</p>
            <p>${data.Production}</p>
        </div>
    </div>`

}