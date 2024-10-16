import React from "react";

import { SlSocialInstagram } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="h-full bg-red-800 py-4">
      <div className="grid md:grid-cols-3   justify-center   text-white">
        <div>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-lg ">MENU</h1>
            <p className="hover:text-yellow-500 text-sm">
              {" "}
              <a href="/menu/pizzas">Pizza</a>
            </p>
            <p className="hover:text-yellow-500 text-sm">
              {" "}
              <a href="/menu/sides">Sides</a>
            </p>
            <p className="hover:text-yellow-500 text-sm">
              {" "}
              <a href="/menu/drinks">Drinks</a>
            </p>
            <p className="hover:text-yellow-500 text-sm">
              {" "}
              <a href="/menu/desserts">Desserts</a>
            </p>
            <p className="hover:text-yellow-500 text-sm">
              {" "}
              <a href="/menu/dips">Dips</a>
            </p>
          </div>
          <div className="hidden md:flex justify-center m-3">
            <hr className="border border-white w-[300px] h-[4px]  " />
          </div>
          <div>
            <div className="flex gap-2 justify-center text-sm pt-1 lg:text-base ">
              <p className="hover:hover:text-yellow-500">
                <a href="/menu/deals">
                  Deals <sup className="">*</sup>
                </a>
              </p>
            
            </div>

          
          </div>
        </div>



        <div className="flex   flex-col gap-2 items-center ">
        <div className="md:hidden flex justify-center  m-4">
            <hr className=" border border-white w-[300px] h-[4px]  " />
          </div>
          <h1 className="font-bold text-lg">SOCIAL LINKS</h1>

          <div className="flex justify-center  items-center gap-5 m-2">
           
            <a href="https://www.facebook.com/HotHousePizzaNorthwood" target="_blank" rel="noopener noreferrer"  className="hover:text-yellow-500">
              <FiFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/hothousepizzanorthwood" target="_blank" rel="noopener noreferrer"  className="hover:text-yellow-500">
              <SlSocialInstagram size={24} />
            </a>
            <a href="https://wa.me/+447469367116" target="_blank" rel="noopener noreferrer"  className="hover:text-yellow-500">
              <SiWhatsapp size={24} />
            </a>
           
          </div>
          
        </div>
        <div className="flex   flex-col gap-2 items-center justify-between ">
        <div className="md:hidden flex justify-center  m-4">
            <hr className="border border-white w-[300px] h-[4px]  " />
          </div>
          <div className="text-center space-y-[8px]">
          <h1 className="font-bold text-lg">POLICIES</h1>

          <p className="hover:text-yellow-500 text-sm cursor-pointer">
            {" "}
            <a href="/termsAndConditions">TERMS & CONDITIONS</a>
          </p>
        
          <p className="hover:text-yellow-500 text-sm cursor-pointer">
            {" "}
            <a href="/refundPolicy">Refund Policy</a>
          </p>
          </div>
               <div className="mt-4 flex flex-col justify-center items-center">
                <p className="flex justify-center  mt-2 mx-3 ">
                  <FaStore  className="mr-2" size={20} />
                 <span className=" text-center">Store : 91 Joel St, Pinner, Northwood HA6 1LW, UK</span> 
                </p>
                <p className="flex items-center mt-2">
                  <IoMdMail  className="mr-2" size={20} />
                  <span className="text-center">Email : Hothousenorthwood@gmail.com</span>
                  
                </p>
                <p className="flex items-center mt-2">
                  <FaPhone className="mr-2" size={20} />
                  <span className="text-center">  Contact Us : 01923510520</span>
              
                </p>
        
     
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
