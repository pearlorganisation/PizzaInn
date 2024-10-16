"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { successRedirectStatus, trackerStatus } from "@/app/lib/features/orderDetails/orderDetailsslice";


const page = ({ searchParams }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cartData);
  const order = useSelector((state) => state.orderDetails?.order);
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading,setIsLoading] = useState(false)
  const [codData, setCodData] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0.5);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  let discount= 0
  if(order?.orderType === 'collection') {
discount= cart?.reduce((acc, item) => {
  const calDiscount = Number(item?.discount) || 0;
  return acc + calDiscount;
}, 0);
  }


   const totalPrice = cart?.reduce((acc, item) => {
      return acc + Number(item?.totalSum);
    }, 0);


//   let discountPrice = 0
//   if(order?.orderType === 'collection')
//  { discountPrice = (totalPrice ).toFixed(2)}

 
  const onSubmit = async (data) => {

    dispatch(trackerStatus(true))
    const newData = {
      orderType: order?.orderType,  
      email:userData?.email,
      orderBy: userData?._id,
      time: order?.time,
      address: order?.orderType === 'collection' ? null : order?.address,
      comment: data?.comment,
      totalAmount: {
        total: totalPrice?.toFixed(2),
        deliveryCharge: order.orderType === 'collection' ? 0 : deliveryCharge,
        discountPrice: discount || 0
      },
      mobileNumber:userData?.mobileNumber,
      paymentMethode: data?.paymentMethode,
      items: cart,
      terms: data?.terms
    };

    if(data?.paymentMethode==="Cash on delivery")
{
    try {
  setIsLoading(true)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }
  );
  const responsejson = await response.json();
  setCodData(responsejson);
  if (responsejson?.status === true) {
    const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/mail`,
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...responsejson,email:userData.email,name:userData.firstName}),
      }
    )
    const mailResponseJson = await mailResponse.json();
    if(mailResponseJson?.status === true){
      toast.success("Order Confirmation Mail Sent Successfully")
    }
 
    // --------------clearing the cart after successfull order---------------
    router.push("/order/tracker");
  }
  setIsLoading(false)
} catch (error) {
  setIsLoading(false)
  console.log(error);
}
}
else{
  setIsLoading(true)
  // try {
  //   const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/create-checkout-session`,{
  //    method:"POST",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //    body:JSON.stringify(newData)
  //   })
  //   setIsLoading(false)
  //   const session = await response.json()
  
  //   const result = stripe.redirectToCheckout({
  //    sessionId:session.id
  //   })
 
  //   if(result.error){
  //     toast.error("Error verifying payment", { position: "top-center" });
  //    }
     
  // } catch (error) {
  //   setIsLoading(false)
  //   toast.error("Error verifying payment", { position: "top-center" });
  // }
 
  try {

    let onlinePrice 

  if(order?.orderType === 'collection'){
    onlinePrice = (Number(totalPrice) + 0 - Number(discount || 0) ).toFixed(2) 
  }else
   {onlinePrice =  (Number(totalPrice?.toFixed(2)) + Number(deliveryCharge)) - Number(discount || 0)}

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/create-viva-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newData:newData,
        amount: onlinePrice * 100,
        customer: {
          email: userData?.email,
          fullName: `${userData?.firstName} ${userData?.lastName}`,
          phone: userData?.mobileNumber,
        }
      }),
    });

  const vivaResponse = await response.json();

   // Check if the response is not okay (e.g., 4xx or 5xx status codes)
   if (!response.ok) {
    throw new Error(vivaResponse.message || 'Something went wrong while creating the Viva order');
  }
  const orderCode= vivaResponse.orderCode
  dispatch(successRedirectStatus(orderCode))

  const checkoutUrl = `https://www.vivapayments.com/web/checkout?ref=${orderCode}`;

  setIsLoading(false)

  // const checkoutUrl = `https://demo.vivapayments.com/web/checkout?ref=${orderCode}`;

    // Redirect to Viva Payments checkout page
    window.location.href = checkoutUrl;


    


} catch (error) {
  dispatch(successRedirectStatus(null))
    setIsLoading(false)
    toast.error("Error opening the payment checkout page", { position: "top-center" });
  }
}


}


 


const [mount, setMount] = useState(false)
  useEffect(()=>{
    console.log(cart.length)
    setMount(true)
    if ( mount && cart?.length < 1) {
        router.push("/");
      }
  
  },[cart])

  useEffect(()=>{
    dispatch(trackerStatus(false))
    setIsLoading(false)
  },[])

  useEffect(()=>{
if(totalPrice <20 && totalPrice >=10 ){
  setDeliveryCharge(2.99)
}
if (totalPrice > 20){
  setDeliveryCharge(0.5)
}
  },[totalPrice])


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-red-800 border-b-2 border-red-800 pb-2">
              ORDER SUMMARY
            </h2>
            <div className="border p-4 rounded-md">
              <div className="">
                {Array.isArray(cart) &&
                  cart?.length > 0 &&
                  cart?.map((data, idx) => {
                    const size= String(data?.size).includes("-")
                    const price = String(data?.size).includes("-")
                      ? data?.size?.split("-")
                      : data?.size;
         
                    const allToppings = data?.allToppings || { cheese: [], sauce: [],veg:[],meat:[] };
                    const mergedToppings = [
                      ...allToppings.cheese.map(item => item.cheeseName),
                      ...allToppings.sauce.map(item => item.sauceName),
                      ...allToppings.veg.map(item => item.vegName),
                      ...allToppings.meat.map(item => item.meatName)
                    ].join(', ');
                   
                    return (
                      <div className="p-4 border-b grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="flex items-center space-x-4 md:col-span-2">
                         
                            <img src={data?.img} className="h-16 w-14 rounded-md" />
                     
                          <p className="font-semibold">
                    {data?.name}
                    {" "}
                    {size ? `(${price[0]})` : (data?.dealsData ? `(${data?.size})` : data?.allToppings?.size?.name ? `(${data?.allToppings?.size?.name} 15)` : "" ) }
                          {data?.allToppings && <>{" "}<span className="text-sm bg-red-800 text-white rounded-md px-2"> Customized </span></>}
                    <br/>
                    {/* <p className="hidden md:block text-green-800">{mergedToppings}</p> */}
                    {data?.dealsData && ( <div className="text-sm text-gray-600"> {data?.dealsData?.map((item,idx) =>
                    item?.label).join(", ")} </div>)
                    }
                  </p>
                        </div>
<div className="font-semibold md:col-span-3">
  <div> <p className="text-sm text-green-800 pb-2">{mergedToppings}</p> </div>
  <div className="flex justify-between">
                        <div className=" text-right  md:text-left">
                        {order?.orderType === 'collection' && data?.discount ? <>£ {(data?.price - data?.discount).toFixed(2)} <span className="line-through text-sm text-slate-600">{data?.price}</span></> : `£ ${data?.price}`}
                         
                          <span className="text-sm"> x {data?.quantity}</span>
                        </div>
                        {order?.orderType === 'collection' && data?.discount &&   <div className="text-green-800">20% Discount on Collection</div>}
                      
                        </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">GOT A VOUCHER?</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Just enter it here"
                  className="border p-2 rounded-md flex-1"
                />
          
              </div>
            </div>
            <div className="space-y-1">
              <p>Total: £ {totalPrice?.toFixed(2)}</p>
              {order?.orderType === 'collection' ? <p>Discount: £ {discount}</p> : <p>Discount: £ 0</p>}
              {order?.orderType === 'collection' ? <p>Delivery Charge: £ 0 (No charges for collection)</p> : <p>Delivery charge: £ {deliveryCharge}</p>}
              <p className="font-bold">
                You pay: £ {order?.orderType === 'collection' ?  (Number(totalPrice) + 0 - discount).toFixed(2) : (Number(totalPrice) + deliveryCharge - 0).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-red-800 border-b-2 border-red-800 pb-2">
              ORDER DETAILS
            </h2>
            <div>
              <h3 className="text-lg font-bold">ANY COMMENTS</h3>
              <textarea
                {...register("comment")}
                name="comment"
                className="w-full border p-2 rounded-md"
                placeholder="Leave comments for your order here"
              />
            </div>

            {order?.orderType === 'delivery' && <div>
                <h3 className="text-lg font-bold">YOUR ADDRESS & MOBILE NUMBER:</h3>
                <p>
                  {order?.address?.address} , <span className="text-red-800">{userData?.mobileNumber ? userData?.mobileNumber: "No Mobile Number is added"}</span>

                </p>
              </div>
            }

            <div>
              <h3 className="text-lg font-bold">ORDER TIME</h3>
              <p>
                Your order is to be placed for {order?.time} ( Please note
                delivery time is around 45 minutes )
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">CHOOSE PAYMENT</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="cash"
                  value="Cash on delivery"
                  name="paymentMethode"
                  {...register("paymentMethode")}
                  defaultChecked
                />
                <label htmlFor="cash">{order?.orderType === 'collection' ? "Pay on collection" : "Pay on delivery"}</label>
                <input
                  {...register("paymentMethode")}
                  name="paymentMethode"
                  type="radio"
                  id="card"
                  value="Online Payment"
                 
                />
                <label htmlFor="card">Pay Now</label>

              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input   {...register("terms",{required:true})} type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-[15px]">
                I accept the Terms & Conditions and Privacy Policy
              </label>
            </div>
            { errors.terms &&  <p className="text-red-500">Please accept the terms & conditions.</p>}
            <div className="flex space-x-4">
              <button
              type="button"
                className="px-4 py-2 border rounded-md"
                onClick={() => router.push("/order/cart")}
              >
                Edit Order
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-700 hover:bg-green-600  text-white rounded-md flex items-center justify-center"
              >
                {isLoading ? <ClipLoader color="white" size={22}/>: "Order" } 
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
