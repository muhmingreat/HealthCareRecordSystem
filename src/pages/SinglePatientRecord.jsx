import React, { useEffect, useState } from 'react';
import { useHealthcare } from '../context/HealthCareContext';

const SinglePatientRecords = () => {
  const { getLoggedInPatientRecord } = useHealthcare();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLoggedInPatientRecord();
      setPatient(data);
    };
    fetchData();
  }, [getLoggedInPatientRecord]);

  if (!patient) {
    return <div>Loading your profile...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">My Patient Profile</h1>

      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Wallet Address:</strong> {patient.account}</p>
      <p><strong>Status:</strong> {patient.isDeleted ? "Deleted" : "Active"}</p>
    </div>
  );
};

export default SinglePatientRecords;






// import React, { useEffect, useState } from 'react';
// import { useHealthcare } from '../context/HealthCareContext';
// import { motion } from 'framer-motion';

// const SinglePatientRecords = () => {
//   const { getSinglePatientRecord } = useHealthcare();
//   const [patientDetails, setPatientDetails] = useState([]);

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       const patientIds = [1, 2, 3, 4, 5];  // 👈 Replace with actual IDs you want to fetch

//       const allDetails = [];
//       for (const id of patientIds) {
//         const data = await getSinglePatientRecord(id);
//         if (data) allDetails.push(data);
//       }
//       setPatientDetails(allDetails);
//     };

//     fetchPatientDetails();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-12">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl sm:text-5xl font-bold text-center text-green-400 mb-12"
//       >
//         Registered Patients
//       </motion.h1>

//       {patientDetails.length === 0 ? (
//         <div className="text-center text-gray-400">No patients found or loading...</div>
//       ) : (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: { staggerChildren: 0.1 },
//             },
//           }}
//           className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {patientDetails.map((patient, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               transition={{ duration: 0.5, ease: 'easeOut' }}
//               whileHover={{
//                 scale: 1.05,
//                 y: -8,
//                 transition: { type: 'spring', stiffness: 300 },
//               }}
//               className="bg-gradient-to-br from-black to-green-500 rounded-2xl shadow-lg  p-6 cursor-pointer transition-all duration-300"
//             >
//               <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
//               <p className="text-sm text-gray-300 mb-1">
//                 <strong>Age:</strong> {patient.age}
//               </p>
//               <p className="text-sm text-gray-300 mb-1">
//                 <strong>Gender:</strong> {patient.gender}
//               </p>
//               <p className="text-sm text-gray-300 mb-1">
//                 <strong>Wallet:</strong> {patient.account}
//               </p>
//               <p className="text-sm">
//                 <strong>Status:</strong>{' '}
//                 {patient.isDeleted ? (
//                   <span className="text-red-400">Deleted</span>
//                 ) : (
//                   <span className="text-green-400">Active</span>
//                 )}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SinglePatientRecords;
