

document.addEventListener('DOMContentLoaded', () => {
  // Load series info
  document.querySelector('.series-description').textContent = seriesData.description;
  
  // Load episodes
  const episodeGrid = document.querySelector('.episode-grid');
  
  seriesData.episodes.forEach((episode, index) => {
    const epCard = document.createElement('div');
    epCard.className = 'episode-card';
    epCard.innerHTML = `
      <div class="episode-number">${episode.id}</div>
      <img src="${episode.thumbnail}" alt="${episode.title}">
      <div class="episode-details">
        <h3>${episode.title}</h3>
        <p>${episode.description}</p>
        <div class="episode-meta">
          <span class="duration">${episode.duration}</span>
          <button class="btn-play-episode" data-id="${episode.driveId}" data-index="${index}">
            <i class="fas fa-play"></i> Play
          </button>
        </div>
      </div>
    `;
    
    episodeGrid.appendChild(epCard);
  });
  
  // Play buttons functionality
  document.querySelectorAll('.btn-play-episode').forEach(btn => {
    btn.addEventListener('click', function() {
      const driveId = this.getAttribute('data-id');
      const episodeIndex = parseInt(this.getAttribute('data-index'));
      const episode = seriesData.episodes[episodeIndex];
      
      // Save current episode to continue watching
      saveContinueWatching(episode);
      
      // Redirect to player
      window.location.href = `../player.html?id=${driveId}&title=${encodeURIComponent(episode.title)}&series=${encodeURIComponent(seriesData.title)}&index=${episodeIndex}`;
    });
  });
  
  // Play season button (plays first episode)
  document.querySelector('.btn-play-series').addEventListener('click', () => {
    const firstEpisode = seriesData.episodes[0];
    saveContinueWatching(firstEpisode);
    window.location.href = `../player.html?id=${firstEpisode.driveId}&title=${encodeURIComponent(firstEpisode.title)}&series=${encodeURIComponent(seriesData.title)}&index=0`;
  });
});

function saveContinueWatching(episode) {
  let continueWatching = JSON.parse(localStorage.getItem('continueWatching')) || [];
  
  // Remove if already exists
  continueWatching = continueWatching.filter(item => item.series !== seriesData.title);
  
  // Add to beginning
  continueWatching.unshift({
    series: seriesData.title,
    episode: episode.id,
    title: episode.title,
    driveId: episode.driveId,
    thumbnail: episode.thumbnail,
    timestamp: new Date().getTime()
  });
  
  // Keep only last 5 items
  continueWatching = continueWatching.slice(0, 5);
  
  localStorage.setItem('continueWatching', JSON.stringify(continueWatching));
}
const seriesData = {
  title: "When Life Gives You Tangerine",
  description: "A heartwarming journey through life's bittersweet moments.",
  poster: "../assets/posters/tangerine-poster.jpg",
  backdrop: "../assets/posters/tangerine-backdrop.jpg",
  year: 2023,
  rating: 9.2,
  episodes: [
    {
      id: 1,
      title: "Episode 1: The First Taste",
      description: "Maya encounters her first life challenge and discovers unexpected sweetness.",
      driveId: "1TAZU4PaTNA9A3cNrgr9shlEd1hMaFCg2",
      thumbnail: "../assets/images/thumbnails/ep1.jpg",
      duration: "24:15"
    },
    {
      id: 2,
      title: "Episode 2: Bitter Seeds",
      description: "The challenges grow as Maya plants her first tangerine tree.",
      driveId: "1P7TuSJKJVFYKKZHEbCg4ogkORToVTd0Q",
      thumbnail: "../assets/images/thumbnails/ep2.jpg",
      duration: "22:48"
    },
    {
      id: 3,
      title: "Episode 3: Sprouting Hope",
      description: "First signs of growth bring new possibilities.",
      driveId: "1zJeEEHKOsyUSQUsrvMzolNOaf3qXhtH8",
      thumbnail: "../assets/images/thumbnails/ep3.jpg",
      duration: "23:32"
    },
    {
      id: 4,
      title: "Episode 4: The Drought",
      description: "Maya faces her first major setback.",
      driveId: "1VqhmYLTzr-Ikh157HOPmWMlzdAggv2vC",
      thumbnail: "../assets/images/thumbnails/ep4.jpg",
      duration: "25:10"
    },
    {
      id: 5,
      title: "Episode 5: Unexpected Rain",
      description: "Help arrives from an unlikely source.",
      driveId: "1nR0F1lW0n9ntp-e2Tlv0gk7RwyZoUvEi",
      thumbnail: "../assets/images/thumbnails/ep5.jpg",
      duration: "24:45"
    },
    {
      id: 6,
      title: "Episode 6: Blossoms Appear",
      description: "The first flowers bring new hope.",
      driveId: "1wWNryV8Ja88OLDTRKLC9cfLZEFDdecwk",
      thumbnail: "../assets/images/thumbnails/ep6.jpg",
      duration: "23:18"
    },
    {
      id: 7,
      title: "Episode 7: The Storm",
      description: "A natural disaster threatens everything.",
      driveId: "173SIhFV7fqKjcu0HaW5Ma1CuqoytMSI-",
      thumbnail: "../assets/images/thumbnails/ep7.jpg",
      duration: "26:22"
    },
    {
      id: 8,
      title: "Episode 8: Rebuilding",
      description: "Maya learns the value of community.",
      driveId: "1CpZqwLHkXZf0ZBOsDYcfrBntmWRn0N4K",
      thumbnail: "../assets/images/thumbnails/ep8.jpg",
      duration: "24:50"
    },
    {
      id: 9,
      title: "Episode 9: First Fruits",
      description: "The first tangerines appear but bring new challenges.",
      driveId: "1l6wIOCjE2RbpYbXnz13G3jIjThTnw2ky",
      thumbnail: "../assets/images/thumbnails/ep9.jpg",
      duration: "25:35"
    },
    {
      id: 10,
      title: "Episode 10: Market Day",
      description: "Maya takes her harvest to the local market.",
      driveId: "1yGn6frRXhzCcTZINIFhnE286VHUX0Qr4",
      thumbnail: "../assets/images/thumbnails/ep10.jpg",
      duration: "23:40"
    },
    {
      id: 11,
      title: "Episode 11: The Competition",
      description: "A rival grower threatens Maya's business.",
      driveId: "1zmU9TJHvL1XcPOxlKOIfboEafv5JM2FX",
      thumbnail: "../assets/images/thumbnails/ep11.jpg",
      duration: "26:15"
    },
    {
      id: 12,
      title: "Episode 12: Sweet Victory",
      description: "Maya's tangerines win a local competition.",
      driveId: "1bQc7d1Ip9kP2XNKKpmBzy0yJ7bDwi35J",
      thumbnail: "../assets/images/thumbnails/ep12.jpg",
      duration: "24:30"
    },
    {
      id: 13,
      title: "Episode 13: The Big Offer",
      description: "A supermarket chain wants to buy Maya's entire harvest.",
      driveId: "YOUR_DRIVE_ID_FOR_EP13",
      thumbnail: "../assets/images/thumbnails/ep13.jpg",
      duration: "27:05"
    },
    {
      id: 14,
      title: "Episode 14: Sweet Harvest",
      description: "Maya makes a decision that changes everything.",
      driveId: "YOUR_DRIVE_ID_FOR_EP14",
      thumbnail: "../assets/images/thumbnails/ep14.jpg",
      duration: "28:32"
    }
  ]
};

// Rest of the series.js code remains the same...