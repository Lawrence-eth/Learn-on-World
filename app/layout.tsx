import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MinikitProvider from "components/minikit-provider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Bitcoin",
  description: "Learn Bitcoin with World ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErudaProvider>
          <MinikitProvider>{children}</MinikitProvider>
        </ErudaProvider>
      </body>
    </html>
  );
}
