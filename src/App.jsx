import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Upcoming from "./Upcoming.jsx";
import Home from "./Home.jsx";
import ShopProfile from "./ShopProflie.jsx";

function App()  {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/shop/:id" element={<ShopProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;