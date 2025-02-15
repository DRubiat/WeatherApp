function getRandomPicture(name) {
  // Set the API endpoint URL with backticks for template literals
  const apiUrl = `https://api.unsplash.com/photos/random/?query=${name}&client_id=dmPjYhIxUSYNgUA82majmrV_f58G2PHWG9FL9USfsOA`;

  // Make a GET request to the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Get the image URL from the API response
      const imageUrl = data.urls.regular;

      // Set the background image
      document.body.style.backgroundImage = 'url(' + imageUrl + ')';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

  
  let weather = {
    "apikey": "eb44081ad15e074c13c778b8b40bbfdc",
    fetchWeather: function (city) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey)
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => {
          this.displayWeather(data);
          // Pass the city name to getRandomPicture function
          this.getRandomPicture(data.name);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    getRandomPicture: getRandomPicture,  // Assign the function to a property of the object
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  // Initial weather fetch for Cardiff
  weather.fetchWeather("Cardiff");
  