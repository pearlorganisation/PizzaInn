import React, { useEffect, useState } from 'react'
import { useForm,useFieldArray} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import defaultPhoto from '/placeholder.jpg'
import { useNavigate } from 'react-router-dom'
import { createDrink } from '../../features/actions/drink/drink'
import { ClipLoader } from "react-spinners";
import { MdInsertPhoto } from "react-icons/md";


const CreateDrink = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {drinkData,isLoading} = useSelector((state)=>state.drink)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({defaultValues:{
      price:[{drinkType:"",price:""}]
    }})
    const onSubmit = (data) => {


        const formData= new FormData()
        formData.append("drink",data?.drink)
        formData.append("price",JSON.stringify(data?.price))
        
        Array.from(data?.banner).forEach((img)=>{
            formData?.append("banner",img)
        })
        console.log(formData.getAll("price"))
        dispatch(createDrink(formData))
      
    }

    const [photo, setPhoto] = useState("");

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
        
const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
    control,
    name: "price"
  });

    useEffect(() => {
        if(drinkData?.status){
          navigate("/drink")
        }
      }, [drinkData]);

    return (
        <div className="max-w-4xl mx-auto my-5 overflow-hidden rounded-2xl bg-white shadow-lg ">
            <div className="bg-[#EF4444] px-10 py-4 text-center text-white font-semibold">
                CREATE DRINK 
            </div>
            <form className="space-y-5 my-4 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >
         
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Drink Name</label>
            <input 
            {...register('drink',  {required:true})}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.drink && (
                    <span className="text-sm font-medium text-red-500">
                      Drink Name is required
                    </span>
                  )}
          </div>
   
 </div>

 <div className="sm:flex sm:space-y-0 justify-between ">

          
<label className="font-medium  text-black">Type and Price </label>
<button
type="button"
className=" border rounded-md  bg-slate-700 text-white font-semibold text-xl px-2  hover:bg-slate-800"
onClick={() => appendPrice({ price: ""})}
>
+
</button>
</div>
<ul>
{priceFields.map((item, index) => (
<li key={item.id}>

<div className="sm:flex gap-10 ">
<div className="w-full">

<input
{...register(`price.${index}.drinkType`, { required: 'Type is required' })}
  type="text"
  placeholder=" Type "
  className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>
<div className="w-full">

<input
{...register(`price.${index}.price`, { required: 'Price is required' })}
  type="text"
  placeholder="Price "
  className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>

</div>
{ index>0 && (
<button className=" border rounded-md bg-red-500 font-semibold text-white text-sm px-2  hover:bg-red-600" type="button" onClick={() => removePrice(index)}>Remove</button>)
}
</li>

))}
</ul>
{errors.price && (
<span className="text-red-500">
  Both Fields are required
</span>
)}

     
            
          <div className="font-medium  space-y-6"> Drink Image 


             
             <img class="mt-2 w-full h-50  sm:w-44 sm:h-36 rounded" src={photo || defaultPhoto} alt="No Image"/>
             <label htmlFor="file_input" className="flex gap-1
             " > <MdInsertPhoto size='25'/>
             <div className="px-2 border rounded-md border-slate-300 hover:bg-red-500 hover:text-white hover:border-none">Click here to upload</div></label>
            
             <input
              {...register('banner', { required: true,onChange:(e)=>{handlePhotoChange(e)} })}
            
              className="hidden" id="file_input" type="file"/>
               {errors.banner && (
                     <span className="text-sm font-medium text-red-500">
                       Image is required
                     </span>
                   )}
             </div>
     
          
             <button type="submit" className=" w-full rounded-lg bg-gray-700 hover:bg-gray-800 active:bg-gray-700 px-10 py-3 font-semibold text-white">
             {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Create</>)}
  </button>
               
           
        </form>  
        </div>

    )
}



export default CreateDrink