document.addEventListener('DOMContentLoaded', () => {
  const bypassLink = document.getElementById('bypass-link');
  
  // ByPass link functionality
  bypassLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Simulate login (in a real app, you would verify credentials)
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to main page
    window.location.href = "main.html";
  });
  
  // Regular login form would go here
});