import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/lib/features/cartSlice/cartSlice";
import AddedToCartModel from "../../Modals/AddedToCartModel";
import DrinksCard from "./DrinksCards/DrinksCard";
import { ClockLoader } from "react-spinners";
import Image from "next/image";

async function getDrinks() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/drinks`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (err) {
    console.log("Something Went Wrong !!", err);
    return;
  }
}

const Drinks = () => {
  const [drinkData, setDrinkData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      setIsLoading(true);
      try {
        const data = await getDrinks();
        setDrinkData(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (error) return <div className="h-screen text-[#c80f2e] text-center text-3xl md:text-5xl font-bold">Sorry , Failed to load ... </div>;
  if (isLoading) return <div className="flex justify-center pt-[25vh] h-[85vh] ">
    {/* <ClockLoader color="#991b1b" size={100}/> */}
    <Image src="/HOTPIZZALOGO.jpg" alt="Pizza Logo"  width={300} height={300} className="h-[10vh] w-[30vw]  object-contain" />
    </div>;

  return (
    <>
      <div className="container mx-auto max-w-7xl gap-10 grid sm:grid-cols-2 md:grid-cols-4 place-content-center sm:p-10 md:p-20">
        {Array.isArray(drinkData) &&
          drinkData?.map((item, idx) => (
            <DrinksCard key={idx} data={item} idx={idx} />
          ))}
      </div>
    </>
  );
};

export default Drinks;
