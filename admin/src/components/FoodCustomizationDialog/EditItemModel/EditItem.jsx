import React, {useEffect, useState} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import ReactDOM from "react-dom";
import Select from 'react-select'
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {  updateBasePizza, updateCheesePizza, updateMeatTopping, updateSaucePizza, updateSizePizza, updateVegTopping  } from "../../../features/actions/pizza/patchCustomization";

const EditItem = ({ data, setModal, itemName }) => {
  
  const dispatch = useDispatch();

  const {size} = useSelector((state)=>state.pizza)

  const sizeHashMap = new Map();

  size.forEach(element => {
    sizeHashMap.set(element._id, { value: element._id, label: element.name });
  });
  
  console.log( sizeHashMap.get("6683c957888a970ed1e08341"))
  const { register, handleSubmit, control, setValue, reset ,formState:{errors} } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: data.name,
      price: (Array.isArray(data.price) &&
        data.price.map((priceItem) => {
          return {
            singlePrice: priceItem.singlePrice,
            doublePrice: priceItem.doublePrice,
            singlePriceCYOP:priceItem.singlePriceCYOP,
            doublePriceCYOP:priceItem.doublePriceCYOP,
            size:sizeHashMap.get(priceItem.size)
            // size:sizeHashMap.get(priceItem.size)
          };
        })) || [{ price: "" }, { price: "" }],
  }});

  const [selectedSizes, setSelectedSizes] = useState([]);
  const sizeOptions = (size) =>
    size.filter(item => !selectedSizes.includes(item._id)).map(item => ({
      value: item?._id,
      label: item?.name,
    }));

  const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
    control,
    name: "price"
  });


  useEffect(() => {
    if (data && (itemName === 'Base' || itemName === 'Size') ) {
      setValue("name", data.name);
      setValue("price", data.price);
    }
    else if(data )
      {
      setValue("name", data.name);
      setValue("singlePrice", data.singlePrice);
      setValue("doublePrice", data.doublePrice );
      }
  }, [data, setValue ,itemName]);

  const onSubmit = (submissionData2) => {
    const {price,...rest}= submissionData2
    console.log(data)
    const submissionSizeWithPrice= price.map((price)=> {return {
      singlePrice:price.singlePrice,
      doublePrice:price.doublePrice,
      singlePriceCYOP:price.singlePriceCYOP,
      doublePriceCYOP:price.doublePriceCYOP,
      size:price.size.value
    }})
      const submissionData = {...rest,price:submissionSizeWithPrice}
      console.log("sdgf",submissionData)

    try {
      if (itemName === "Base") {
        console.log("sendindshjsd");
        dispatch(
          updateBasePizza({
            ...submissionData,
            _id: data._id,
          })
        );
      } else if(itemName === "Size"){
                console.log("sendindshjsd");

        dispatch(
          updateSizePizza({
            ...submissionData,
            _id: data._id,
          })
        );
      }
      else if(itemName === "SAUCE"){

        // const filterSubmissionData = submissionData.map() 
        dispatch(
          updateSaucePizza({
            _id: data._id,
            ...submissionData,
          })
        );
        console.log(submissionData)
      }
      else if(itemName === "MEAT TOPPINGS"){
        dispatch(
          updateMeatTopping({
            ...submissionData,
            _id: data._id,
          })
        );
      }
      else if(itemName === "VEGETARIAN TOPPINGS"){
        dispatch(
          updateVegTopping({
            ...submissionData,
            _id: data._id,
          })
        );
      }
      else if(itemName === "CHEESE"){
        dispatch(
          updateCheesePizza({
            ...submissionData,
            _id: data._id,
          })
        );
      }

      reset(); // Reset the form fields
      setModal((prev) => !prev);
    } catch (e) {
      console.log("Error occurred ", e);
    }
  };

  return ReactDOM.createPortal(
    <dialog
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center rounded-2xl w-[600px] md:inset-0 max-h-full"
      open
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl  text-slate-700 rounded-md font-semibold py-1 dark:text-white">
              {itemName}
            </h3>
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setModal((prev) => !prev)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit((data) => {
            onSubmit(data);
            })}>
            <div className=" space-y-4">
              <div className="mb-2 space-y-1">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="border p-[7px] rounded-md outline-slate-600 w-full"
                  placeholder={`Enter ${itemName}`}
                  required
                  minLength={2}
                  
                />
              </div>
              <label className="font-medium text-gray-700">Size and Price </label>
<button
type="button"
className=" border rounded-md  bg-slate-700 text-white font-semibold text-xl px-2   hover:bg-slate-800"
onClick={() => appendPrice({ price: ""})}
>
+
</button>
<div className="flex ">
  <div className="w-[20%] text-center font-semibold text-sm">Size</div>
  <div className="w-[40%] text-center font-semibold text-sm">Normal Price</div>
  <div className="w-[40%] text-center font-semibold text-sm">Create Your Own Pizza Price</div>
</div>
{itemName === "CHEESE" ?
<ul>
{priceFields.map((item, index) => (
<li key={item.id}>

<div className="sm:flex gap-5 ">
<div className="w-[20%] mb-4 ">

    <Controller 
                                      control={control}
                                      name={`price.${index}.size`}
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              options={sizeOptions(size)}
                                              onChange={(selectedOption) => 
                                               { field.onChange(selectedOption)
                                                setSelectedSizes([...selectedSizes, selectedOption.value]);
                                              }}
                                              className="mt-2 "
                                              placeholder="Choose Pizza Size "
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

</div>
<div className="w-[20%] ">
<input
{...register(`price.${index}.singlePrice`, { required: true })}
  type="text"
  placeholder="Single Price "
  className="w-full mt-2 px-5 py-[7px] text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>
<div className="w-[20%] ">

<input
{...register(`price.${index}.doublePrice`, { required: true })}
  type="text"
  placeholder="Double Price "
  className="w-full mt-2 px-5 py-[7px] text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>
<div className="w-[20%] ">

<input
{...register(`price.${index}.singlePriceCYOP`, { required: true })}
  type="text"
  placeholder="Single Price CYOP"
  className="w-full mt-2 px-5 py-[7px] text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>
<div className="w-[20%] ">

<input
{...register(`price.${index}.doublePriceCYOP`, { required: true })}
  type="text"
  placeholder="Double Price CYOP"
  className="w-full mt-2 px-5 py-[7px] text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>

</div>
{ index>0 && (
<button className=" border rounded-md bg-red-500 font-semibold text-white text-sm px-2  hover:bg-red-600" type="button" onClick={() => removePrice(index)}>Remove</button>)
}
</li>

))}
</ul> : <ul>
{priceFields.map((item, index) => (
<li key={item.id}>

<div className="sm:flex gap-5 ">
<div className="w-[50%] mb-4 ">

    <Controller 
                                      control={control}
                                      name={`price.${index}.size`}
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              options={sizeOptions(size)}
                                              onChange={(selectedOption) => 
                                               { field.onChange(selectedOption)
                                                setSelectedSizes([...selectedSizes, selectedOption.value]);
                                              }}
                                              className="mt-2 "
                                              placeholder="Choose Pizza Size "
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

</div>
<div className="w-[25%] ">

<input
{...register(`price.${index}.singlePrice`, { required: true })}
  type="text"
  placeholder="Single Price "
  className="w-full mt-2 px-5 py-[7px] text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>
<div className="w-[25%] ">

<input
{...register(`price.${index}.doublePrice`, { required: true })}
  type="text"
  placeholder="Double Price "
  className="w-full mt-2 px-5 py-[7px] text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
/>

</div>

</div>
{ index>0 && (
<button className=" border rounded-md bg-red-500 font-semibold text-white text-sm px-2  hover:bg-red-600" type="button" onClick={() => removePrice(index)}>Remove</button>)
}
</li>

))}
</ul> }
{errors.priceSection && (
<span className="text-sm font-medium text-red-500">
  Both Fields are required
</span>
)}
</div>
    
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
              <button
                type="button"
                className="py-2 px-5 ms-3 text-sm font-medium focus:outline-none bg-red-500 text-white rounded-lg border border-gray-200 hover:bg-red-700  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => dialogRef.current.close()}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </dialog>,
    document.body // Ensure you have a div with this id in your HTML file
  );
};

export default EditItem;
