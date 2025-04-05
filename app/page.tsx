"use client";
import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { bitcoinLessons } from "./data/bitcoinLessons";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in World App environment
    const isWorldApp = MiniKit.isInstalled();
    if (!isWorldApp) {
      setError("Please open this app in World App to sign in.");
    }
  }, []);

  // Handle sign-in
  const handleSignIn = async () => {
    try {
      if (!MiniKit.isInstalled()) {
        setError("Please open this app in World App to sign in.");
        return;
      }

      const appId = process.env.NEXT_PUBLIC_APP_ID;
      if (!appId) {
        setError("App ID is not configured. Please check your environment variables.");
        return;
      }

      const result = await MiniKit.commands.verify({
        signal: appId,
        action: "learn_bitcoin"
      });
      
      if (result) {
        setIsAuthenticated(true);
        setError(null);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setError("Verification failed. Please try again.");
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
        {error && (
          <p className="text-red-500 mt-2 text-center max-w-md">
            {error}
          </p>
        )}
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