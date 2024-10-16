import React, { useRef, useState } from "react";
import FoodModal from "../../../../../../components/FoodCustomizationDialog/FoodModal";
import { useDispatch } from "react-redux";
import { deleteCheesePizza, deleteMeatTopping, deleteSaucePizza, deleteVegTopping } from "../../../../../../features/actions/pizza/deleteCustomization";
import EditItem from "../../../../../../components/FoodCustomizationDialog/EditItemModel/EditItem";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import Delete from "../../../../../../components/delete";
import { useSelector } from "react-redux";
import { Stack,Skeleton } from '@mui/material';


const CommonContainer = ({ itemName, items }) => {


 const dispatch = useDispatch();
const {isMeatToppingeLoading,isVegToppingLoading,isSauceLoading,isCheeseLoading} =useSelector((state)=>state.pizza)

 const [editItemData , setEditItem] = useState();
 const [modal, setModal] = useState(false);


  const modalRef = useRef();

  function handleEditItem(data)
  {
    setEditItem(data)
    setModal((prev) => !prev);
  }


  function handleModalOpen() {
    modalRef.current.open();
  }

    
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  
  const handleDeleteModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
    }; 
      
    const handleDelete = () => {
      if(itemName === "SAUCE")
        {
          dispatch(deleteSaucePizza(id))
        }
        else if(itemName === "CHEESE"){
          dispatch(deleteCheesePizza(id))
    
        }
        else if(itemName === "MEAT TOPPINGS"){
          dispatch(deleteMeatTopping(id))
    
        }
        else if(itemName === "VEGETARIAN TOPPINGS"){
          dispatch(deleteVegTopping(id))
    
        }
    
        setShowDeleteModal(false);
        setId('');
      };


  return (
    <>
    <FoodModal ref={modalRef} itemName={itemName} />
  {modal &&  <EditItem setModal={setModal}
          data={editItemData}
         itemName = {itemName}/>}
    {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
    <div className="flex flex-col">
      <div className="flex justify-between p-2">
        <h3 className="font-semibold  tracking-wide border rounded-md px-2 bg-red-500 text-white text-lg">{itemName}</h3>
        <div onClick={handleModalOpen}>
        <IoAddCircleSharp size={32} className=" cursor-pointer  hover:bg-slate-600 bg-slate-700 rounded-lg text-white " />
        </div>
      </div>
      <div className="p-2">
        <div className=" text-slate-700 p-3 border shadow-md bg-white border-gray-400 rounded-lg h-[400px] overflow-auto">
          <table className="min-w-full border-separate border-spacing-x-2 border-spacing-y-2">
            <thead className="hidden border-b lg:table-header-group"  >
              <tr>
              <th className="border-b-2 p-2 text-left">Name</th>
    
                <th className="border-b-2 p-2 ">Actions</th>
              </tr>
            </thead>
            <tbody className="font-medium">
           {
          (itemName === "SAUCE" && isSauceLoading) ||
          (itemName === "CHEESE" && isCheeseLoading) ||
          (itemName === "MEAT TOPPINGS" && isMeatToppingeLoading) ||
          (itemName === "VEGETARIAN TOPPINGS" && isVegToppingLoading) ? (
          <td colSpan="4" className="text-center px-6 py-8">
            <Stack spacing={4}>
              {itemName === "SAUCE" && isSauceLoading && (
                <>
                  <Skeleton variant="rounded" height={30} />
                  <Skeleton variant="rounded" height={25} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                </>
              )}
              {itemName === "CHEESE" && isCheeseLoading && (
                <>
                  <Skeleton variant="rounded" height={30} />
                  <Skeleton variant="rounded" height={25} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                </>
              )}
              {itemName === "MEAT TOPPINGS" && isMeatToppingeLoading && (
                <>
                  <Skeleton variant="rounded" height={30} />
                  <Skeleton variant="rounded" height={25} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                </>
              )}
              {itemName === "VEGETARIAN TOPPINGS" && isVegToppingLoading && (
                <>
                  <Skeleton variant="rounded" height={30} />
                  <Skeleton variant="rounded" height={25} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                  <Skeleton variant="rounded" height={20} />
                </>
              )}
            </Stack>
          </td>
        ):(items?.map((item) => (
                <tr key={item?._id}>
                  <td className="p-2 max-w-[100px] truncate">
                    {item?.name}
                    </td>
                 
       
                  <td className="flex justify-center items-center gap-4">
                  <button
                        className="inline-flex items-center rounded-lg font-medium text-white bg-green-800 hover:bg-green-700
                         px-2 py-1 text-sm "
                        onClick={()=>handleEditItem(item)}
                      >
                       <RiEditCircleFill size={28}/>
                      </button>
                      <button className="bg-red-700 hover:bg-red-600 rounded-lg text-white px-2 py-1  object-cover"  onClick={() => handleDeleteModal(item?._id)}>
                        <MdDelete
                          size={28}
                         
                        />
                      </button>
                  
                  </td>
                </tr>
              )))
              }

              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
  );
};

export default CommonContainer;
