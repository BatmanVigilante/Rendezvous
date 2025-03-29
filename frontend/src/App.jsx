import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing'
import Authentication from './pages/authentication'
import videoMeet from './pages/videoMeet'
export default function App() {
  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/auth' element={<Authentication/>}/>
            <Route path='/:url' element={<videoMeet/>}></Route>
        </Routes>
     </Router>
    </>
  )
}
