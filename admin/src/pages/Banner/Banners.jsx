// src/components/Banner.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stack, Skeleton } from "@mui/material";
import { deleteBanner, getBanner } from "../../features/actions/banner/banner";
import Delete from "../../components/delete";
import { getDeal } from "../../features/actions/deals/deal";

const Banner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the correct slice of the state
  const { isDeleted, bannerData, isLoading, errorMessage } = useSelector(
    (state) => state.banner
  );



  console.log("bannerData:", bannerData);

  // Handler to navigate to the create banner page
  const handleAddBanner = () => {
    navigate("/addBanner"); // Ensure this route exists in your routing setup
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();


  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  // Function to handle the deletion of a banner
  const handleDelete = () => {
    dispatch(deleteBanner(id));
    setShowDeleteModal(false);
    setId("");
  };

  // Fetch banners on component mount
  useEffect(() => {
    dispatch(getBanner());
    dispatch(getDeal())
  }, [dispatch]);

  // Refetch banners after a banner is deleted
  useEffect(() => {
    if (isDeleted) {
      dispatch(getBanner());
    }
  }, [isDeleted, dispatch]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-4">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Banners
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              This page allows you to create, update, and delete banners.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <button
              onClick={handleAddBanner}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-500 md:text-sm"
            >
              Add Banner
            </button>
          </div>
        </div>
        <div className="mt-6 shadow-xl rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Banner Image</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-8">
                    <Stack spacing={4}>
                      <Skeleton variant="rounded" height={30} />
                      <Skeleton variant="rounded" height={25} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                    </Stack>
                  </td>
                </tr>
              ) : Array.isArray(bannerData) && bannerData.length > 0 ? (
                bannerData.map((item, idx) => (
                  <tr >
                    <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.deal?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.banner}
                        alt={item.deal?.title || "Banner"}
                        className="rounded-lg w-40 h-30"
                      />
                    </td>

                    <td className="whitespace-nowrap flex space-x-2 mt-10">
                      <button
                        onClick={() =>
                          navigate(`/updateBanner/${item._id}`, { state: item })
                        }
                        className="cursor-pointer py-2 px-3 font-semibold text-green-600 hover:text-green-700 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleModal(item._id)}
                        className="py-2 leading-none px-3 font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-8">
                    No banners available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default Banner;
