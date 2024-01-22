import "@styles/globals.css";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "Simple TODO App",
};

export default function RootLayout({ children }) {
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