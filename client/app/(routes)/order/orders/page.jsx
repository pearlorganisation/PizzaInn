"use client";

import { getorderDetails } from "@/app/lib/features/orderDetails/orderDetailsslice";
import { getPreviousPath } from "@/app/lib/features/path/pathslice";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Collections from "./_steps/Collections";
import { toast } from "sonner";
import axios from "axios";
import Delivery from "./_steps/Delivery";

const page = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [addressData, setAddressData] = useState(null);
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);
  const [dayTimeIntervals, setDayTimeIntervals] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartData);

  const { previousPath } = useSelector((state) => state.path);

  
  const totalPrice = cart?.reduce((acc, item) => acc + Number(item?.totalSum), 0);
  const orderTypeArray = [
    { name: `Collection`, no: 1 },
    { name: `Delivery`, no: 2 },
  ]
  if(totalPrice < 10){
    orderTypeArray.pop()
  }

  useEffect(() => {
    if (previousPath !== "/order/cart") {
      redirect("/order/cart");
    }
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  // const { previousRoute } = router.query;
  // console.log(previousRoute);

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(
      getorderDetails({
        address: data?.address,
        time: data?.daytime,
        orderType: step === 1 ? "collection" : "delivery",
      })
    );
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/address`,
        {
          method: "post",
          body: JSON.stringify({
            address: data?.address,
            userId: userData?._id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const newData = await response?.json();
      setAddressData(newData);

      if (newData?.status === true) {
        dispatch(getPreviousPath("/order/orders"));
        router.push("/order/checkout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervals = generateDayTimeIntervals();
    setDayTimeIntervals(intervals);
  }, []);

  useEffect(() => {
    if (!isUserLoggedIn) {
      toast.error("Please Login...")
      router.push("/login");
    }
  }, [isUserLoggedIn]);


  const generateDayTimeIntervals = () => {
    const intervals = [];
    const currentTime = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const addIntervalsForDay = (date) => {
      const day = daysOfWeek[date.getDay()];
      const start = new Date(date);
      start.setHours(11, 0, 0, 0); // Set start time to 11 AM
      const end = new Date(date);
      end.setHours(23, 0, 0, 0); // Set end time to 11 PM

      while (start <= end) {
        if (start > currentTime) {
          intervals.push({
            day: day,
            time: start.toTimeString().slice(0, 5),
          });
        }
        start.setMinutes(start.getMinutes() + 15); // Increment by 15 minutes
      }
    };

    for (let i = 0; i < 3; i++) { // Loop for today and the next two days
      const date = new Date();
      date.setDate(currentTime.getDate() + i);
      addIntervalsForDay(date);
    }

    return intervals;
  };
  const [postCodeAddress, setPostCodeAddress] = useState([])
  const [postalCode, setPostalCode] = useState('')
  async function getPostalAddress() {
    const addressAPI_KEY = `https://api.getAddress.io/autocomplete/${postalCode}?api-key=wzTsozpqsU6H14JJAZvUCA43606`
    const response = await axios.get(addressAPI_KEY)

    setPostCodeAddress(response?.data?.suggestions)
  }

  useEffect(() => {
    getPostalAddress()

  }, [postalCode])

  return (
    <div className="min-h-screen space-y-5 container mx-auto p-4">
      <div className=" flex items-center gap-2">
        {orderTypeArray.map((item) => {
          return (
            <button
              onClick={() => {
                setStep(item?.no);
              }}
              type="button"
              className={`px-6 py-2 border-2 ${step === item?.no ? "text-white bg-[#c80f2e]" : "text-[#c80f2e]"
                }  border-[[#c80f2e]]  rounded font-medium`}
            >
              {item?.name}
            </button>
          );
        })}
      {totalPrice < 10 && <div className="text-[#c80f2e] ">No delivery in order less than 10 Pounds</div>}
      </div>
      <div>
        {step === 1 && (
          <Collections step={step} />
        )}
        {step === 2 && (
          <Delivery step={step} />
        )}
      </div>
    </div>
  );
};

export default page;


