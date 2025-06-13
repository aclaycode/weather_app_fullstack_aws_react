const axios = require('axios'); //makes HTTP requests

//Lambda function
exports.handler = async (event) => {
  const city = event.queryStringParameters?.q; //get city from API gateway event
  const apiKey = process.env.OPENWEATHER_API_KEY; //Get OpenWeather API key

    //CORS headers to include in every response
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',  // restrict to your React app URL
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  };

  //Error if no city provided in request
  if (!city) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Missing city parameter' }),
    };
  }

  try {
    // request to OpenWeather API to get weather
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'imperial',
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};
