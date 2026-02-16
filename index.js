const apiKey = "70703951c7bdbbb345e20edb60cff4f1";

const show = document.querySelectorAll(".cardGrid");
const scrollInfinite = document.getElementById("scrollInfinite");
const titleSection = document.getElementById("titleSection");

themeChanger();
trendingFunction();



async function trendingFunction() {
  const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`

  const trendingDataJson = await fetch(trendingUrl);

  const trendingData = await trendingDataJson.json();

  const trendingDataArr = trendingData.results;

  trendingDataArr.forEach((element, index) => {

    showTrendingUI(element, index);
    //console log 

    console.log(` trendingDataArray :`, element, index);
  });

  //console log 
  console.log(` trendingdata :`, trendingData);


}

function showTrendingUI(data, index) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");
  card.setAttribute("id", `card${index + 1}`);
  //console log 
  console.log(card.id);


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

  // show.appendChild(card);

  // show.forEach((element) => {

  //   element.appendChild(card);
  // })

  if(show.length >= 2) {
    show[0].appendChild(card);
    show[1].appendChild(card.cloneNode(true)); // cloneNode is key for infinite loops
  }

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
  //console log 

  console.log(responseData);


}