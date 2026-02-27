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


const posterUrl = `https://image.tmdb.org/t/p/original`;

const trendingCarousel = document.getElementById("trendingCarousel");
const popularCarousel = document.getElementById("popularCarousel");
const topRatedCarousel = document.getElementById("topRatedCarousel");
const thrillerCarousel = document.getElementById("thrillerCarousel");
const crimeCarousel = document.getElementById("crimeCarousel");
const horrorCarousel = document.getElementById("horrorCarousel");
const romanceCarousel = document.getElementById("romanceCarousel");
const comedyCarousel = document.getElementById("comedyCarousel");

// Instead of calling them one by one, running them in parallel
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

async function landingPageFunction() {
  try {
    const landingPageDataJson = await fetch(landingPageUrl);
    const landingPageData = await landingPageDataJson.json();
    if (!landingPageDataJson.ok || landingPageData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {
      const randomIndex = Math.floor((Math.random() * landingPageData.results.length));
      const landingPageContentData = landingPageData.results[randomIndex];

      //console log 
      console.log(` landingPageData :`, landingPageData);
      console.log(` landingPageContentData :`, landingPageContentData);
      console.log(randomIndex);

      const landingPage = document.querySelector(".landingPage");
      const overView = document.querySelector(".overView");
      const AkaTitle = document.querySelector(".AkaTitle");
      const genre = document.querySelector(".genre");
      const title = document.querySelector(".title");
      // const title = document.querySelector(".title");

      movieInfoFunction();

      async function movieInfoFunction() {

        const movieInfoUrl = `${baseUrl}/movie/${landingPageContentData.id}?api_key=${apiKey}`;
        const tvInfoUrl = `${baseUrl}/tv/${landingPageContentData.id}?api_key=${apiKey}`;

        try {
          let contentUrl;
          if (landingPageContentData.media_type === 'tv') {
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
            let srcUrl;

            if (contentInfoData.backdrop_path) {
              srcUrl = `${posterUrl}${contentInfoData.backdrop_path}`;
            } else {
              srcUrl = `${posterUrl}${contentInfoData.poster_path}`
            }
            landingPage.style.setProperty("--bg-image", `url(${srcUrl})`);
            title.innerHTML = contentInfoData.original_title || contentInfoData.original_name;
            overView.innerHTML = contentInfoData.overview;
            AkaTitle.innerHTML = contentInfoData.name || contentInfoData.title;
            const genreParas = contentInfoData.genres.map(element => `<p>${element.name}</p>`).join("");

            genre.innerHTML = genreParas;


          }

        } catch (error) {
          //console log
          console.log(error.message);
        };
      };
    }

  } catch (error) {
    console.log(error.message);
  }
}


async function trendingFunction() {
  try {
    const trendingDataJson = await fetch(trendingUrl);
    const trendingData = await trendingDataJson.json();
    if (!trendingDataJson.ok || trendingData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {
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

  } catch (error) {
    console.log(error.message);
  }
}


async function popularFunction() {
  try {
    const popularDataJson = await fetch(popularUrl);
    const popularData = await popularDataJson.json();
    if (!popularDataJson.ok || popularData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {

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
  } catch (error) {
    console.log(error.message);
  }
}


async function topRatedFunction() {
  try {
    const topRatedDataJson = await fetch(topRatedUrl);
    const topRatedData = await topRatedDataJson.json();

    if (!topRatedDataJson.ok || topRatedData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {

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

  } catch (error) {
    console.log(error.message);
  }

}


async function thrillerFunction() {
  try {
    const thrillerDataJson = await fetch(thrillerUrl);
    const thrillerData = await thrillerDataJson.json();
    if (!thrillerDataJson.ok || thrillerData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {

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

  } catch (error) {
    console.log(error.message);
  }
}


async function crimeFunction() {
  try {
    const crimeDataJson = await fetch(crimeUrl);
    const crimeData = await crimeDataJson.json();

    if (!crimeDataJson.ok || crimeData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {
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

  } catch (error) {
    console.log(error.message);
  }
}


async function horrorFunction() {
  try {
    const horrorDataJson = await fetch(horrorUrl);
    const horrorData = await horrorDataJson.json();
    if (!horrorDataJson.ok || horrorData.success === false) {
      throw new Error("Couldn't fetched Data");

    } else {
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

  } catch (error) {
    console.log(error.message);
  }
}


async function romanceFunction() {
  try {
    const romanceDataJson = await fetch(romanceUrl);
    const romanceData = await romanceDataJson.json();

    if (!romanceDataJson.ok || romanceData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {

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
  } catch (error) {
    console.log(error.message);
  }

}


async function comedyFunction() {
  try {
    const comedyDataJson = await fetch(comedyUrl);
    const comedyData = await comedyDataJson.json();

    if (!comedyDataJson.ok || comedyData.success === false) {
      throw new Error("Couldn't data");

    } else {

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
  } catch (error) {
    console.log(error.message);
  }
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

  // change the info into info.html for everthing bcz it's info to use npx serve 
  card.innerHTML = `
                      <a href="info?id=${data.id}&mtype=${data.media_type}" class="cardButtonAnchor">
                       <img src=${srcUrl} alt="" class="cardImage" loading="lazy" >
                       <span class="hoveredCard"></span>                 
                      </a> 
                   `
  //console log
  console.log(data.id);
  return card;

};


function themeChanger() {

  const theme = document.getElementById("theme");
  const toSearchImg = document.getElementById("toSearchImg");
  const leftArrow = document.querySelectorAll(".leftArrowImage");
  const rightArrow = document.querySelectorAll(".rightArrowImage");
  const playButtonImg = document.querySelector(".play");
  const infoButtonImg = document.querySelector(".info");
  document.body.classList.add(localStorage.getItem("userTheme") || "light");
  theme.src = localStorage.getItem("themeImg") || "images/lightMode.svg";
  toSearchImg.src = localStorage.getItem("SearchImg") || "images/searchDark.svg";

  if (leftArrow) {
    leftArrow.forEach((element) => {
      element.src = localStorage.getItem("leftArrowImg") || "images/swipeLeftDark.png";
    })
  };

  if (rightArrow) {
    rightArrow.forEach((element) => {
      element.src = localStorage.getItem("rightArrowImg") || "images/swipeRightDark.png";
    })
  };

  if (playButtonImg) {
    playButtonImg.src = localStorage.getItem("playButtonImg") || "images/playDark.png";
  };

  if (infoButtonImg) {
    infoButtonImg.src = localStorage.getItem("infoButtonImg") || "images/infoDark.png";
  };


  theme.addEventListener("click", () => {
    let themeData = document.body.classList;


    if (themeData.contains("dark")) {

      themeData.replace("dark", "light");
      theme.src = "images/lightMode.svg";
      toSearchImg.src = "images/searchDark.svg";
      localStorage.setItem("userTheme", "light");
      localStorage.setItem("themeImg", "images/lightMode.svg");
      localStorage.setItem("SearchImg", "images/searchDark.svg");

      if (playButtonImg) {
        playButtonImg.src = "images/playDark.png";
        localStorage.setItem("playButtonImg", "images/playDark.png")
      };

      if (infoButtonImg) {
        infoButtonImg.src = "images/infoDark.png";
        localStorage.setItem("infoButtonImg", "images/infoDark.png")
      };

      if (leftArrow) {
        leftArrow.forEach((element) => {
          element.src = "images/swipeLeftDark.png";
          localStorage.setItem("leftArrowImg", "images/swipeLeftDark.png")
        })
      };

      if (rightArrow) {
        rightArrow.forEach((element) => {
          element.src = "images/swipeRightDark.png";
          localStorage.setItem("rightArrowImg", "images/swipeRightDark.png")
        })
      };

    } else {

      themeData.replace("light", "dark");
      theme.src = "images/darkMode.svg";
      toSearchImg.src = "images/searchLight.svg";
      localStorage.setItem("userTheme", "dark");
      localStorage.setItem("themeImg", "images/darkMode.svg");
      localStorage.setItem("SearchImg", "images/searchLight.svg");

      if (playButtonImg) {
        playButtonImg.src = "images/playLight.png";
        localStorage.setItem("playButtonImg", "images/playLight.png")
      };

      if (infoButtonImg) {
        infoButtonImg.src = "images/infoLight.png";
        localStorage.setItem("infoButtonImg", "images/infoLight.png")
      };

      if (leftArrow) {
        leftArrow.forEach((element) => {
          element.src = "images/swipeLeftLight.png";
          localStorage.setItem("leftArrowImg", "images/swipeLeftLight.png")
        })
      };

      if (rightArrow) {
        rightArrow.forEach((element) => {
          element.src = "images/swipeRightLight.png";
          localStorage.setItem("rightArrowImg", "images/swipeRightLight.png")
        })
      };

    }

  });



}


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

    });

  });
};
