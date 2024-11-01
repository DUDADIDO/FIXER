import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen space-y-3">
      <div className="flex flex-row items-center space-x-2">
        <label>하이</label>
        <input type="text" className="border border-gray-950 border-solid"></input>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <label>하이</label>
        <input type="text" className="border border-gray-950 border-solid"></input>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <label>하이</label>
        <input type="text" className="border border-gray-950 border-solid"></input>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <label>하이</label>
        <input type="text" className="border border-gray-950 border-solid"></input>
      </div>

    </div>
    
    </>
  )
}

export default App