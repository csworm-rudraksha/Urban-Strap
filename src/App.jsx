import { useState } from 'react'
import './App.css'
import ComingSoon from './components/comingSoon'

function App() {
  const [count, setCount] = useState(0)

  return (
      <ComingSoon/>
  )
  
}

export default App
