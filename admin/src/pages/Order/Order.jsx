import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Stack,Skeleton } from '@mui/material';
import { getAllOrders, updateOrder } from '../../features/actions/order/order';
import OrderViewModal from './OrderViewModal';



const Order = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [approval, setApproval] = useState({});
    const { orderData,isLoading } = useSelector(state => state.order)

    const [showViewModal,setShowViewModal] = useState(false)
    const [viewData,setViewData]= useState()
    const handleViewModal=(itemData)=>{
      setShowViewModal(true)
      setViewData(itemData)
    }


    const handleChange = (event, orderId) => {
      const value = event.target.value;
      setApproval((prevApproval) => ({
        ...prevApproval,
        [orderId]: value === 'Pending' ? null : value === 'Completed' ? "Completed" : "Cancelled",
      }));
    };
  

    const handleSubmit = (event, orderId) => {
      event.preventDefault();
      dispatch(updateOrder({ id:orderId, isCompleted: approval[orderId] }));
    };

    useEffect(() => {
      
          dispatch(getAllOrders());
          console.log("avnish2")

      }, [])
    useEffect(() => {
      if (Array.isArray(orderData) && orderData.length > 0) {
        const initialApproval = {};
        orderData?.forEach((item) => { console.log(item.orderStatus)
          return initialApproval[item._id] = item.orderStatus == "Pending" ? "Pending" : item.orderStatus ;
        });
        console.log(initialApproval)
        setApproval(initialApproval);
        console.log("avnish1")
      }

    }, [orderData]);



        
    return (
        <>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-4">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Manage Orders 
              </h3>
              <p className="text-gray-600 text-sm mt-2">
              This page is for handle orders
              </p>
            </div>
         
          </div>
          <div className="mt-6 shadow-xl rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-3">Order Id</th>
                  <th className="py-3 px-3">Name </th>
                  <th className="py-3 px-3">Pay Amount </th>
                  <th className="py-3 px-3">Time </th>
                  <th className="py-3 px-3">Order Type </th>
                  <th className="py-3 px-3">Payment Method </th>
                  <th className="py-3 px-3">Order Status</th>
                  <th className="py-3 px-3">Actions</th>
                
                  
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
              {isLoading ? (
              <tr>
              <td colSpan="8" className="text-center px-6 py-8">
                <Stack spacing={4}>
                  <Skeleton variant="rounded" height={30} />
                  <Skeleton variant="rounded" height={25}/>
                  <Skeleton variant="rounded" height={20}/>
                  <Skeleton variant="rounded" height={20}/>
                  <Skeleton variant="rounded" height={20}/>
                </Stack>
              </td>
            </tr>
            ) : (
              Array.isArray(orderData) && orderData.length > 0 && orderData.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-4 whitespace-nowrap">{item?.orderNumber}</td>
                      <td className="px-3 py-4 whitespace-nowrap ">
                        {item?.orderBy?.firstName} {item?.orderBy?.lastName}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap font-semibold ">
                      £ {(Number(item?.totalAmount?.total) + Number(item?.totalAmount?.deliveryCharge)- Number(item?.totalAmount?.discountPrice || 0)).toFixed(2)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap ">
                        {item?.time}
                      </td>
                      <td className=" py-4 whitespace-nowrap ">
                      <span className={`rounded-md py-1 px-3 font-semibold capitalize`}>{item?.orderType}</span>
                       
                      </td>
                      <td className=" py-4 whitespace-nowrap ">
                      <span className={`rounded-md py-1 px-3 font-bold capitalize ${item?.paymentMethode === 'Online Payment' ? "text-emerald-600" : "text-yellow-600" }`}>{item?.orderType === "collection" && item?.paymentMethode === "Cash on delivery" ? "Pay on Collection" : item?.orderType === "delivery" && item?.paymentMethode === "Cash on delivery"? "Pay on delivery" : item?.paymentMethode }</span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap ">
                      <form onSubmit={(e) => handleSubmit(e, item._id)} className="flex items-center">
                          <select
                            value={approval[item._id] !== undefined ? approval[item._id] === "Completed" ? 'Completed' : approval[item._id] === 'Cancelled' ? 'Cancelled' : "" : ""}
                            onChange={(e) => handleChange(e, item._id)}
                            className="px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                          >
                            <option value="" disabled hidden>
                              Choose Status
                            </option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button type="submit" className="py-2 px-3 font-semibold text-blue-500 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg">
                            Save
                          </button>
                        </form>
                      
                      </td>
                  
                 
                      
                     
                      <td className=" whitespace-nowrap">
                      <button
                          onClick={() => {
                            handleViewModal(item)
                          }}
                          className="py-2 leading-none px-6 font-semibold text-green-600 hover:text-green-700 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          View full details
                        </button>
     
                      </td>
                    </tr>
                  ))
                
                )}
              </tbody>
            </table>
          </div>
        </div>
        {showViewModal && (
        <OrderViewModal setModal={setShowViewModal} viewData={viewData} />
      )}
      </>
    )
}



export default Order

