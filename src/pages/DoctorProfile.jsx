import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useContractInstance from "../hooks/useContractInstance";

/* ------------- OPTIONAL: set the block number you deployed at --------- */
const DEPLOY_BLOCK = 0;   // 0 = scan chain from genesis (fine on testnets)
/* ---------------------------------------------------------------------- */

const DoctorProfile = () => {
  /* ------------------------------------------------------------------ *
   *  AppKit & Contract
   * ------------------------------------------------------------------ */
  const { address } = useAppKitAccount();                // wallet
  const contract     = useContractInstance(true);        // withSigner = true
  const navigate     = useNavigate();

  /* ------------------------------------------------------------------ *
   *  Local UI state
   * ------------------------------------------------------------------ */
  const [loading, setLoading] = useState(true);
  const [doctor,  setDoctor]  = useState(null);          // { id, name, specialization, biography }
  const [alerts,  setAlerts]  = useState([]);            // [{ recordId, patientId, diagnosis }]

  /* ------------------------------------------------------------------ *
   *  Side‑effect: fetch profile + offline alerts + attach listener
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (!contract || !address) return;                   // wait for hook

    let unsub;                                           // for cleanup

    (async () => {
      try {
        /* --------- 1.  Doctor profile  --------- */
        const profile = await contract.getDoctorProfile();
        if (
          !profile.account ||
          profile.account.toLowerCase() !== address.toLowerCase()
        ) {
          toast.error("This wallet is not a registered doctor");
          setLoading(false);
          return;
        }

        setDoctor({
          id:             Number(profile.id),
          name:           profile.name,
          specialization: profile.specialization,
          biography:      profile.biography,
        });

        /* --------- 2.  Offline alerts  --------- */
        const filter = contract.filters.MedicalRecordAdded(
          null,          // recordId
          null,          // patientId
          address        // indexed doctorAddress
        );
        const pastLogs = await contract.queryFilter(
          filter,
          DEPLOY_BLOCK,
          "latest"
        );

        const pending = [];
        for (const log of pastLogs) {
          // const { recordId, patientId, diagnosis } = log.args;
          const recordId  = log.args[0];      // BigInt
          const patientId = log.args[1];
           const diagnosis = log.args[3];
          const rec = await contract.records(recordId);
          if (!rec.prescription || rec.prescription.trim() === "") {
            pending.push({
              recordId: Number(recordId),
              patientId: Number(patientId),
              diagnosis,
            });
          }
        }
        setAlerts(pending);

        /* --------- 3.  Live listener  --------- */
        const handler = async (recordId, patientId, doctorAddr, diagnosis) => {
          // (ethers v6 returns BigInt, toString() them if needed)
          if (doctorAddr.toLowerCase() !== address.toLowerCase()) return;

          toast.info(`📑 New record: “${diagnosis}”`);
          setAlerts((curr) => [
            ...curr,
            {
              recordId: Number(recordId),
              patientId: Number(patientId),
              diagnosis,
            },
          ]);
        };

        contract.on(filter, handler);
        unsub = () => contract.off(filter, handler);
      } catch (err) {
        console.error("DoctorProfile load error:", err);
        toast.error("Failed to load doctor profile");
      } finally {
        setLoading(false);
      }
    })();

    // Cleanup when component unmounts
    return () => unsub && unsub();
  }, [contract, address]);

  /* ------------------------------------------------------------------ *
   *  Render helpers
   * ------------------------------------------------------------------ */
  if (loading || !contract) return <div className="p-6">Loading…</div>;
  if (!doctor)
    return <div className="p-6 text-red-500">Not a registered doctor.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      {/* <ToastContainer position="top-right" /> */}

      {/* Doctor card */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h1 className="text-2xl font-bold mb-1">👨‍⚕️ Dr.&nbsp;{doctor.name}</h1>
        <p className="text-gray-600">{doctor.specialization}</p>
        {doctor.biography && <p className="mt-2">{doctor.biography}</p>}
      </div>

      {/* Alerts */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          📢 Pending Prescriptions ({alerts.length})
        </h2>

        {alerts.length === 0 ? (
          <p>No pending records – all caught up! 🎉</p>
        ) : (
          alerts.map((a, i) => (
            <div
              key={`${a.recordId}-${i}`}
              className="border border-yellow-300 rounded p-4 mb-4 bg-yellow-50"
            >
              <p>
                <strong>Patient&nbsp;ID:</strong> {a.patientId}
              </p>
              <p>
                <strong>Diagnosis:</strong> {a.diagnosis}
              </p>
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => navigate(`/prescribe/${a.patientId}`)}
              >
                Prescribe Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;



// import React, { useEffect, useState } from "react";
// import useContractInstance from "../hooks/useContractInstance";
// import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const DoctorProfile = () => {
//   const { address } = useAppKitAccount();
//   const provider = useAppKitProvider(); 
//   const navigate = useNavigate();

//   const [doctor, setDoctor] = useState(null);
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const contract = useContractInstance(true);

//   useEffect(() => {
//     if (!address || !provider) return;

//     const loadDoctorData = async () => {
//       try {
    

//         const profile = await contract.getDoctorProfile();
//         if (profile.account !== address) {
//           toast.error("This wallet is not a registered doctor");
//           return;
//         }

//         setDoctor({
//           id: Number(profile.id),
//           name: profile.name,
//           specialization: profile.specialization,
//           biography: profile.biography,
//         });

        
//         const filter = contract.filters.MedicalRecordAdded(
//           null, // recordId
//           null, // patientId
//           address // indexed doctor address
//         );
//         const logs = await contract.queryFilter(filter, 0, "latest");

//         const pending = [];
//         for (const log of logs) {
//           const { recordId, patientId, diagnosis } = log.args;
//           const rec = await contract.records(recordId);
//           if (!rec.prescription || rec.prescription.trim() === "") {
//             pending.push({
//               recordId: Number(recordId),
//               patientId: Number(patientId),
//               diagnosis,
//             });
//           }
//         }
//         setAlerts(pending);

//         // Subscribe to real-time events
//         contract.on(filter, (recordId, patientId, doctorAddr, diagnosis) => {
//           if (doctorAddr.toLowerCase() === address.toLowerCase()) {
//             toast.info(`📄 New record: ${diagnosis}`);
//             setAlerts((a) => [
//               ...a,
//               {
//                 recordId: Number(recordId),
//                 patientId: Number(patientId),
//                 diagnosis,
//               },
//             ]);
//           }
//         });
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load doctor profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDoctorData();

//     return () => {
//       // Optional: clean up events if needed
//     };
//   }, [address, provider]);

//   if (loading) return <div className="p-6">Loading…</div>;
//   if (!doctor) return <div className="p-6 text-red-500">Not a doctor</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 pt-20">
//       {/* <ToastContainer position="top-right" /> */}
//       <div className="bg-white rounded shadow p-6 mb-6">
//         <h1 className="text-2xl font-bold">👨‍⚕️ Dr. {doctor.name}</h1>
//         <p className="text-gray-600">{doctor.specialization}</p>
//         <p className="mt-2">{doctor.biography}</p>
//       </div>

//       <div className="bg-white rounded shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">📢 Pending Prescriptions</h2>
//         {alerts.length === 0 ? (
//           <p>No pending alerts </p>
//         ) : (
//           alerts.map((a, i) => (
//             <div
//               key={i}
//               className="mb-4 p-4 border border-yellow-300 rounded bg-yellow-50"
//             >
//               <p><strong>Patient ID:</strong> {a.patientId}</p>
//               <p><strong>Diagnosis:</strong> {a.diagnosis}</p>
//               <button
//                 className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
//                 onClick={() => navigate(`/prescribe/${a.patientId}`)}
//               >
//                 Prescribe Now
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;
