import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [flightNumber, setFlightNumber] = useState("");
  const [activeMode, setActiveMode] = useState('light');

  function handleFlightChange(e) {
    setFlightNumber(e.target.value);
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (activeMode === 'dark') {
      body.className = 'dark';
    } else {
      body.className = 'light';
    }
  }, [activeMode]);

  return (
    <div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Will It Get Binned?</h1>
      <div>
        <label className="flight-card">
          Flight Number
          <input id="flight-input" type="text" onChange={handleFlightChange} />
        </label>
      </div>
      <p>{flightNumber}</p>
      <label aria-label="Toggle Light/Dark Mode" className="switch">
        <input type="checkbox" onChange={() => {
          activeMode === 'light' ? setActiveMode('dark') : setActiveMode('light');
        }} />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default App
