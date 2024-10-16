import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Stack, Skeleton } from '@mui/material';
import { deleteSides, getSides } from '../../features/actions/sides/sides';
import Delete from '../../components/delete';
import { getCategory } from '../../features/actions/sides/categorySides';
import { getFilter } from '../../features/actions/sides/filterSides';



const Sides = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isDeleted, sidesData, isLoading } = useSelector(state => state.sides)
  
  const handleAddCategory = () => {
    navigate('/createSides');
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [id, setId] = useState();
    
    const handleModal = (ID) => {
      setShowDeleteModal(true);
      setId(ID);
      }; 
      const handleDelete = () => {
        dispatch(deleteSides(id));
        
        setShowDeleteModal(false);
        setId('');
        };
    
    useEffect(() => {
      dispatch(getSides())
      dispatch(getCategory())
      dispatch(getFilter())
    }, [])

  useEffect(() => {
    if(isDeleted){
      dispatch(getSides());
    }
      }, [isDeleted]);
    

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-4">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Sides
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              This page is for handle sides by create , update and delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <button
              onClick={handleAddCategory}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-500 md:text-sm"
            >
              Add Sides
            </button>
          </div>
        </div>
        <div className="mt-6 shadow-xl rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Sides </th>
                <th className="py-3 px-6">Image </th>
                <th className="py-3 px-6">Category </th>
                <th className="py-3 px-6">Price </th>
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
              ) : (
                Array.isArray(sidesData) && sidesData.length > 0 && sidesData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item?.sideName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <img src={item?.banner} className='rounded-lg w-24 h-20' />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item?.category?.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      £ {item?.price}
                    </td>



                    <td className=" whitespace-nowrap">
                      <a
                          onClick={() => {
                            navigate(`/updateSides/${item?._id}`, { state: item  });
                          }}
                        className="cursor-pointer py-2 px-3 font-semibold text-green-600 hover:text-green-700 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </a>
                      <button
                          onClick={() => {
                            handleModal(item?._id);
                          }}
                        className="py-2 leading-none px-3 font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))

              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
          <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
        )}
    </>
  )
}



export default Sides