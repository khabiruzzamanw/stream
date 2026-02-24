
import { apiKey, baseUrl } from "./api.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

//console log
console.log(window.location.search);
console.log(movieId);

const movieInfoUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
const trailerUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
const posterUrl = `https://image.tmdb.org/t/p/original`;

movieInfoFunction();

async function movieInfoFunction() {

    try {
        const movieInfoJson = await fetch(movieInfoUrl);
        const movieInfoData = await movieInfoJson.json();

        if (!movieInfoJson.ok || movieInfoData.success === false) {
            throw new Error("Data couldn't fetched");
        } else {
            const main = document.querySelector("main");
            let srcUrl;
            if (movieInfoData.backdrop_path) {
                srcUrl = `${posterUrl}${movieInfoData.backdrop_path}`;
            } else {
                srcUrl = `${posterUrl}${movieInfoData.poster_path}`
            }
            main.style.setProperty("--bg-image", `url(${srcUrl})`);

            showMovieInfoUi(movieInfoData);
            //console log
            console.log(movieInfoData);
        };

    } catch (error) {
        //console log
        console.log(error.message);
    };
};


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
        <div><img src="images/runTimeDark.png" alt="" class="runTimeImage"><span>${data.runtime} minutes</span></div>
        <div><img src="images/releaseDark.png" alt="" class="releaseImage"><span>${data.release_date}</span></div>
        <div><img src="" alt="" class="statusImage"><span>${data.status}</span></div>       
        <div><img src="images/soundDark.png" alt="" class="soundImage"><span>${data.spoken_languages[0]?.english_name || "N/A"}</span></div>    

    </div>

    <div class="akaTitleDiv" > 
        <span class="akaBar"></span>
        <div class="akaTitle" > 
            <span>Also Known As</span>
            <span>${data.title}</span>
        </div>
    </div>

    <div class="genreDiv">${genre}</div>

       <div class="overView"> <p>${data.overview}</p></div>

    <div class="costCollection">
        <span>Budget : ${data.budget} $</span>
        <span>Revenue : ${data.revenue} $</span>
    </div>

    `
    themeChanger();

};





async function trailer() {

    const trailerDataJson = await fetch(trailerUrl);

    const trailerData = await trailerDataJson.json();

    console.log(trailerData);


};




function themeChanger() {
    const exitImage = document.querySelector(".exitImage");
    const playButtonImg = document.querySelector(".playButtonImg");
    const runTimeImage = document.querySelector(".runTimeImage");
    const releaseImage = document.querySelector(".releaseImage");
    const soundImage = document.querySelector(".soundImage");
    const statusImage = document.querySelector(".statusImage");

    document.body.classList.add(localStorage.getItem("userTheme") || "light");

    if (document.body.classList.contains("light")) {

        // document.body.classList.replace("dark", "light");
        // localStorage.setItem("userTheme", "light");

        if (exitImage) { exitImage.src = "images/returnDark.png" };
        if (playButtonImg) { playButtonImg.src = "images/playDark.png" };
        if (runTimeImage) { runTimeImage.src = "images/runTimeDark.png" };
        if (releaseImage) { releaseImage.src = "images/releaseDark.png" };
        if (soundImage) { soundImage.src = "images/soundDark.png" };

    } else {

        // document.body.classList.replace("light", "dark");
        // localStorage.setItem("userTheme", "dark");

        if (exitImage) { exitImage.src = "images/returnLight.png" };
        if (playButtonImg) { playButtonImg.src = "images/playLight.png" };
        if (runTimeImage) { runTimeImage.src = "images/runTimeLight.png" };
        if (releaseImage) { releaseImage.src = "images/releaseLight.png" };
        if (soundImage) { soundImage.src = "images/soundLight.png" };
    }
};