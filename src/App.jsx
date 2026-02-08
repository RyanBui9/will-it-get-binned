import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [flightNumber, setFlightNumber] = useState("");
  const [token, setToken] = useState(null);

  function handleFlightChange(e) {
    setFlightNumber(e.target.value);
  }

  // To test token is used successfully in an API request
  const testAPI = async () => {
    try {
      const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2026-06-01&adults=1', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`Network Response Error`);
      }

      const result = await response.json();
      console.log("Data received:", result.data);

    } catch (error) {
      console.error(error);
    }
  };

  // Acquire the initial authorisation token
  useEffect(() => {
    const getToken = async () => {
      const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
      const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

      try {
        const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: apiKey,
            client_secret: apiSecret
          }),
        });
        if (!response.ok) throw new Error('Network Response Error');

        const result = await response.json();
        setToken(result.access_token);
        console.log("Token acquired:", result.access_token);

      } catch (error) {
        console.error("Authorisation Error:", error);
      }
    };
    getToken();
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Will It Get Binned</h1>
      <div className="card">
        <label>
          Flight Number:{" "}
          <input type="text" onChange={handleFlightChange} />
        </label>
      </div>
      <p>{flightNumber}</p>
      <div>
        <button onClick={testAPI}>Test API</button>
      </div>
    </>
  )
}

export default App
