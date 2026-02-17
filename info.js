
import { apiKey, baseUrl } from "./api.js";

const movieInfoUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=` ;


const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
    movieInfoFunction () ;    

async function movieInfoFunction (){
       const movieInfoJson = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`) ;

       const movieInfoData = await movieInfoJson.json();

       console.log(movieInfoData);
       showMovieInfoUi(movieInfoData)
       
}


function showMovieInfoUi(data){
            const movieButtons = document.getElementById("movieButtons");
            const movieInfo = document.getElementById("movieInfo");


  let playSrc = localStorage.getItem("playButtonImg") || "images/playDark.png";
        
        movieButtons.innerHTML = `
                                    <a href="play.html?id=${data.id}"><img class="playButtonImg" src=${playSrc} alt=""></a>
                                 `
        movieInfo.innerHTML = `
                                  <p> 
                              `
}

    