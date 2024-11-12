"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { defineChain } from "@particle-network/connectkit/chains";

// Define the chains
const victionTestnet = defineChain({
  id: 89,
  name: "Viction Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "VIC",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.vicscan.xyz/" },
  },
  testnet: true,
});

const victionMainnet = defineChain({
  id: 88,
  name: "Viction",
  nativeCurrency: {
    decimals: 18,
    name: "VIC",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://www.vicscan.xyz/" },
  },
  testnet: false,
});

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  walletConnectors: [
    authWalletConnectors({
      authTypes: ["email", "google", "apple", "twitter", "github"], // Optional, restricts the types of social logins supported
    }),
  ],

  chains: [victionTestnet, victionMainnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
