"use client";
import DealsCards from "@/app/_components/Pages/DealsCards";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { ClockLoader } from "react-spinners";


async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/deals`);
    const data = await res.json();
    return data.data; // Assuming `data` has a `data` property containing the actual deals
  } catch (err) {
    console.log("Error Occurred", err);
    return null;
  }
}


const Deals = () => {
  const [dealData, setDealData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setDealData(data);
    }
    fetchData();
  }, []);

  if (!dealData)
    return (
      <div className="flex justify-center pt-[25vh] h-[85vh] ">
        <Image src="/HOTPIZZALOGO.jpg" alt="Pizza Logo"  width={300} height={300} className="h-[10vh] w-[30vw]  object-contain" />
      </div>
    );

  return (
    <>
      <div className=" mx-auto container pb-10 px-2">
        <div className=" px-10 pt-5 ">
          <header class="text-center  bg-white">
            <div className="flex items-center justify-center mb-2">
            <div class="flex-grow border-t border-[#c80f2e]"></div>
            <h1
  className="px-8 bg-[#c80f2e] py-6 text-white rounded-lg text-base sm:text-xl md:text-2xl lg:text-3xl transition-transform duration-500 ease-in-out transform scale-100 animate-fade-in"
  style={{
    clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
  }}
>
  Top Hot Deals
</h1>

            <div class="flex-grow border-t border-[#c80f2e]"></div>
            </div>
          </header>
        </div>

        <div className="p-8 gap-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   place-content-center">
          {Array.isArray(dealData) &&
            dealData.map((el, index) => <DealsCards data={el} key={index} />)}
        </div>
      </div>
    </>
  );
};

export default Deals;
