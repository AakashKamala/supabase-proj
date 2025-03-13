import React, { useState } from 'react'
import Trader from './Trader'
import Owner from './Owner'
import "./App.css"

const App = () => {
  const [page, setPage]=useState("trader")

  const handlePage = (e) => {
    setPage(e.target.innerText.toLowerCase())
  }
  return (
    <div>
      <div className='pages'>
        <button onClick={handlePage}>Trader</button>
        <button onClick={handlePage}>Owner</button>
      </div>
      {page === "trader" && <Trader />}
      {page === "owner" && <Owner />}
    </div>
  )
}

export default App