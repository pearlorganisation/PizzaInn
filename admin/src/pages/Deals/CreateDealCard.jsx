import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { getPizza } from '../../features/actions/pizza/pizza';
import defaultPhoto from '/placeholder.jpg'
import Select from "react-select";
import { MdInsertPhoto } from 'react-icons/md';
import { createDeal } from '../../features/actions/deals/deal';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const CreateDealCard = () => {

  const { handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues:{
       priceSection :[{ size: "", price: "" }],
       extraLoading: [{ extra: "" }]
      },
    
  });


  const { pizzaData } = useSelector((state) => state.pizzaSlice);
  const { size } = useSelector((state) => state.pizza);
  const { isLoading,isSuccess,dealData } = useSelector((state) => state.deals);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();

  const sizeOptions = (size) =>
    size?.filter(item => !selectedSizes.includes(item?._id)).map(item => ({
      value: item?._id,
      label: item?.name,
    }));

  


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPizza());
  }, []);



  useEffect(()=>{
    if(isSuccess)
      navigate('/deal')
  },[isSuccess]);


  const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
    control,
    name: "priceSection"
  });
  const { fields: extraFields, append: appendExtra, remove: removeExtra } = useFieldArray({
    control,
    name: "extraLoading"
  });

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

  function handleSubmittion(data) {
    console.log("sgjsagdjsha",data);
    const formData = new FormData();
    const defaultDrinkType = data?.drinkType?.value || "can";
    const chooseItems = {
      pizzas: data?.numberOfPizzas,
      drinks: data?.numberOfDrinks
    };
    let defaultItems = []
if(data.extraLoading[0].extra != "")
   { defaultItems = data.extraLoading.map(el => el.extra) || [];}
    console.log("defaultItems",defaultItems);
    const priceSectionFilter = data.priceSection.map(item => ({
      size: item?.size?.label || '',
      price: item?.price || ''
    }));
    const selectedPizzas = data?.selectedpizzas?.map(item => item.value)||[];

    // Build the submission data
    const submittionData = {
      defaultDrinkType : defaultDrinkType||'can',
      chooseItems,
      defaultItems,
      title: data.title,
      sizes: priceSectionFilter,
      pizzaData: selectedPizzas
    };

    // Append data to FormData
    formData.append("title", data?.title || '');
    formData.append('defaultDrinkType', defaultDrinkType);
    formData.append('sizes', JSON.stringify(priceSectionFilter));
    formData.append('pizzaData', JSON.stringify(selectedPizzas));
    formData.append('chooseItems', JSON.stringify(chooseItems));
    formData.append('defaultItems', JSON.stringify(defaultItems));
    Array.from(data?.banner).forEach((img) => {
      formData?.append("banner", img)
    })



    // Log FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Log the submission data
    console.log("Submission Data:", submittionData);

    dispatch(createDeal(formData));
    if(isSuccess)
      {
        navigate('/deal')
      } 




  }

  return (
    <div className='h-screen '>
      <div className='bg-red-600 p-4'>
        <p className='text-center text-white -tracking-wide font-bold text-2xl'>Create Deal</p>
      </div>
      <div>
     
    <form onSubmit={handleSubmit(handleSubmittion)} className='p-10'>

          <div className='grid grid-cols-2 gap-4 px-4'>
            <div className="mb-5">
              <label htmlFor="dealName" className=" text-2xl block mb-2  font-medium text-gray-900 dark:text-white">Enter Deal Name</label>
              <input

                type='text'
                {...register('title', {
                  required: "Enter This Field",

                  minLength: {
                    value: 5,
                    message: "Min Length of Deal is 5"
                  },
                  maxLength: {
                    value: 100,
                    message: "Max Length of Deal is 100"
                  }
                })} className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="deal name" />
              {
                errors.dealName && <p>
                  {errors.dealName.message}
                </p>
              }
            </div>


            <div>
              <label htmlFor="numberOfPizzas" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Enter Number of Pizza's</label>
              <input
                type="number"
                {...register('numberOfPizzas', {
                  required: "This is required field",
                  min: {
                    value: 1,
                    message: "Value Can be at least 1 ..."
                  },
                  max: {
                    value: 20,
                    message: "Max Value Can be  20 ..."
                  },
                })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="pizzas" required />
              {
                errors.numberOfPizzas && <p>
                  {errors.numberOfPizzas.message}
                </p>
              }
            </div>

            <div>
              <label htmlFor="numberOfDrinks" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Enter Number of Drink's </label>
              <input
                type='Number'
                {...register('numberOfDrinks', {
                  required: "This is required field",
                  min: {
                    value: 0,
                    message: "Value Can be at least 0 ..."
                  },
                  max: {
                    value: 20,
                    message: "Max Value Can be  20 ..."
                  },
                })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="drinks" required />
              {
                errors.numberOfDrinks && <p>
                  {errors.numberOfDrinks.message}
                </p>
              }
            </div>




            <div>
              <p className='text-xl font-semibold'>Select Pizza Not To Include in Deals </p>
              {Array.isArray(pizzaData) && (
                <Controller
                  name="selectedpizzas"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      placeholder="Select Pizza's For Deals"
                      options={pizzaData.map(pizza => ({
                        value: pizza._id,
                        label: pizza.pizzaName,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedOptions) => field.onChange(selectedOptions)}
                      value={field.value}
                    />
                  )}
                />
              )}
            </div>

            <div>
              <div className="sm:flex sm:space-y-0 justify-between ">


                <label className="font-medium  text-black">Size and Price </label>
                <button
                  type="button"
                  className=" border rounded-md  bg-slate-700 text-white font-semibold text-xl px-2  hover:bg-slate-800"
                  onClick={() => appendPrice({ price: "" })}
                >
                  +
                </button>
              </div>
              <ul>
                {priceFields.map((item, index) => (
                  <li key={item.id}>

                    <div className="sm:flex gap-10 ">
                      <div className="w-full">

                        <Controller
                          control={control}
                          name={`priceSection.${index}.size`}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              options={sizeOptions(size)}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption)
                                setSelectedSizes([...selectedSizes, selectedOption.value]);
                              }}
                              className="mt-2 "
                              placeholder="Choose Size "
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
                      <div className="w-full">

                        <input
                          {...register(`priceSection.${index}.price`, { required: 'Price is required' })}
                          type="text"
                          placeholder="Price "
                          className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                        />

                      </div>

                    </div>
                    {index > 0 && (
                      <button className=" border rounded-md bg-red-500 font-semibold text-white text-sm px-2  hover:bg-red-600" type="button" onClick={() => removePrice(index)}>Remove</button>)
                    }
                  </li>

                ))}
              </ul>
              {errors.priceSection && (
                <span className="text-sm font-medium text-red-500">
                  Both Fields are required
                </span>
              )}
            </div>

            <div className="font-medium  space-y-6"> Deals Image

              <img className="mt-2 w-full h-50  sm:w-44 sm:h-36 rounded" src={photo || defaultPhoto} alt="No Image" />
              <label htmlFor="file_input" className="flex gap-1
   " > <MdInsertPhoto size='25' />
                <div className="px-2 border rounded-md border-slate-300 hover:bg-red-500 hover:text-white hover:border-none">Click here to upload</div></label>

              <input
                {...register('banner', { required: true, onChange: (e) => { handlePhotoChange(e) } })}

                className="hidden " id="file_input" type="file" />
              {errors.banner && (
                <span className="text-sm font-medium text-red-500">
                  Image is required
                </span>
              )}
            </div>




            <div>
              <div className="sm:flex sm:space-y-0 justify-between">
                <label className="font-medium text-black">Extra Loading's</label>
                <button
                  type="button"
                  className="border rounded-md bg-slate-700 text-white font-semibold text-xl px-2 hover:bg-slate-800"
                  onClick={() => appendExtra({ extra: "" })}
                >
                  +
                </button>
              </div>
              <ul>
                {extraFields.map((item, index) => (
                  <li key={item.id}>
                    <input
                      {...register(`extraLoading.${index}.extra`)}
                      className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                      placeholder="Enter extra loading"
                    />
                    <button
                      type="button"
                      className="border rounded-md bg-red-500 font-semibold text-white text-sm px-2 hover:bg-red-600"
                      onClick={() => removeExtra(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              {/* {errors.extraLoading && (
                <span className="text-sm font-medium text-red-500">
                  {errors.extraLoading.message}
                </span>
              )} */}
            </div>

            <div>
      <p className='font-bold text-md'>Select Drink Type</p>
      <Controller
        control={control}
        name="drinkType"
        render={({ field }) => (
          <Select
            {...field}  // This will bind the Select component to react-hook-form
            options={[{ label: 'Can', value: 'Can' }, { label: 'Bottle', value: 'Bottle' }]}
          />
        )}
      />
            </div>


          </div>

          <div className='flex justify-center items-center py-8'>
          
           <button type='submit' className='p-4 rounded  bg-red-500 text-white'>{   isLoading ? <ClipLoader color="#c4c2c2" /> : "Create Deal"}</button>
          </div>


        </form>
      </div>

    </div>
  )
}

export default CreateDealCard