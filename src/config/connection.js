import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
// ❌ AppKit networks doesn’t include Celo directly, so we define manually

// 1️⃣ Get projectId from env
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2️⃣ Define Celo networks manually (since @reown/appkit/networks doesn't include them)
const alfajores = {
  id: 44787,
  name: 'Celo Alfajores',
  network: 'celo-alfajores',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://alfajores-forno.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CeloScan',
      url: 'https://alfajores.celoscan.io',
    },
  },
  testnet: true,
};

const celo = {
  id: 42220,
  name: 'Celo Mainnet',
  network: 'celo-mainnet',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://forno.celo.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CeloScan',
      url: 'https://celoscan.io',
    },
  },
  testnet: false,
};

// 3️⃣ Set the networks array
const networks = [alfajores, celo];

// 4️⃣ Create metadata (optional)
const metadata = {
  name: 'My Healthcare DApp',
  description: 'Healthcare Record System on CELO',
  url: 'http://localhost:5173',  // replace with your real domain
  icons: ['https://myhealthcareapp.com/icon.png']  // your app icon url
};

// 5️⃣ Create AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - enable analytics
  }
});



// import { createAppKit } from '@reown/appkit/react'
// import { EthersAdapter } from '@reown/appkit-adapter-ethers'
// import { baseSepolia, sepolia } from '@reown/appkit/networks'
// // import { baseSepolia, sepolia } from '@reown/appkit/networks'
// // import { alfajores, celo } from '@reown/appkit/networks'

// // 1. Get projectId
// const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID

// // 2. Set the networks
// const networks = [baseSepolia, sepolia]
// // const networks = [alfajores, celo]

// // 3. Create a metadata object - optional
// const metadata = {
//   name: 'My Website',
//   description: 'My Website description',
//   url: 'https://mywebsite.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.mywebsite.com/']
// }

// // 4. Create a AppKit instance
// createAppKit({
//   adapters: [new EthersAdapter()],
//   networks,
//   metadata,
//   projectId,
//   features: {
//     analytics: true // Optional - defaults to your Cloud configuration
//   }
// })
