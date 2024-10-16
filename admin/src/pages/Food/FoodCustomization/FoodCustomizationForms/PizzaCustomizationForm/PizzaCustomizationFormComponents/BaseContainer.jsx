import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { Stack, Skeleton } from "@mui/material";
import { deleteBasePizza } from "../../../../../../features/actions/pizza/deleteCustomization";
import Delete from "../../../../../../components/delete";
import BaseModal from "../../../../../../components/FoodCustomizationDialog/BaseModal";
import EditBaseModal from "../../../../../../components/FoodCustomizationDialog/EditItemModel/EditBaseModal";

const BaseContainer = () => {
  const { base, isBaseLoading } = useSelector((state) => state.pizza);
  const [editItemData, setEditData] = useState(base[1]);
  const [modal, setModal] = useState(false);
  const modalRef = useRef();

  const dispatch = useDispatch();
  function handleModalOpen() {
    // modalRef.current.open();
    setModal((prev) => !prev);
  }

  function handleEditItem(data) {
    setEditData(data);
    setModal((prev) => !prev);
  }

  useEffect(() => {
    console.log("safasf", editItemData);
  }, [editItemData]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();

  const handleDeleteModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  const handleDelete = () => {
    dispatch(deleteBasePizza(id));

    setShowDeleteModal(false);
    setId("");
  };

  return (
    <>
      <BaseModal ref={modalRef} itemName="Base" />
      {modal && (
        <EditBaseModal
          setModal={setModal}
          data={editItemData}
          itemName="Base"
        />
      )}{" "}
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
      <div className="flex flex-col">
        <div className="flex p-2 justify-between">
          <h3 className=" font-semibold  tracking-wide border rounded-md px-2 bg-red-500 text-white text-lg">
            PIZZA BASE
          </h3>
          <div onClick={() => modalRef.current.open()}>
            <IoAddCircleSharp
              size={32}
              className=" cursor-pointer  hover:bg-slate-600 bg-slate-700 rounded-lg text-white "
            />
          </div>
        </div>
        <div className="p-2">
          <div className="p-3 bg-white border shadow-md border-gray-400 rounded-lg h-[400px]">
            <table className="min-w-full text-slate-700  border-separate border-spacing-x-2 border-spacing-y-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr>
                  <th className="border-b-2 p-2 text-left">Pizza Base</th>
                  <th className="border-b-2 p-2 ">Actions</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {isBaseLoading ? (
                  <td colSpan="3" className="text-center px-6 py-8">
                    <Stack spacing={4}>
                      <Skeleton variant="rounded" height={30} />
                      <Skeleton variant="rounded" height={25} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                    </Stack>
                  </td>
                ) : (
                  Array.isArray(base) &&
                  base?.map((item) => (
                    <tr key={item?._id}>
                      <td className="p-2 max-w-[100px] truncate">
                        {item?.name}
                      </td>

                      {/* <td className="p-2">£ {item?.price}</td> */}

                      <td className="flex justify-center items-center gap-4">
                        <button
                          className="inline-flex items-center rounded-lg font-medium text-white bg-green-800 hover:bg-green-700
                           px-2 py-1 text-sm "
                          onClick={() => handleEditItem(item)}
                        >
                          <RiEditCircleFill size={28} />
                        </button>
                        <button className="bg-red-700 hover:bg-red-600 rounded-lg text-white px-2 py-1  object-cover">
                          <MdDelete
                            size={28}
                            onClick={() => handleDeleteModal(item?._id)}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseContainer;
