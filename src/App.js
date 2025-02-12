import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return <h1>hello</h1>;
}

export default App;
