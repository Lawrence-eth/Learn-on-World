"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { useEffect } from "react";

export default function MinikitProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window !== "undefined") {
      // MiniKit is automatically initialized in World App
      console.log("MiniKit environment check:", {
        isInstalled: MiniKit.isInstalled(),
        userAgent: navigator.userAgent
      });
    }
  }, []);

  return <>{children}</>;
}
