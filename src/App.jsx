import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Careers from './pages/Careers'
import Admin_panel from './pages/Admin_panel'
import Login from './pages/Login'
import Job from './pages/Job'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Application from './pages/Application'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin_login' element={<Login />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/admin_panel' element={<Admin_panel />} />
            <Route path='/job/:id' element={<Job />} />
            <Route path='/apply/:id' element={<Application />} />
          </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
