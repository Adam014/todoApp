import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 w-full h-16 text-white p-5 flex justify-between">
      <Link href="/">HomePage</Link>
      <Link href="/contact">Contact us here!</Link>
    </nav>
  );
};

export default Navbar;
