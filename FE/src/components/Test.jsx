import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Test() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('login');
  }

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
      <div>
        <button onClick={handleNavigate} className="px-4 py-2 bg-blue-500 text-white rounded">
          페이지 이동
        </button>
      </div>

    </div>
    
    </>
  )
}

export default Test