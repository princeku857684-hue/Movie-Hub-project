const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search);
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim());
} else {
    movieDetail.innerHTML = `<p class="text-center text-gray-400 py-10">No movie selected.</p>`;
}

async function searchMovie(imdbID) {

    movieDetail.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-4 py-20">
            <div class="relative w-16 h-16">
                <span class="absolute inset-0 rounded-full border-4 border-[#2a2138]"></span>
                <span class="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-violet animate-spin"></span>
                <span class="absolute inset-3 rounded-full bg-violet/15 animate-ping"></span>
                <span class="absolute inset-5 rounded-full bg-gradient-to-br from-gold to-violet"></span>
            </div>
            <p class="text-gray-400 text-sm tracking-wide">🎬 Loading details<span class="animate-pulse">...</span></p>
        </div>
    `;

    let response = await fetch(`http://www.omdbapi.com/?apikey=3eed3bad&i=${imdbID}&plot=full`);
    let data = await response.json();

    if (data.Response === "True") {
        displayMovie(data);
    } else {
        movieDetail.innerHTML = `<p class="text-center text-gray-400 py-10">${data.Error}</p>`;
    }
}

function displayMovie(data) {

    movieDetail.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <div>
            <img src="${data.Poster !== 'N/A' ? data.Poster : ''}" alt="${data.Title}"
                class="w-full max-w-[220px] md:max-w-none mx-auto rounded-xl border border-[#332a47] shadow-[0_10px_30px_rgba(124,92,255,0.2)] hover:scale-[1.03] transition-transform duration-300 block">
        </div>

        <div>
            <h2 class="text-2xl font-bold mb-2">${data.Title}</h2>
            <section class="flex flex-wrap gap-3 text-gray-400 text-sm mb-5">
                <span>${data.Released}</span>
                <span>${data.Rated}</span>
                <span>${data.Runtime}</span>
                <span>${data.Genre}</span>
                <span>⭐ IMDb: ${data.imdbRating} / 10</span>
            </section>

            <div class="mb-5">
                <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">Plot Overview</p>
                <p class="text-gray-200 leading-relaxed">${data.Plot}</p>
            </div>

            <div class="mb-5 flex flex-wrap gap-x-6 gap-y-3">
                <section class="w-full sm:w-[48%]">
                    <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">Director</p>
                    <p>${data.Director}</p>
                </section>
                <section class="w-full sm:w-[48%]">
                    <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>

            <div class="mb-5">
                <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">Actors</p>
                <p>${data.Actors}</p>
            </div>

            <div class="mb-6 flex flex-wrap gap-x-6 gap-y-3">
                <section class="w-full sm:w-[48%]">
                    <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">Language</p>
                    <p>${data.Language}</p>
                </section>
                <section class="w-full sm:w-[48%]">
                    <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>

            <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank"
               class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#7c5cff] text-white font-semibold hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_10px_3px_rgba(124,92,255,0.35)] transition">
               ⭐ View on IMDb
            </a>
        </div>
    </div>

    <div class="mt-8 pt-6 border-t border-[#332a47] grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-[#171126] border border-[#332a47] rounded-xl p-3.5 hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,107,0.15)] transition">
            <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">🏆 Awards</p>
            <p class="text-sm">${data.Awards}</p>
        </div>
        <div class="bg-[#171126] border border-[#332a47] rounded-xl p-3.5 hover:border-violet hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(124,92,255,0.15)] transition">
            <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">💰 Box Office</p>
            <p class="text-sm">${data.BoxOffice}</p>
        </div>
        <div class="bg-[#171126] border border-[#332a47] rounded-xl p-3.5 hover:border-teal hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(45,212,191,0.15)] transition">
            <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">🎯 Metascore</p>
            <p class="text-sm">${data.Metascore}</p>
        </div>
        <div class="bg-[#171126] border border-[#332a47] rounded-xl p-3.5 hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,107,0.15)] transition">
            <p class="text-gray-400 text-xs uppercase tracking-wide mb-1">🎬 Production</p>
            <p class="text-sm">${data.Production}</p>
        </div>
    </div>
    `;
}