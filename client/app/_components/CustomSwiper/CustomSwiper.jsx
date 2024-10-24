"use client";
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

const CustomSwiper = () => {

    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = [
        "Design",
        "Photography",
        "Red",
        "Tree",
        "Background",
        "Plant",
        "Hanging",
        "Defocused",
      ];
    
  return (
   <div className="relative w-full ">
        {/* Custom Left Button */}


        {activeIndex === 0 ? null : (
          <button
            onClick={() => {
              if (swiperRef.current && swiperRef.current.swiper) {
                setActiveIndex(swiperRef.current.swiper?.activeIndex);
                swiperRef.current.swiper.slidePrev();
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2  h-[2.8rem] bg-gradient-to-l to-white/30 backdrop-blur-[2px] from-white w-12 flex justify-center items-center text-gray-700  z-10"
          >
            &#10094;
          </button>
        )}


        {/* Custom Right Button */}
        {true? null : (
          <button
            onClick={() => {
              if (swiperRef.current && swiperRef.current.swiper) {
                console.log(swiperRef.current.swiper);
                setActiveIndex(swiperRef.current.swiper?.activeIndex);
                swiperRef.current.swiper.slideNext();
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2   h-[2.8rem] bg-gradient-to-l to-white/30 backdrop-blur-[2px] from-white w-12 flex justify-center items-center text-gray-700  z-10"
          >
            &#10095;
          </button>
        )}


        <Swiper
          ref={swiperRef}
          className="py-4"
          spaceBetween={10}
          slidesPerView={5}
        >
          {categories?.map((brand, index) => (
            <SwiperSlide className=" !w-auto">
              <div
                onClick={() => {
                  setSelectedBrand(brand?._id);
                  handleBrands(brand?._id);
                }}
                className="border border-gray-300 rounded-lg text-nowrap w-auto px-4 py-2 text-center text-gray-600 hover:bg-gray-100 cursor-pointer transition"
              >
                {brand?.brand}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

  )
}

export default CustomSwiper