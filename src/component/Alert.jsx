import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";
import useContractInstance from "../hooks/useContractInstance";

const Alert = ({ isDoctor, isPatient }) => {
  const { address } = useAppKitAccount();
  const contract = useContractInstance();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    if (!contract || !address) return;

    const normalizedAddress = ethers.getAddress(address);

    const handleRecord = (recordId, patientId, doctorAddr) => {
      if (isDoctor && ethers.getAddress(doctorAddr) === normalizedAddress) {
        setAlertCount((prev) => prev + 1);
        toast.info(`🩺 New medical record from patient #${patientId}`);
      }
    };

    const handlePrescription = async (recordId) => {
      try {
        const rec = await contract.records(recordId);
        const myId = await contract.patientIdOf(normalizedAddress);
        if (Number(rec.patientId) === Number(myId)) {
          setAlertCount((prev) => prev + 1);
          toast.success(`💊 New prescription for record #${recordId}`);
        }
      } catch (err) {
        console.error("❌ Error checking prescription:", err);
      }
    };

    // ✅ Real-time listeners
    contract.on("MedicalRecordAdded", handleRecord);
    contract.on("PrescriptionAdded", handlePrescription);

    return () => {
      contract.off("MedicalRecordAdded", handleRecord);
      contract.off("PrescriptionAdded", handlePrescription);
    };
  }, [contract, address, isDoctor, isPatient]);

  return (
    <div className="relative">
      <Bell className="w-6 h-6 cursor-pointer text-blue-600" />
      {alertCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {alertCount}
        </span>
      )}
    </div>
  );
};

export default Alert;

