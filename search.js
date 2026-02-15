const apiKey = "70703951c7bdbbb345e20edb60cff4f1";

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const show = document.getElementById("cardGrid");
const titleSection = document.getElementById("titleSection");

themeChanger();
trendingFunction();

searchButton.addEventListener("click", () => {

  const movieName = searchBar.value;
  // searchedTitle.innerHTML = `<h2>You have searched : ${movieName}</h2>`
  // titleForSeachFunction(movieName);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
  searchMovie(url, movieName);
});

searchBar.addEventListener("keydown", function (e) {

  const movieName = searchBar.value;
  // searchedTitle.innerHTML = `<h2>You have searched : ${movieName}</h2>`
  // titleForSeachFunction(movieName);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`

  if (e.key === "Enter") {
    searchMovie(url, movieName);
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
  const moviedataJson = await fetch(url);

  const movieData = await moviedataJson.json();

  const searchResultArr = movieData.results;
  titleForSeachFunction(name)
  show.innerHTML = '';

  searchResultArr.forEach((element) => {

    movieDetails(element.id);
    trailer(element.id);
    console.log(`movieId : `, element.id);
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

async function trendingFunction() {
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`

  const trendingDataJson = await fetch(trendingUrl);

  const trendingData = await trendingDataJson.json();

  const trendingDataArr = trendingData.results;

  trendingDataArr.forEach((element) => {

    showTrendingUI(element);
    console.log(` trendingDataArray :`, element);
  });
  // showTrendingUI(trendingData)

  console.log(` trendingdata :`, trendingData);


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
                      <div class="playButton" >
                      <a href="play.html"><img class="playButtonImg" src=${playSrc} alt=""></a>
                      <a href="info.html"><img  class="infoButtonImg" src=${infoSrc}  alt=""></a>
                      </div>
                      
                      <img src=${srcUrl} alt="">
                      </div>

                      <div class="cardInfo">
                      <p>
                      ${data.original_title}
                      </p>
                      <p>
                      Aka : ${data.title}
                      </p>
                      <p>
                      Overview : ${overviewWords}
                      </p>
                      <p>
                      Language : ${data.original_language}
                      </p>
                      </div>
                   `

  show.appendChild(card);


}
function showTrendingUI(data) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");
  card.setAttribute("id", "card");

  let srcUrl;
  if (data.poster_path) {
    srcUrl = ` https://image.tmdb.org/t/p/w500${data.poster_path}`
  } else {
    srcUrl = "images/demo.png "
  }

  // let srcUrl =` https://image.tmdb.org/t/p/w500${data.poster_path}  || images/demo.png `

  let overviewWords;

  if (data.overview.split(" ").length > 10) {
    overviewWords = data.overview.split(" ").splice(0, 10).join(" ") + ".......";
  }
  else {
    overviewWords = data.overview;
  }

  let playSrc = localStorage.getItem("playButtonImg") || "images/playDark.png";
  let infoSrc = localStorage.getItem("infoButtonImg") || "images/infoDark.png";

  card.innerHTML = `
                      <div class="cardImage" >
                      <div class="playButton" >
                      <a href="play.html"><img class="playButtonImg" src=${playSrc} alt=""></a>
                      <a href="info.html"><img  class="infoButtonImg" src=${infoSrc}  alt=""></a>
                      
                      
                      </div>
                      
                      <img src=${srcUrl} alt="">
                      
                      <div class="cardInfo" ">
                      <p>
                      ${data.original_title}
                      </p>
                      <p>
                      Aka : ${data.title}
                      </p>
                      <p>
                      Overview : ${overviewWords}
                      </p>
                      Language : ${data.original_language}
                      </p>
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







async function trailer(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  const responseDataJson = await fetch(url);

  const responseData = await responseDataJson.json();

  console.log(responseData);


}