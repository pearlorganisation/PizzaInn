"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { PiBagLight } from "react-icons/pi";
import { RiRefreshFill } from "react-icons/ri";
import logo from "../../../_assets/images/image.png";
import { categoryEnum } from "@/app/utils/utils";
import { useAppSelector } from "@/app/lib/hooks";
import { SiWhatsapp } from "react-icons/si";
import { GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import { MdOutlineShoppingBasket } from "react-icons/md";

const Header = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const cart = useAppSelector((state) => state.cart.cartData);
  const { userData, isUserLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalPrice = cart?.reduce(
    (acc, item) => acc + Number(item?.totalSum),
    0
  );

  if (!isMounted) {
    return null; // Render nothing until the component has mounted
  }

  return (
    <div className="bg-white z-10 shadow-lg fixed top-0 left-0 w-full ">
      <div className="flex justify-between items-center px-5 py-1 ">
        <Link href="/" className="flex justify-center">
          <Image src={logo} className="bg-white md:w-32 h-full w-10" alt="logo" />
        </Link>
        <ul className=" flex gap-2 items-center">
          {isUserLoggedIn ? (
            <Link href="/profile?tab=1">
              <p className="flex items-center gap-2 text-green-950">
                <GoPerson className="md:h-8 md:w-8 w-6 h-6 text-[#c80f2e] cursor-pointer" />
                <span className="text-[#c80f2e] text-sm md:text-lg font-semibold tracking-wide">
                  {userData?.firstName[0]}.{userData?.lastName}
                </span>
              </p>
            </Link>
          ) : (
            <li className="px-2 py-1 font-semibold  rounded-md flex items-center text-xs md:text-lg">
              {/* <Link href="/login">Login / Signup</Link> */}

              <GoPerson
                onClick={() => router.push("/login")}
                className="md:h-8 md:w-8 w-6 h-6 text-[#c80f2e] cursor-pointer"
              />
            </li>
          )}
          <Link
            href="/order/cart"
            className="flex gap-2 items-center text-base md:text-lg"
          >
            <CiShoppingCart  className="text-[#c80f2e] md:h-8 md:w-8 w-5 h-5" />
            <span className="border border-[#c80f2e] text-sm md:text-lg text-[#c80f2e] rounded-full px-[8px] md:px-[10px] py-[1px] mx-2">
              {cart?.length}
            </span>
            <span className="text-[#c80f2e] font-semibold">
              <span className="text-sm md:text-lg">£ </span>
              {totalPrice?.toFixed(2)}
            </span>
          </Link>
        </ul>
      </div>

      <div className=" bg-[#08579c] sm:justify-center flex lg:pt-0 items-center gap-5 justify-between px-5 flex-nowrap overflow-x-auto no-scrollbar  text-base sm:text-lg text-white font-semibold xl:gap-10">
        <div
          className={`py-2 px-1 lg:px-5 lg:h-[56px] flex items-center text-white transition duration-300 font-bold ${
            selectedItem === -1
              ? "bg-[#c80f2e] text-white hover:text-white"
              : " hover:text-[#c80f2e]"
          }`}
          onClick={() => {
            router.push("/menu/deals");
            setSelectedItem(-1);
          }}
        >
          Deals
        </div>
        {Array.isArray(categoryEnum) &&
          categoryEnum.map((data, idx) => (
            <div
              key={idx}
              className={`px-1 lg:px-5 py-2 lg:h-[56px] flex items-center text-white transition duration-300 font-bold ${
                selectedItem === idx
                  ? "bg-[#c80f2e] text-white hover:text-white"
                  : "  hover:text-[#c80f2e]"
              }`}
              onClick={() => {
                router.push(`/menu/${data?.toLowerCase()}`);
                setSelectedItem(idx);
              }}
            >
              {data.slice(0, 1)}
              {data.slice(1).toLowerCase()}
            </div>
          ))}
      </div>
      <div className="hidden w-full  md:flex absolute top-96 right-0 md:justify-end gap-[2px] md:gap-1 p-2 md:p-0">
  <a
    href="https://wa.me/+447469367116"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center  text-white py-2 px-4 text-base rounded-b-md  "
  >
    <SiWhatsapp className='bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 cursor-pointer' size={50} />
    <span className="ml-2"></span>
  </a>
  <a
    href="/profile?tab=3"
    className="inline-flex items-center  text-white text-base rounded-b-md "
  >
    <RiRefreshFill size={50} className='transition duration-300 cursor-pointer bg-[#c80f2e]  text-white p-3 rounded-full '/> 
    <span className="ml-2"></span>
  </a>
</div>

<div className="md:hidden flex justify-center">
  <a
    href="https://wa.me/+447469367116"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full border-r border-r-white justify-center inline-flex items-center bg-[#b9d3eb] text-white py-2 px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-white hover:text-[#c80f2e]"
  >
    <SiWhatsapp size={22} />
    <span className="pl-2 text-sm">Whatsapp</span>
  </a>
  <a
    href="/profile?tab=3"
    className="w-full border-r border-r-white justify-center inline-flex items-center bg-white text-[#c80f2e]  py-2 px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-[#c80f2e] hover:text-white"
  >
    <RiRefreshFill size={25} />
    <span className="pl-2 text-sm">Reorder Now</span>
  </a>
</div>

    </div>
  );
};

export default Header;

// {/* Mobile */}
// <div className="flex justify-between items-center mx-1 md:mx-4">
//   <Link href="/" className="flex justify-center">
//     <Image
//       src={logo}
//       className="bg-white lg:hidden"
//       alt="logo"
//       width={40}
//     />
//   </Link>
//   <ul className="lg:hidden flex gap-2 items-center">
//     {isUserLoggedIn ? (
//       <Link href="/profile?tab=1">
//         <p className="flex items-center gap-2 text-green-950">
//           <GoPerson
//             size={20}
//             className="text-slate-700"
//             aria-label="User Profile"
//           />
//           <span className="text-[#c80f2e] text-sm font-semibold tracking-wide">
//             {userData?.firstName[0]}.{userData?.lastName}
//           </span>
//         </p>
//       </Link>
//     ) : (
//       <li className="px-2 py-1 text-white font-semibold bg-[#c80f2e] rounded-md flex items-center text-xs">
//         <Link href="/login">Login / Signup</Link>
//       </li>
//     )}
//     <Link href="/order/cart" className="flex items-center text-base">
//       <FaBagShopping
//         size={22}
//         className="text-slate-700"
//         aria-label="Cart"
//       />
//       <span className="bg-[#c80f2e] text-sm text-white rounded-full px-[6px] py-[1px] mx-2">
//         {cart?.length}
//       </span>
//       <span className="text-[#c80f2e] font-semibold">
//         <span className="text-sm">£ </span>
//         {totalPrice?.toFixed(2)}
//       </span>
//     </Link>
//   </ul>
// </div>

// {/* Desktop */}
// <div className="bg-white flex flex-col lg:flex-row justify-between lg:items-center lg:px-10">
//   <Link
//     href="/"
//     className="hidden lg:flex lg:flex-col justify-center h-full"
//   >
//     <Image
//       src={logo}
//       className="bg-white hidden lg:block"
//       alt="logo"
//       width={80}
//       height={80}
//     />
//   </Link>
// <ul className="flex lg:pt-0 flex-wrap items-center justify-around text-base sm:text-lg text-white font-semibold xl:gap-10">
//   <Link href="/menu/deals">
//     <li
//       className={`py-2 px-1 mt-2 lg:mt-0 lg:px-5 lg:h-[56px] flex items-center text-green-800 transition duration-300 font-bold ${
//         selectedItem === -1
//           ? "bg-[#c80f2e] text-white hover:text-white"
//           : "bg-white hover:shadow-[0_4px#991b1b] hover:text-[#991b1b]"
//       }`}
//       onClick={() => setSelectedItem(-1)}
//     >
//       Deals
//     </li>
//   </Link>
//   {Array.isArray(categoryEnum) &&
//     categoryEnum.map((data, idx) => (
//       <Link href={`/menu/${data?.toLowerCase()}`} key={idx}>
//         <li
//           className={`px-1  mt-2 lg:mt-0 lg:px-5 py-2 lg:h-[56px] flex items-center text-green-800 transition duration-300 font-bold ${
//             selectedItem === idx
//               ? "bg-[#c80f2e] text-white hover:text-white"
//               : "bg-white hover:shadow-[0_4px#991b1b] hover:text-[#991b1b]"
//           }`}
//           onClick={() => setSelectedItem(idx)}
//         >
//           {data.slice(0, 1)}
//           {data.slice(1).toLowerCase()}
//         </li>
//       </Link>
//     ))}
// </ul>
//   <div className="flex items-center gap-5">
//     {isUserLoggedIn ? (
//       <Link
//         href="/profile?tab=1"
//         className="hidden lg:flex items-center gap-2 text-black"
//       >
//         <CiUser size={25} aria-label="User Profile" />
//         <span className="text-base text-[#c80f2e] hover:text-red-700 hover:font-bold tracking-wide">
//           {userData?.firstName[0]}.{userData?.lastName}
//         </span>
//       </Link>
//     ) : (
//       <li className="hidden lg:flex px-2 font-normal hover:bg-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md hover:text-[#c80f2e] text-white bg-[#c80f2e] items-center text-lg">
//         <Link href="/login">Login / Signup</Link>
//       </li>
//     )}
//     <Link
//       href="/order/cart"
//       className="hidden text-black lg:flex items-center text-lg"
//     >
//       <PiBagLight size={25} aria-label="Cart" />
//       <span className="bg-[#c80f2e] hover:bg-red-700 text-white rounded-full px-2 mx-2">
//         {cart?.length}
//       </span>
//       <span className="text-[#c80f2e] hover:text-red-700 hover:font-bold">
//         £ {totalPrice?.toFixed(2)}
//       </span>
//     </Link>
//   </div>
// </div>

