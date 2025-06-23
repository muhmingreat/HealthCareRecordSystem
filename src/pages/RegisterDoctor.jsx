// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from 'three';
// // import NETS from 'vanta/src/vanta.net';
// import NETS from 'vanta/src/vanta.net';
// import { Loader2 } from 'lucide-react';
// import { useAppKitAccount } from "@reown/appkit/react";
// import useContractInstance from "../hooks/useContractInstance";
// import useCreateDoctor from "../hooks/useRegisterDoctor";


// const RegisterDoctor = () => {
//   const vantaRef = useRef(null);
//   const [vantaEffect, setVantaEffect] = useState(null);

//   const { address } = useAppKitAccount();
//   const contract = useContractInstance(true);
//   const registerDoctor = useCreateDoctor();

//   const [formData, setFormData] = useState({
//     name: "",
//     specialisation: "",
//     licenseId: "",
//   });

//   const [isRegistered, setIsRegistered] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   useEffect(() => {
//     if (!vantaEffect) {
//       setVantaEffect(
//         NETS({
//           el: vantaRef.current,
//           THREE,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.0,
//           minWidth: 200.0,
//           scale: 1.0,
//           scaleMobile: 1.0,
//           color: 0xffffff,
//           backgroundColor: 0x000000,
//         })
//       );
//     }
//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, [vantaEffect]);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       if (!contract || !address) return;
//       try {
//         const doctor = await contract.getDoctor(address);
//         if (doctor?.name && doctor.name !== "") {
//           setFormData({
//             name: doctor.name,
//             specialisation: doctor.specialisation,
//             licenseId: doctor.licenseId,
//           });
//           setIsRegistered(true);
//         }
//       } catch (error) {
//         console.log("Doctor not registered yet");
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchDoctor();
//   }, [contract, address]);

//   const handleChange = (e) => {
//     if (isRegistered) return;
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, specialisation, licenseId } = formData;
//     setLoading(true);
//     await registerDoctor(name, specialisation, licenseId);
//     setLoading(false);
//   };

//   if (initialLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-black">
//         <Loader2 className="animate-spin text-white w-10 h-10" />
//       </div>
//     );
//   }

//   return (
//     <div ref={vantaRef} className="w-full min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-4xl w-[480px] bg-white rounded-xl shadow-lg p-8 mt-24"
//       >
//         <h1 className="text-3xl font-bold text-center mb-6">
//           {isRegistered ? "Doctor Profile (View Only)" : "Register Doctor"}
//         </h1>

//         <div className="flex flex-col gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Dr. John Doe"
//               disabled={isRegistered}
//               className="mt-1 w-full border border-gray-300 rounded-md p-3"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Specialisation</label>
//             <input
//               type="text"
//               name="specialisation"
//               value={formData.specialisation}
//               onChange={handleChange}
//               placeholder="Specialisation"
//               disabled={isRegistered}
//               className="mt-1 w-full border border-gray-300 rounded-md p-3"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">License ID</label>
//             <input
//               type="text"
//               name="licenseId"
//               value={formData.licenseId}
//               onChange={handleChange}
//               placeholder="License ID"
//               disabled={isRegistered}
//               className="mt-1 w-full border border-gray-300 rounded-md p-3"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isRegistered || loading}
//           className={`mt-6 w-full p-3 rounded-md text-white font-semibold ${
//             isRegistered
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700 transition"
//           }`}
//         >
//           {loading ? (
//             <span className="flex justify-center items-center gap-2">
//               <Loader2 className="animate-spin h-5 w-5" />
//               Processing...
//             </span>
//           ) : (
//             isRegistered ? "Already Registered" : "Register Doctor"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterDoctor;








// import React, { useEffect, useState } from "react";
// import useCreateDoctor from "../hooks/useRegisterDoctor";
// // import Vanta from "../components/ui/Vanta";
// import * as THREE from 'three';
// import NETS from 'vanta/src/vanta.net';
// import { useAppKitAccount } from "@reown/appkit/react";
// import useContractInstance from "../hooks/useContractInstance";
// import { toast } from "react-toastify";

// const RegisterDoctor = () => {
//   const { address } = useAppKitAccount();
//   const contract = useContractInstance(true);
//   const registerDoctor = useCreateDoctor();

//   const [formData, setFormData] = useState({
//     name: "",
//     specialisation: "",
//     licenseId: "",
//   });

//   const [isRegistered, setIsRegistered] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       if (!contract || !address) return;
//       try {
//         const doctor = await contract.getDoctor(address);
//         if (doctor?.name && doctor.name !== "") {
//           setFormData({
//             name: doctor.name,
//             specialisation: doctor.specialisation,
//             licenseId: doctor.licenseId,
//           });
//           setIsRegistered(true);
//         }
//       } catch (error) {
//         console.log("Doctor not registered yet");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [contract, address]);

//   const handleChange = (e) => {
//     if (isRegistered) return;
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, specialisation, licenseId } = formData;
//     await registerDoctor(name, specialisation, licenseId);
//   };

//   if (loading) {
//     return <div className="text-center mt-8 text-lg font-medium">Loading doctor data...</div>;
//   }

//   return (
//     // <Vanta>
//       <div className="flex items-center justify-center min-h-screen bg-transparent">
//         <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/90 backdrop-blur-lg">
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             {isRegistered ? "Doctor Profile (View Only)" : "Register as Doctor"}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               disabled={isRegistered}
//               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="text"
//               name="specialisation"
//               value={formData.specialisation}
//               onChange={handleChange}
//               placeholder="Specialisation"
//               disabled={isRegistered}
//               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="text"
//               name="licenseId"
//               value={formData.licenseId}
//               onChange={handleChange}
//               placeholder="License ID"
//               disabled={isRegistered}
//               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="submit"
//               disabled={isRegistered}
//               className={`w-full py-3 rounded-lg text-white font-semibold ${
//                 isRegistered
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {isRegistered ? "Already Registered" : "Register"}
//             </button>
//           </form>
//         </div>
//       </div>
//     // </Vanta>
//   );
// };

// export default RegisterDoctor;


import useRegisterDoctor from '../hooks/useRegisterDoctor';
import { useState,useRef,useEffect } from 'react';
import NETS from 'vanta/src/vanta.net';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const RegisterDoctor = () => {
   const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);
   const handleRegisterDoctor = useRegisterDoctor();
   const [loading , setIsLoading] = useState(false)
   
     useEffect(() => {
       if (!vantaEffect) {
         setVantaEffect(
           NETS({
             el: vantaRef.current,
             THREE,
             mouseControls: true,
             touchControls: true,
             gyroControls: false,
             minHeight: 200.0,
             minWidth: 200.0,
             scale: 1.0,
             scaleMobile: 1.0,
             color: 0xffffff,
             backgroundColor: 0x000000
           })
         );
       }
   
       return () => {
         if (vantaEffect) vantaEffect.destroy();
       };
     }, [vantaEffect]);

   const [field,setFeild] = useState({
  
    name: '',
    specialisation: '',
    license: ''
})
// console.log(field)
const { name, specialisation, license} = field

   const handleChange = (e, name) => {
    setFeild((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegisterDoctor( name, specialisation, license)
    setFeild({
      
      name: '',
      specialisation: '',
      license: '',
    })
    setIsLoading(false)
  } 
   
  return (
    <div className='bg-black'>
    <div ref={vantaRef} style={{ width: '100%', minHeight: '100vh' }}>
    <div>
           <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 relative top-28  bg-white rounded-xl shadow-md space-y-4 ">
      <h1 className="text-2xl font-bold text-center ">Register Doctor</h1>
      

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder='Name '
          value={name}
        
          onChange={(e) => handleChange(e, 'name')}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specialisation</label>
        <input
          type="text"
          placeholder='Enter your area of specialisation'

          name="specialisation"
          value={specialisation}
          onChange={(e) => handleChange(e, 'specialisation')}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">License</label>
        <select
          name="license"
          value={license}
          onChange={(e) => handleChange(e, 'license')}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select license type</option>
          <option value="medical">Medical</option>
          <option value="surgical">Surgical</option>
          <option value="Ophthalmologist">Ophthalmologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Endocrinologist">Endocrinologist</option>
          <option value="Orthopedic Surgeon/Orthopedist">Orthopedic Surgeon / Orthopedist</option>
          <option value="Pulmonologist">Pulmonologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="other">Other</option>
        </select>
      </div>

    <div className=''>
      <Link to='/allPatient'>
      <button>All Patient</button>
      </Link>
    </div>
     <button
          type="submit"
          disabled={ loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Loading...
            </span>
          ) : (
            'Register Doctor'
          )}
        </button>
    </form>
    </div>
    </div>
</div>
  );
};

export default RegisterDoctor;


// // // import useRegisterDoctor from '../hooks/useRegisterDoctor';
// // // import { useState, useRef, useEffect } from 'react';
// // // import NETS from 'vanta/src/vanta.net';
// // // import * as THREE from 'three';
// // // import { motion } from 'framer-motion';

// // // const RegisterDoctor = () => {
// // //   const vantaRef = useRef(null);
// // //   const [vantaEffect, setVantaEffect] = useState(null);
// // //   const handleRegisterDoctor = useRegisterDoctor();
// // //   const [loading, setLoading] = useState(false);

// // //   const [field, setField] = useState({
// // //     name: '',
// // //     specialisation: '',
// // //     license: ''
// // //   });

// // //   const { name, specialisation, license } = field;

// // //   const handleChange = (e, name) => {
// // //     setField((prevData) => ({
// // //       ...prevData,
// // //       [name]: e.target.value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     await handleRegisterDoctor(name, specialisation, license);
// // //     setLoading(false);
// // //     setField({
// // //       name: '',
// // //       specialisation: '',
// // //       license: ''
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     if (!vantaEffect) {
// // //       setVantaEffect(
// // //         NETS({
// // //           el: vantaRef.current,
// // //           THREE,
// // //           mouseControls: true,
// // //           touchControls: true,
// // //           gyroControls: false,
// // //           minHeight: 200.0,
// // //           minWidth: 200.0,
// // //           scale: 1.0,
// // //           scaleMobile: 1.0,
// // //           color: 0x6EE7B7,
// // //           backgroundColor: 0x000000
// // //         })
// // //       );
// // //     }
// // //     return () => {
// // //       if (vantaEffect) vantaEffect.destroy();
// // //     };
// // //   }, [vantaEffect]);

// // //   return (
// // //     <div className="bg-black">
// // //       <div ref={vantaRef} style={{ width: '100%', minHeight: '100vh' }} className="flex justify-center items-center py-20">
// // //         <motion.form
// // //           onSubmit={handleSubmit}
// // //           initial={{ opacity: 0, y: 60 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6, ease: 'easeOut' }}
// // //           className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6"
// // //         >
// // //           <h2 className="text-3xl font-extrabold text-center text-blue-600">Register Doctor</h2>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Full Name</label>
// // //             <input
// // //               type="text"
// // //               name="name"
// // //               placeholder="Dr. John Doe"
// // //               value={name}
// // //               onChange={(e) => handleChange(e, 'name')}
// // //               className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               required
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">Specialisation</label>
// // //             <input
// // //               type="text"
// // //               placeholder="e.g., Cardiologist"
// // //               name="specialisation"
// // //               value={specialisation}
// // //               onChange={(e) => handleChange(e, 'specialisation')}
// // //               className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               required
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700">License Type</label>
// // //             <select
// // //               name="license"
// // //               value={license}
// // //               onChange={(e) => handleChange(e, 'license')}
// // //               className="mt-1 w-full border border-gray-300 rounded-lg p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               required
// // //             >
// // //               <option value="" disabled>Select license type</option>
// // //               <option value="medical">Medical</option>
// // //               <option value="surgical">Surgical</option>
// // //               <option value="other">Other</option>
// // //             </select>
// // //           </div>

// // //           <motion.button
// // //             whileTap={{ scale: 0.95 }}
// // //             whileHover={{ scale: 1.02 }}
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
// // //           >
// // //             {loading ? "Registering..." : "Register Doctor"}
// // //           </motion.button>
// // //         </motion.form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterDoctor;
