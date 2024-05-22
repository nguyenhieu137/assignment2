// import React from 'react'
import { Routes, Route } from "react-router-dom";
import './App.scss'
import Home from './Pages/Home/Home'
import Create from './Pages/Create/Create'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/create/:taskId" element={<Create/>}></Route>
      </Routes>
    </>
    
  )
}

export default App
