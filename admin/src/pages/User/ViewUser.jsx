import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Stack,Skeleton } from '@mui/material';
import { getAllUsers } from '../../features/actions/auth';




const ViewUser = () => {
    const dispatch = useDispatch()
    const { userData,isLoading } = useSelector(state => state.auth)
    const [usersCreatedToday, setUsersCreatedToday] = useState(0);
    
    useEffect(() => {
        if (Array.isArray(userData)) {
          const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
          const usersToday = userData.filter(user => user.createdAt.split("T")[0] === today);
          setUsersCreatedToday(usersToday.length); // Set total users created today
        }
      }, [userData]);
  


    useEffect(() => {
          dispatch(getAllUsers())
      }, [])

        
    return (
        <>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-4">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Manage Users
              </h3>

            </div>
            <div className='font-semibold bg-red-800 rounded-md py-1 px-2 text-white'>
                Total User Created Today : {usersCreatedToday}
            </div>
         
          </div>
          <div className="mt-6 shadow-xl rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-3">S.No.</th>
                  <th className="py-3 px-3">Name </th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Contact No.</th>
                  <th className="py-3 px-3">Created At </th>
                
                  
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
              Array.isArray(userData) && userData.length > 0 && userData.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-4 whitespace-nowrap">{userData.length- idx}</td>
                      <td className="px-3 py-4 whitespace-nowrap ">
                        {item?.firstName} {item?.lastName}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap font-semibold ">
                      {item?.email}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap ">
                        {item?.mobileNumber}
                      </td>
                      <td className=" py-4 whitespace-nowrap ">
                      <span className={`rounded-md py-1 px-3 font-semibold capitalize`}>{item?.createdAt.split("T")[0]}</span>
                       
                      </td>

                    </tr>
                  ))
                
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </>
    )
}



export default ViewUser

