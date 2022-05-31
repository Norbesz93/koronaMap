import React, {useEffect } from 'react';
import './App.css';
import Map from './Components/Map';


function App() {
  useEffect(() => {
    fetch('http://localhost:8000/data')
      .then(res => res.json())
      .then(locations => { console.log(locations) })
  }, [])

  return (
    <div className="App">
      helló
      <Map/>
    </div>
  );
}

export default App;
