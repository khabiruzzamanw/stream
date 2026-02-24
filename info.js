
import { apiKey, baseUrl } from "./api.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

//console log
console.log(window.location.search);
console.log(movieId);

const movieInfoUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
const trailerUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`
const posterUrl = `https://image.tmdb.org/t/p/original`

const mainPage = document.getElementById("mainPage");

document.body.classList.add(localStorage.getItem("userTheme")) || "light";

movieInfoFunction();






async function movieInfoFunction() {

    try {
        const movieInfoJson = await fetch(movieInfoUrl);
        const movieInfoData = await movieInfoJson.json();

        if (!movieInfoJson.ok || movieInfoData.success === false) {
            throw new Error("Data couldn't fetched");
        } else {


            let srcUrl;
            if (movieInfoData.backdrop_path) {
                srcUrl = `${posterUrl}${movieInfoData.backdrop_path}`;
            } else {
                srcUrl = `${posterUrl}${movieInfoData.poster_path}`
            }
            mainPage.style.background = (`url(${srcUrl})`);

            //console log
            console.log(movieInfoData);

            showMovieInfoUi(movieInfoData)
        }

    } catch (error) {
        //console log
        console.log(error.message);

    }



}


function showMovieInfoUi(data) {
    const movieButtons = document.getElementById("movieButtons");
    const movieStat = document.getElementById("movieStat");

    const genre = data.genres.map(element => `<p>${element.name}</p>`).join("");

    let playSrc = localStorage.getItem("playButtonImg") || "images/playDark.png";

    // change the play to play.html for everthing bcz the play to use npx serve 

    movieButtons.innerHTML = `
        <a href="play?id=${data.id}">
            <img class="playButtonImg" src="${playSrc}" alt="">
            Stream
        </a>
    `;

    movieStat.innerHTML = `
    <div class="movieTitleDiv">
        <p class="movieTitle">${data.original_title}</p>
        <p class="movieTagLine">${data.tagline}</p>
    </div>
    <div class="movieTiming">
        <div><img src="images/runTimeDark.png" alt=""><span>${data.runtime} minutes</span></div>
        <div><img src="images/releaseDark.png" alt=""><span>${data.release_date}</span></div>
        <div><img src="" alt=""><span>${data.status}</span></div>       
        <div><img src="images/soundDark.png" alt=""><span>${data.spoken_languages[0]?.english_name || "N/A"}</span></div>     

    </div>
    <div class="akaTitleDiv" > 
        <span class="akaBar"></span>
    <div class="akaTitle" > 
        <span>Also Known As</span>
        <span>${data.title}</span>
    </div>
    </div>
    <div class="genreDiv">${genre}</div>
        <p>${data.overview}</p>
    <div class="costCollection">
        <img src="" alt=""><span>Budget : ${data.budget} $</span>
        <img src="" alt=""><span>Revenue : ${data.revenue} $</span>
    </div>
    `;
}





async function trailer() {

    const trailerDataJson = await fetch(trailerUrl);

    const trailerData = await trailerDataJson.json();

    console.log(trailerData);


}