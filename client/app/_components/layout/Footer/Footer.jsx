import React from "react";

import { SlSocialInstagram } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="h-full bg-[#c80f2e] p-4 lg:px-40 ">
      <div className="flex justify-between   md:flex-row flex-col   text-white pb-5 border-b  border-b-neutral-300">
        <div className="flex  md:gap-5 gap-2 justify-center md:justify-start  items-center md:px-5 py-5 w-full  md:text-xl  md:border-none border-b border-b-neutral-300">
          <p className="hover:hover:text-yellow-500">
            <a href="/menu/deals">
              Deals <sup className="">*</sup>
            </a>
          </p>
          <p className="hover:text-yellow-500">
            {" "}
            <a href="/menu/pizzas">Pizza</a>
          </p>
          <p className="hover:text-yellow-500">
            {" "}
            <a href="/menu/sides">Sides</a>
          </p>
          <p className="hover:text-yellow-500">
            {" "}
            <a href="/menu/drinks">Drinks</a>
          </p>
          <p className="hover:text-yellow-500">
            {" "}
            <a href="/menu/desserts">Desserts</a>
          </p>
          <p className="hover:text-yellow-500">
            {" "}
            <a href="/menu/dips">Dips</a>
          </p>
        </div>

        <div className="flex   flex-col gap-2 items-center justify-between ">
          <div className=" flex flex-col justify-center px-3">
            <p className="flex justify-center  mt-2  ">
              <FaStore className="mr-2" size={20} />
              <span className=" text-center text-nowrap">
                Store : 91 Joel St, Pinner, Northwood HA6 1LW, UK
              </span>
            </p>
            <p className="flex items-center mt-2">
              <IoMdMail className="mr-2" size={20} />
              <span className="text-center">
                Email : Hothousenorthwood@gmail.com
              </span>
            </p>
            <p className="flex items-center mt-2">
              <FaPhone className="mr-2" size={20} />
              <span className="text-center"> Contact Us : 01923510520</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex text-white justify-between px-5 items-center">
        <div className="flex gap-5 py-3">
          <p className="hover:text-yellow-500 text-sm cursor-pointer">
            {" "}
            <a href="/termsAndConditions">TERMS & CONDITIONS</a>
          </p>

          <p className="hover:text-yellow-500 text-sm cursor-pointer">
            {" "}
            <a href="/refundPolicy">Refund Policy</a>
          </p>
        </div>
        <div className="flex justify-center  items-center gap-5 m-2">
          <a
            href="https://www.facebook.com/HotHousePizzaNorthwood"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500"
          >
            <FiFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/hothousepizzanorthwood"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500"
          >
            <SlSocialInstagram size={24} />
          </a>
          <a
            href="https://wa.me/+447469367116"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500"
          >
            <SiWhatsapp size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
