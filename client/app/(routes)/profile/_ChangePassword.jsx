"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addNewPassword } from "@/app/lib/features/auth/authSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const ChangePassword = () => {
  const [response, setResponse] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { userData } = useSelector((state) => state?.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const updatePassword = async (data) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData?.email,
            password: data.currentPassword,
          }),
        }
      );
      const newData = await response.json();
      setResponse(newData);
      console.log(newData);
      if (newData.success === true) {
        dispatch(addNewPassword(data.newPassword));
        router.push("/reset_password_otp");
        toast.success("Otp Sent successfully");
      }else{
        toast.error(`${newData?.message}`)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error during signup:", error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  function onSubmit(data) {
    console.log(data);
    updatePassword(data);
  }
  console.log(response);
  return (
    <main className="w-full md:w-3/4 bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {response && response?.status == false ? (
          <div className="p-2 text-center text-[#c80f2e] font-semibold">
            {response?.message}!
          </div>
        ) : (
          ""
        )}
        <div className="space-y-1">
          <label htmlFor="mobile" className="block font-medium">
            Current Password
          </label>
          <div className="relative">
            <input
              {...register("currentPassword", { required: true })}
              type="text"
              id="mobile"
              className="w-full p-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-[#c80f2e]"
              placeholder="Current Password"
            />
            {errors.currentPassword && <span>This field is required</span>}
            {/* <CheckIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-800" /> */}
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="newPassword" className="block font-medium">
            New Password
          </label>
          <div className="relative">
            <input
              {...register("newPassword", { required: true })}
              type="text"
              id="newPassword"
              className="w-full p-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-[#c80f2e]"
              placeholder="New Password"
            />
            {errors.newPassword && <span>This field is required</span>}
            {/* <CheckIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-800" /> */}
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword", { required: true })}
              type="text"
              id="confirmPassword"
              className="w-full p-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-[#c80f2e]"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <span>This field is required</span>}
            {/* <CheckIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-800" /> */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#c80f2e] text-white rounded-md hover:bg-[#c80f2e]"
        >
            {isLoading ? <ClipLoader color=""/>: "Save & continue" } 
        </button>
      </form>
    </main>
  );
};

export default ChangePassword;
