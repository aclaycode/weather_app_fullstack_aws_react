const axios = require('axios');

exports.handler = async (event) => {
  const city = event.queryStringParameters?.q;
  const apiKey = process.env.OPENWEATHER_API_KEY;

const allowedOrigins = [
  'http://localhost:3000', // for dev/testing
  'https://d2bd1im626ftje.cloudfront.net' //cloudfront domain
];

const origin = event.headers.origin;

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

  // Handle preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Preflight OK' }),
    };
  }

  if (!city) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing city parameter' }),
    };
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'imperial',
      },
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error?.response?.data || error.message);
    return {
      statusCode: error.response?.status || 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to fetch weather data',
        details: error.response?.data || error.message,
      }),
    };
  }
};
