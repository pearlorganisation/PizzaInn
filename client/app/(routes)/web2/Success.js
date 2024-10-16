"use client"
import { successRedirectStatus } from "@/app/lib/features/orderDetails/orderDetailsslice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";
import Image from "next/image";


const Success = ({transId}) =>{
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const [orderData,setOrderData] = useState(null)
    const userData = useSelector((state) => state.auth.userData);

    // const {isSuccess} = useSelector((state)=>state.orderDetails)
    // const dispatch = useDispatch()

const getData = async() =>{
  
try {
    setIsLoading(true)

   const getOrderStatus = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/checkTransaction/${transId}`,{
method:"GET",
headers:{"Content-Type": "application/json"}
    }
) 


if (!getOrderStatus.ok) {
  throw new Error(response.message || 'Something went wrong while creating the Viva order');
}
const response = await getOrderStatus.json()


  // alert(data)
  // console.log(data,"hi")
  setOrderData(response)

  setIsLoading(false)
} catch (error) {
    setIsLoading(false)
    toast.error("Error in payment verification", { position: "top-center" });
}
}

const handlePayment = async() =>{
   const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/getFromOrderCode/${orderData?.data?.orderCode}`,
      {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    const orderResponseJson = await orderResponse.json();

   const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/mail`,
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data:{...orderResponseJson?.data},email:userData.email,name:userData.firstName}),
      }
    )
    const mailResponseJson = await mailResponse.json();
    if(mailResponseJson?.status === true){
      toast.success("Order Confirmation Mail Sent Successfully")
    }
}


    useEffect(()=>{
  if(transId){
    getData(); 
    // alert(paymentStatus,"hi this is the payment status")

        }
    },[transId])

  //  alert(paymentStatus,"hi this is the payment status")

    useEffect(() => {
      if (orderData?.paymentStatus !== null) { // Ensure paymentStatus has been set (true or false)
        if (orderData?.paymentStatus===true) {
          handlePayment()
          toast.success("Payment Successful");
          
          router.push("/order/tracker");
        }else if(orderData?.paymentStatus===false) {
        toast.error("Problem in payment please confirm from us.")
        }
      }
    }, [orderData]);

    // useEffect(() => {
    //   if (!isSuccess) {
    //     router.push("/notFound");
    //   }
    // }, [isSuccess]);

    return (
        isLoading ? (<div className="flex justify-center pt-[25vh] h-[85vh] ">
           <Image src="/HOTPIZZALOGO.jpg" alt="Pizza Logo"  width={300} height={300} className="h-[10vh] w-[30vw]  object-contain" />
            {/* <ClockLoader color="#991b1b" size={100} /> */}
          </div> ) : (<div className="mx-10 mb-10 flex flex-col gap-4 items-center bg-green-600 justify-center h-[60vh] rounded-lg" >
            <SiTicktick className=" text-white" size={100}/>
  <div className="text-4xl ms-2 text-white font-bold ">Thanks , Your Payment is Successfully Paid </div>
        </div>)
    )
}

export default Success