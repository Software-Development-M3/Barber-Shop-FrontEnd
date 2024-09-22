import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import History from "./History.jsx";
import Home from "./Home.jsx";
import ShopProfile from "./ShopProflie.jsx";

function App()  {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <div className="App">
              <div className="container">
                <Home />
              </div>
            </div>
          }
        />
        <Route path="/History" element={<History />} />
        <Route path="/Shop/:id" element={<ShopProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;