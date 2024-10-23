import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import BookingConfirm from './BookingConfirmation';
import Home from './Home';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Hello World</h1>
            <h2>Welcome</h2>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/bookingconfirm' element={<BookingConfirm/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
