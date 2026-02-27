
import { apiKey, baseUrl } from "./api.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const mediaType = params.get("mtype");


//console log
console.log(window.location.search);
console.log(movieId);
console.log(mediaType);

const movieInfoUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
const tvInfoUrl = `${baseUrl}/tv/${movieId}?api_key=${apiKey}`;
// const episodesInfoUrl = `${baseUrl}/tv/${movieId}/season/${data.season_number}?api_key=${apiKey}`;

// https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}?api_key=${apiKey}

const personInfoUrl = `${baseUrl}/person/${movieId}?api_key=${apiKey}`;
const trailerUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
const posterUrl = `https://image.tmdb.org/t/p/original`;

movieInfoFunction();

async function movieInfoFunction() {

    try {
        let contentUrl;
        if (mediaType === 'tv') {
            contentUrl = tvInfoUrl;

        } else {
            console.log("No media type found or type is movie. Defaulting to Movie API.");
            contentUrl = movieInfoUrl;
        }
        const contentInfoJson = await fetch(contentUrl);
        const contentInfoData = await contentInfoJson.json();

        console.log(contentInfoData);


        if (!contentInfoJson.ok || contentInfoData.success === false) {
            throw new Error("Data couldn't fetched");

        } else {
            const landingPage = document.querySelector(".landingPage");
            let srcUrl;
            if (contentInfoData.backdrop_path) {
                srcUrl = `${posterUrl}${contentInfoData.backdrop_path}`;
            } else {
                srcUrl = `${posterUrl}${contentInfoData.poster_path}`
            }
            landingPage.style.setProperty("--bg-image", `url(${srcUrl})`);

            if (mediaType === 'tv') {
                showTvInfoUi(contentInfoData);
            } else {
                console.log("No media type found or type is movie. Defaulting to Movie API.");
                showMovieInfoUi(contentInfoData);
            }
        }

    } catch (error) {
        //console log
        console.log(error.message);
    };
};


function showTvInfoUi(data) {

    const movieStat = document.getElementById("movieStat");

    const genre = data.genres.map(element => `<p>${element.name}</p>`).join("");

    movieStat.innerHTML = `

    <div class="movieTitleDiv">
        <p class="movieTitle">${data.original_name}</p>
        <p class="movieTagLine">${data.tagline}</p>
    </div>

    <div class="movieTiming">
        <div><img src="images/runTimeDark.png" alt="" class="runTimeImage"><span>${data.episode_run_time} minutes</span></div>
        <div><img src="images/releaseDark.png" alt="" class="releaseImage"><span>${data.first_air_date} to ${data.last_air_date}</span></div>
        <div><img src="" alt="" class="statusImage"><span>${data.status}</span></div>       
        <div><img src="images/soundDark.png" alt="" class="soundImage"><span>${data.spoken_languages[0]?.english_name || "N/A"}</span></div>    

    </div>

    <div class="akaTitleDiv" > 
        <span class="akaBar"></span>
        <div class="akaTitle" > 
            <span>Also Known As</span>
            <span>${data.name}</span>
        </div>
    </div>

    <div class="genreDiv">${genre}</div>

       <div class="overView"> <p>${data.overview}</p></div>

    `

    const tvStreamSection = document.createElement("section");
    tvStreamSection.setAttribute("class", "tvStreamSection");
    const tvStreamSelection = document.createElement("section");
    tvStreamSelection.setAttribute("class", "tvStreamSelection");
    const restPage = document.getElementById("restPage");

    const tvSeasonHead = document.createElement("div");
    tvSeasonHead.setAttribute("class", "tvSeasonHead");
    const tvEpisodesHead = document.createElement("div");
    tvEpisodesHead.setAttribute("class", "tvEpisodesHead");
    const episodePreview = document.createElement("div");
    episodePreview.setAttribute("class", "episodePreview");

    tvSeasonHead.innerHTML = `
                                <select name="" id="seasonSelect" class="seasonSelect" required >
                                <option value="default" disabled selected hidden>Select season</option>
                                </select>
                         
                               `

    tvEpisodesHead.innerHTML = `
                                    <select name="" id="episodesSelect" class="episodesSelect" required >
                                    <option value="default" disabled selected hidden>Select episode</option>
                                    </select>
                         
                               `

    restPage.appendChild(tvStreamSection);
    tvStreamSelection.appendChild(tvSeasonHead);
    tvStreamSelection.appendChild(tvEpisodesHead);
    tvStreamSection.appendChild(tvStreamSelection);
    let seasonSelect = document.getElementById("seasonSelect");
    let episodesSelect = document.getElementById("episodesSelect");

    data.seasons.forEach((season) => {
        const tvSeasonOption = document.createElement("option");
        tvSeasonOption.innerHTML = `${season.season_number}. ${season.name}`;
        tvSeasonOption.value = season.season_number;
        seasonSelect.appendChild(tvSeasonOption);
    });

    seasonSelect.addEventListener("change", episodesInfoFunction);

    async function episodesInfoFunction() {
        let pickedSeason = seasonSelect.value;
        const episodesInfoUrl = `${baseUrl}/tv/${movieId}/season/${pickedSeason}?api_key=${apiKey}`;
        try {
            const episodesInfoJson = await fetch(episodesInfoUrl);
            const episodesInfoData = await episodesInfoJson.json();
            if (!episodesInfoJson.ok || episodesInfoData.success === false) {
                throw new Error("Data couldn't fetch");

            } else {
                console.log(episodesInfoData);

                episodesSelect.innerHTML = ` <option value="default" disabled selected hidden>Select episode</option>`;
                episodePreview.innerHTML = "";

                episodesInfoData.episodes.forEach((episode) => {
                    const tvEpisodeOption = document.createElement("option");
                    tvEpisodeOption.innerHTML = `${episode.episode_number}: ${episode.name}`
                    tvEpisodeOption.value = episode.episode_number;

                    episodesSelect.appendChild(tvEpisodeOption);

                });

                const replacedEpisodeSelect = episodesSelect.cloneNode(true);
                episodesSelect.replaceWith(replacedEpisodeSelect);
                episodesSelect = replacedEpisodeSelect;


                replacedEpisodeSelect.addEventListener("change", episodePreviewFunction);
                function episodePreviewFunction() {
                    episodePreview.innerHTML = "";

                    let pickedEpisode = episodesInfoData.episodes.find((ep) => {
                        return ep.episode_number === parseInt(replacedEpisodeSelect.value);
                    });

                    const episodeImage = document.createElement("div");
                    episodeImage.setAttribute("class", "episodeImage");
                    const episodeName = document.createElement("div");
                    episodeName.setAttribute("class", "episodeName");

                    let episodePreviewImageSrc;
                    if (pickedEpisode.still_path)
                        episodePreviewImageSrc = `${posterUrl}${pickedEpisode.still_path}`;
                    else {
                        episodePreviewImageSrc = `images/demo.png`;
                    }

                    let seasonNumber = seasonSelect.value;
                    episodeImage.innerHTML = `
                        <a href="play.html?id=${data.id}&mtype=${mediaType}&sname=${seasonNumber}&sepisode=${pickedEpisode.episode_number}"><img src=${episodePreviewImageSrc} alt=""></a>
                        `

                    episodeName.innerHTML = `
                       <a href="play.html?id=${data.id}&mtype=${mediaType}&sname=${seasonNumber}&sepisode=${pickedEpisode.episode_number}"> <p>${pickedEpisode.name}</p>
                        <p>${pickedEpisode.overview}</p></a>
                        `
                    tvStreamSection.appendChild(episodePreview);

                    episodePreview.appendChild(episodeImage);
                    episodePreview.appendChild(episodeName);
                }

            }
        } catch (error) {
            console.log(error.message);
        }
    };

    themeChanger();
};




function showMovieInfoUi(data) {

    const movieButtons = document.getElementById("movieButtons");
    const movieStat = document.getElementById("movieStat");

    const genre = data.genres.map(element => `<p>${element.name}</p>`).join("");

    let playSrc = localStorage.getItem("playButtonImg") || "images/playDark.png";

    // change the play to play.html for everthing bcz the play to use npx serve 

    movieButtons.innerHTML = `
        <a href="play.html?id=${data.id}" class="streamButtonAnchor">
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

        if (exitImage) { exitImage.src = "images/returnDark.png" };
        if (playButtonImg) { playButtonImg.src = "images/playDark.png" };
        if (runTimeImage) { runTimeImage.src = "images/runTimeDark.png" };
        if (releaseImage) { releaseImage.src = "images/releaseDark.png" };
        if (soundImage) { soundImage.src = "images/soundDark.png" };

    } else {

        if (exitImage) { exitImage.src = "images/returnLight.png" };
        if (playButtonImg) { playButtonImg.src = "images/playLight.png" };
        if (runTimeImage) { runTimeImage.src = "images/runTimeLight.png" };
        if (releaseImage) { releaseImage.src = "images/releaseLight.png" };
        if (soundImage) { soundImage.src = "images/soundLight.png" };
    }
};
