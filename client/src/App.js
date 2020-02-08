import React, { useState, useEffect, createRef, useRef } from "react";
import axios from "axios";
import logo from "./cat.png";
import alarm from "./alarm.m4a";
import "./App.css";

function App() {
  const [callCount, setCount] = useState(0);

  const audioEl = createRef(null);

  const prevCount = usePrevious(callCount);

  async function poll() {
    const response = await axios("http://localhost:8080/poll");
    setCount(response.data.callCount);
  }

  async function reset() {
    const response = await axios("http://localhost:8080/reset");
    setCount(response.data.callCount);
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    setInterval(async () => poll(), 1000);
  }, []);

  useEffect(() => {
    if (callCount !== 0 && prevCount !== callCount) {
      audioEl.current.play();
    }
  }, [prevCount, callCount]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Yell At My Cat</h1>
        <img src={logo} className="App-logo" alt="Meeeow" title="Meeeow" />
        <audio ref={audioEl} src={alarm} />
        <div>
          <h1 className="App-text">Times Triggered: {callCount} ...</h1>
          <div className="App-reset-btn" onClick={reset}>
            Reset
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
