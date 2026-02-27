import { apiKey, baseUrl } from "./api.js";

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const show = document.getElementById("cardGrid");
const titleSection = document.getElementById("titleSection");
const posterUrl = `https://image.tmdb.org/t/p/original`;


const GlobalUrl = `${baseUrl}/search/multi?api_key=${apiKey}&query=`;

themeChanger();
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

  try {
    const moviedataJson = await fetch(`${url}${name}`);
    const movieData = await moviedataJson.json();

    if (!moviedataJson.ok || movieData.success === false) {
      throw new Error("Couldn't fetched data");

    } else {
      const searchResultArr = movieData.results;
      titleForSeachFunction(name)
      show.innerHTML = '';
      searchResultArr.forEach((element) => {
        // movieDetails(element.id);
        showUI(element)
      });
      console.log(`movieData : `, movieData);

    }
  } catch (error) {
    console.log(error.message);
  }

}


function showUI(data) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");

  let srcUrl;
  if (data.poster_path) {
    srcUrl = `${posterUrl}${data.poster_path}`
  } else {
    srcUrl = "images/demo.png "
  }
  // let srcUrl =` https://image.tmdb.org/t/p/w500${data.poster_path}  || images/demo.png `

  card.innerHTML = `
                      <a href="info?id=${data.id}&mtype=${data.media_type}" class="cardButtonAnchor">
                       <img src=${srcUrl} alt="" class="cardImage" loading="lazy" >
                       <span class="hoveredCard"></span>                 
                      </a> 
                   `

  show.appendChild(card);


}




function themeChanger() {

  const theme = document.getElementById("theme");
  const toSearchImg = document.getElementById("toSearchImg");

  document.body.classList.add(localStorage.getItem("userTheme") || "light");
  theme.src = localStorage.getItem("themeImg") || "images/lightMode.svg";
  toSearchImg.src = localStorage.getItem("SearchImg") || "images/searchDark.svg";


  theme.addEventListener("click", () => {
    let themeData = document.body.classList;

    if (themeData.contains("dark")) {

      themeData.replace("dark", "light");
      theme.src = "images/lightMode.svg";
      toSearchImg.src = "images/searchDark.svg";
      localStorage.setItem("userTheme", "light");
      localStorage.setItem("themeImg", "images/lightMode.svg");
      localStorage.setItem("SearchImg", "images/searchDark.svg");

    } else {

      themeData.replace("light", "dark");
      theme.src = "images/darkMode.svg";
      toSearchImg.src = "images/searchLight.svg";
      localStorage.setItem("userTheme", "dark");
      localStorage.setItem("themeImg", "images/darkMode.svg");
      localStorage.setItem("SearchImg", "images/searchLight.svg");

    }

  });

}






