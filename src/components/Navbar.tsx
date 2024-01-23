import React from "react";
import Link from "next/link";
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 w-full h-16 text-white p-5 flex justify-between">
      <Link href="/"><Image src="/assets/icons/home.svg" height={25} width={25} alt="home-icon"/></Link>
      <div>
        <Link href="/create-issue" className="pr-10"><b>Create issue</b></Link>
        <Link href="/contact">Contact us here!</Link>
      </div>
    </nav>
  );
};

export default Navbar;
