import React from 'react'
import {Routes, Route} from 'react-router-dom'

const Routing = () => {
  return (
    <Routes>
        <Route path='/' />
        <Route path='/login' />
        <Route path='/register' />
        <Route path='/profile' />
        <Route path='/shop' />
        <Route path='/booking/service'/>
        <Route path='/booking/schedule'/>
        <Route path='/view/service'/>
        <Route path='/view/schedule'/>
        <Route path='/booking/confirm'/>
        <Route path='/upcoming'/>
    </Routes>
  )
}

export default Routing