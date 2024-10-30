import React, {  useId, useState } from "react";
import useSWR from "swr";
import PizzaCards from "./pizzaCards/PizzaCards";
import { ClockLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearSet } from "@/app/lib/features/cartSlice/cartSlice";
import { getCustomizationDetails } from "@/app/lib/features/orderDetails/orderDetailsslice";
import { VscActivateBreakpoints } from "react-icons/vsc";

// -------------------data fetching function-----------------------
const pizzaFetcher = (...args) => fetch(...args).then((res) => res.json());

const Pizzas = () => {

  const randomId = useId()
  const dispatch = useDispatch();
  // -------------------------------------------useState--------------------------------------------
  const [selectedType, setSelectedType] = useState("All");

  // =-------------------------data fetching---------------------------

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/pizza`,
    pizzaFetcher
  );

  // ---------------fetch filter---------------------------
  const {
    data: filterData,
    error: filterError,
    isLoading: filterLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/pizza/filter`,
    pizzaFetcher
  );

  // -----------------category fetcher------------------------------------------
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/pizza/category`,
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

  const hasMatchingPizzas = categories.some((category) => {
    return data?.data?.some(
      (pizza) =>
        pizza.category?.category === category &&
        (selectedType === pizza?.filter?.filter || selectedType === "All")
    );
  });

  console.log(data?.data,data?.data[0]?.priceSection[0]?.size?._id,"adsdd")

  return (
    <div className="my-4">
      <div>
        <div className="flex   gap-3  justify-between items-center md:mx-8 lg:mx-12">
          <div className="hidden md:flex gap-3">
            {" "}
            <Link onClick={()=>
                   {    dispatch(
                        getCustomizationDetails({
                          name: "Create Your Own Pizza",
                          img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1728298580/egnskniwajhlos4u7mu4.png",
                          priceSection: data?.data[0]?.priceSection,
                          id: randomId,
                          sauceName: [],
                          cheeseName: [],
                          vegetarianToppingsName: [],
                          meatToppingsName: [],
                          baseName: data?.data[0]?.baseName,
                          selectedData: data?.data[0]?.priceSection[0]?.size?._id,
                        })
                      );}
            }  href={"product/customisePizza?calledBy=createYourOwnPizza"} className="cursor-pointer bg-[#c80f2e] hover:bg-[#c80f2e] px-3 py-2 text-white rounded-md">
              Create Your Own Pizza
            </Link>
            <Link href={"halfAndHalfPizza?calledBy=half"} className="bg-[#08579c] px-3 py-2 text-white rounded-md">
              Half & Half Pizza
            </Link>
          </div>
          <div className="w-[50%] ps-2 md:hidden space-y-5">
            {" "}
            <Link href={"product/customisePizza?calledBy=createYourOwnPizza"} className="bg-[#c80f2e] px-3 py-2 text-white rounded-md">
              Create Your Own Pizza
            </Link>
            <Link href={"halfAndHalfPizza?calledBy=half"} className="bg-blue-800 px-3 py-2 text-white rounded-md">
              Half & Half Pizza
            </Link>
          </div>

          <div className="flex w-[50%] ps-5 md:w-auto  gap-2 md:mx-8 my-4 flex-wrap ">
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
      </div>
      <div className="container mx-auto">
        {!hasMatchingPizzas ? (
          <div className="text-center text-[#c80f2e] h-[80vh] pt-[25vh] font-bold text-3xl">
            Sorry, No Pizza found
          </div>
        ) : (
          categories.map((category) => {
            const isCategoryMatched = data?.data?.some(
              (pizza) =>
                pizza.category?.category === category &&
                (selectedType === pizza?.filter?.filter ||
                  selectedType === "All")
            );
            console.log(category)
            return (
              <React.Fragment key={category}>
                {isCategoryMatched && (
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
                )}

                <div className="flex gap-11 flex-wrap justify-center">
                  {data?.data &&
                    data.data.map((pizza, idx) => {
                      if (
                        pizza.category?.category === category &&
                        (selectedType === pizza?.filter?.filter ||
                          selectedType === "All")
                      ) {
                        return <PizzaCards data={pizza} key={idx} />;
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

export default Pizzas;
