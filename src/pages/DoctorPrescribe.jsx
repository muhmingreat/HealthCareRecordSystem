import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useContractInstance from "../hooks/useContractInstance";
import useCreatePrescription from "../hooks/useCreatePrescription";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";
import useDeleteMedicalRecord from "../hooks/useDeleteMedicalRecord";

const DoctorPrescribe = () => {
  const { patientId } = useParams();
  const contract = useContractInstance(true);      
  const { address } = useAppKitAccount();          
  const createPrescription = useCreatePrescription();
  const deleteRecord = useDeleteMedicalRecord();
  const [records, setRecords] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchRecords = useCallback(async () => {
    // now we know contract AND address are ready
    console.log(" fetchRecords:", { patientId, address });


    try {
      const ok = await contract.canView(Number(patientId), address);
      
      console.log(" canView ", ok);
      if (!ok) {
        setUnauthorized(true);
        toast.error("⛔ You’re not authorized to view these records");
        setRecords([]);
        return;
      }
      setUnauthorized(false);

      const recs = await contract.getPatientMedicalRecords(Number(patientId));
      console.log("📄 raw records:", recs);
      setRecords(
        recs.map((r) => ({
          id: Number(r.id),
          diagnosis: r.diagnosis,
          patientName: r.patientName,
          timestamp: Number(r.timestamp),
        }))
      );
    } catch (err) {
      console.error(" fetchRecords error:", err);
      toast.error("Failed to load medical records");
    }
  }, [contract, patientId, address]);

  useEffect(() => {
    if (contract && address && patientId) {
      fetchRecords();
    }
  }, [contract, address, patientId, fetchRecords]);

  const onChange = (id, text) =>
    setInputs((prev) => ({ ...prev, [id]: text }));

  const onSubmit = async (recordId) => {
    const pres = (inputs[recordId] || "").trim();
    if (!pres) return toast.error("Prescription cannot be empty");

    setLoadingId(recordId);
    try {
      await createPrescription(recordId, pres);
      toast.success("Prescription submitted");
      setInputs((p) => ({ ...p, [recordId]: "" }));
      await fetchRecords();
    } catch (err) {
      console.error(" submit error:", err);
      toast.error("Failed to submit prescription");
    } finally {
      setLoadingId(null);
    }
  };

  if (unauthorized) {
    return <div className="p-6 text-red-500">Access denied.</div>;
  }
  if (!contract || !address || !patientId) {
    return <div className="p-6">Loading…</div>;
  }
  if (records.length === 0) {
    return <div className="p-6">No records found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative top-20 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Prescribe for Patient: {patientId}</h2>
      <ul className="space-y-4">
        {records.map((r) => (
          <li key={r.id} className="border p-4 rounded">
            <p><strong>Patient:</strong> {r.patientName}</p>
            <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
            <p>
              <strong>Uploaded:</strong>{" "}
              {new Date(r.timestamp * 1000).toLocaleString()}
            </p>
            <textarea
              className="w-full border p-2 mt-2"
              placeholder={`Prescription for "${r.diagnosis}"…`}
              value={inputs[r.id] || ""}
              onChange={(e) => onChange(r.id, e.target.value)}
            />
          <div className="flex justify-between items-center">
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loadingId === r.id || !inputs[r.id]?.trim()}
              onClick={() => onSubmit(r.id)}
            >
              {loadingId === r.id ? "Submitting…" : "Submit"}
            </button>
            
    <button
      className="px-4 py-2 bg-red-600 text-white rounded"
      onClick={async () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
          await deleteRecord(r.id);
          await fetchRecords(); // Refresh after delete
        }
      }}
    >
      Delete
    </button>
    </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPrescribe;



