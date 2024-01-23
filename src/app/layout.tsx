import React, { ReactNode } from "react";
import "@styles/globals.css";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "TODO App",
  description: "TODO App",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
