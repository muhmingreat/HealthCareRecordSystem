// import React from 'react';
// import { useHealthcare } from '../context/HealthCareContext';
// import { motion } from 'framer-motion';

// const DoctorCard = ({ doctor }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-xl shadow-lg overflow-hidden"
//     >
//       <img
//         src={doctor.avatar}
//         alt={doctor.name}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-5 space-y-2">
//         <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
//         <p className="text-sm text-gray-600">
//           <strong>Specialization:</strong> {doctor.specialization}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>License:</strong> {doctor.licenseId}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>Biography:</strong> {doctor.biography}
//         </p>
//         <p className="text-sm text-gray-500">
//           <strong>Account:</strong> {doctor.account.slice(0, 12)}...
//         </p>
//         <p className="text-sm">
//           <strong>Status:</strong>{' '}
//           {doctor.isDeleted ? (
//             <span className="text-red-500">Deleted</span>
//           ) : (
//             <span className="text-green-500">Active</span>
//           )}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const GetDoctor = () => {
//   const { allDoctors } = useHealthcare();

//   return (
//     <div
//       className="min-h-screen py-12 px-4"
//       style={{
//         background: 'linear-gradient(to right top, #000000, #0f1c2e, #391836, #561932, #1876b4)',
//       }}
//     >
//       <h1 className="text-4xl font-bold text-center text-white mb-10">
//         Our Registered Doctors
//       </h1>

//       {allDoctors.length === 0 ? (
//         <p className="text-center text-gray-300">No doctors registered yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {allDoctors.map((doctor, index) => (
//             <DoctorCard key={index} doctor={doctor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetDoctor;



// import React from 'react';
// import { useHealthcare } from '../context/HealthCareContext';
// import { motion } from 'framer-motion';

// const DoctorCard = ({ doctor }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-xl shadow-lg overflow-hidden"
//     >
//       <img
//         src={doctor.avatar}
//         alt={doctor.name}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-5 space-y-2">
//         <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
//         <p className="text-sm text-gray-600">
//           <strong>Specialization:</strong> {doctor.specialization}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>License:</strong> {doctor.licenseId}
//         </p>
//         <p className="text-sm text-gray-600">
//           <strong>Biography:</strong> {doctor.biography}
//         </p>
//         <p className="text-sm text-gray-500">
//           <strong>Account:</strong> {doctor.account.slice(0, 12)}...
//         </p>
//         <p className="text-sm">
//           <strong>Status:</strong>{' '}
//           {doctor.isDeleted ? (
//             <span className="text-red-500">Deleted</span>
//           ) : (
//             <span className="text-green-500">Active</span>
//           )}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const GetDoctor = () => {
//   const { allDoctors } = useHealthcare();

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
//         Our Registered Doctors
//       </h1>

//       {allDoctors.length === 0 ? (
//         <p className="text-center text-gray-500">No doctors registered yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {allDoctors.map((doctor, index) => (
//             <DoctorCard key={index} doctor={doctor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetDoctor;



import React from 'react';
import { useHealthcare } from '../context/HealthCareContext';
import { motion } from 'framer-motion';

const GetDoctor = () => {
  const { allDoctors } = useHealthcare();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-center text-sky-400 mb-12"
      >
        Meet Our Registered Doctors
      </motion.h1>

      {allDoctors.length === 0 ? (
        <div className="text-center text-gray-400">No doctors registered yet.</div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allDoctors.map((doctor, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="flex bg-gradient-to-br from-black via-blue-900 via-40% to-sky-600 
                         rounded-xl overflow-hidden shadow-xl transition-all duration-300"
            >
              {/* Avatar Section */}
              <div className="w-1/3 bg-gradient-to-b from-sky-800 to-indigo-950 p-4 flex justify-center items-center">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>

              {/* Info Section */}
              <div className="w-2/3 p-4 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">{doctor.name}</h3>
                <p className="text-sm text-gray-300">
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>License:</strong> {doctor.licenseId}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Biography:</strong> {doctor.biography}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Account:</strong> {doctor.account.slice(0, 10)}...
                </p>
                <p className="text-sm text-gray-200">
                  <strong>Status:</strong>{' '}
                  {doctor.isDeleted ? (
                    <span className="text-red-400">Deleted</span>
                  ) : (
                    <span className="text-green-400">Active</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default GetDoctor;


// import React from 'react';
// import { useHealthcare } from '../context/HealthCareContext';
// import { motion } from 'framer-motion';

// const GetDoctor = () => {
//   const { allDoctors } = useHealthcare();

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-12">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl sm:text-5xl font-bold text-center text-sky-400 mb-12"
//       >
//         Meet Our Registered Doctors
//       </motion.h1>

//       {allDoctors.length === 0 ? (
//         <div className="text-center text-gray-400">No doctors registered yet.</div>
//       ) : (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: { staggerChildren: 0.15 },
//             },
//           }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         >
//           {allDoctors.map((doctor, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               whileHover={{ scale: 1.02, y: -5 }}
//               className="flex flex-col sm:flex-row items-center bg-gradient-to-br from-black via-blue-900 to-sky-700 rounded-2xl shadow-lg overflow-hidden"
//             >
//               {/* Avatar Image */}
//               <div className="w-full sm:w-1/3 bg-gradient-to-t from-sky-700 via-black to-indigo-900 flex justify-center items-center p-6">
//                 <img
//                   src={doctor.avatar}
//                   alt={doctor.name}
//                   className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
//                 />
//               </div>

//               {/* Info Section */}
//               <div className="w-full sm:w-2/3 p-6 space-y-2">
//                 <h3 className="text-xl sm:text-2xl font-bold text-white">{doctor.name}</h3>
//                 <p className="text-sm text-gray-300"><strong>Specialization:</strong> {doctor.specialization}</p>
//                 <p className="text-sm text-gray-300"><strong>License:</strong> {doctor.licenseId}</p>
//                 <p className="text-sm text-gray-300"><strong>Biography:</strong> {doctor.biography}</p>
//                 <p className="text-sm text-gray-300"><strong>Account:</strong> {doctor.account}</p>
//                 <p className="text-sm text-gray-200">
//                   <strong>Status:</strong>{" "}
//                   {doctor.isDeleted ? (
//                     <span className="text-red-400">Deleted</span>
//                   ) : (
//                     <span className="text-green-400">Active</span>
//                   )}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default GetDoctor;



// import React from 'react';
// import { useHealthcare } from '../context/HealthCareContext';
// import { motion } from 'framer-motion';

// const GetDoctor = () => {
//   const { allDoctors } = useHealthcare();

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-12">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl sm:text-5xl font-bold text-center text-blue-400 mb-12"
//       >
//         Our Registered Doctors
//       </motion.h1>

//       {allDoctors.length === 0 ? (
//         <div className="text-center text-gray-400">No doctors registered yet.</div>
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
//           className="grid grid-cols-1 md:grid-cols-2 gap-10"
//         >
//           {allDoctors.map((doctor, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               transition={{ duration: 0.2, ease: 'easeOut' }}
//               whileHover={{
//                 scale: 1.03,
//                 y: -6,
//                 transition: { type: 'spring', stiffness: 300 },
//               }}
//               className="flex flex-col md:flex-row items-center bg-gradient-to-br from-black via-blue-900 to-sky-700 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden"
//             >
//               {/* Avatar Section */}
//               <div className="w-full md:w-1/3 h-56 md:h-full bg-gradient-to-tr from-black via-navy to-pink-900 flex justify-center items-center p-4">
//                 <img
//                   src={doctor.avatar}
//                   alt={doctor.name}
//                   className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
//                 />
//               </div>

//               {/* Details Section */}
//               <div className="w-full md:w-2/3 p-6 text-left space-y-2">
//                 <h3 className="text-2xl font-semibold">{doctor.name}</h3>
//                 <p className="text-sm text-gray-300"><strong>Specialization:</strong> {doctor.specialization}</p>
//                 <p className="text-sm text-gray-300"><strong>License:</strong> {doctor.licenseId}</p>
//                 <p className="text-sm text-gray-300"><strong>Account:</strong> {doctor.account}</p>
//                 <p className="text-sm text-gray-300"><strong>Biography:</strong> {doctor.biography}</p>
//                 <p className="text-sm">
//                   <strong>Status:</strong>{' '}
//                   {doctor.isDeleted ? (
//                     <span className="text-red-400">Deleted</span>
//                   ) : (
//                     <span className="text-green-400">Active</span>
//                   )}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default GetDoctor;

