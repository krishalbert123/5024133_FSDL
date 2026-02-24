import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Simple Counter</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
    </div>
  )
}

export default App
