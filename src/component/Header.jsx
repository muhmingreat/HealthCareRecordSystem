import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppKitAccount } from '@reown/appkit/react';
import useContractInstance from '../hooks/useContractInstance';
import { useHealthcare } from '../context/HealthCareContext';
import Alert from './Alert';
import { Bell } from 'lucide-react';

const Header = () => {
  const { address } = useAppKitAccount();
  const contract = useContractInstance();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const { appName,resetAlerts,alertCount } = useHealthcare();

useEffect(() => {
  const fetchRoles = async () => {
    if (!contract || !address) return;
    try {
      const adminRole = await contract.DEFAULT_ADMIN_ROLE();
      const doctorRole = await contract.DOCTOR_ROLE();
      const patientRole = await contract.PATIENT_ROLE();

      const isAdminRole = await contract.hasRole(adminRole, address);
      const isDoctorRole = await contract.hasRole(doctorRole, address);
      const isPatientRole = await contract.hasRole(patientRole, address);

      setIsAdmin(isAdminRole);
      setIsDoctor(isDoctorRole);
      setIsPatient(isPatientRole);
      
console.log("Doctor:", isDoctorRole, "Patient:", isPatientRole);
    } catch (err) {
      console.error('Header fetch error:', err);
    }
  };

  fetchRoles();
}, [contract, address]);

  const handleRegisterSelect = (val) => {
    setShowRegisterMenu(false);
    if (val === 'patient') navigate('/patient');
    if (val === 'doctor') navigate('/doctor');
    if (val === 'booking') navigate('/booking');
    if (val === 'medical') navigate('/medical');
  };

  const handleViewSelect = (val) => {
    setShowViewMenu(false);
    if (val === 'individual') navigate('/doctor-list');
    if (val === 'prescribe') navigate('/prescribe');
    if (val === 'all-patients' && isAdmin) navigate('/allPatient');
  };
     
  return (
    <header className="relative z-50">
      {/* Shimmer Dot Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff25_1px,transparent_1px)] [background-size:18px_18px] animate-pulse z-0" />

      {/* Gradient Bar */}
      <div className="bg-gradient-to-r from-[#001f3f] via-black via-[#00ced1] to-[#800000] p-4 fixed w-full flex justify-between items-center backdrop-blur-md shadow-lg z-10 text-white">
        <h1
          className="text-2xl font-extrabold bg-[linear-gradient(to_right,#00ced1,#ffffff,#800000)] bg-clip-text text-transparent bg-[length:300%_100%] animate-shimmer"
        >
          {appName}
        </h1>

        <nav className="hidden lg:flex items-center space-x-4 relative z-10">
          <Link to="/" className="text-white hover:text-[#FFD700] transition">Home</Link>

        
          <div className="relative">
            <button
              onClick={() => setShowRegisterMenu(!showRegisterMenu)}
              className="text-white bg-white/10 px-3 py-1 rounded-md hover:bg-white/20"
            >
              Register
            </button>
            {showRegisterMenu && (
              <ul className="absolute top-10 left-0 bg-white text-black w-48 rounded shadow-lg z-20">
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleRegisterSelect('patient')}>Register as Patient</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleRegisterSelect('doctor')}>Register as Doctor</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleRegisterSelect('booking')}>Book Appointment</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleRegisterSelect('medical')}>Get Diagnosis</li>
              </ul>
            )}
          </div>

      
          <div className="relative">
            <button
              onClick={() => setShowViewMenu(!showViewMenu)}
              className="text-white bg-white/10 px-3 py-1 rounded-md hover:bg-white/20"
            >
              View Record
            </button>
            {showViewMenu && (
              <ul className="absolute top-10 left-0 bg-white text-black w-48 rounded shadow-lg z-20">
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleViewSelect('individual')}>Available Doctors</li>
                {isDoctor && (
                  <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleViewSelect('prescribe')}>Doctor Prescribe</li>
                )}
                {isAdmin && (
                  <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleViewSelect('all-patients')}>All Patients</li>
                )}
              </ul>
            )}
          </div>
  
            {(isDoctor || isPatient) && (
            <Alert isDoctor={isDoctor} isPatient={isPatient} />
               )}
                 {/* <div className="relative" onClick={resetAlerts}>
        <Bell className="w-6 h-6 text-blue-600 cursor-pointer" />
        {alertCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500
           text-white text-xs rounded-full 
           w-5 h-5 flex items-center justify-center">
            {alertCount}
          </span>
        )}
      </div> */}
      
          <appkit-button className="px-3 py-1 rounded-full bg-cyan-950 hover:bg-gray-900 transition" />
        </nav>
      </div>
    </header>
  );
};

export default Header;



// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAppKitAccount } from '@reown/appkit/react';
// import useContractInstance from '../hooks/useContractInstance';
// import { useHealthcare } from '../context/HealthCareContext';

// const Header = () => {
//   const { address } = useAppKitAccount();
//   const contract = useContractInstance();
//   const navigate = useNavigate();
//   // const [avatar, setAvatar] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isDoctor, setIsDoctor] = useState(false);
//   const [showRegisterMenu, setShowRegisterMenu] = useState(false);
//   const [showViewMenu, setShowViewMenu] = useState(false);
//   const { appName } = useHealthcare();

//   useEffect(() => {
//     const fetchProfileAndRoles = async () => {
//       if (!contract || !address) return;

//       try {
//         const adminRole = await contract.DEFAULT_ADMIN_ROLE();
//         const doctorRole = await contract.DOCTOR_ROLE();

//         const isAdminRole = await contract.hasRole(adminRole, address);
//         const isDoctorRole = await contract.hasRole(doctorRole, address);

//         setIsAdmin(isAdminRole);
//         setIsDoctor(isDoctorRole);

//         // const patientId = await contract.patientIdOf(address);
//         // if (patientId > 0n) {
//         //   const patient = await contract.patients(patientId);
//         //   setAvatar(patient.avatar);
//         // }
//       } catch (err) {
//         console.error('Header fetch error:', err);
//       }
//     };

//     fetchProfileAndRoles();
//   }, [contract, address]);

//   const handleRegisterSelect = (val) => {
//     setShowRegisterMenu(false);
//     if (val === 'patient') navigate('/patient');
//     if (val === 'doctor') navigate('/doctor');
//     if (val === 'booking') navigate('/booking');
//     if (val === 'medical') navigate('/medical');
//   };

//   const handleViewSelect = (val) => {
//     setShowViewMenu(false);
//     if (val === 'individual') navigate('/doctor-list');
//     if (val === 'prescribe') navigate('/prescribe');
//     if (val === 'all-patients' && isAdmin) navigate('/allPatient');
//   };

//   return (
//     <header>
//       <div className="bg-green-400 flex justify-between items-center text-white p-4 fixed w-full z-10">
//         <h1
//           className="text-2xl font-extrabold bg-[linear-gradient(to_right,#004225,#8B0000,#000000,#FFD700,#000000)] 
//           bg-clip-text text-transparent bg-[length:300%_100%]"
//           style={{ animation: 'shimmer 5s linear infinite' }}
//         >
//           {appName}
//         </h1>

//         <nav className="hidden lg:flex items-center space-x-4 relative">
//           <Link to="/" className="text-black hover:underline">Home</Link>

//           {/* Custom Register Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setShowRegisterMenu(!showRegisterMenu)}
//               className=" text-green-800 px-3 py-1 rounded-md shadow"
//             >
//               Register
//             </button>
//             {showRegisterMenu && (
//               <ul className="absolute top-10 left-0 bg-white text-black w-40 rounded shadow-lg z-10">
//                 <li className="p-2 hover:bg-green-100 cursor-pointer"
//                  onClick={() => handleRegisterSelect('patient')}>Register as Patient</li>
//                 <li className="p-2 hover:bg-green-100 cursor-pointer" 
//                 onClick={() => handleRegisterSelect('doctor')}>Register as Doctor</li>
//                 <li className="p-2 hover:bg-green-100 cursor-pointer"
//                  onClick={() => handleRegisterSelect('booking')}>Book Appointment</li>
//                 <li className="p-2 hover:bg-green-100 cursor-pointer"
//                  onClick={() => handleRegisterSelect('medical')}>Get Diagnosis</li>
//               </ul>
//             )}
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShowViewMenu(!showViewMenu)}
//               className=" text-green-800 px-3 py-1 rounded-md shadow"
//             >
//               View Record
//             </button>
//             {showViewMenu && (
//               <ul className="absolute top-10 left-0 bg-white text-black w-40 rounded shadow-lg z-10">
//                 <li className="p-2 hover:bg-green-100 cursor-pointer" onClick={() => handleViewSelect('individual')}>Available Doctors</li>
//                 {isDoctor && (
//                   <li className="p-2 hover:bg-green-100 cursor-pointer" onClick={() => handleViewSelect('prescribe')}>Doctor Prescribe</li>
//                 )}
//                 {isAdmin && (
//                   <li className="p-2 hover:bg-green-100 cursor-pointer" onClick={() => handleViewSelect('all-patients')}>All Patients</li>
//                 )}
//               </ul>
//             )}
//           </div>

//           {/* Wallet Connect */}

      
//           {/* {avatar ? (
//             <img
//               src={avatar}
//               alt="avatar"
//               className="w-14 h-14 rounded-full object-cover "
//             />
//           ) : (
//             <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
//               ?
//             </div>
//           )} */}

//           <appkit-button className="px-1 py-1 rounded-full bg-cyan-950 hover:bg-gray-900 transition" />
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { useAppKitAccount } from '@reown/appkit/react';
// // import useContractInstance from '../hooks/useContractInstance'
// // import {useHealthcare} from  '../context/HealthCareContext'



// // const Header = () => {

// //   const { address } = useAppKitAccount();
// //   const contract = useContractInstance();
// //   const navigate = useNavigate();
// //   const [avatar, setAvatar] = useState(null);
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [isDoctor, setIsDoctor] = useState(false);
// //   const { appName } = useHealthcare();

// //   useEffect(() => {
// //     const fetchProfileAndRoles = async () => {
// //       if (!contract || !address) return;

// //       try {
// //         const adminRole = await contract.DEFAULT_ADMIN_ROLE();
// //         const doctorRole = await contract.DOCTOR_ROLE();

// //         const isAdminRole = await contract.hasRole(adminRole, address);
// //         const isDoctorRole = await contract.hasRole(doctorRole, address);

// //         setIsAdmin(isAdminRole);
// //         setIsDoctor(isDoctorRole);

// //         const patientId = await contract.patientIdOf(address);
// //         if (patientId > 0n) {
// //           const patient = await contract.patients(patientId);
// //           setAvatar(patient.avatar);
// //         }
// //       } catch (err) {
// //         console.error('Header fetch error:', err);
// //       }
// //     };

// //     fetchProfileAndRoles();
// //   }, [contract, address]);

// //   const handleRegisterChange = (e) => {
// //     const val = e.target.value;
// //     if (val === 'patient') navigate('/patient');
// //      if (val === 'doctor') navigate('/doctor');
// //      if (val === 'booking') navigate('/booking');
// //      if (val === 'medical') navigate('/medical');
// //   };

// //   const handleViewChange = (e) => {
// //     const val = e.target.value;
// //     if (val === 'individual') navigate('/doctor-list');
// //     else if (val === 'prescribe') navigate('/prescribe');
// //     else if (val === 'all-patients' && isAdmin) navigate('/allPatient');
// //   };

// //   return (
// //     <header>
// //       <div className="bg-green-400 flex justify-between items-center text-white p-4 fixed w-full z-10">
// //         <h1
// //           className="text-2xl font-extrabold bg-[linear-gradient(to_right,#004225,#8B0000,#000000,#FFD700,#000000)] 
// //             bg-clip-text text-transparent bg-[length:300%_100%]"
// //           style={{ animation: 'shimmer 5s linear infinite' }}
// //         >
// //           {appName}
// //         </h1>

// //         <nav className="hidden lg:flex items-center space-x-4">
// //           <Link to="/" className="text-black hover:underline">Home</Link>

// //           {/* Register dropdown */}
// //           <select
// //             onChange={handleRegisterChange}
// //             defaultValue=""
// //             className=" bg-green-400 focus-none text-black px-2 py-1  border-0"
// //           >
// //             <option value="" disabled>Register</option>
// //             <option value="patient" className=" border-0">Register as Patient</option>
// //             <option value="doctor" className=" border-0">Register as Doctor</option>
// //             <option value="booking" className=" border-0">Book Appointment</option>
// //             <option value="medical" className=" border-0">Get Diagonis</option>
// //           </select>

// //           {/* View Record dropdown */}
// //           <select
// //             onChange={handleViewChange}
// //             defaultValue=""
// //             className="bg-green-400  focus-none text-black px-2 py-1  border-0"
// //           >
// //             <option value="" disabled>View Record</option>
// //             <option value="individual">Available Doctors</option>
// //             {isDoctor && <option value="prescribe">Doctor Prescribe</option>}
// //             {isAdmin && <option value="all-patients">All Patients</option>}
// //           </select>

// //           {/* AppKit wallet connect button */}
// //           <appkit-button className="px-1 py-1 rounded-full bg-cyan-950  hover:bg-gray-900 transition" />

          
// //          {avatar ? (
// //             <img
// //               src={avatar}
// //               alt="avatar"
// //               className="w-10 h-10 rounded-full object-cover border-2 border-white"
// //             />
// //           ) : (
// //             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
// //               ?
// //             </div>
// //           )}
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

