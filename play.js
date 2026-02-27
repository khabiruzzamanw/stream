


// `https://vidsrc.to/embed/tv/${movieId}/${season}/${episode}` || `https://vidsrc.me/embed/tv?tmdb=${movieId}&season=${season}&episode=${episode}` || `https://2embed.cc/embedtv/${movieId}&s=${season}&e=${episode}`;


//  `https://vidsrc.to/embed/movie/${movieId}` || `https://vidsrc.me/embed/movie?tmdb=${movieId}` || `https://2embed.cc/embed/${movieId}` || `https://player.videasy.net/movie/${movieId}`;



// `https://player.videasy.net/movie/${movieId}`;


import { apiKey, baseUrl } from "./api.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const mediaType = params.get("mtype");
const season = params.get("sname");
const episode = params.get("sepisode");

console.log("movieId:", movieId);
console.log("mediaType:", mediaType);
console.log("season:", season);
console.log("episode:", episode);

loadStream();

function loadStream() {
  const streamDiv = document.getElementById("stream");

  if (!movieId) {
    streamDiv.innerHTML = `<p style="color:white;padding:2rem;">No content ID found.</p>`;
    return;
  }

  let embedUrl;

  if (mediaType === "tv") {

    if (season && episode) {

      embedUrl = `https://player.videasy.net/tv/${movieId}/${season}/${episode}`;

    } else {

      embedUrl = `https://player.videasy.net/tv/${movieId}`;
    }

  } else {

    embedUrl = `https://player.videasy.net/movie/${movieId}`;

  }

  console.log("Streaming URL:", embedUrl);

  window.location.href = embedUrl;
}