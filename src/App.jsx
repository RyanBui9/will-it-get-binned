import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [flightNumber, setFlightNumber] = useState("");

  function handleFlightChange(e) {
    setFlightNumber(e.target.value);
  }

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
    </>
  )
}

export default App
