// Sample Series Data (In a real app, you'd fetch this from an API)
const seriesData = [
    {
      id: 1,
      title: "When Life Gives You Tangerine",
      thumbnail: "assets/posters/tangerine-poster.jpg",
      year: 2023,
      rating: 9.2,
      episodes: 14,
      genres: ["Drama", "Slice of Life"],
      driveId: "1TAZU4PaTNA9A3cNrgr9shlEd1hMaFCg2" // First episode ID
    },
    {
      id: 2,
      title: "Midnight Diner",
      thumbnail: "assets/posters/midnight-poster.jpg",
      year: 2022,
      rating: 8.7,
      episodes: 10,
      genres: ["Drama", "Food"],
      driveId: "EXAMPLE_DRIVE_ID_2"
    },
    // Add more series as needed...
  ];
  
  // DOM Elements
  const seriesGrid = document.getElementById('seriesGrid');
  const genreTags = document.querySelectorAll('.genre-tag');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    displaySeries(seriesData);
    setupEventListeners();
  });
  
  // Display Series Function
  function displaySeries(series) {
    seriesGrid.innerHTML = '';
    
    series.forEach(show => {
      const seriesCard = document.createElement('div');
      seriesCard.className = 'series-card';
      seriesCard.innerHTML = `
        <img src="${show.thumbnail}" alt="${show.title}">
        <div class="series-info">
          <h3>${show.title}</h3>
          <div class="series-meta">
            <span>${show.year}</span>
            <span>${show.rating} ★</span>
            <span>${show.episodes} eps</span>
          </div>
        </div>
      `;
      
      seriesCard.addEventListener('click', () => {
        window.location.href = `series.html?id=${show.id}`;
        // In a real app, you'd redirect to the specific series page
        // For now we'll use the player directly:
        // window.location.href = `player.html?id=${show.driveId}&title=${encodeURIComponent(show.title)}`;
      });
      
      seriesGrid.appendChild(seriesCard);
    });
  }
  
  // Filter and Sort Functionality
  function filterAndSortSeries() {
    const activeGenre = document.querySelector('.genre-tag.active').textContent;
    const searchTerm = searchInput.value.toLowerCase();
    const sortOption = sortSelect.value;
    
    let filteredSeries = [...seriesData];
    
    // Filter by genre
    if (activeGenre !== 'All') {
      filteredSeries = filteredSeries.filter(series => 
        series.genres.includes(activeGenre)
      );
    }
    
    // Filter by search
    if (searchTerm) {
      filteredSeries = filteredSeries.filter(series =>
        series.title.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort series
    switch (sortOption) {
      case 'newest':
        filteredSeries.sort((a, b) => b.year - a.year);
        break;
      case 'rating':
        filteredSeries.sort((a, b) => b.rating - a.rating);
        break;
      case 'alphabetical':
        filteredSeries.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // popular
        filteredSeries.sort((a, b) => b.rating - a.rating);
    }
    
    displaySeries(filteredSeries);
  }
  
  // Event Listeners Setup
  function setupEventListeners() {
    // Genre filter
    genreTags.forEach(tag => {
      tag.addEventListener('click', () => {
        genreTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        filterAndSortSeries();
      });
    });
    
    // Search input
    searchInput.addEventListener('input', debounce(filterAndSortSeries, 300));
    
    // Sort select
    sortSelect.addEventListener('change', filterAndSortSeries);
    
    // Load more button
    loadMoreBtn.addEventListener('click', () => {
      // In a real app, you'd fetch more data
      alert('Loading more series...');
    });
  }
  
  // Utility Functions
  function debounce(func, delay) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  }