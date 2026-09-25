const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim();
    if (!query) {
        return;
    }
    searchMovies(query);
});

async function searchMovies(movieName) {

    movieHub.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center gap-4 py-16">
            <div class="relative w-16 h-16">
                <span class="absolute inset-0 rounded-full border-4 border-[#2a2138]"></span>
                <span class="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-violet animate-spin"></span>
                <span class="absolute inset-3 rounded-full bg-violet/15 animate-ping"></span>
                <span class="absolute inset-5 rounded-full bg-gradient-to-br from-gold to-violet"></span>
            </div>
            <p class="text-gray-400 text-sm tracking-wide">🎬 Fetching movies<span class="animate-pulse">...</span></p>
        </div>
    `;

    let response = await fetch(`http://www.omdbapi.com/?apikey=3eed3bad&s=${movieName}`);
    let data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieHub.innerHTML = `<p class="col-span-full text-center text-gray-400 py-6">${data.Error}</p>`;
    }
}

function displayMovies(movies) {

    movieHub.innerHTML = "";

    movies.forEach((movie, i) => {
        const div = document.createElement("div");

        div.dataset.imdbID = movie.imdbID;
        div.setAttribute(
            "class",
            "movie-card group opacity-0 animate-fadeInUp bg-[#171126] border border-[#332a47] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:border-violet hover:shadow-[0_10px_30px_rgba(124,92,255,0.25)] transition-all duration-300"
        );
        div.style.animationDelay = `${Math.min(i * 0.04, 0.4)}s`;

        div.innerHTML = `
            <div class="overflow-hidden aspect-[2/3] bg-[#1c2230]">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" alt="${movie.Title}"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-3">
                <p class="font-semibold text-sm truncate">${movie.Title}</p>
                <p class="text-gray-400 text-xs">${movie.Year}</p>
            </div>
        `;
        movieHub.append(div);
    });
}

movieHub.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card");
    if (!movieCard) return;
    const imdbID = movieCard.dataset.imdbID;
    location.href = `movie-details.html?id=${imdbID}`;
});