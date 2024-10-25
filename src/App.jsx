
import './App.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ViewSchedule from './Components/ViewSchedulePage/ViewSchedule.jsx'
import SelectSchedule from './Components/SelectSchedulePage/SelectSchedule';
import Home from './Home.jsx';
import Upcoming from './Upcoming.jsx';




function App()  {
  return (


      <div>
        <nav>This is Navbar</nav>
        <main> This is main section
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' />
          <Route path='/register' />
          <Route path='/profile' />
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


