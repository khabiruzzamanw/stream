    import { apiKey, baseUrl } from "./api.js";

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");
    const mediaType = params.get("type") || "movie";
    const season = params.get("season") || "1";
    const episode = params.get("episode") || "1";

    window.sources = mediaType === "tv"
      ? [
          `https://vidsrc.to/embed/tv/${movieId}/${season}/${episode}`,
          `https://vidsrc.me/embed/tv?tmdb=${movieId}&season=${season}&episode=${episode}`,
          `https://2embed.cc/embedtv/${movieId}&s=${season}&e=${episode}`
        ]
      : [
          `https://vidsrc.to/embed/movie/${movieId}`,
          `https://vidsrc.me/embed/movie?tmdb=${movieId}`,
          `https://2embed.cc/embed/${movieId}`
        ];

    window.currentSource = 0;

    const stream = document.getElementById("stream");

    function loadSource(index) {
      stream.innerHTML = `
        <iframe
          src="${window.sources[index]}"
          width="100%" height="100%"
          allowfullscreen frameborder="0"
          scrolling="no"
          allow="autoplay; encrypted-media; picture-in-picture">
        </iframe>`;
    }

    loadSource(0);

    async function fetchTitle() {
      try {
        const endpoint = mediaType === "tv" ? "tv" : "movie";
        const res = await fetch(`${baseUrl}/${endpoint}/${movieId}?api_key=${apiKey}`);
        const data = await res.json();
        const title = data.title || data.name || "Now Playing";
        document.getElementById("movieTitle").textContent =
          mediaType === "tv" ? `${title} — S${season} E${episode}` : title;
      } catch(e) {
        document.getElementById("movieTitle").textContent = "Now Playing";
      }
    }

    fetchTitle();

    window.switchSource = function(index) {
      window.currentSource = index;
      [0,1,2].forEach(i => {
        document.getElementById(`src${i+1}`).classList.toggle("active", i === index);
      });
      loadSource(index);
      showToast(`Switched to Source ${index + 1}`);
    };





    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursorRing");

    document.addEventListener("mousemove", e => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        cursorRing.style.left = e.clientX + "px";
        cursorRing.style.top = e.clientY + "px";
      }, 60);
    });

    document.querySelectorAll("button, a, input").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(2)";
        cursorRing.style.width = "48px";
        cursorRing.style.height = "48px";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(1)";
        cursorRing.style.width = "32px";
        cursorRing.style.height = "32px";
      });
    });

    // Auto-hide controls
    const controls = document.getElementById("controls");
    let hideTimer;

    function showControls() {
      controls.classList.remove("hidden");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => controls.classList.add("hidden"), 3500);
    }

    document.getElementById("playerWrap").addEventListener("mousemove", showControls);
    document.getElementById("playerWrap").addEventListener("touchstart", showControls);
    showControls();

    // Toast
    const toast = document.getElementById("toast");
    let toastTimer;

    window.showToast = function(msg) {
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
    };

    // Mute
    let muted = false;

    window.toggleMute = function() {
      muted = !muted;
      const icon = document.getElementById("volIcon");
      const slider = document.getElementById("volumeSlider");
      if (muted) {
        slider.value = 0;
        document.getElementById("volumeLabel").textContent = "0";
        icon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>`;
        showToast("Muted");
      } else {
        slider.value = 100;
        document.getElementById("volumeLabel").textContent = "100";
        icon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
        showToast("Unmuted");
      }
    };

    window.updateVolume = function(val) {
      document.getElementById("volumeLabel").textContent = val;
      muted = val == 0;
    };

    // Fullscreen
    window.toggleFullscreen = function() {
      const el = document.getElementById("playerWrap");
      if (!document.fullscreenElement) {
        el.requestFullscreen();
        document.getElementById("fsLabel").textContent = "Exit";
        document.getElementById("fsIcon").innerHTML = `
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>`;
      } else {
        document.exitFullscreen();
        document.getElementById("fsLabel").textContent = "Fullscreen";
        document.getElementById("fsIcon").innerHTML = `
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>`;
      }
    };

    // PiP
    window.togglePiP = function() {
      showToast("PiP not supported for embedded streams");
    };

    // Keyboard shortcuts
    document.addEventListener("keydown", e => {
      showControls();
      switch(e.key) {
        case "f": case "F": toggleFullscreen(); break;
        case "m": case "M": toggleMute(); break;
        case "1": switchSource(0); break;
        case "2": switchSource(1); break;
        case "3": switchSource(2); break;
        case "Escape":
          if (document.fullscreenElement) document.exitFullscreen(); break;
      }
    });