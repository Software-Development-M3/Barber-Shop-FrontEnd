import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Schedule from './assets/resource/Schedule'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Schedule></Schedule>
    </div>
  )
}

export default App
