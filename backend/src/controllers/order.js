import order from "../models/order.js";
// import Stripe from "stripe"
import { asyncErrorHandler } from "../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../utils/errors/customError.js";


export const newOrder = asyncErrorHandler(async (req, res, next) => {

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Ensure it's 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure it's 2 digits
  const datePart = day + month; // e.g., "1607" for July 16

  // Get the total number of documents in the collection
  const countDocuments = await order.countDocuments();

  // Increment the count and get the last two digits, padded with zeros if necessary
  const incrementedCount = (countDocuments + 1).toString().padStart(2, '0').slice(-2); // Always take the last two digits

  // Generate the final order number
  const orderNumber = `${datePart}${incrementedCount}`;
 
   // Add the order number to the new order object
   const newOrder = new order({ ...req?.body, orderNumber });

  await newOrder.save();

  res
    .status(201)
    .json({ status: true, message: "New Order created successfully",data:newOrder });
});

export const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const data = await order.find({ $or: [
    { paymentStatus: true },
    { paymentMethode: "Cash on delivery" }
  ]}).sort({createdAt:-1}).populate("orderBy");
  
  res.status(200).json({ status: true, message: "All Orders Found successfully", data });
});

export const getParticularUserOrders = asyncErrorHandler(
  async (req, res, next) => {
    const { userId } = req?.params;
    const data = await order.find({ 
      orderBy: userId,
      $or: [
        { paymentStatus: true },
        { paymentMethode: "Cash on delivery" }
      ] }).sort({createdAt:-1});
    if (!data) {
      return res.status(400).json({ status: false, message: "No Order History" });
    }
    res
      .status(200)
      .json({ status: true, message: "User Orders Found successfully", data });
  }
);

export const updateCompleteOrder = asyncErrorHandler(async (req, res, next) => {
  const {id}= req?.params
  const {isCompleted}= req?.body
    const data = await order.findByIdAndUpdate(id,{orderStatus:isCompleted});
    if(!data){
      return next( new errorResponse("Id is not valid to complete the order",400))
    }
    res.status(200).json({
      status: true,
      message:"Order completed successfully!" ,
    });
  });

//   export const onlineOrder = asyncErrorHandler(async (req, res, next) => {

//     const {items,email}= req?.body

//     const lineItems = items?.map((item)=>({
//       price_data:{
//         currency:"GBP",
//         product_data:{
//           name:item.name
//         },
//         unit_amount:Math.round(item.totalSum*100)    
//       },
//       quantity:item.quantity
//     }))

//     const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

//    const session = await stripe.checkout.sessions.create({
//     payment_method_types:["card"],
//     line_items:lineItems,
//     customer_email: email,
//     mode:"payment",
//     success_url:process.env.STRIPE_SUCCESS_URL,
//     cancel_url:process.env.STRIPE_CANCEL_URL,
//    })

// res.json({id:session.id})
//   })

  export const onlineOrder = asyncErrorHandler(async (req, res, next) => {

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Ensure it's 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure it's 2 digits
    const datePart = day + month; // e.g., "1607" for July 16
  
    // Get the total number of documents in the collection
    const countDocuments = await order.countDocuments();
  
    // Increment the count and get the last two digits, padded with zeros if necessary
    const incrementedCount = (countDocuments + 1).toString().padStart(2, '0').slice(-2); // Always take the last two digits
  
    // Generate the final order number
    const orderNumber = `${datePart}${incrementedCount}`;

    const {amount,customer,newData} = req.body

    const generateToken = await fetch("https://accounts.vivapayments.com/connect/token", {
    // const generateToken = await fetch("https://demo-accounts.vivapayments.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.VIVA_SMARTCHECKOUT_CLIENT_ID,  
        client_secret: process.env.VIVA_SMARTCHECKOUT_SECRET_KEY, 
        // client_id: 'wc37z4tch73nk3amxt162fy8nxa0301wndrxs680ach73.apps.vivapayments.com',  
        // client_secret: 'tyd8a7GJZFQ5Zsb8s3QTJ8X087POaW', 
        scope: 'urn:viva:payments:core:api:redirectcheckout', 
      }),
    });

    const response = await generateToken.json();

    if (!generateToken.ok) {
      return next(new CustomError(response, 400));
    }

    const responseOrder = await fetch("https://api.vivapayments.com/checkout/v2/orders", {
    // const responseOrder = await fetch("https://demo-api.vivapayments.com/checkout/v2/orders", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
    'Authorization': `Bearer ${response.access_token}`
      },

      body: JSON.stringify({
        "amount": amount,
        "customer" : {
          email : customer.email,
          fullName : customer.fullName,
          phone: customer.phone
        }
      
      }),
    });

    const finalResult= await responseOrder.json()

    if (!responseOrder.ok) {
      return next(new CustomError(finalResult, 400));
    }

    await order.create({...newData,
      orderNumber:orderNumber,
      paymentStatus:false,
      orderCode:finalResult.orderCode
    })

     res.status(200).json(finalResult);
     
  })

  export const transactionCreatedWebHook = asyncErrorHandler( async(req,res,next)=>{
    
    const Username = process.env.VIVA_MERCHANT_ID;  
const Password = process.env.VIVA_API_KEY; 
//     const Username = 'ebc52109-c09b-4c9f-a96d-415bafb43aa9';  // Replace with your merchant ID
// const Password = 'GlmfBP'; 

    const generateToken = await fetch("https://www.vivapayments.com/api/messages/config/token",{
    // const generateToken = await fetch("https://demo.vivapayments.com/api/messages/config/token",{
      method:"GET",
      headers:{
             'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(`${Username}:${Password}`)}`
      },
    })

    const response = await generateToken.json();

    if (!generateToken.ok) {
      return next(new CustomError(response, 400));
    }

    res.status(200).json(response)

  })


  export const webhookResponse = asyncErrorHandler(async (req, res, next) => {
    const data = req.body;
  
    // Validate incoming data
    if (!data || !data.EventData) {
      return res.status(400).json({ message: "Error: Missing data or EventData" });
    }
  
    const transactionId = data.EventData.TransactionId;
    console.log(transactionId);
  
    const generateToken = await fetch("https://accounts.vivapayments.com/connect/token", {
      // const generateToken = await fetch("https://demo-accounts.vivapayments.com/connect/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.VIVA_SMARTCHECKOUT_CLIENT_ID,  
          client_secret: process.env.VIVA_SMARTCHECKOUT_SECRET_KEY, 
          // client_id: 'wc37z4tch73nk3amxt162fy8nxa0301wndrxs680ach73.apps.vivapayments.com',  
          // client_secret: 'tyd8a7GJZFQ5Zsb8s3QTJ8X087POaW', 
          scope: 'urn:viva:payments:core:api:redirectcheckout', 
        }),
      });
  
      const response = await generateToken.json();
  
      if (!generateToken.ok) {
        return next(new CustomError(response, 400));
      }
  
    const accessToken = response.access_token; // Extract the OAuth2 access token
  
    // Step 2: Use the access token to call the transaction API
    // const transactionResponse = await fetch(`https://demo-api.vivapayments.com/checkout/v2/transactions/${transactionId}`, {
    const transactionResponse = await fetch(`https://api.vivapayments.com/checkout/v2/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });
  
    const transactionData = await transactionResponse.json();
  
    if (!transactionResponse.ok) {
      return next(new CustomError(transactionData, 400));
    }
  
    console.log(transactionData); // Log the transaction data for debugging

    if (transactionData?.statusId === "F") {
      await order.updateOne(
        { orderCode: transactionData.orderCode }, // Filter to match the document
        { $set: { paymentStatus: true } } // Update operation
      );
    }
  
    // Return the transaction data in response
    res.status(200).json({ status: true});


  });
  

  // export const getOrderWithOrderCode = asyncErrorHandler(async (req, res, next) => {
  //   console.log(req.params)
  //   const {orderCode}= req?.params
  //   const data = await order.findOne({orderCode:orderCode},{paymentStatus:1});
  //   res.status(200).json({ status: true, message: "All Orders Found successfully", data });
  // });

  export const checkTransaction = asyncErrorHandler(async (req, res, next) => {
    console.log(req.params)
    const {transactionId}= req?.params
  
  
    const generateToken = await fetch("https://accounts.vivapayments.com/connect/token", {
      // const generateToken = await fetch("https://demo-accounts.vivapayments.com/connect/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.VIVA_SMARTCHECKOUT_CLIENT_ID,  
          client_secret: process.env.VIVA_SMARTCHECKOUT_SECRET_KEY, 
          // client_id: 'wc37z4tch73nk3amxt162fy8nxa0301wndrxs680ach73.apps.vivapayments.com',  
          // client_secret: 'tyd8a7GJZFQ5Zsb8s3QTJ8X087POaW', 
          scope: 'urn:viva:payments:core:api:redirectcheckout', 
        }),
      });
  
      const response = await generateToken.json();
  
      if (!generateToken.ok) {
        return next(new CustomError(response, 400));
      }
  
    const accessToken = response.access_token; // Extract the OAuth2 access token
  
    // Step 2: Use the access token to call the transaction API
    // const transactionResponse = await fetch(`https://demo-api.vivapayments.com/checkout/v2/transactions/${transactionId}`, {
    const transactionResponse = await fetch(`https://api.vivapayments.com/checkout/v2/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });
  
    const transactionData = await transactionResponse.json();
  
    if (!transactionResponse.ok) {
      return next(new CustomError(transactionData, 400));
    }
  
    console.log(transactionData); // Log the transaction data for debugging

    if (transactionData?.statusId === "F") {
       res.status(200).json({status:true, paymentStatus:true, data:transactionData})
    }else{
      return next(new CustomError("Transaction is pending or failed", 400));
    }
  });
  
  export const getOrderFromOrderCode= asyncErrorHandler(async(req,res,next)=>{
    const {orderCode}= req.params;
    const data = await order.findOne({orderCode:orderCode})
if(!data){
  return next(new CustomError("This Order Code is not exist",400))
}
    res.status(200).json({status:true, message:"Order code data" ,data})
  })















  