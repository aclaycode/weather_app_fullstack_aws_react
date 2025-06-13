// kill task command for PID on running on port 3000
// netstat -ano | findstr :3000 (bash)
// taskkill /PID 39260 /F (command prompt)

// start task
// npm start

import React, { useState } from 'react'; // Import React and useState hook for state management
//import logo from './logo.svg'; // Import React spinning logo image
import sun from './sun-svgrepo-com.svg';
import './App.css'; // Import default CSS styles (background, animations, etc.)
import axios from 'axios' // Axios is a JavaScript HTTP client used to make API request from the React app to OpenWeather API

// Main/root component of React app
function App() {
  // State to hold the current city typed by the user
  const [city, setCity] = useState(''); // city stores the user input, setCity is a function to update the city value
  
  // State to hold the weather data fetched or simulated
  const [weather, setWeather] = useState(null); // weather stores weather info, setWeather is a function to update the weather object

  // Handler for updating city state as user types in the input box
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // AWS Lamda funciton URL
const lambdaApiUrl = 'https://zijp8jy0m5.execute-api.us-east-2.amazonaws.com/dev/weatherApi';

const handleSearch = async () => {
  if (city.trim() === '') {
    alert('Please enter a city name');
    return;
  }

  try {
    // Call your Lambda API Gateway endpoint
    const response = await axios.get(`${lambdaApiUrl}?q=${city}`); // HTTP get request to your Lambda API with the city as a query parameter
    const data = response.data; // gets weather data from response

    setWeather({
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    console.error(error);
    alert('Could not fetch weather data. Check the city name or try again later.');
  }
};


  return (
    <div className="App">
      {/* Main app header styled by App.css (dark background, center content) */}
      <header className="App-header">
        {/* React spinning sun image with animation from CSS */}
        <img src={sun} className="App-logo" alt="Spinning Sun Weather Icon" />
        
        {/* App title */}
        <h1>Weather App</h1>

        {/* Input box for entering city name */}
        <input
          type="text"
          placeholder="Enter city"
          value={city}                    // Controlled input bound to city state
          onChange={handleInputChange}   // Updates city state on input change
          style={{ padding: '0.5rem', fontSize: '1rem', width: '250px' }}
        />

        {/* Search button to trigger weather lookup */}
        <button
          onClick={handleSearch}          // Calls handleSearch on click
          style={{ padding: '0.5rem 1rem', marginLeft: '1rem', fontSize: '1rem' }}
        >
          Search
        </button>

        {/* Weather result display area */}
        <div style={{ marginTop: '2rem', color: 'white' }}>
          {weather ? (
            <div>
              <h2>Weather in {weather.city}</h2>
              <p>Temperature: {weather.temp}°F</p>
              <p>Description: {weather.description}</p>
            </div>
          ) : (
            // Placeholder text shown when no weather data is available yet
            <p>Enter a city and click Search to get weather info.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;