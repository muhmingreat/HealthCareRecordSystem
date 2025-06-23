import { SUPPORTED_CHAIN_ID } from "../context/Connection";

export const isSupportedChain = (chainId)
  chainId !== undefined && Number(chainId) === SUPPORTED_CHAIN_ID;
