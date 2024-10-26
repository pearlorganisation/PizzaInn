"use client";
import { getcredentials } from "@/app/lib/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const Page = () => {
  // -------------------------------------hooks---------------------------------
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
const [isLoading,setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) || "Please enter a valid email address";
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data?.email,
            password: data?.password,
            firstName: data?.firstName,
            lastName: data?.lastName,
            mobileNumber:data?.mobileNumber
          }),
        }
      );
      const newData = await response.json();
      dispatch(
        getcredentials({
          email: data?.email,
          password: data?.password,
          firstName: data?.firstName,
          lastName: data?.lastName,
          mobileNumber: data?.mobileNumber
        })
      );
      setResponse(newData);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      if (newData.success === true) {
        router.push("/otp");
           toast.success("Otp Sent Successfully");
      }

      const result = await response.json();
      setIsLoading(false)
      // Add your logic for a successful signup
    } catch (error) {
      setIsLoading(false)
      console.error("Error during signup:", error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center pb-14 ">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-xl text-green-900 font-bold mb-6 text-center">
            New member ? Register here.
          </h2>
       
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="register-email">
                First Name
              </label>
              <input
                type="text"
                id="register-email"
                className={`w-full px-3 py-2 border ${
                  errors.firstName ? "border-[#c80f2e]" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your First Name"
                {...register("firstName", {
                  required: true,
                })}
              />
              {errors.firstName && (
                <p className="text-[#c80f2e] text-sm mt-1">
                  {errors.firstName && "First Name is required"}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="register-email">
                Last Name
              </label>
              <input
                type="text"
                id="register-email"
                className={`w-full px-3 py-2 border ${
                  errors.lastName ? "border-[#c80f2e]" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your Last Name"
                {...register("lastName", {
                  required: true,
                })}
              />
              {errors.lastName && (
                <p className="text-[#c80f2e] text-sm mt-1">
                  {errors.lastName && "Last Name is required"}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="register-email">
                Mobile Number
              </label>
              <input
                type="Number"
                id="register-email"
                className={`w-full px-3 py-2 border ${
                  errors.mobileNumber ? "border-[#c80f2e]" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your mobile number"
                {...register("mobileNumber", {
                  required: true,
                })}
              />
              {errors.mobileNumber && (
                <p className="text-[#c80f2e] text-sm mt-1">
                  {errors.mobileNumber && "Mobile number is required"}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="register-email">
                Email Address
              </label>
              <input
                type="email"
                id="register-email"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-[#c80f2e]" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  validate: validateEmail,
                })}
              />
              {errors.email && (
                <p className="text-[#c80f2e] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700"
                htmlFor="register-password"
              >
                Password
              </label>
              <input
                type="password"
                id="register-password"
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-[#c80f2e]" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least six characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-[#c80f2e] text-sm mt-5 ">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-[#c80f2e]" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "The passwords does not match",
                })}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer pt-5 text-[#c80f2e] hover:text-[#c80f2e]"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-[#c80f2e] text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
              />
              <label htmlFor="terms" className="text-gray-700">
                I accept the Hot House Pizza{" "}
                <a href="/termsAndConditions" className="text-[#c80f2e] hover:text-[#c80f2e] underline">
                  Terms & Conditions.
                </a>{" "}
                
              </label>
            </div>
            {errors.terms && (
              <p className="text-[#c80f2e] text-sm mb-1">
                {errors.terms.message}
              </p>
            )}
            <button
              type="submit" disabled={isLoading}
              className="w-full bg-green-700  text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
             {isLoading ? <ClipLoader color=""/>: "Register" } 
             
            </button>
            {response && response?.success == false ? (
            <div className="p-2 text-center text-[#c80f2e] font-semibold">
              {response?.message} !
             
            </div>
          ) : (
            ""
          )}
            <p className="mt-4">
              Already have an account?{" "}
              <span>
                <Link href="/login" className="text-[#c80f2e] hover:text-[#c80f2e] font-semibold">
                  Login here.
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
