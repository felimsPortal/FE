import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-28 flex items-center">
      <div className=" w-1/4 h-full flex items-center justify-around">
        <Image src="/Logo2.png" alt="logo" width={40} height={75.47} />
        <div className="flex items-center justify-between w-1/6">
          <FaRegCopyright />
          2024
        </div>
        <Link href="/pages/dmca" target="blank">
          <h1>DMCA</h1>
        </Link>
        <Link href="#">
          <h1>SUPPORT</h1>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
