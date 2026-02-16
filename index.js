import { apiKey, baseUrl } from "./api.js";

const trendingUrl = `${baseUrl}/trending/all/day?api_key=${apiKey}`;
const popularUrl = `${baseUrl}/movie/popular?api_key=${apiKey}`;
const topRatedUrl = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const thrillerUrl = `${baseUrl}`;
const HorrorUrl = `${baseUrl}`;
const posterUrl = `https://image.tmdb.org/t/p/w500`

const trendingCarousel = document.getElementById("trendingCarousel");
const popularCarousel = document.getElementById("popularCarousel");
const topRatedCarousel = document.getElementById("topRatedCarousel");

themeChanger();
trendingFunction();
popularFunction();
topRatedFunction();



async function trendingFunction() {

  const trendingDataJson = await fetch(trendingUrl);

  const trendingData = await trendingDataJson.json();

  const trendingDataArr = trendingData.results;

  trendingDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    trendingCarousel.appendChild(card);
    //console log 

    console.log(` trendingDataArray :`, element, index);
  });

  //console log 
  console.log(` trendingdata :`, trendingData);


}



async function popularFunction() {
  const popularDataJson = await fetch(popularUrl);

  const popularData = await popularDataJson.json();

  const popularDataArr = popularData.results;

  popularDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    popularCarousel.appendChild(card);

    //console log 

    console.log(` popularDataArray :`, element, index);
  });
  //console log 
  console.log(` popularData :`, popularData);

}


async function topRatedFunction() {
  const topRatedDataJson = await fetch(topRatedUrl);

  const topRatedData = await topRatedDataJson.json();

  const topRatedDataArr = topRatedData.results;

  topRatedDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    topRatedCarousel.appendChild(card);

    //console log 

    console.log(` topRatedDataArray :`, element, index);
  });
  //console log 
  console.log(` topRatedData :`, topRatedData);

}


function carouselUi(data, index) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");
  card.setAttribute("id", `card${index + 1}`);
  //console log 
  console.log(card.id);


  let srcUrl;
  if (data.poster_path) {
    srcUrl = ` ${posterUrl}${data.poster_path}`
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

  card.innerHTML = `
                      <div class="cardImage" >
                      <img src=${srcUrl} alt="">                    
                      <div class="cardButton" >
                      <a href="play.html"><img class="playButtonImg" src=${playSrc} alt=""></a>
                      <a href="info.html"><img  class="infoButtonImg" src=${infoSrc}  alt=""></a>           
                      
                      </div>
                      
      
                      </div>
                   `

  return card;
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