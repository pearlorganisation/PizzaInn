"use client";
import { addUserData } from "@/app/lib/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";


const Login = () => {
  // ----------------------------Hooks-------------------------------------
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data?.email,
            password: data?.password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          credentials: "include",
        }
      );
      const newData = await res.json();
      console.log(newData);
      if (newData?.status === true) {
        const userData = { isUserLoggedIn: true, data: newData.data };

        dispatch(addUserData(userData));

        router.push("/");
        toast.success("Login successfully");
      }else{
        toast.error(`${newData?.message}`)
      }

      setIsLoading(false)
      setResponse(newData);
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center pb-14">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-xl text-green-900 font-bold mb-6 text-center">
            If you're already a member. Login here.
          </h2>
       
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="login-email">
                Email Address
              </label>
              <input
                type="email"
                id="login-email"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-800" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-800 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="login-password">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-800" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-slate-300`}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-800 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <Link href="forget_password" className="text-red-800 font-semibold hover:text-red-700">
                Forgot password?
              </Link>
              <button
                type="submit"
                className="bg-green-700  text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center justify-center"
              >
                {isLoading ? <ClipLoader color="white" size={22}/>: "Login" } 
              </button>
            </div>
            <p className="mt-4">
              Don't have an account ?{" "}
              <span>
                <Link href="/signUp" className="text-red-900 hover:text-red-700 font-semibold">
                  Create here.
                </Link>
              </span>
            </p>
            {/* <div className="text-center mb-4">OR</div>
            <button
              type="button"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Login Via Facebook
            </button>
            <p className="mt-4">
              New ? {"=>"}
              <span>
                <Link href="/signUp" className="text-blue-700">
                  Sign Up here
                </Link>
              </span>
            </p> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
