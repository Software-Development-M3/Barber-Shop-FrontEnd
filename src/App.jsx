import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewSchedule from './Components/ViewSchedulePage/ViewSchedule.jsx';
import SelectSchedule from './Components/SelectSchedulePage/SelectSchedule';
import Upcoming from './Components/UpcomingPage/Upcoming.jsx';
import Home from './Components/HomePage/Home.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import BookingConfirmation from './BookingConfirmation.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<div>Profile Page</div>} />
          <Route path='/shop/:shopId' element={<div>Shop Page</div>} />
          <Route path='/booking/service/:shopId' element={<div>Booking Service Page</div>} />
          <Route path='/booking/schedule/:shopId' element={<SelectSchedule />} />
          <Route path='/view/service/:shopId' element={<div>View Service Page</div>} />
          <Route path='/view/schedule/:shopId' element={<ViewSchedule />} />
          <Route path='/booking/confirm/:shopId' element={<BookingConfirmation />} />
          <Route path='/upcoming' element={<Upcoming />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
