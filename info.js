
import { apiKey, baseUrl } from "./api.js";

const movieInfoUrl = `/movie/{movieId}?api_key=${apiKey}`;

const posterUrl = `https://image.tmdb.org/t/p/original`
const mainPage = document.getElementById("mainPage");
const exitImg = document.getElementById("exitImg");



const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
movieInfoFunction();

async function movieInfoFunction() {
    const movieInfoJson = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);


    const movieInfoData = await movieInfoJson.json();
    //console log
    let srcUrl;
    if (movieInfoData.backdrop_path) {
        srcUrl = `${posterUrl}${movieInfoData.backdrop_path}`;
    } else {
        srcUrl = `${posterUrl}${movieInfoData.backdrop_path}` || `${posterUrl}${movieInfoData.poster_path}`
    }
    mainPage.style.setProperty("--bg-image", `url(${srcUrl})`);
    console.log(movieInfoData);
    showMovieInfoUi(movieInfoData)

}


function showMovieInfoUi(data) {
    const movieButtons = document.getElementById("movieButtons");
    const movieStat = document.getElementById("movieStat");

    const genre = data.genres.map(element => `<p>${element.name}</p>`).join("");

    let playSrc = localStorage.getItem("playButtonImg") || "images/playDark.png";

    movieButtons.innerHTML = `
        <a href="play.html?id=${data.id}">
            <img class="playButtonImg" src="${playSrc}" alt="">
        </a>
    `;

    movieStat.innerHTML = `
        <p>${data.original_title}</p>
        <p>Aka : ${data.title}</p>
        <p>Overview : ${data.overview}</p>
        <p>Language : ${data.spoken_languages[0]?.english_name || "N/A"}</p>
        <p>Status : ${data.status}</p>
        <p>Release : ${data.release_date}</p>
        <p>Budget : ${data.budget}</p>
        <p>Revenue : ${data.revenue}</p>
        <div class="genreDiv">${genre}</div>
    `;
}


