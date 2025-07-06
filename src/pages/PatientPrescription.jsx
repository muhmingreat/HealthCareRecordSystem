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
    setLoading(true);

    if (!address || !contract) {
      toast.error("⚠️ Wallet not connected.");
      setLoading(false);
      return;
    }

    try {
      const user = ethers.getAddress(address);
         const pid = await contract.patientIdOf(user);
      if (pid=== 0n) {
        toast.error("❌ You must register as a patient first.");
        setPrescriptions([]);
        setLoading(false);
        return;
      }
      // ✅ Use getMyPatientProfile() to get valid ID safely
      const profile = await contract.getPatientProfile();
      const patientId = profile.id;

      if (!patientId || patientId.toString() === "0") {
        toast.error("❌ You must register as a patient first.");
        setPrescriptions([]);
        return;
      }

      const canAccess = await contract.canView(patientId, normalizedAddress);
      if (!canAccess) {
        toast.error("⛔ You're not authorized to view these prescriptions.");
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
      setPrescriptions([]);
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
