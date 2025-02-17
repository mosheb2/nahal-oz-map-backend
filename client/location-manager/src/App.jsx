import { useState } from 'react'
import './App.css'
import LocationManagement from "./components/LocationManagement.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <LocationManagement />
    </>
  )
}

export default App
