import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 flex lg:flex justify-between lg:justify-between lg:px-20 px-5 p-2 text-white">
      <div className="logo flex items-center text-2xl font-medium">
        <span className="text-red-600">&lt;</span>Pass
        <span className="text-red-600">Pro/&gt;</span>
      </div>
      {/* <div className="right flex gap-8 mx-4 items-center"> */}
      {/* <ul className="flex items-center">
        <li className="flex gap-4">
          <a className="hover:font-bold" href="/">
            Home
          </a>
          <a className="hover:font-bold" href="/">
            About
          </a>
          <a className="hover:font-bold" href="/">
            Contact Us
          </a>
        </li>
      </ul> */}
      <div className="github hover:bg-red-800/80 bg-red-800 p-2 rounded-full flex justify-center gap-2">
        <a target="__blank" href="https://github.com/" className="flex items-center gap-2 hover:text-gray-300">
        <img className="w-8 invert cursor-pointer" src="/icons/github.svg" alt="github logo" /><span>GitHub</span></a>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
