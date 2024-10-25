import './App.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ViewSchedule from './Components/ViewSchedulePage/ViewSchedule.jsx'
import SelectSchedule from './Components/SelectSchedulePage/SelectSchedule';


function App() {

  return (

      <div>
        <nav>This is Navbar</nav>
        <main> This is main section
        <Routes>
          <Route path='/' />
          <Route path='/login' />
          <Route path='/register' />
          <Route path='/profile' />
          <Route path='/shop' />
          <Route path='/booking/service'/>
          <Route path='/booking/schedule' element={<SelectSchedule />}/>
          <Route path='/view/service' />
          <Route path='/view/schedule' element={<ViewSchedule />}/>
          <Route path='/booking/confirm'/>
          <Route path='/upcoming'/>
        </Routes>
        </main>
      </div>

  )
}

export default App

