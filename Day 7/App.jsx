import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1 className="counter-title">Counter</h1>
      <p className="counter-value">{count}</p>
      <div className="button-container">
        <button className="btn" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="btn" onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button className="btn reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;