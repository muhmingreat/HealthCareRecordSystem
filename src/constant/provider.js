/* eslint-disable no-unused-vars */
import { ethers } from "ethers";

// When wallet is not connected, connects to the Sepolia RPC
export const readOnlyProvider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_INFURA_RPC_URL
);

export const wssProvider = new ethers.WebSocketProvider(
  import.meta.env.VITE_WEB_SOCKET_RPC_URL
);

// Browser wallet is connected (read-write provider)
export const getProvider = (provider) =>
  new ethers.BrowserProvider(provider);
