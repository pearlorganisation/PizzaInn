import React from 'react'
import { format } from 'date-fns';



export default function OrderViewModal ({viewData,setModal}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yy , hh:mm a');
      };



  return (
    <div
    className="fixed top-0 left-0 z-1000 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
    aria-labelledby="header-3a content-3a"
    aria-modal="true"
    tabindex="-1"
    role="dialog"
  >
    {/*    <!-- Modal --> */}
    <div
      className="flex w-full sm:w-[80%] xl:w-[70%] h-full  flex-col gap-6  rounded bg-white p-6 pb-14 shadow-xl "
      id="modal"
      role="document"
    >
      {/*        <!-- Modal header --> */}
      <header id="header-3a" className="flex items-center gap-4">
        <h3 className="flex-1 text-xl font-medium text-slate-700">
        Order Details
        </h3>
        <div>Order created at :    {formatDate(viewData?.createdAt)} </div>
        <button
          onClick={() => setModal(false)}
          className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
          aria-label="close dialog"
        >
          <span className="relative only:-mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              role="graphics-symbol"
              aria-labelledby="title-79 desc-79"
            >
              <title id="title-79">Icon title</title>
              <desc id="desc-79">
                A more detailed description of the icon
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </header>
      {/*        <!-- Modal body --> */}
      <div id="content-3a" className="flex-1 overflow-auto space-y-10">

      <table className="w-full table-auto text-sm">
    <tbody className="text-gray-600">
      <tr>
        <td className="py-2 px-4 border border-gray-300">Full name</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? `${viewData?.orderBy?.firstName} ${viewData?.orderBy?.lastName}` : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Email</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? `${viewData?.orderBy?.email}` : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Ordered Items </td>
        <td className="py-2 px-4 border border-gray-300">
          {viewData && viewData.items ? (
            viewData.items.map((item, idx) => 
            {       const size= String(item?.size).includes("-")
              const price = String(item?.size).includes("-")
                ? item?.size?.split("-")
                : item?.size;

                const allToppings = item?.allToppings || { base:{},cheese: [], sauce: [],veg:[],meat:[] }; 
                const mergedToppings = [
                  allToppings?.base?.name,
                  ...allToppings?.cheese.map(item2 =>`${item2?.cheeseName} - ${item2?.size === "double" ? "2️⃣ " : "1️⃣ "}`),
                  ...allToppings?.sauce.map(item2 => `${item2?.sauceName} - ${item2?.size === "double" ? "2️⃣ " : "1️⃣ "} `),
                  ...allToppings?.veg.map(item2 => `${item2?.vegName} - ${item2?.size === "double" ? "2️⃣ " : "1️⃣ "}`),
                  ...allToppings?.meat.map(item2 => `${item2?.meatName} - ${item2?.size === "double" ? "2️⃣ " : "1️⃣ "}`)
                ].join(', ');

                const mergedDealToppingsArray = item?.dealsData && Array.isArray(item.dealsData)
                ? item.dealsData.map((item2) => [
                    item2?.baseName?.name,
                    ...(Array.isArray(item2?.cheeseName) ? item2?.cheeseName.map(cheese => `${cheese.cheeseName} - ${cheese?.size === "double" ? "2️⃣ " : "1️⃣ "}`) : []),
                    ...(Array.isArray(item2?.vegetarianToppingsName) ? item2?.vegetarianToppingsName.map(veg => `${veg.vegName} - ${veg?.size === "double" ? "2️⃣ " : "1️⃣ "}`) : []),
                    ...(Array.isArray(item2?.meatToppingsName) ? item2?.meatToppingsName.map(meat => `${meat.meatName} - ${meat?.size === "double" ? "2️⃣ " : "1️⃣ "}`) : []),
                    ...(Array.isArray(item2?.sauceName) ? item2?.sauceName.map(sauce => `${sauce.sauceName} - ${sauce?.size === "double" ? "2️⃣ " : "1️⃣ "}`) : [])
                  ].join(', '))
                : [];
         
              return (
              <div className='border border-slate-300 flex mb-2 rounded-md px-2 gap-2' key={idx}>
                 <div className='flex items-center '><span className=''>{idx+1}:</span> </div>
                 <div className='p-2 space-x-2'>
              <div className=' rounded-md px-2 '>  
                 <p className="text-lg pb-2"> {item?.name}
                    {" "}
                    {size ? `(${price[0]})` : (item?.dealsData ? `(${item?.size})` : item?.allToppings?.size?.name ? `(${item?.allToppings?.size?.name})` : "" ) }<br/>
                    {item?.allToppings && <span className="text-sm bg-[#c80f2e] text-white rounded-md px-2"> Customized </span>}
                    </p></div>
                  { mergedToppings && <p className=" text-green-800 pb-2 border p-1 px-2 mb-2 rounded-md">{mergedToppings}</p>}
                    <div className="flex justify-between gap-5">
                        <div className="font-semibold text-green-800 text-right  md:text-left">
                        {viewData?.orderType === 'collection' && item?.discount ? <>Price : £ {(item?.price - item?.discount).toFixed(2)} <span className="line-through text-sm text-slate-600">{item?.price}</span></> : `Price : £ ${item?.price}`}
                          <span className="text-sm"> x {item?.quantity}</span>
                          <div className="text-sm text-[#c80f2e]"> Quantity : {item?.quantity}</div>
                         
                        </div>
                        {viewData?.orderType === 'collection' && item?.discount &&   <div className="text-green-800 font-semibold">20% Discount on Collection</div>}
                      
                        </div>
                    {item?.dealsData && ( <div className="text-base border rounded-md px-2 py-2 mt-2 text-gray-600"> {
                    item?.dealsData?.map((item,idx) =>
                  item?.name ? 
                  (<> <div key={idx} className=" ">
                    <div className="min-w-[10rem] max-w-[10rem] md:min-w-[30rem]">{item?.name} <span className="text-sm bg-[#c80f2e] text-white rounded-md px-2"> Customized </span></div>
                    <div className="text-green-900 text-sm">{mergedDealToppingsArray[idx]}</div>
                  </div>
                  <div className="border-b py-1"></div>
                  </>
                  ) : <><div key={idx} className=" ">
                  <div className="min-w-[10rem] max-w-[10rem] md:min-w-[30rem]">{item?.label}</div>
              
                </div>
                <div className="border-b py-1"></div></>
                  )} 
                    </div>)
                    }
           
              </div>
              </div>
            )}
          )
          ) : (
            'No Data available'
          )}
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Amount Details</td>
        <td className="py-2  px-4 border border-gray-300 font-semibold">       <div className='p-2 bg-slate-100 w-fit rounded-md'>
          <div>Total Amount :  <span className='text-yellow-600 bg-white mb-2 rounded-md px-2 '> £ {viewData?.totalAmount?.total}</span></div>
          <div>Delivery Charge : <span className='text-yellow-600 bg-white mb-2 rounded-md px-2 '> £ {viewData?.totalAmount?.deliveryCharge}</span></div>
          <div>Discount : <span className='text-yellow-600 bg-white mb-2 rounded-md px-2 '> {viewData?.totalAmount?.discountPrice ? `£ ${viewData?.totalAmount?.discountPrice}` : "There is no discount"} </span></div>
          <div>Pay Amount : <span className='text-green-800 bg-white mb-2 rounded-md px-2 '> £ {(Number(viewData?.totalAmount?.total) + Number(viewData?.totalAmount?.deliveryCharge)- Number(viewData?.totalAmount?.discountPrice || 0)).toFixed(2)} </span></div>
      
        
           </div>
     
          
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Day & Time</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData ?  <span className='bg-slate-100 mb-2 rounded-md px-2 '>{viewData?.time} </span> : 'No data'}
          
        </td>
        </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Order Type</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData ?  <span className='bg-slate-100 mb-2 rounded-md px-2 capitalize'>{viewData?.orderType} </span> : 'No data'}
          
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Payment method</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData ?  <span className='bg-slate-100 mb-2 rounded-md px-2 capitalize'>{viewData?.orderType === "collection" && viewData?.paymentMethode === "Cash on delivery" ? "Pay on Collection" : viewData?.orderType === "delivery" && viewData?.paymentMethode === "Cash on delivery"? "Pay on delivery" : viewData?.paymentMethode}</span> : 'No data'}
          
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Order Status</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData ?  <span className='bg-slate-100 mb-2 rounded-md px-2 '>{viewData?.orderStatus} </span> : 'No data'}
          
        </td>
      </tr>
     
      <tr>
        <td className="py-2 px-4 border  border-gray-300">Delivery Address</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData?.address ? 
              <div className=' bg-slate-100 flex mb-2 rounded-md px-2 gap-2 w-fit' >
  
              <div className='p-2'>
          <div>Address :  <span className='bg-white mb-2 rounded-md px-2 '> {viewData?.address?.address}</span></div>
          <div>Postal Code : <span className='bg-white mb-2 rounded-md px-2 '> {viewData?.address?.postCode}</span></div>
          <div>Note : <span className='bg-white mb-2 rounded-md px-2 '> {viewData?.address?.note ? viewData?.address?.note : "There is no note"} </span></div>
      
        
           </div>
           </div>
        // <span className='bg-slate-100 mb-2 rounded-md px-2 capitalize'>
         
        //    </span> 
           : 'Collection or No data'}
          
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border  border-gray-300">Mobile Number</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData?.orderBy?.mobileNumber ?  <span className='bg-slate-100 mb-2 rounded-md px-2 capitalize'>{viewData?.orderBy?.mobileNumber} </span> : 'Collection or No data'}
          
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-b-1 border-gray-300">Comment</td>
        <td className="py-2 px-4 border border-gray-300 font-semibold">
        
        {viewData?.orderBy?.mobileNumber ?  <span className='bg-slate-100 mb-2 rounded-md px-2 capitalize'>{viewData?.comment ? viewData?.comment :"No comment"} </span> : 'Collection or No data'}
          
        </td>
      </tr>
      
 

      

      
    </tbody>
  </table>
      </div>

</div>
</div>
  )
}
