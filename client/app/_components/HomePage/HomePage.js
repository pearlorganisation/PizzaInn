"use client";

import {  Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import pizza2 from "../../_assets/images/pizza1.jpg"
import pizza1 from "../../_assets/images/pizza2.jpeg"
import pizza3 from "../../_assets/images/pizza3.webp"
import pizza4 from "../../_assets/images/pizza4.webp"
import Image from "next/image";
import DealsCards from "../Pages/DealsCards";
import { ClockLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { trackerStatus } from "@/app/lib/features/orderDetails/orderDetailsslice";
import Link from "next/link";

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/deals?isPopular=true`);
    const data = await res.json();
    return data.data; // Assuming `data` has a `data` property containing the actual deals
  } catch (err) {
    console.log("Error Occurred", err);
    return null;
  }
}
async function getBanners(){
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/banner`)
    const data = await res.json();
    return data.data
  } catch (error) {
    console.log("Error Occurred in banner api", err);
    return null;
  }
}

const HomePage = () => {
  

  const img = [
    pizza1,
    pizza2,
    pizza3,
    pizza4
  ];
  const dispatch = useDispatch()
  
    const [popularDealData, setPopularDealData] = useState(null);
    const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setPopularDealData(data);
    }
    async function bannerData(){
      const data = await getBanners();
      setBanner(data)
    }
    dispatch(trackerStatus(false))
    fetchData();
    bannerData()
  }, []);

  console.log(banner)

  return (
    <>
      <div className="w-full">
      <Swiper
      className="z-55 "
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        
        modules={[Pagination]}
      >
        {banner?.map((el, i) => {
            return (
              <SwiperSlide className="pb-8" key={i} >
             { el?.deal?._id ? <Link href={{
              pathname: `menu/deals/deals_view`,
              query: { card_id: el?.deal?._id, size_id: el?.deal?.sizes[0]?._id  },
            }}>
                <Image width={2500} height={1000}  src={el?.banner} alt="Deals Banner" className="h-full mx-auto w-full lg:w-[70%] xl:w-[90%] sm:h-fit md:[30vh] md:h-fit xl:h-[50vh] 2xl:w-[60%] 2xl:h-[40vh] rounded-xl " />
                </Link>
                :
                <Image width={2500} height={1000}  src={el?.banner} alt="Deals Banner" className="h-full mx-auto w-full lg:w-[70%] xl:w-[90%] sm:h-fit md:[30vh] md:h-fit xl:h-[50vh] 2xl:w-[60%] 2xl:h-[40vh] rounded-xl  " />}
       
              </SwiperSlide>
            );
          })}
      </Swiper>
      </div>
      <>
      <div className="mx-auto container max-w-7xl px-5 lg:px-10">
        <header class="text-center pb-10  bg-white">
          <div class="flex items-center justify-center my-2">
            {/* <div class="flex-grow border-t border-red-800"></div> */}

            {/* <div class="flex-grow border-t border-red-800"></div> */}
          </div>

          <div class="flex items-center justify-center">
            {/* <div class="flex-grow border-t border-red-800"></div> */}
            <h1 className="px-6 bg-red-800 py-6 text-white rounded-lg text-base sm:text-xl md:text-2xl lg:text-3xl transition-transform duration-500 ease-in-out transform scale-100 hover:scale-105 animate-fade-in">
            Top Hot Deals
            </h1>
            {/* <div class="flex-grow border-t border-red-800"></div> */}
         
          </div>
             
          {/* <div class="flex-grow border-t border-red-800"></div> */}
        </header>
      </div>

      {popularDealData ? (
      <div className="flex gap-8 mb-10 flex-wrap justify-center">
        {Array.isArray(popularDealData) &&
          popularDealData.map((el) => (
            <DealsCards key={el.id} path={"menu"} data={el} />
          ))}
      </div>
    ) : (
      <div className="flex item-center justify-center pt-[25vh] h-[85vh] ">
        {/* <ClockLoader color="#991b1b" size={100} className="border"/> */}
        <Image src="/HOTPIZZALOGO.jpg" alt="Pizza Logo"  width={300} height={300} className="h-[10vh] w-[30vw]  object-contain" />
      </div>
    )}
    </>
    </>
  );
};

export default HomePage;
