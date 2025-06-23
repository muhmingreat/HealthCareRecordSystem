


import React, { useMemo } from "react";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract } from "ethers";
import ABI from "../ABI/Healthcare.json"

const useContractInstance = (withSigner = false) => {
  const { signer, readOnlyProvider } = useSignerOrProvider();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        ABI,
        signer
      );
    }
    // console.log("📄 VITE_CONTRACT_ADDRESS:", import.meta.env.VITE_CONTRACT_ADDRESS);
    // console.log("🧾 Signer:", signer);
    // console.log("📡 Provider:", readOnlyProvider);

    return new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      ABI,
      readOnlyProvider
    );
  }, [signer, readOnlyProvider, withSigner]);

};

export default useContractInstance;