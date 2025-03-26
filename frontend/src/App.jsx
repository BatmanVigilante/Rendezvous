import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing'
import Authentication from './pages/authentication'
export default function App() {
  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/auth' element={<Authentication/>}/>
        </Routes>
     </Router>
    </>
  )
}
