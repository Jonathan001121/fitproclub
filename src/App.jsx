import { useState } from 'react'
import SideNav from './Components/SideNav/SideNav'

import Hero from './Components/Hero/Hero'
import './App.css'
import Programs from './Components/Programs/Programs'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="App">
      <SideNav/>
    <Hero/>
    <Programs/>
    </div>
     
  )
}

export default App
