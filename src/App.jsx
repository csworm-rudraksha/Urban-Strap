import { useState } from 'react'
import './App.css'
import ComingSoonPage from './components/ComingSoonPage'

function App() {
  const [count, setCount] = useState(0)

  return (
      <ComingSoonPage/>
  )
  
}

export default App
