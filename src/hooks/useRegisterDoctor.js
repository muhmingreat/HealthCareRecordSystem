import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
// import { baseSepolia } from "@reown/appkit/networks";
import { celoAlfajores } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";

const useCreatePatient = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (name, specialization, licenseId ) => {
      if (!name || !specialization || !licenseId) {
        toast.error("All fields are required");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(celoAlfajores.id)) {
        toast.error("You're not connected to baseSepolia");
        return;
      }

      try {
        const estimatedGas = await contract.registerDoctor.estimateGas(
         name, specialization, licenseId 
        );
        const tx = await contract.registerDoctor(name, specialization, licenseId , {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });
        // toast.info("Registering patient...");

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Doctor registered successfully");
          return true;
        }

        toast.error("Failed to register Doctor");
        return false;
      } catch (error) {
        const errorDecoder = ErrorDecoder.create();
        const decodeError = await errorDecoder.decode(error);
        console.error("Error from Register doctor", error);
        toast.error(decodeError.reason);
      }
    },
    [contract, address, chainId]
  );
};

export default useCreatePatient;

// import { useCallback, useEffect, useState } from "react";
// import useContractInstance from "./useContractInstance";
// import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
// import { toast } from "react-toastify";
// import { baseSepolia, celoAlfajores } from "@reown/appkit/networks";
// import { ErrorDecoder } from "ethers-decode-error";
// import { useNavigate } from "react-router-dom";

// const useCreateDoctor = () => {
//   const navigate = useNavigate();
//   const { address } = useAppKitAccount();
//   const { chainId } = useAppKitNetwork();
//   const contract = useContractInstance(true);
// console.log("Connected wallet address:", address);
//   const [createDoctor, setCreateDoctor] = useState(() => async () => {});


//   useEffect(() => {
//     if (!contract || !address) return;

//     const register = async (name, specialisation, licenseId) => {
//       if (!name || !specialisation || !licenseId) {
//         toast.error("All fields are required");
//         return;
//       }

//       if (Number(chainId) !== Number(celoAlfajores.id)) {
//         toast.error("You're not connected to celoAlfajores");
//         return;
//       }
// //       const admin = await contract.appOwner();
// //       // const admin = await contract.appOwner();

// // if (admin.toLowerCase() === address.toLowerCase()) {
// //   console.log("✅ You are the contract deployer / admin.");
// // } else {
// //   console.warn("❌ You are NOT the deployer/admin.");
// // }

//       try {
//         // Check if already registered
//         const doctorData = await contract.getDoctor(address);
//         if (doctorData && doctorData.name && doctorData.name !== "") {
//           toast.info("You are already registered as a doctor.");
          
//           return;
//         }
//       } catch (checkErr) {
//         console.log("Not registered yet, continuing...");
//         // We continue only if the error is "not registered", otherwise throw
//       }

//       try {
//         const estimatedGas = await contract.registerDoctor.estimateGas(
//           name,
//           specialisation,
//           licenseId
//         );

//         const tx = await contract.registerDoctor(name, specialisation, licenseId, {
//           gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
//         });

//         const receipt = await tx.wait();

//         if (receipt && receipt.status === 1) {
//           toast.success("Doctor registered successfully");
//           // navigate("/booking");
//         } else {
//           toast.error("Failed to register doctor");
//         }
//       } catch (error) {
//         const errorDecoder = ErrorDecoder.create();
//         const decodeError = await errorDecoder.decode(error);
//         console.error("Doctor registration error:", error);
//         toast.error(decodeError?.reason || "Something went wrong");
//       }
//     };

//     setCreateDoctor(() => register);
//   }, [contract, address, chainId, navigate]);

//   return createDoctor;
// };

// export default useCreateDoctor;
