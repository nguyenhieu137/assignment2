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
        
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route> */}
      </Routes>
      
    </>
    
  )
}

export default App
