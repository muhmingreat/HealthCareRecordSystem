import { useCallback } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { celoAlfajores } from "@reown/appkit/networks";

import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
// import { ethers } from "ethers";



const useBookAppointment = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  // const checksummed = ethers.getAddress(address);
  // const patientId = await contract.patientIds(checksummed);


  return useCallback(async (doctorAddress, timestamp, fee) => {
    if (!doctorAddress || !timestamp || !fee) {
      toast.error("All fields are required");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!contract) {
      toast.error("Smart contract not found");
      return;
    }

    if (Number(chainId) !== Number(celoAlfajores.id)) {
      toast.error("You're not connected to celoAlfajores network");
      return;
    }


    console.log({
      from: address,
      to: contract.target || contract.address,
      doctorAddress,
      timestamp,
      msgValue: Number(fee),
    });
    
    try {
        const checksummed = ethers.getAddress(address); // ensure checksum
        const patientId = await contract.patientIds(checksummed);
        console.log("👤 Resolved Patient ID:", patientId.toString());

        if (patientId.toString() === "0") {
          toast.error("You must be registered as a patient.");
          return;
        }
      }catch (error) {
        console.error("Error resolving patient ID:", error);
        toast.error("Error resolving patient ID");
        return;
      }

    

    try {
      const estimatedGas = await contract.bookAppointment.estimateGas(
        doctorAddress, timestamp,
        // feeInEth,
        { value: fee }
      );


      const tx = await contract.bookAppointment(
        doctorAddress,
        timestamp,

        {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
          value: fee // 20% buffer
        }
      );

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("Appointment booked successfully");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      const errorDecoder = ErrorDecoder.create();
      const decoded = await errorDecoder.decode(error);
      console.error("Error while booking appointment:", error);
      toast.error(decoded?.reason || "Unknown error occurred");
    }
  },
    [contract, address, chainId]
  );
};

export default useBookAppointment;
