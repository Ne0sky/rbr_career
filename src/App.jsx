import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Careers from './pages/Careers'
import Job_Applicants from './pages/Job_applicants'
import Login from './pages/Login'
import Job from './pages/Job'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Application from './pages/Application'
import CreateJobForm from './pages/CreateJobForm'
import EditJobForm from './pages/EditJobForm'
import Applicant from './pages/Applicant'
import Dashboard from './pages/Dashboard'

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
            <Route path='/admin/job_applicants/:id' element={<Job_Applicants/>} />
            <Route path='/job/:id' element={<Job />} />
            <Route path='/admin/create_job' element={<CreateJobForm />} />
            <Route path='/admin/edit_job' element={<EditJobForm />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/applicant/:id' element={<Applicant/>} /> 
            <Route path='/apply/:id' element={<Application />} />
          </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
