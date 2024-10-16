import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { cretaeCategory } from '../../../features/actions/sides/categorySides'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

const CreateCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {categoryData,isLoading } = useSelector(state => state.sidesCategory)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        dispatch(cretaeCategory(data))
        console.log(data)
    }

    useEffect(() => {
        if(categoryData?.status){
          navigate("/sidesCategory")
        }
      }, [categoryData]);
    return (
        <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
        <div className="bg-[#EF4444] px-10 py-5 text-center text-white font-semibold">
            Create Sides Category
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-8 py-10">
            <label className="block" htmlFor="name">
                <p className="text-gray-600">Category Name</p>
                <input
                    className="w-full mt-2 rounded-md border bg-white px-2 py-2 outline-none ring-slate-400 focus:ring-1"
                    type="text"
                    {...register("category", { required: true })}

                    
                />
                {errors.category && <span className='text-red-500'>This field is required</span>}
            </label>

            <div className="flex justify-center">
<button type="submit" className="mt-4 w-full rounded-lg  bg-gray-700 hover:bg-gray-800 active:bg-gray-700 px-10 py-2 font-semibold text-white">
{isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Create</>)}
</button>
</div>
        </form>
    </div>

    )
}

export default CreateCategory