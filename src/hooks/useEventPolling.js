import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount } from "@reown/appkit/react";

const useEventPolling = (isDoctor, isPatient) => {
  const [count, setCount] = useState(0);
  const contract = useContractInstance();
  const { address } = useAppKitAccount(); 

  useEffect(() => {
    if (!contract || !contract.provider || !address) {
      console.warn("⚠️ Missing contract, provider, or address");
      return;
    }
  

    const poll = async () => {

        const tx = await contract.addMedicalRecord();
const receipt = await tx.wait();
console.log("📡 Logs:", receipt.logs)
      try {
        const blockNumber = await contract.provider.getBlockNumber();
        const fromBlock = blockNumber - 1000;

        if (isDoctor) {
          const logs = await contract.queryFilter("MedicalRecordAdded", fromBlock, "latest");
          const relevant = logs.filter(
            (log) => log.args[2]?.toLowerCase() === address.toLowerCase()
          );

          if (relevant.length > 0) {
            setCount((c) => c + relevant.length);
            toast.info(`🩺 ${relevant.length} new medical record(s)`);
          }
        }

        if (isPatient) {
          const logs = await contract.queryFilter("PrescriptionAdded", fromBlock, "latest");

          for (const log of logs) {
            const rec = await contract.records(log.args[0]);
            const myId = await contract.patientIdOf(address);
            if (Number(rec.patientId) === Number(myId)) {
              setCount((c) => c + 1);
              toast.success(`💊 New prescription for record #${log.args[0]}`);
            }
          }
        }
      } catch (err) {
        console.error("❌ Polling error:", err);
      }
    };

    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [contract, address, isDoctor, isPatient]);

  return count;
};

export default useEventPolling;
