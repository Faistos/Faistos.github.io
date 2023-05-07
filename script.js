// Get the progress bar
var progressBar = document.getElementById("myBar");

// Set the IP address and port of your Garry's Mod server
var ipAddress = "your.server.ip.address";
var portNumber = "your_server_port";

// Set the refresh rate (in milliseconds) to update the progress bar
var refreshRate = 1000;

// Fetch the server status and update the progress bar
function fetchServerStatus() {
  // Construct the URL for the server status API
  var apiUrl = "https://api.steampowered.com/ISteamApps/GetServersAtAddress/v0001/?addr=" + ipAddress + ":" + portNumber;

  // Make a GET request to the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // If the server is online, update the progress bar
      if (data.response.servers.length > 0) {
        var players = data.response.servers[0].players;
        var maxPlayers = data.response.servers[0].max_players;
        var progress = Math.round((players / maxPlayers) * 100);
        progressBar.style.width = progress + "%";
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Call the fetchServerStatus function periodically to update the progress bar
setInterval(fetchServerStatus, refreshRate);
