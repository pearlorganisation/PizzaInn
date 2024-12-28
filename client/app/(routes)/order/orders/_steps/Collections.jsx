"use client";

import { getorderDetails } from "@/app/lib/features/orderDetails/orderDetailsslice";
import { getPreviousPath } from "@/app/lib/features/path/pathslice";
import { usePreviousRoute } from "@/app/utils/utils";
import { PhoneIcon } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Collections = ({ step }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [addressData, setAddressData] = useState(null);
    const { userData } = useSelector((state) => state.auth);
    const [dayTimeIntervals, setDayTimeIntervals] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        dispatch(
            getorderDetails({
                time: data?.daytime,
                orderType: step === 1 ? "collection" : "delivery",
            })
        );
        router.push("/order/checkout")

    };
    useEffect(() => {
        const intervals = generateDayTimeIntervals();
        setDayTimeIntervals(intervals);
      }, []);

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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border-t-2 p-2 space-y-6">
                       <div className="space-y-2">
  <h1>Please Select Time & Day</h1>
  <select
    {...register("daytime", { required: true })}
    id="day"
    defaultValue=""
    className="px-4 py-2 border-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c80f2e focus:border-transparent"
  >
    <option value="" disabled>Select Time & Day</option>
    {dayTimeIntervals.map((interval, index) => (
      <option key={index} value={`${interval.day}-${interval.time}`}>
        {interval.day} - {interval.time}
      </option>
    ))}
  </select>
  {errors.daytime && <span className="text-#c80f2e]">Please select the time & day</span>}
</div>

            <div className="bg-[#c80f2e] p-6 rounded-md text-white">
                <h2 className="font-bold text-lg mb-4">ORDERING INFORMATION:</h2>
                <p className="mb-4">
                    <strong>Please note:</strong>{" "}
                    <a href="#" className="underline">
                        Orders take a minimum of 45 minutes
                    </a>{" "}
                    to deliver. Whilst we endeavour to get your order to you on
                    time, there may be delays during busier periods.
                </p>
                <p className="mb-4">
                    If you have any issues with your order or experience,
                    in the first instance please contact the store you ordered
                    from directly.
                </p>
                <p className="mb-2">Your order is being placed with:</p>
                <p className="font-bold">420b Alexandra Avenue, Harrow, HA2 9TL
<br/>
{/* Hothousenorthwood@gmail.com */}
</p>
                <p className="flex items-center mt-2">
                  <PhoneIcon className="mr-2" />
                  020 8429 8181
                </p>
            </div>
            <button
                className="bg-green-700 hover:bg-green-600  py-2 w-full text-white rounded"
                type="submit"
            >
                Proceed To Checkout
            </button>
        </form>
    )
}

export default Collections