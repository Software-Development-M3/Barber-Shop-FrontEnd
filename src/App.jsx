
import './App.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ViewSchedule from './Components/ViewSchedulePage/ViewSchedule.jsx'
import SelectSchedule from './Components/SelectSchedulePage/SelectSchedule';
import Upcoming from './Components/UpcomingPage/Upcoming.jsx';
import Home from './Components/HomePage/Home.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Profile from './Components/ProfilePage/Profile.jsx';

function App()  {
  return (


      <div>
        <nav>This is Navbar</nav>
        <main> This is main section
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/shop' />
          <Route path='/booking/service'/>
          <Route path='/booking/schedule' element={<SelectSchedule />}/>
          <Route path='/view/service' />
          <Route path='/view/schedule' element={<ViewSchedule />}/>
          <Route path='/booking/confirm'/>
          <Route path='/upcoming' element={<Upcoming />}/>
        </Routes>
        </main>
      </div>

  )
}

export default App
