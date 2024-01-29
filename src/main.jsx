import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

const apiKey = "f8ac91d03f37d52a871ab973d7abfa82";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const Main = () => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const locationInput = document.getElementById("LocationInput");

    if (locationInput) {
      locationInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          const location = locationInput.value;
          if (location) {
            fetchWeather(location);
          }
        }
      });
    }
  }, []);

  function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        handleBackgroundChange(data.weather[0].description);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        locationElement.textContent = "Not Valid City";
        temperatureElement.textContent = "";
        descriptionElement.textContent = "";
        setBackground("");
      });
  }

  function handleBackgroundChange(description) {
    if (description === "clear sky") {
      setBackground(
        "url(https://img.freepik.com/free-vector/nature-roadside-background-scene_1308-131779.jpg?w=2000&t=st=1702261790~exp=1702262390~hmac=d4564b24912181040397c4a3e1b902913fe387bffd0972c76bbcb531213470cb)"
      );
    } else if (description.includes("clouds")) {
      setBackground(
        "url(https://static.vecteezy.com/system/resources/previews/009/877/673/non_2x/pixel-art-sky-background-with-clouds-cloudy-blue-sky-for-8bit-game-on-white-background-vector.jpg)"
      );
    } else if (description.includes("rain")) {
      setBackground("url(https://i.redd.it/zop4gpsqzri21.png)");
    } else if (description.includes("snow")) {
      setBackground(
        "url(https://static.vecteezy.com/system/resources/previews/012/757/469/non_2x/pixel-art-christmas-landscape-with-red-house-pine-snow-santa-claus-8-bit-game-background-vector.jpg)"
      );
    } else if (description.include("fog" || "haze" || "mist")) {
      setBackground(
        "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6766773e-9d93-4712-a51c-a240401b464a/dbjot5c-fd2f7a54-d08f-43a7-ab2a-944398076232.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY3NjY3NzNlLTlkOTMtNDcxMi1hNTFjLWEyNDA0MDFiNDY0YVwvZGJqb3Q1Yy1mZDJmN2E1NC1kMDhmLTQzYTctYWIyYS05NDQzOTgwNzYyMzIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.j8ZhOJReRz1e4hMhM6guoWuCCxq2o8fDboi_hnPVtLc)"
      );
    } else {
      setBackground("");
    }
  }

  return (
    <div>
      <App />
      <style>{`body { background-image: ${background}; }`}</style>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
