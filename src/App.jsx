import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Careers from './pages/Careers';
import Job_Applicants from './pages/Job_applicants';
import Login from './pages/Login';
import Job from './pages/Job';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Application from './pages/Application';
import CreateJobForm from './pages/CreateJobForm';
import EditJobForm from './pages/EditJobForm';
import Applicant from './pages/Applicant';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import { AuthContext } from './context/AuthContext'

function App() {
  const {user } = React.useContext(AuthContext);
  console.log(user);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin_login" element={<Login />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/apply/:id" element={<Application />} />
          <Route path="/contact" element={<Contact />} />
         
          {/* Conditionally render admin routes if user exists */}
          
              <Route path="/admin/create_job" element={<CreateJobForm />} />
              <Route path="/admin/edit_job" element={<EditJobForm />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/applicant/:id" element={<Applicant />} />
              <Route path="/admin/job_applicants/:id" element={user? <Job_Applicants />:<Navigate to='/admin_login'/>} />

            
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
