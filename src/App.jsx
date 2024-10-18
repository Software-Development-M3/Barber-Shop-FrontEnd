import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ViewProfile from './components/ViewProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ViewProfile></ViewProfile>
    </>
  )
}

export default App
