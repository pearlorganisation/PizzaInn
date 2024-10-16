import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditItem from "../../../../../../components/FoodCustomizationDialog/EditItemModel/EditItem";
import { deleteSizePizza } from "../../../../../../features/actions/pizza/deleteCustomization";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import Delete from "../../../../../../components/delete";
import { Stack,Skeleton } from '@mui/material';
import SizeModal from "../../../../../../components/FoodCustomizationDialog/SizeModal";
import EditSizeModal from "../../../../../../components/FoodCustomizationDialog/EditItemModel/EditSizeModal";


const SizeContainer = () => {



  const {size,isSizeLoading} = useSelector((state)=>state?.pizza);
  const [editItemData , setEditData] = useState({});

  const modalRef = useRef();
  const editRef = useRef();
  
  const dispatch = useDispatch();
  
  

  function handleEditItem(data) {
    editRef.current.open();
    setEditData(data);
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
        dispatch(deleteSizePizza(id));
    
        setShowDeleteModal(false);
        setId('');
      };



  return (
    <>
      <SizeModal ref={modalRef} itemName="Size" />
      <EditSizeModal itemName="Size" ref={editRef} data = {editItemData} />
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
      <div className="flex flex-col">
        <div className="flex justify-between p-2">
          <h3 className="font-semibold  tracking-wide border rounded-md px-2 bg-red-500 text-white text-lg">PIZZA SIZE</h3>
          <div onClick={handleModalOpen}>
          <IoAddCircleSharp size={32} className=" cursor-pointer  hover:bg-slate-600 bg-slate-700 rounded-lg text-white " />
          </div>
        </div>
        <div className="p-2">
          <div className=" text-slate-700 p-3 border shadow-md bg-white border-gray-400 rounded-lg h-[400px] overflow-auto">
            <table className="min-w-full border-separate border-spacing-x-2 border-spacing-y-2">
              <thead className="hidden border-b lg:table-header-group"  >
                <tr>
                  <th className="border-b-2 p-2 text-left">Pizza Size</th>
                  <th className="border-b-2 p-2 ">Actions</th>
                </tr>
              </thead>

              <tbody className="font-medium">
             { isSizeLoading ? (
              <td colSpan="3" className="text-center px-6 py-8">
              <Stack spacing={4}>
                <Skeleton variant="rounded" height={30} />
                <Skeleton variant="rounded" height={25}/>
                <Skeleton variant="rounded" height={20}/>
                <Skeleton variant="rounded" height={20}/>
                <Skeleton variant="rounded" height={20}/>
              </Stack>
            </td>
             ) : (
              size?.map((item) => (
                  <tr key={item?._id}>
                    <td className="p-2 max-w-[100px] truncate">{item?.name}</td>
           

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

export default SizeContainer;
