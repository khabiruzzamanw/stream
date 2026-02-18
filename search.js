import { apiKey,baseUrl} from "./api.js";

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const show = document.getElementById("cardGrid");
const titleSection = document.getElementById("titleSection");

const GlobalUrl = `${baseUrl}/search/multi?api_key=${apiKey}&query=`
  document.body.classList.add(localStorage.getItem("userTheme")) || "light";
// themeChanger();
// trendingFunction();


searchButton.addEventListener("click", () => {

  const movieName = searchBar.value;
  searchMovie(GlobalUrl, movieName);
});

searchBar.addEventListener("keydown", function (e) {

  const movieName = searchBar.value;

  if (e.key === "Enter") {
    searchMovie(GlobalUrl, movieName);
  }
});


function titleForSeachFunction(name) {
  const titleDiv = document.createElement("div");
  titleDiv.setAttribute("class", "titleDiv");
  titleSection.innerHTML = '';
  titleDiv.innerHTML = `      
                              <div class="searchedTitle">
                              <h2>You have searched : ${name}</h2>
                              </section>
                            `
  titleSection.appendChild(titleDiv);
}



async function searchMovie(url, name) {
  const moviedataJson = await fetch(`${url}${name}`);

  const movieData = await moviedataJson.json();

  const searchResultArr = movieData.results;
  titleForSeachFunction(name)
  show.innerHTML = '';

  searchResultArr.forEach((element) => {

    movieDetails(element.id);
    // trailer(element.id);
    // console.log(`movieId : `, element.id);

    // showUI(element) ;
  });

  // showUI(searchResultArr);
  console.log(`movieData : `, movieData);

}

async function movieDetails(movieId) {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

  const movieDetailsJson = await fetch(movieUrl);

  const movieDatailsData = await movieDetailsJson.json();
  showUI(movieDatailsData);

  console.log(`MovieDetails : `, movieDatailsData);


}



function showUI(data) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");

  let srcUrl;
  if (data.poster_path) {
    srcUrl = ` https://image.tmdb.org/t/p/w500${data.poster_path}`
  } else {
    srcUrl = "images/demo.png "
  }


  let overviewWords;

  if (data.overview.split(" ").length > 10) {
    overviewWords = data.overview.split(" ").splice(0, 10).join(" ") + ".......";
  }
  else {
    overviewWords = data.overview;
  }


  let playSrc = localStorage.getItem("playButtonImg") || "images/playDark.png";
  let infoSrc = localStorage.getItem("infoButtonImg") || "images/infoDark.png";
  // let srcUrl =` https://image.tmdb.org/t/p/w500${data.poster_path}  || images/demo.png `

  card.innerHTML = `
                      <div class="cardImage" >
                      <img src=${srcUrl} alt="">                    
                      <div class="cardButton" >
                      <a href="play.html?id=${data.id}"><img class="playButtonImg" src=${playSrc} alt=""></a>
                      <a href="info.html?id=${data.id}"><img  class="infoButtonImg" src=${infoSrc}  alt=""></a>           
                      
                      </div>
                      
      
                      </div>
                   `

  show.appendChild(card);


}




function themeChanger() {

  const theme = document.getElementById("theme");

  document.body.classList.add(localStorage.getItem("userTheme")) || "light";
  theme.src = localStorage.getItem("themeImg") || "images/lightMode.svg";


  theme.addEventListener("click", () => {
    let themeData = document.body.classList;
    const playButtonImg = document.querySelectorAll(".playButtonImg");
    const infoButtonImg = document.querySelectorAll(".infoButtonImg");

    if (themeData.contains("dark")) {

      themeData.replace("dark", "light");
      theme.src = "images/lightMode.svg";
      localStorage.setItem("userTheme", "light");
      localStorage.setItem("themeImg", "images/lightMode.svg");
      if (playButtonImg) {
        playButtonImg.forEach((element) => {
          element.src = "images/playDark.png";
          localStorage.setItem("playButtonImg", "images/playDark.png")
        })

      }
      if (infoButtonImg) {


        infoButtonImg.forEach((element) => {

          element.src = "images/infoDark.png";
          localStorage.setItem("infoButtonImg", "images/infoDark.png")
        })
      }

    } else {

      themeData.replace("light", "dark");
      theme.src = "images/darkMode.svg";
      localStorage.setItem("userTheme", "dark");
      localStorage.setItem("themeImg", "images/darkMode.svg");
      if (playButtonImg) {
        playButtonImg.forEach((element) => {
          element.src = "images/playLight.png";
          localStorage.setItem("playButtonImg", "images/playLight.png")
        })
      }
      if (infoButtonImg) {
        infoButtonImg.forEach((element) => {
          element.src = "images/infoLight.png";
          localStorage.setItem("infoButtonImg", "images/infoLight.png")
        })
      }


    }

  });

};






