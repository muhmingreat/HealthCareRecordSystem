import React from "react";
import useCanView from "../hooks/useCanView";
import { useAppKitAccount } from "@reown/appkit/react";
import useContractInstance from "../hooks/useContractInstance";

const DoctorCard = ({ doctor }) => {
  const canView = useCanView();
  const { address: userAddress } = useAppKitAccount();
  const contract = useContractInstance(false);

  const handleGrantAccess = async () => {
    try {
      const patientId = await contract.patientIds(userAddress);
      await canView(patientId.toString(), doctor.account);
    } catch (error) {
      console.error("Granting view access failed", error);
    }
  };

  return (
    <div className="border rounded-xl p-4 bg-white dark:bg-gray-900 shadow-md space-y-2">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{doctor.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Specialization:</strong> {doctor.specialization}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>License ID:</strong> {doctor.licenseId}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Account:</strong> {doctor.account}
      </p>

      {!doctor.isDeleted && (
        <button
          onClick={handleGrantAccess}
          className="mt-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
        >
          Grant Access
        </button>
      )}
    </div>
  );
};

export default DoctorCard;
