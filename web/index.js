const socket = io();
socket.on('update', (stats) => {
  
  document.getElementById(`ram-usage`).innerHTML = stats.ram;
  document.getElementById(`servers`).innerHTML = stats.servers;
  document.getElementById(`users`).innerHTML = stats.users;
  document.getElementById(`channels`).innerHTML = stats.channels;
  document.getElementById(`commands`).innerHTML = stats.commands;
});