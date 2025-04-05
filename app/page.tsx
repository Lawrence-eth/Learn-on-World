"use client";
import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { bitcoinLessons } from "./data/bitcoinLessons";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("MiniKit is installed:", MiniKit.isInstalled());
    console.log("User agent:", navigator.userAgent);
  }, []);

  // Handle sign-in
  const handleSignIn = async () => {
    console.log("Attempting sign in...");
    console.log("MiniKit is installed:", MiniKit.isInstalled());
    
    if (MiniKit.isInstalled()) {
      try {
        console.log("Starting verification...");
        const result = await MiniKit.commands.verify({
          signal: process.env.NEXT_PUBLIC_APP_ID || "",
          action: "learn_bitcoin"
        });
        
        console.log("Verification result:", result);
        if (result) {
          setIsAuthenticated(true);
          console.log("Signed in successfully!");
        }
      } catch (error) {
        console.error("Verification failed:", error);
      }
    } else {
      console.error("MiniKit not detected in environment");
      alert("Please open this app in World App to sign in.");
    }
  };

  // Show sign-in screen if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
        <h1 className="text-4xl font-bold">Learn Bitcoin</h1>
        <button
          onClick={handleSignIn}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign In with World ID
        </button>
      </main>
    );
  }

  // Show lessons if authenticated
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <h1 className="text-4xl font-bold">Learn Bitcoin</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold">{bitcoinLessons[currentSection].title}</h2>
        <p className="mt-2 text-gray-600">{bitcoinLessons[currentSection].content}</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCurrentSection(currentSection - 1)}
            disabled={currentSection === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentSection(currentSection + 1)}
            disabled={currentSection === bitcoinLessons.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}