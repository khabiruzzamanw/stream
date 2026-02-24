import { apiKey, baseUrl } from "./api.js";

const landingPageUrl = `${baseUrl}/trending/all/week?api_key=${apiKey}`;
const trendingUrl = `${baseUrl}/trending/all/day?api_key=${apiKey}`;
const popularUrl = `${baseUrl}/movie/popular?api_key=${apiKey}`;
const topRatedUrl = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const thrillerUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=53`;
const crimeUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=80`;
const horrorUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`;
const romanceUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=10749`;
const comedyUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`;

const posterUrl = `https://image.tmdb.org/t/p/w500`

const trendingCarousel = document.getElementById("trendingCarousel");
const popularCarousel = document.getElementById("popularCarousel");
const topRatedCarousel = document.getElementById("topRatedCarousel");
const thrillerCarousel = document.getElementById("thrillerCarousel");
const crimeCarousel = document.getElementById("crimeCarousel");
const horrorCarousel = document.getElementById("horrorCarousel");
const romanceCarousel = document.getElementById("romanceCarousel");
const comedyCarousel = document.getElementById("comedyCarousel");

// Instead of calling them one by one, run them in parallel
async function init() {
  themeChanger();
  scroll();

  await Promise.all([
    landingPageFunction(),
    trendingFunction(),
    popularFunction(),
    topRatedFunction(),
    thrillerFunction(),
    crimeFunction(),
    horrorFunction(),
    romanceFunction(),
    comedyFunction()
  ]);
}

init();

// themeChanger();
// trendingFunction();
// popularFunction();
// topRatedFunction();



async function landingPageFunction() {

  const landingPageDataJson = await fetch(landingPageUrl);

  const landingPageData = await landingPageDataJson.json();

  const landingPageDataArr = landingPageData.results;

  landingPageDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    //console log 

    console.log(` landingPageDataArray :`, element, index);
  });

  //console log 
  console.log(` landingPagedata :`, landingPageData);


}
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
async function thrillerFunction() {
  const thrillerDataJson = await fetch(thrillerUrl);

  const thrillerData = await thrillerDataJson.json();

  const thrillerDataArr = thrillerData.results;

  thrillerDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    thrillerCarousel.appendChild(card);

    //console log 

    console.log(` thrillerDataArray :`, element, index);
  });
  //console log 
  console.log(` thrillerData :`, thrillerData);

}
async function crimeFunction() {
  const crimeDataJson = await fetch(crimeUrl);

  const crimeData = await crimeDataJson.json();

  const crimeDataArr = crimeData.results;

  crimeDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    crimeCarousel.appendChild(card);

    //console log 

    console.log(` crimeDataArray :`, element, index);
  });
  //console log 
  console.log(` crimeData :`, crimeData);

}
async function horrorFunction() {
  const horrorDataJson = await fetch(horrorUrl);

  const horrorData = await horrorDataJson.json();

  const horrorDataArr = horrorData.results;

  horrorDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    horrorCarousel.appendChild(card);

    //console log 

    console.log(` horrorDataArray :`, element, index);
  });
  //console log 
  console.log(` horrorData :`, horrorData);

}
async function romanceFunction() {
  const romanceDataJson = await fetch(romanceUrl);

  const romanceData = await romanceDataJson.json();

  const romanceDataArr = romanceData.results;

  romanceDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    romanceCarousel.appendChild(card);

    //console log 

    console.log(` romanceDataArray :`, element, index);
  });
  //console log 
  console.log(` romanceData :`, romanceData);

}
async function comedyFunction() {
  const comedyDataJson = await fetch(comedyUrl);

  const comedyData = await comedyDataJson.json();

  const comedyDataArr = comedyData.results;

  comedyDataArr.forEach((element, index) => {

    const card = carouselUi(element, index);
    comedyCarousel.appendChild(card);

    //console log 

    console.log(` comedyDataArray :`, element, index);
  });
  //console log 
  console.log(` comedyData :`, comedyData);

}


function carouselUi(data, index) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");
  card.setAttribute("id", `card${index + 1}`);
  //console log 
  console.log(card.id);


  let srcUrl;
  if (data.poster_path) {
    srcUrl = `${posterUrl}${data.poster_path}`
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

  
  // change the info into info.html for everthing bcz it's info to use npx serve 
  card.innerHTML = `
                      <a href="info?id=${data.id}" class="cardButtonAnchor">
                       <img src=${srcUrl} alt="" class="cardImage" loading="lazy" >
                       <span class="hoveredCard"></span>                 
                      </a> 
                   `

  //console log
  console.log(data.id);
  return card;



}








function themeChanger() {

  const theme = document.getElementById("theme");
  const toSearchImg = document.getElementById("toSearchImg");
  const leftArrow = document.querySelectorAll(".leftArrowImage");
  const rightArrow = document.querySelectorAll(".rightArrowImage");

  document.body.classList.add(localStorage.getItem("userTheme")) || "light";
  theme.src = localStorage.getItem("themeImg") || "images/lightMode.svg";
  toSearchImg.src = localStorage.getItem("SearchImg") || "images/searchDark.svg";

  if (leftArrow) {


    leftArrow.forEach((element) => {

      element.src = localStorage.getItem("leftArrowImg") || "images/swipeLeftDark.png";

    })
  }
  if (rightArrow) {


    rightArrow.forEach((element) => {

      element.src = localStorage.getItem("rightArrowImg") || "images/swipeRightDark.png";

    })
  }


  theme.addEventListener("click", () => {
    let themeData = document.body.classList;
    const playButtonImg = document.querySelectorAll(".playButtonImg");
    const infoButtonImg = document.querySelectorAll(".infoButtonImg");

    if (themeData.contains("dark")) {

      themeData.replace("dark", "light");
      theme.src = "images/lightMode.svg";
      toSearchImg.src = "images/searchDark.svg";
      localStorage.setItem("userTheme", "light");
      localStorage.setItem("themeImg", "images/lightMode.svg");
      localStorage.setItem("SearchImg", "images/searchDark.svg");
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
      if (leftArrow) {
        leftArrow.forEach((element) => {
          element.src = "images/swipeLeftDark.png";
          localStorage.setItem("leftArrowImg", "images/swipeLeftDark.png")
        })
      }
      if (rightArrow) {
        rightArrow.forEach((element) => {
          element.src = "images/swipeRightDark.png";
          localStorage.setItem("rightArrowImg", "images/swipeRightDark.png")
        })
      }

    } else {

      themeData.replace("light", "dark");
      theme.src = "images/darkMode.svg";
      toSearchImg.src = "images/searchLight.svg";
      localStorage.setItem("userTheme", "dark");
      localStorage.setItem("themeImg", "images/darkMode.svg");
      localStorage.setItem("SearchImg", "images/searchLight.svg");
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
      if (leftArrow) {
        leftArrow.forEach((element) => {
          element.src = "images/swipeLeftLight.png";
          localStorage.setItem("leftArrowImg", "images/swipeLeftLight.png")
        })
      }
      if (rightArrow) {
        rightArrow.forEach((element) => {
          element.src = "images/swipeRightLight.png";
          localStorage.setItem("rightArrowImg", "images/swipeRightLight.png")
        })
      }

    }

  });

};


function scroll() {
  const scrollButton = document.querySelectorAll('.scrollButton')
  scrollButton.forEach((button) => {

    button.addEventListener("click", (carou) => {
      carou.stopPropagation();
      const carousel = button.closest(".carouselWrapper").querySelector('.carousel');

      if (button.classList.contains("leftArrow")) {
        carousel.scrollBy({ left: -320, behavior: "smooth" });
      }
      else {
        carousel.scrollBy({ left: 320, behavior: "smooth" });

      }

    })

  })
}