// import React from 'react'
import Header from './component/Header'
import RegisterDoctor from './pages/RegisterDoctor'
import RegisterPatient from './pages/RegisterPatient'
import "./config/connection"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MedicalRecord from './pages/MedicalRecord'
import SidebarMobile from './component/Sidebar'
import CustomerRelate from './pages/CustomerRelate'
import Chat from './component/Chat'
// import VideoChat from './pages/VideoChat'
import BookAppointment from './pages/BookAppointment'
import GetAllDoctors from './pages/GetAllDoctors'
import AllPatients from './pages/AllPatientRecord'
import SinglePatientRecords from './pages/SinglePatientRecord'
import DoctorPrescribe from './pages/DoctorPrescribe'
import PatientPrescriptions from './pages/PatientPrescription'
import DoctorProfile from './pages/DoctorProfile'


const App = () => {

  return (
    <div> 
    
  {/* <DoctorPrescribe/>/ */}
      <Header/>
        <Routes>
         <Route path="/" element={<Home/>} /> 
      
         <Route path='/doctor' element={ <RegisterDoctor/>}/>
         <Route path='/patient' element={ <RegisterPatient/>} />
         <Route path='/medical' element={ <MedicalRecord/>} />
         <Route path='/customer' element={ <CustomerRelate/>} />
         <Route path='/booking' element={ <BookAppointment/>} />
         <Route path='/doctor-list' element={ <GetAllDoctors />} />
         <Route path='/allPatient' element={ <AllPatients />} />
         <Route path='/singlePatient' element={ <SinglePatientRecords />} />
         <Route path='/chat' element={ <Chat/>} /> 
         <Route path='/doctor-profile' element={ <DoctorProfile/>} /> 
        
         <Route path='/prescribe/:patientId' element={ <DoctorPrescribe/>} />
         <Route path='/view-prescription' element={ <PatientPrescriptions/>} />

           {/* <Route path='/video' element={ <VideoChat/>} />   */}

         
      
      </Routes> 
                    <ToastContainer theme="dark" position="bottom-center" /> 


       </div>
         )
       }
       
       export default App