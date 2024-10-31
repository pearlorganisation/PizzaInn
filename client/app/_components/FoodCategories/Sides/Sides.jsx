import React, { useState } from "react";
import useSWR from "swr";

import SidesCards from "./SidesCards/SidesCards";
import { ClockLoader } from "react-spinners";
import Image from "next/image";

// -------------------data fetching function-----------------------
const pizzaFetcher = (...args) => fetch(...args).then((res) => res.json());

const Sides = () => {
  // -------------------------------------------useState--------------------------------------------
  const [selectedType, setSelectedType] = useState("All");

  // =-------------------------data fetching---------------------------

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sides`,
    pizzaFetcher
  );

  // ---------------fetch filter---------------------------
  const {
    data: filterData,
    error: filterError,
    isLoading: filterLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sides/filter`,
    pizzaFetcher
  );

  // -----------------category fetcher------------------------------------------
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sides/category`,
    pizzaFetcher
  );

  const categories = [];
  categoryData &&
    categoryData?.data?.map((data) => categories.push(data?.category));

  if (error || filterError) {
    return (
      <div className="h-screen text-[#c80f2e] text-center text-3xl md:text-5xl font-bold">
        Sorry, Failed to load...
      </div>
    );
  }
  if (isLoading || filterLoading) {
    return (
      <div className="flex justify-center pt-[25vh] h-[85vh]">
        {/* <ClockLoader color="#991b1b" size={100} /> */}
        <Image src="/HOTPIZZALOGO.jpg" alt="Pizza Logo"  width={300} height={300} className="h-[10vh] w-[30vw]  object-contain" />
      </div>
    );
  }

  const hasMatchingSides = categories.some((category) => {
    return data?.data?.some(
      (side) =>
        side.category?.category === category &&
        (selectedType === side?.filter?.filter || selectedType === "All")
    );
  });

  return (
    <div className="my-4">
      <div>
        <div className="flex gap-2 mx-4 md:mx-8 my-4 flex-wrap ">
          <span className="font-bold">Filter :</span>
          {filterData?.data?.map((data) => (
         <div className="flex gap-2" key={data.filter}>
         <label className="radio-label flex items-center gap-2 cursor-pointer">
           <input
             type="radio"
             name="type"
             value={data.filter}
             id={data.filter}
             defaultChecked={data.filter === "All"}
             onClick={() => setSelectedType(data.filter)}
             className="radio-input hidden peer"
           />
           <span
             className={`custom-radio w-5 h-5 rounded-full border-2 border-gray-500 relative p-1 // Added padding
               peer-checked:border-yellow-500 peer-checked:bg-yellow-300`}
           >
             <span
               className={`absolute w-2.5 h-2.5 bg-yellow-500 rounded-full p-6  opacity-0 
                 transition-opacity duration-200 peer-checked:opacity-100 top-1/2 left-1/2 
                 transform -translate-x-1/3 -translate-y-1/4`} // Kept inner circle positioning
             ></span>
           </span>
           <span className="text-gray-800 text-sm font-normal">{data.filter}</span>
         </label>
       </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto">
        {!hasMatchingSides ? (
          <div className="text-center text-[#c80f2e]h-[80vh] pt-[25vh] font-bold text-3xl">
             Sorry, No Sides found
          </div>
        ) : (
          categories.map((category) => {
            const isCategoryMatched = data?.data?.some(
              (side) =>
                side.category?.category === category &&
                (selectedType === side?.filter?.filter || selectedType === "All")
            );
            return (
              <React.Fragment key={category}>
                {isCategoryMatched && (
                  <div className="flex items-center justify-center mb-2 p-5">
                      {/* <div className={`flex-grow border-t ${category === "VEGETARIAN" || category === "Vegetarian" ? "border-green-800": "border-[#c80f2e]"} `}></div>
                      <h1 className={`px-4 ${category === "VEGETARIAN" || category === "Vegetarian" ? "text-green-800": "text-[#c80f2e]"}  font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl`}>
                      {category}
                    </h1>
                    <div className={`flex-grow border-t ${category === "VEGETARIAN" || category === "Vegetarian" ? "border-green-800": "border-[#c80f2e]"} `}></div> */}
                       <div className="flex items-center justify-center align-middle ">
                
                <div
className={`w-[400px] h-[90px] flex items-center justify-center font-bold text-black text-center text-xl ${
category === "VEGETARIAN" || category === "meat" 
? "text-white bg-green-500" 
: "bg-red-600"
}`}
style={{
// background: "#15803D", 
clipPath: "polygon(10% 20%, 80% 20%, 70% 50%, 80% 80%, 10% 80%, 20% 50%)"
}}
>
<span className="text-white mr-10">{category}</span> {/* Removed ml-6 */}

</div>
            {/* <div className={`flex-grow border-t ${category === "VEGETARIAN" || category === "Vegetarian" ? "": "border-[#c80f2e]"} `}></div> */}
          </div>
                  </div>
                )}

                <div className="flex gap-12 flex-wrap justify-center">
                  {data?.data &&
                    data?.data.map((side, idx) => {
                      if (
                        side.category?.category === category &&
                        (selectedType === side?.filter?.filter ||
                          selectedType === "All")
                      ) {
                        return (
                          <SidesCards
                            data={side}
                            key={idx}
                          />
                        );
                      }
                      return null;
                    })}
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sides;
