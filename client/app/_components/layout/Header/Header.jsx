"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CiShoppingCart} from "react-icons/ci";
import { TiArrowRepeatOutline } from "react-icons/ti";
import logo from "../../../_assets/images/image2.png";
import { categoryEnum } from "@/app/utils/utils";
import { useAppSelector } from "@/app/lib/hooks";
import { SiWhatsapp } from "react-icons/si";
import { GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Header = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const cart = useAppSelector((state) => state.cart.cartData);
  const { userData, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(-1);

  const checkScrollOverflow = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show/hide arrows based on scrollable content
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };


  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Initial check on mount
    checkScrollOverflow();
    // Add event listener for when the user scrolls manually
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScrollOverflow);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", checkScrollOverflow);
      }
    };
  }, []);

  const totalPrice = cart?.reduce(
    (acc, item) => acc + Number(item?.totalSum),
    0
  );

  if (!isMounted) {
    return null; // Render nothing until the component has mounted
  }

  return (
    <div className="bg-white z-10 fixed top-0 left-0 w-full ">
      <div className="flex bg-[#DE1718] justify-between items-center px-0 md:px-5 py-1 ">
        <Link href="/" className="flex justify-center">
          <Image src={logo} className=" bg-white  md:w-full md:h-12 h-10 w-full " alt="logo" />

        </Link>
        <ul className=" flex gap-2 items-center">
          {isUserLoggedIn ? (
           <> 
           
  <div className="relative  inline-flex items-center">
  <a
  href="/profile?tab=3"
  className="md:inline-flex p-2 hidden   items-center text-white text-base "
>
    <TiArrowRepeatOutline
      size={35}
      className=' text-white rounded-lg  transition duration-300 cursor-pointer  '
    /> <span className="ps-2 font-semibold text-lg"> Reorder Now</span> </a>
  </div>
           <Link href="/profile?tab=1">
              <p className="flex items-center gap-2 text-green-950">
                <GoPerson className="md:h-8 md:w-8 w-6 h-6 text-white cursor-pointer" />
                <span className="text-white capitalize text-sm md:text-lg font-semibold tracking-wide">
                  {userData?.firstName[0]}.{userData?.lastName}
                </span>
              </p>
            </Link>
            </>
          ) : (
            <li className="px-2 py-1 font-semibold  text-white bg-[#DE1718] rounded-lg flex items-center text-xs md:text-lg">
              <Link href="/login">Login / Signup</Link>
            </li>
          )}
          <Link
            href="/order/cart"
            className="flex gap-2  items-center text-base md:text-lg"
          >
            <CiShoppingCart size={45}  className="text-white" />
            <span className="absolute  text-sm md:text-lg text-white px-[12.5px] md:px-[12.5px] py-[1px] mx-2">
              {cart?.length}
            </span>
            <span className="text-white font-semibold">
              <span className="text-sm md:text-lg">£ </span>
              {totalPrice?.toFixed(2)}
            </span>
          </Link>
        </ul>
      </div>
<div   className="flex  justify-center">
      <div ref={scrollRef} className=" bg-[#08579c]  md:rounded-b-lg w-full md:w-fit sm:justify-center flex lg:pt-0 items-center gap-5 justify-between px-5 flex-nowrap overflow-x-auto no-scrollbar  text-base sm:text-lg text-white font-semibold xl:gap-10">
        {/* Left Arrow */}
      {showLeftArrow && (
           <div
           className="absolute sm:hidden left-0 text-gray-200 rounded-full shadow-lg z-10"
    
         >
         <IoIosArrowBack size={25}/>
         </div>
   
      )}
       <div
          className={`py-2 px-1 lg:px-5 lg:h-[56px] cursor-pointer flex items-center text-white transition duration-300 font-bold ${
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
              className={`px-1 lg:px-5 py-2 cursor-pointer lg:h-[56px] flex items-center text-white transition duration-300 font-bold ${
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
             {/* Right Arrow */}
      {showRightArrow && (
        <div
          className="absolute right-0 sm:hidden text-gray-200 rounded-full shadow-lg z-10"
        >
           <IoIosArrowForward size={25}/>
        </div>
      )}
      </div>
      </div>
      <div className="hidden w-full md:flex  right-0  gap-[2px] md:gap-1 p-2 md:p-0 bottom-20  fixed ">
  <a
    href="https://wa.me/+447469367116"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center text-white py-2 px-4 text-base rounded-b-md"
  >
   <div className="fixed bottom-0 left-0 right-0 w-fit p-4 ">
  <div className="relative  inline-flex items-center ">
    <SiWhatsapp 
      className='bg-[#32D851] text-white p-2 rounded-lg shadow-lg transition duration-300 cursor-pointer group-hover:bg-white-600'
      size={50}
    />
  </div>

  {/* <div className="relative  inline-flex items-center">
  <a
  href="/profile?tab=3"
  className="inline-flex items-center text-white text-base rounded-b-md"
>
    <TiArrowRepeatOutline
      size={50}
      className='bg-[#08579c] text-white p-2 rounded-lg  transition duration-300 cursor-pointer  shadow-lg hover:shadow-xl'
    />  </a>
  </div> */}
</div>

  <span className="ml-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Order Now</span>
</a>

</div>

<div className="md:hidden flex justify-center">
  <a
    href="https://wa.me/+447469367116"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full border-r border-r-white justify-center inline-flex items-center bg-green-600 text-white py-2 px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
  >
    <SiWhatsapp size={22} />
    <span className="pl-2 text-sm">Whatsapp</span>
  </a>
  <a
    href="/profile?tab=3"
    className="w-full border-r border-r-white justify-center inline-flex items-center bg-white text-[#08579c] py-2 px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-[#c80f2e] hover:text-white"
  >
    <TiArrowRepeatOutline size={25} />
    <span className="pl-2 text-sm font-bold">Reorder Now</span>
  </a>
</div>

    </div>
  );
};

export default Header;


