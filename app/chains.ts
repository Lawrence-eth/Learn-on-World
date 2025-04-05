import { Chain } from 'viem'

export const worldchain = {
  id: 11155111,
  name: 'World Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'World',
    symbol: 'WLD',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.world'],
    },
    public: {
      http: ['https://rpc.world'],
    },
  },
  blockExplorers: {
    default: {
      name: 'WorldScan',
      url: 'https://scan.world',
    },
  },
} as const satisfies Chain 