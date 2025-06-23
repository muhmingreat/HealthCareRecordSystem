import { useEffect, useState } from "react";
import useContractInstance from "../hooks/useContractInstance"; // your hook
import { useAppKitAccount } from "@reown/appkit/react";

export default function useIsDeployer() {
  const { address } = useAppKitAccount();
  const contract = useContractInstance("0x791157165B9DDcDE1b8703ad727f3A05Ed9e06AA");
  const [isDeployer, setIsDeployer] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!contract || !address) return;

      try {
        const owner = await contract.appOwner(); // read on-chain
        console.log("🛠️ Deploying (appOwner) address:", owner);
        console.log("🧑‍💻 Your connected address :", address);

        setIsDeployer(owner.toLowerCase() === address.toLowerCase());
      } catch (err) {
        console.error("❌ Error reading contract owner:", err);
      }
    };
    check();
  }, [contract, address]);

  return isDeployer;
}
