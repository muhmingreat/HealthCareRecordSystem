
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NETS from 'vanta/src/vanta.net';
import useMedicalRecord from '../hooks/useMedicalRecord';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Camera, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare } from '../context/HealthCareContext';
import { toast } from 'react-toastify';
import useContractInstance from '../hooks/useContractInstance';
import { useAppKitAccount } from '@reown/appkit/react';
const MedicalRecord = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const handleMedicalRecord = useMedicalRecord();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);

  const { address } = useAppKitAccount();
  
  
const contract = useContractInstance();
  

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
          backgroundColor: 0x000000,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleUploadToIPFS = async () => {
    if (!selectedFile) return;
    try {
      const compressed = await imageCompression(selectedFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append('file', compressed);

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
        },
      });

      setIpfsUrl(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
    } catch (err) {
      console.error('IPFS upload error:', err);
      toast.error("Failed to upload to IPFS");
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUploadToIPFS();
    }
  }, [selectedFile]);

  // const handl
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!ipfsUrl || !patientName || !diagnosis) return;
  setLoading(true);

  try {
    // 1. Add the medical record to the contract
    await handleMedicalRecord(ipfsUrl, patientName, diagnosis);
     const patientId = await contract.patientIds(address);
    setIpfsUrl('');
    setPatientName('');
    setDiagnosis('');
    setSelectedFile(null);
    navigate(`/prescribe/${patientId}`);
  } catch (err) {
    console.error(" Error during medical record submission:", err);
    toast.error("Unexpected error during submission");
  } finally {
    setLoading(false);
  }
};


  return (
    <div ref={vantaRef} className="w-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-[480px] bg-white md:w-[480px] md:max-w-2xl sm:w-[150px] rounded-xl shadow-lg p-8 mt-24"
      >
        <h1 className="text-2xl font-bold text-center">Medical Record</h1>

        <div className="flex justify-center">
          <input
            type="file"
            accept="image/*"
            hidden
            id="file-input"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <label htmlFor="file-input" className="cursor-pointer">
            {selectedFile ? (
              <img src={previewUrl} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-600" />
              </div>
            )}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="e.g. Malaria"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {ipfsUrl && (
          <div>
            <label className="block text-sm font-medium text-gray-700">IPFS URL</label>
            <input
              type="text"
              value={ipfsUrl}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!ipfsUrl || loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Submitting...
            </span>
          ) : (
            'Add Record'
          )}
        </button>
      </form>
    </div>
  );
};

export default MedicalRecord;




// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import NETS from 'vanta/src/vanta.net';
// import useMedicalRecord from '../hooks/useMedicalRecord';
// import axios from 'axios';
// import imageCompression from 'browser-image-compression';
// import { Camera, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useHealthcare } from '../context/HealthCareContext';

// const MedicalRecord = () => {
//   const vantaRef = useRef(null);
//   const [vantaEffect, setVantaEffect] = useState(null);
//   const handleMedicalRecord = useMedicalRecord();
//   const navigate = useNavigate();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [ipfsUrl, setIpfsUrl] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [diagnosis, setDiagnosis] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { fetchSinglePatient } = useHealthcare();

//   // Vanta.js effect
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

//   // Preview uploaded file
//   useEffect(() => {
//     if (selectedFile) {
//       const objectUrl = URL.createObjectURL(selectedFile);
//       setPreviewUrl(objectUrl);
//       return () => URL.revokeObjectURL(objectUrl);
//     }
//   }, [selectedFile]);

//   // Upload to IPFS (Pinata)
//   const handleUploadToIPFS = async () => {
//     if (!selectedFile) return;
//     try {
//       const compressed = await imageCompression(selectedFile, {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 1024,
//         useWebWorker: true,
//       });

//       const formData = new FormData();
//       formData.append('file', compressed);

//       const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
//           pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
//         },
//       });

//       setIpfsUrl(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
//     } catch (err) {
//       console.error('IPFS upload error:', err);
//     }
//   };

//   useEffect(() => {
//     if (selectedFile) {
//       handleUploadToIPFS();
//     }
//   }, [selectedFile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!ipfsUrl || !patientName || !diagnosis) return;
//     setLoading(true);
//     // await handleMedicalRecord(ipfsUrl, patientName, diagnosis);
//     const patientId = await handleMedicalRecord(ipfsUrl, patientName, diagnosis);
//     if (!patientId) {
//       toast.error("Something went wrong");
//       return;
//     }
//      const success = await fetchSinglePatient(patientId);
//      console.log( "success", success);
//     if (!patientId  || Number(patientId) <= 0) {
//       toast.error("Invalid patient ID");
//       return;
//     }
//     console.log("Calling getSinglePatient with ID:", patientId);
//     localStorage.clear();
//     sessionStorage.clear();
//     indexedDB.databases().then(dbs =>
//       dbs.forEach(db => indexedDB.deleteDatabase(db.name))
//     );

//     // navigate("/prescribe");

//     setLoading(false);
//     setIpfsUrl('');
//     setPatientName('');
//     setDiagnosis('');
//     setSelectedFile(null);
//     navigate('/prescribe');
//   };

//   return (
//     <div ref={vantaRef} className="w-full min-h-screen flex items-center justify-center">
//       {/* // <div ref={vantaRef} className="w-full max-h-screen md:max-h-screen sm:max-h-screen"> */}
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-4xl w-[480px] bg-white md:w-[480px] md:max-w-2xl sm:w-[150px] rounded-xl shadow-lg p-8 mt-24"
//       // className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 relative  top-28"
//       >
//         <h1 className="text-2xl font-bold text-center">Medical Record</h1>

//         {/* File Upload */}
//         <div className="flex justify-center">
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             id="file-input"
//             onChange={(e) => setSelectedFile(e.target.files[0])}
//           />
//           <label htmlFor="file-input" className="cursor-pointer">
//             {selectedFile ? (
//               <img src={previewUrl} className="w-24 h-24 rounded-full object-cover" />
//             ) : (
//               <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
//                 <Camera className="w-8 h-8 text-gray-600" />
//               </div>
//             )}
//           </label>
//         </div>

//         {/* Patient Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Patient Name</label>
//           <input
//             type="text"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             placeholder="John Doe"
//             className="mt-1 w-full border border-gray-300 rounded-md p-2"
//             required
//           />
//         </div>

//         {/* Diagnosis */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
//           <input
//             type="text"
//             value={diagnosis}
//             onChange={(e) => setDiagnosis(e.target.value)}
//             placeholder="e.g. Malaria"
//             className="mt-1 w-full border border-gray-300 rounded-md p-2"
//             required
//           />
//         </div>

//         {/* IPFS Hash */}
//         {ipfsUrl && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700">IPFS URL</label>
//             <input
//               type="text"
//               value={ipfsUrl}
//               readOnly
//               className="mt-1 w-full border border-gray-300 rounded-md p-2"
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!ipfsUrl || loading}
//           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
//         >
//           {loading ? (
//             <span className="flex justify-center items-center gap-2">
//               <Loader2 className="animate-spin h-4 w-4" />
//               Submitting...
//             </span>
//           ) : (
//             'Add Record'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MedicalRecord;
