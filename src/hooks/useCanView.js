import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
// import { baseSepolia } from "@reown/appkit/networks";
import { celoAlfajores } from "@reown/appkit/networks";

const useCanView = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (patientId, viewerAddress) => {
      if (!address) {
        toast.error("Please connect your wallet");
        return false;
      }

      if (!contract) {
        toast.error("Contract not found");
        return false;
      }

      if (Number(chainId) !== Number(celoAlfajores.id)) {
        toast.error("You're not connected to celoAlfajores");
        return false;
      }

      try {
        const result = await contract.canView(patientId, viewerAddress);
        return result;
      } catch (error) {
        console.error("Error checking access", error);
        toast.error("Failed to check access");
        return false;
      }
    },
    [contract, address, chainId]
  );
};

export default useCanView;






// import { useCallback } from "react";
// import useContractInstance from "./useContractInstance";
// import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
// import { toast } from "react-toastify";
// import { baseSepolia } from "@reown/appkit/networks";
// import { ErrorDecoder } from "ethers-decode-error";

// const useCanView = () => {
//   const contract = useContractInstance(true);
//   const { address } = useAppKitAccount();
//   const { chainId } = useAppKitNetwork();

//   return useCallback(
//     async (patientId, viewerAddress) => {
      

//       if (!address) {
//         toast.error("Please connect your wallet");
//         return;
//       }

//       if (!contract) {
//         toast.error("Contract not found");
//         return;
//       }

//       if (Number(chainId) !== Number(baseSepolia.id)) {
//         toast.error("You're not connected to baseSepolia");
//         return;
//       }

//       try {
//         const estimatedGas = await contract.canView.estimateGas(
//             patientId,
//             viewerAddress
//         );

//         const tx = await contract.canView(patientId, viewerAddress, {
//           gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
//         });

//         const receipt = await tx.wait();

//         if (receipt.status === 1) {
//           toast.success("Access granted successfully");
//           return;
//         }

//         toast.error("Failed to grant access");
//         return;
//       } catch (error) {
//         const errorDecoder = ErrorDecoder.create();
//         const decodeError = await errorDecoder.decode(error);
//         console.error("Error from granting access", error);
//         toast.error(decodeError.reason);
//       }
//     },
//     [contract, address, chainId]
//   );
// };

// export default useCanView;