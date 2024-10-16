import React, { useEffect, useState } from 'react'
import { useForm,Controller } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import defaultPhoto from '/placeholder.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateSides } from '../../features/actions/sides/sides'
import { ClipLoader } from "react-spinners";
import { MdInsertPhoto } from "react-icons/md";
import Select from "react-select"

const UpdateSides = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const {state:item}= useLocation()
    const {sidesData,isLoading} = useSelector((state)=>state.sides)
    const {filterData} = useSelector((state)=>state.sidesFilter)
    const {categoryData} = useSelector((state)=>state.sidesCategory)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({ 
        defaultValues:{
        sideName: item?.sideName || "",
        price:item?.price ||"",
        category: Array.isArray(categoryData)&& categoryData.length> 0 && categoryData.map(item=> ({ value: item?._id, label: item?.category }))
        ?.find(c=>c?.label===item?.category?.category) || ""
        ,
        filter: Array.isArray(filterData)&& filterData.length> 0 && filterData.map(item=> ({ value: item?._id, label: item?.filter }))
        ?.find(c=>c?.label===item?.filter?.filter) || ""
        ,
    }})


    const onSubmit = (data) => {
        const {category,filter}= data

        const formData= new FormData()
        formData.append("sideName",data?.sideName)
        formData.append("price",data?.price)
        formData.append("category",category?.value)
        formData.append("filter",filter?.value)
        Array.from(data?.banner).forEach((img)=>{
            formData?.append("banner",img)
        })
        dispatch(updateSides({id:item?._id,payload:formData}))
      
    }

    const [photo, setPhoto] = useState(item?.banner || defaultPhoto );

     const handlePhotoChange = (e) => {
          const selectedPhoto = e.target.files[0];
         
          if (selectedPhoto) {
            
            const reader = new FileReader();
            reader.readAsDataURL(selectedPhoto);
            reader.onloadend = () => {
              setPhoto(reader.result);
            };
          }
        };

    useEffect(() => {
        if(sidesData?.status){
          navigate("/sides")
        }
      }, [sidesData]);

    return (
        <div className="max-w-4xl mx-auto my-5 overflow-hidden rounded-2xl bg-white shadow-lg ">
            <div className="bg-[#EF4444] px-10 py-4 text-center text-white font-semibold">
                UPDATE SIDES 
            </div>
            <form className="space-y-5 my-4 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >
         
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Sides Name</label>
            <input 
            {...register('sideName',  {required:true})}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.sideName && (
                    <span className="text-sm font-medium text-red-500">
                      Sides Name is required
                    </span>
                  )}
          </div>
          <div className="w-full">
            <label className="font-medium">Price</label>
            <input 
            {...register('price',  {required:true})}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.price && (
                    <span className="text-sm font-medium text-red-500">
                      Price is required
                    </span>
                  )}
          </div>

          
          </div>

          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Category</label>
            <Controller 
                                      control={control}
                                      name="category"
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              defaultValue={Array.isArray(categoryData)&& categoryData.length> 0 && categoryData.map(item=> ({ value: item?._id, label: item?.category }))
                                              ?.find(c=>c?.label===item?.category?.category) || ""}
                                              
                                              options={Array.isArray(categoryData)&& categoryData.length> 0 && categoryData.map(item=> ({ value: item?._id, label: item?.category }))}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Choose Category "
                                             
                                              styles={{
                                                  control: (provided) => ({
                                                      ...provided,
                                                      border: '1px solid #CBD5E1', // Set custom border style
                                                      borderRadius: '0.400rem', // Set custom border radius
                                                      height: '40px', // Add height here
                                                  }),
                                                  placeholder: (provided) => ({
                                                      ...provided,
                                                      color: '#9CA3AF', // Set custom placeholder color
                                                  }),
                                              }}
 
                                          />
                                     )}
                                      rules={{ required: true }}
                                      
                                  />
             {errors.category && (
                    <span className=" text-sm font-medium text-red-500">
                      Category is required
                    </span>
                  )}
          </div>
          <div className="w-full">
            <label className="font-medium">Filter</label>
            <Controller 
                                      control={control}
                                      name="filter"
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              defaultValue={Array.isArray(filterData)&& filterData.length> 0 && filterData.map(item=> ({ value: item?._id, label: item?.filter }))
                                              ?.find(c=>c?.label===item?.filter?.filter) || ""}

                                              options={Array.isArray(filterData)&& filterData.length> 0 && filterData.map(item=> ({ value: item?._id, label: item?.filter }))}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Choose Filter "
                                             
                                              styles={{
                                                  control: (provided) => ({
                                                      ...provided,
                                                      border: '1px solid #CBD5E1', // Set custom border style
                                                      borderRadius: '0.400rem', // Set custom border radius
                                                      height: '40px', // Add height here
                                                  }),
                                                  placeholder: (provided) => ({
                                                      ...provided,
                                                      color: '#9CA3AF', // Set custom placeholder color
                                                  }),
                                              }}
 
                                          />
                                     )}
                                      rules={{ required: true }}
                                      
                                  />
             {errors.filter && (
                    <span className="text-sm font-medium text-red-500">
                      Filter is required
                    </span>
                  )}
          </div>
        
       
         
            </div>
            
          <div className="font-medium  space-y-6"> Sides Image 
             
             <img class="mt-2 w-full h-50  sm:w-44 sm:h-36 rounded" src={photo || defaultPhoto} alt="No Image"/>
             <label htmlFor="file_input" className="flex gap-1
             " > <MdInsertPhoto size='25'/>
             <div className="px-2 border rounded-md border-slate-300 hover:bg-red-500 hover:text-white hover:border-none">Click here to upload</div></label>
            
             <input
              {...register('banner',{onChange:(e)=>{handlePhotoChange(e)} })}
            
              className="hidden " id="file_input" type="file"/>
             
             </div>
     
          
             <button type="submit" className=" w-full rounded-lg bg-gray-700 hover:bg-gray-800 active:bg-gray-700 px-10 py-3 font-semibold text-white">
             {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Update</>)}
  </button>
               
           
        </form>  
        </div>

    )
}



export default UpdateSides