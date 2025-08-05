import React, { useCallback, useEffect, useState } from "react";
import useContractInstance from "../hooks/useContractInstance";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";
import useDeletePatient from "../hooks/useDeletePatient";

const AllPatients = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const [patients, setPatients] = useState([]);
  const handleDeletePatient = useDeletePatient();

   const shorten = (str, start = 6, end = 4) => {
        if (!str || str.length <= start + end) return str;
        return `${str.slice(0, start)}...${str.slice(-end)}`;
      };
  const getAllPatients = useCallback(async () => {
    if (!contract || !address) return;

    try {
      const adminRole = await contract.DEFAULT_ADMIN_ROLE();
      const isAdmin = await contract.hasRole(adminRole, address);

      if (!isAdmin) {
        toast.error(" You are not an admin");
        return;
      }
     
      const rawPatients = await contract.getAllPatientsRecords();

      const formatted = rawPatients.map((p) => ({
        id: Number(p.id),
        name: p.name,
        age: Number(p.age),
        gender: p.gender,
        wallet: p.account || p.wallet,
        avatar: p.avatar,
        isDeleted: p.isDeleted,
      }));

      setPatients(formatted);
    } catch (err) {
      console.error(" Error fetching all patients", err);
      toast.error("Failed to fetch registered patients");
    }
  }, [contract, address]);

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  // 🧹 Handle delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmed) return;

    try {
      await handleDeletePatient(id);
      toast.success(`Patient with ID ${id} deleted.`);
      getAllPatients();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete patient");
    }
  };

  return (
    <div className="p-6 relative top-15">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        All Registered Patients
      </h2>

      {patients.length === 0 ? (
        <p className="text-sm sm:text-base">No patient records found or you're unauthorized.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-3 border">ID</th>
                <th className="p-2 sm:p-3 border">Name</th>
                <th className="p-2 sm:p-3 border">Age</th>
                <th className="p-2 sm:p-3 border">Gender</th>
                <th className="p-2 sm:p-3 border">Wallet</th>
                <th className="p-2 sm:p-3 border">Avatar</th>
                <th className="p-2 sm:p-3 border">Status</th>
                <th className="p-2 sm:p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 sm:p-3 border">{p.id}</td>
                  <td className="p-2 sm:p-3 border">{p.name}</td>
                  <td className="p-2 sm:p-3 border">{p.age}</td>
                  <td className="p-2 sm:p-3 border">{p.gender}</td>
                  {/* <td className="p-2 sm:p-3 border break-all">{p.wallet}</td>
                  <td className="p-2 sm:p-3 border break-all">{p.avatar}</td> */}
                  <td className="p-2 sm:p-3 border break-all" title={p.wallet}>
                    {shorten(p.wallet)}
                  </td>
                  <td className="p-2 sm:p-3 border break-all" title={p.avatar}>
                    {shorten(p.avatar)}
                  </td>

                  <td className="p-2 sm:p-3 border">
                    {p.isDeleted ? (
                      <span className="text-red-500">Deleted</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="p-2 sm:p-3 border">
                    {!p.isDeleted && (
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
};

export default AllPatients;

