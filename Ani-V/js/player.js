<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Video Player</title>
  <style>
    body {
      margin: 0;
      background: #000;
      color: white;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    #videoContainer {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;
      position: relative;
    }

    video, iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .back-btn {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      background: rgba(0, 0, 0, 0.6);
      padding: 8px 16px;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      border-radius: 6px;
    }

    #loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: #fff;
      display: none;
    }
  </style>
</head>
<body>
  <div id="videoContainer">
    <button class="back-btn" onclick="history.back()">← Back</button>
    <div id="loader">Loading video...</div>
    <!-- Video or iframe will be inserted here -->
  </div>

  <script>
    const container = document.getElementById('videoContainer');
    const loader = document.getElementById('loader');
    const params = new URLSearchParams(window.location.search);
    const local = params.get('local');
    const id = params.get('id');
    const type = params.get('type') || 'movie';

    loader.style.display = 'block';

    if (local) {
      const video = document.createElement('video');
      video.src = `/My_Movies/${local}.mp4`;
      video.controls = true;
      video.autoplay = true;
      video.onloadeddata = () => loader.style.display = 'none';
      container.appendChild(video);
    } else if (id && type) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://vidsrc.to/embed/${type}/${id}`;
      iframe.allowFullscreen = true;
      iframe.onload = () => loader.style.display = 'none';
      container.appendChild(iframe);
    } else {
      loader.textContent = 'Video not found!';
    }
  </script>
</body>
</html>
