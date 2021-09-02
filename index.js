const input = document.querySelector("#ip-input");
const search = document.querySelector(".search");
const ipArea = document.querySelector(".ip-span");
const locationArea = document.querySelector(".location-span");
const timezoneArea = document.querySelector(".timezone-span");
const ispArea = document.querySelector(".isp-span");

const getTheLocation = (ip) => {
  axios
    .get(
      `https://geo.ipify.org/api/v1?apiKey=at_hsFEBgdObfIHcxmIZxGwcWKgYc42M&ipAddress=${ip}`
    )
    .then((response) => {
    
      const data = response.data;
      ipArea.innerHTML = data.ip;
      locationArea.innerHTML =
        data.location.country + " " + data.location.region;
      timezoneArea.innerHTML = "UTC" + data.location.timezone;
      ispArea.innerHTML = data.isp;
      map.setView([data.location.lat, data.location.lng], 14);
    })
    .catch((error) => console.log(error));
};

search.addEventListener("click", () => {
  getTheLocation(input.value);
});

var map = L.map("map").setView([28.7041, 77.1025], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([28.7041, 77.1025])
  .addTo(map)
  .bindPopup("You are here")
  .openPopup();
