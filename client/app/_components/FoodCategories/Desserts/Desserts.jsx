import React, { useState } from "react";
import useSWR from "swr";
import DessertCards from "./DessertCard/DessertCards";
import { ClockLoader } from "react-spinners";
import Image from "next/image";

// -------------------data fetching function-----------------------
const pizzaFetcher = (...args) => fetch(...args).then((res) => res.json());

const Desserts = () => {
  // -------------------------------------------useState--------------------------------------------
  const [selectedType, setSelectedType] = useState("All");
  const [isStorePopUpVisible, setIsStorePopUpVisible] = useState(false);

  // =-------------------------data fetching---------------------------

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dessert`,
    pizzaFetcher
  );

  // ---------------fetch filter---------------------------
  const {
    data: filterData,
    error: filterError,
    isLoading: filterLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dessert/filter`,
    pizzaFetcher
  );

  // -----------------category fetcher------------------------------------------
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dessert/category`,
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

  const hasMatchingDesserts = categories.some((category) => {
    return data?.data?.some(
      (dessert) =>
        dessert.category?.category === category &&
        (selectedType === dessert?.filter?.filter || selectedType === "All")
    );
  });

  return (
    <div className="mb-10">
      <div>
        <div className="flex gap-2 mx-4 md:mx-8 my-4 flex-wrap ">
          <span className="font-bold">Filter :</span>
          {filterData?.data?.map((data) => (
            <div className="flex gap-2" key={data.filter}>
              <input
                type="radio"
                name="type"
                value={data.filter}
                id={data.filter}
                defaultChecked={data.filter === "All"}
                onClick={() => setSelectedType(data.filter)}
              />
              <label htmlFor={data.filter}>{data.filter}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto">
        {!hasMatchingDesserts ? (
          <div className="text-center text-[#c80f2e] h-[80vh] pt-[25vh] font-bold text-3xl">
            Sorry, No Dessert found
          </div>
        ) : (
          categories.map((category) => {
            const isCategoryMatched = data?.data?.some(
              (dessert) =>
                dessert.category?.category === category &&
                (selectedType === dessert?.filter?.filter || selectedType === "All")
            );
            return (
              <React.Fragment key={category}>
                {isCategoryMatched && (
                  <div className="flex items-center justify-center mb-2 p-5">
                    {/* <div className="flex-grow border-t border-[#c80f2e] "></div>
                    <h1 className="px-4 text-[#c80f2e] 0 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      {category}
                    </h1>
                    <div className="flex-grow border-t border-[#c80f2e] "></div> */}
                    <div
  className="w-[400px] h-[90px] flex items-center justify-center font-bold text-black text-center text-xl" // Reduced size and font
  style={{
    background: "#c80f2e", 
    // clipPath: "polygon(10% 30%, 87% 20%, 70% 50%, 89% 80%, 10% 80%, 30% 50%)", // Keep the same clipPath

      // background: "#15803D", 
      clipPath: "polygon(10% 20%, 80% 20%, 70% 50%, 80% 80%, 10% 80%, 20% 50%)",
   overflow: "hidden", 
    padding: "0px", }}
>
  <span className="text-white mr-10">{category}</span> {/* Removed ml-6 */}
</div>
                  </div>
                )}

                <div className="flex gap-12 flex-wrap justify-center">
                  {data?.data &&
                    data?.data.map((dessert, idx) => {
                      if (
                        dessert.category?.category === category &&
                        (selectedType === dessert?.filter?.filter || selectedType === "All")
                      ) {
                        return <DessertCards data={dessert} key={idx} />;
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

export default Desserts;
