const apiKey = "70703951c7bdbbb345e20edb60cff4f1";
const baseUrl = "https://api.themoviedb.org/3";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const videoContainer = document.getElementById("videoContainer");

if (movieId) {
    fetchVideo(movieId);
} else {
    videoContainer.innerHTML = "<div class='error-msg'>No Movie ID Found</div>";
}

async function fetchVideo(id) {
    try {
        const url = `${baseUrl}/movie/${id}/videos?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            // Find a trailer, or just take the first video
            const trailer = data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube") || data.results[0];
            
            if (trailer) {
                embedVideo(trailer.key);
            } else {
                videoContainer.innerHTML = "<div class='error-msg'>No Trailer Available</div>";
            }
        } else {
            videoContainer.innerHTML = "<div class='error-msg'>No Video Found</div>";
        }
    } catch (error) {
        console.error("Error:", error);
        videoContainer.innerHTML = "<div class='error-msg'>Error loading video</div>";
    }
}

function embedVideo(key) {
    videoContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${key}?autoplay=1&modestbranding=1&rel=0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen>
        </iframe>
    `;
}