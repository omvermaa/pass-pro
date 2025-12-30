import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 text-white flex-col justify-center bottom-0 w-full bg-black/50 py-2 gap-2">
      <div className=" text-white flex justify-center items-center flex-col gap-1">
        <div className="logo text-2xl font-medium">
          <span className="text-red-600">&lt;</span>Pass
          <span className="text-red-600">Pro/&gt;</span>
        </div>
        <div className="flex">
          Created with <img className="w-7" src="/icons/heart.svg" alt="" /> by
          Om
        </div>
      </div>
    </div>
  );
};

export default Footer;
