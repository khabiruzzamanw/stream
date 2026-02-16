const apiKey = "70703951c7bdbbb345e20edb60cff4f1";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const originalImgUrl = "https://image.tmdb.org/t/p/original";

// Elements
const homeContent = document.getElementById("homeContent");
const searchSection = document.getElementById("searchSection");
const searchResultsGrid = document.getElementById("searchResultsGrid");
const searchInput = document.getElementById("searchInput");

const requests = {
    fetchTrending: `${baseUrl}/trending/all/day?api_key=${apiKey}`,
    fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
    fetchAction: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`,
    fetchComedy: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`,
    fetchHorror: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`,
    search: `${baseUrl}/search/movie?api_key=${apiKey}&query=`,
};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    
    // Load Rows
    fetchMovies(requests.fetchTrending, "trendingRow", true);
    fetchMovies(requests.fetchTopRated, "topRatedRow");
    fetchMovies(requests.fetchAction, "actionRow");
    fetchMovies(requests.fetchComedy, "comedyRow");
    fetchMovies(requests.fetchHorror, "horrorRow");

    setupModal();

    // Search Listener
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const query = e.target.value;
            if (query) {
                performSearch(query);
            } else {
                showHome();
            }
        }
    });
});

async function fetchMovies(url, domId, isHero = false) {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    if (isHero) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setHero(randomMovie);
    }

    const rowContainer = document.getElementById(domId);
    rowContainer.innerHTML = ""; // Clear existing
    
    movies.forEach(movie => {
        const card = createCard(movie);
        rowContainer.appendChild(card);
    });
}

function createCard(movie) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const img = document.createElement("img");
    img.src = movie.poster_path ? `${imgUrl}${movie.poster_path}` : "images/demo.png";
    img.alt = movie.title;
    
    card.addEventListener('click', () => openModal(movie));
    card.appendChild(img);
    return card;
}

// Search Functionality
async function performSearch(query) {
    homeContent.style.display = "none";
    searchSection.style.display = "block";
    searchResultsGrid.innerHTML = "Loading...";

    const url = `${requests.search}${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    searchResultsGrid.innerHTML = ""; // Clear loading
    if(data.results.length === 0) {
        searchResultsGrid.innerHTML = "<p>No results found.</p>";
        return;
    }

    data.results.forEach(movie => {
        const card = createCard(movie);
        searchResultsGrid.appendChild(card);
    });
}

function showHome() {
    searchSection.style.display = "none";
    homeContent.style.display = "block";
    searchInput.value = "";
}

function setHero(movie) {
    document.getElementById("heroTitle").innerText = movie.title || movie.name;
    document.getElementById("heroOverview").innerText = movie.overview;
    document.getElementById("hero").style.backgroundImage = `url(${originalImgUrl}${movie.backdrop_path})`;
    
    // Play button
    document.getElementById("heroPlayBtn").onclick = () => {
        window.location.href = `play.html?id=${movie.id}`;
    };
    
    document.getElementById("heroInfoBtn").addEventListener("click", () => openModal(movie));
}

// Modal
const modal = document.getElementById("movieModal");
function setupModal() {
    document.querySelector(".close").addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => { if(e.target == modal) modal.style.display = "none" });
}

function openModal(movie) {
    document.getElementById("modalTitle").innerText = movie.title || movie.name;
    document.getElementById("modalOverview").innerText = movie.overview;
    document.getElementById("modalRating").innerText = `Rating: ${movie.vote_average}`;
    document.getElementById("modalDate").innerText = movie.release_date || "N/A";
    document.getElementById("modalHeader").style.backgroundImage = `url(${originalImgUrl}${movie.backdrop_path})`;
    
    // Modal Play Button
    const playBtn = document.getElementById("modalPlayBtn");
    playBtn.onclick = () => {
        window.location.href = `play.html?id=${movie.id}`;
    };

    modal.style.display = "flex";
}

function initTheme() {
    const themeBtn = document.getElementById("theme");
    const savedTheme = localStorage.getItem("userTheme");
    if (savedTheme) document.body.className = savedTheme;
    
    themeBtn.addEventListener("click", () => {
        const newTheme = document.body.className === "dark" ? "light" : "dark";
        document.body.className = newTheme;
        localStorage.setItem("userTheme", newTheme);
    });
}