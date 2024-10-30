import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewSchedule from './Components/ViewSchedulePage/ViewSchedule.jsx';
import SelectSchedule from './Components/SelectSchedulePage/SelectSchedule';
import Upcoming from './Components/UpcomingPage/Upcoming.jsx';
import Home from './Components/HomePage/Home.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import BookingConfirmation from './Components/BookingConfirm/BookingConfirmation.jsx';
import ShopInfo from './Components/ShopInfoPage/Shopinfo.jsx';
import HairStyleSelection from './Components/SelectServicePage/selectHair.jsx'
import Profile from './Components/ProfilePage/Profile.jsx';
import Allservices from './Components/Allservice/Allservice.jsx';



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
          <Route path='/:search?' element={<Home />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shop/:shopid' element={<ShopInfo />} />
          <Route path='/booking/service/:shopid' element={<HairStyleSelection />} />
          <Route path='/booking/schedule/:shopid' element={<SelectSchedule />} />
          <Route path='/view/service/:shopid' element={<Allservices/>} />
          <Route path='/view/schedule/:shopid' element={<ViewSchedule />} />
          <Route path='/booking/confirm/:shopid' element={<BookingConfirmation />} />
          <Route path='/upcoming' element={<Upcoming />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
