const API_KEY = '4626200399b08f9d04b72348e3625f15';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const header = document.querySelector('.header');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const accountBtn = document.getElementById('account-btn');
const bannerImage = document.getElementById('banner-image');
const bannerTitle = document.getElementById('banner-title');
const bannerDescription = document.getElementById('banner-description');
const playBtn = document.getElementById('play-btn');
const infoBtn = document.getElementById('info-btn');

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = "login.html";
  }

  loadTrending();
  loadAnime();
  loadContinueWatching();
  loadRandomBanner();

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  searchInput.addEventListener('input', debounce(handleSearch, 300));

  accountBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html";
  });
});

async function loadTrending() {
  const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
  const data = await response.json();
  displayContent(data.results, '.trending-container');
}

async function loadAnime() {
  const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`);
  const data = await response.json();
  displayContent(data.results, '.anime-container');
}

function loadContinueWatching() {
  const continueWatching = JSON.parse(localStorage.getItem('continueWatching')) || [];
  displayContent(continueWatching, '.continue-container');
}

async function loadRandomBanner() {
  const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
  const data = await response.json();
  const randomItem = data.results[Math.floor(Math.random() * data.results.length)];

  bannerImage.src = `https://image.tmdb.org/t/p/original${randomItem.backdrop_path}`;
  bannerTitle.textContent = randomItem.title || randomItem.name;
  bannerDescription.textContent = randomItem.overview;

  playBtn.onclick = () => playContent(randomItem);
  infoBtn.onclick = () => showInfo(randomItem);
}

function displayContent(items, containerClass) {
  const container = document.querySelector(containerClass);
  container.innerHTML = '';

  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'row-item';
    itemElement.innerHTML = `
      <img src="${IMG_URL}${item.poster_path}" alt="${item.title || item.name}">
      <div class="item-overlay">
        <h3>${item.title || item.name}</h3>
        <p>${item.vote_average} ⭐</p>
      </div>
    `;
    itemElement.addEventListener('click', () => playContent(item));
    container.appendChild(itemElement);
  });

  initCarousel(containerClass);
}

async function playContent(item) {
  // Add to continue watching
  const continueWatching = JSON.parse(localStorage.getItem('continueWatching')) || [];
  if (!continueWatching.some(i => i.id === item.id)) {
    continueWatching.push(item);
    localStorage.setItem('continueWatching', JSON.stringify(continueWatching));
  }

  // Get IMDb ID
  const type = item.media_type || 'movie';
  const detailsUrl = `${BASE_URL}/${type}/${item.id}?api_key=${API_KEY}`;
  const res = await fetch(detailsUrl);
  const details = await res.json();

  if (details.imdb_id) {
    window.location.href = `player.html?imdb=${details.imdb_id}`;
  } else {
    alert('No IMDb ID found. Cannot play this content.');
  }
}

function showInfo(item) {
  alert(`${item.title || item.name}\n\n${item.overview}`);
}

async function handleSearch() {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    searchResults.style.display = 'none';
    return;
  }

  const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  displaySearchResults(data.results);
}

function displaySearchResults(results) {
  searchResults.innerHTML = '';
  results.forEach(item => {
    if (item.poster_path) {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result';
      resultItem.innerHTML = `
        <img src="${IMG_URL}${item.poster_path}" alt="${item.title || item.name}">
        <div class="search-info">
          <h3>${item.title || item.name}</h3>
          <p>${item.media_type} • ${item.release_date || item.first_air_date || ''}</p>
        </div>
      `;
      resultItem.addEventListener('click', () => playContent(item));
      searchResults.appendChild(resultItem);
    }
  });
  searchResults.style.display = results.length ? 'block' : 'none';
}

function debounce(func, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

function initCarousel(containerClass) {
  const container = document.querySelector(containerClass);
  const prevBtn = document.querySelector(`${containerClass}-prev`);
  const nextBtn = document.querySelector(`${containerClass}-next`);
  if (!container || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
  });
}
function hideAllSections() {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
}

async function loadTrending() {
  hideAllSections();
  document.querySelector('.trending-container').style.display = 'block';
  // Fetch + show trending content
}

async function loadAnime() {
  hideAllSections();
  document.querySelector('.anime-container').style.display = 'block';
  // Fetch + show anime
}

function loadCustomList() {
  hideAllSections();
  document.querySelector('.custom-container').style.display = 'block';
  document.querySelector('.custom-container').innerHTML = `
    <div class="row-item">
      <h3>My Custom Video</h3>
      <iframe src="https://vidsrc.me/embed/tv?imdb=tt26471411" 
        style="width: 100%; height: 400px;" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
}
