import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppKitAccount } from '@reown/appkit/react';
import useContractInstance from '../hooks/useContractInstance';
import { ethers } from 'ethers';

const PatientPrescription = () => {
  const { address } = useAppKitAccount();
  const contract = useContractInstance();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPrescriptions = async () => {
    if (!address || !contract) {
      toast.error("⚠️ Wallet not connected.");
      setLoading(false);
      return;
    }

    

    try {
      const normalizedAddress = ethers.getAddress(address);
      const patientId = await contract.patientIds(normalizedAddress);

      const canAccess = await contract.canView(patientId, normalizedAddress);
    if (!canAccess) {
      toast.error("⛔ You're not authorized to view these prescriptions.");
      setPrescriptions([]);
      return;
    }

      console.log("✅ Normalized Address:", normalizedAddress);
      console.log("🆔 Patient ID:", patientId.toString());

      if (patientId === 0n) {
        toast.error("❌ You must register as a patient first.");
        setPrescriptions([]);
        return;
      }

      const records = await contract.getPatientMedicalRecords(patientId);
      const filtered = records.filter(
        (r) => r.prescription && r.prescription.trim() !== ""
      );

      setPrescriptions(filtered);
    } catch (error) {
      console.error("❌ Error fetching prescriptions:", error);
      toast.error("Failed to fetch your prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPrescriptions();
  }, [address, contract]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">My Prescriptions</h1>

      {loading ? (
        <p className="text-gray-500">Loading prescriptions...</p>
      ) : prescriptions.length === 0 ? (
        <p className="text-gray-600">No prescriptions found.</p>
      ) : (
        <ul className="space-y-4">
          {prescriptions.map((prescription, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded shadow">
              <p><strong>Patient Name:</strong> {prescription.patientName}</p>
              <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
              <p><strong>Prescription:</strong> {prescription.prescription}</p>
              <p><strong>Timestamp:</strong> {new Date(Number(prescription.timestamp) * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientPrescription;



// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useAppKitAccount } from '@reown/appkit/react';
// import useContractInstance from '../hooks/useContractInstance';
// import { ethers } from 'ethers';
// const PatientPrescription = () => {
//   const { address } = useAppKitAccount();
//   const contract = useContractInstance();
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const fetchMyPrescriptions = async () => {
//     if (!address || !contract) {
//       toast.error("Wallet not connected.");
//       return;
//     }
//     console.log("Current address:", address);
//     // try {
//       const normalized = ethers.getAddress(address);
//       const patientId = await contract.patientIds(normalized);
//       console.log("Patient ID:", patientId);

//       if (patientId === 0n) {
//         toast.error("You must register as a patient first.");
//         setPrescriptions([]);
//         return;
//       }

//       const patient = await contract.getMyPatientProfile();
//       const records = await contract.getPatientMedicalRecords(patient.id);

//       const filtered = records.filter((r) => r.prescription && r.prescription !== '');
//       setPrescriptions(filtered);
//     } catch (error) {
//       console.error("Error fetching prescriptions:", error);
//       toast.error("Failed to fetch your prescriptions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyPrescriptions();
//   }, [address, contract]);

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-6">My Prescriptions</h1>

//       {loading ? (
//         <p className="text-gray-500">Loading prescriptions...</p>
//       ) : prescriptions.length === 0 ? (
//         <p className="text-gray-500">No prescriptions available.</p>
//       ) : (
//         <ul className="space-y-4">
//           {prescriptions.map((prescription, index) => (
//             <li key={index} className="p-4 bg-gray-100 rounded shadow">
//               <p><strong>Patient Name:</strong> {prescription.patientName}</p>
//               <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
//               <p><strong>Prescription:</strong> {prescription.prescription}</p>
//               <p><strong>Timestamp:</strong> {new Date(Number(prescription.timestamp) * 1000).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PatientPrescription;



// // import React, { useEffect, useState } from "react";
// // import { useAppKitAccount } from "@reown/appkit/react";
// // import useContractInstance from "../hooks/useContractInstance";
// // import { toast } from "react-toastify";

// // const PatientPrescriptions = () => {
// //   const contract = useContractInstance();
// //   const { address } = useAppKitAccount();
// //   const [records, setRecords] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const fetchMyPrescriptions = async () => {
// //     if (!contract || !address) return;
// //     try {
// //       setLoading(true);
// //       const patientProfile = await contract.getMyPatientProfile();
// //       const patientId = patientProfile.id;

// //       const allRecords = await contract.getPatientMedicalRecords(patientId);

// //       const prescriptionsOnly = allRecords.filter(
// //         (record) => record.prescription && record.prescription.trim() !== ""
// //       );

// //       setRecords(prescriptionsOnly);
// //     } catch (error) {
// //       console.error("Error fetching prescriptions:", error);
// //       toast.error("Failed to load your prescriptions");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMyPrescriptions();
// //   }, [contract, address]);

// //   return (
// //     <div className="min-h-screen px-4 py-10 relative top-20 bg-gray-50">
// //       <h2 className="text-3xl font-bold text-center mb-6">My Prescriptions</h2>

// //       {loading ? (
// //         <p className="text-center text-gray-500">Loading...</p>
// //       ) : records.length === 0 ? (
// //         <p className="text-center text-gray-600">No prescriptions available yet.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {records.map((record) => (
// //             <div
// //               key={record.id}
// //               className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
// //             >
// //               <h3 className="text-lg font-semibold mb-2">
// //                 Patient Name: {record.patientName}
// //               </h3>
// //               <p className="text-sm text-gray-700 mb-1">
// //                 Diagnosis: {record.diagnosis}
// //               </p>
// //               <p className="text-sm text-gray-700 mb-1">
// //                 Prescription: <span className="font-medium">{record.prescription}</span>
// //               </p>
// //               <p className="text-xs text-gray-500 mt-2">
// //                 Date: {new Date(Number(record.timestamp) * 1000).toLocaleString()}
// //               </p>
// //               {record.ipfsUrl && (
// //                 <a
// //                   href={`https://ipfs.io/ipfs/${record.ipfsUrl}`}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="block mt-2 text-blue-600 text-sm hover:underline"
// //                 >
// //                   View Uploaded Record (IPFS)
// //                 </a>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PatientPrescriptions;


// // // import React, { useEffect } from "react";
// // // import { useHealthcare } from "../context/HealthCareContext";

// // // const PatientPrescriptions = () => {
// // //   const { loggedInPatient, patientRecords, getPatientMedicalRecords } = useHealthcare();

// // //   useEffect(() => {
// // //     if (loggedInPatient?.id) {
// // //       getPatientMedicalRecords(loggedInPatient.id);
// // //     }
// // //   }, [loggedInPatient, getPatientMedicalRecords]);

// // //   const prescriptions = patientRecords.filter(
// // //     (record) => record.prescription && !record.isDeleted
// // //   );

// // //   return (
// // //     <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow rounded-xl">
// // //       <h2 className="text-2xl font-bold mb-4">My Prescriptions</h2>
// // //       {prescriptions.length === 0 ? (
// // //         <p>No prescriptions found.</p>
// // //       ) : (
// // //         <ul className="space-y-4">
// // //           {prescriptions.map((record) => (
// // //             <li key={record.id} className="bg-gray-100 p-4 rounded-lg">
// // //               <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
// // //               <p><strong>Prescription:</strong> {record.prescription}</p>
// // //               <p className="text-xs text-gray-500">
// // //                 Date: {new Date(record.timestamp * 1000).toLocaleString()}
// // //               </p>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PatientPrescriptions;