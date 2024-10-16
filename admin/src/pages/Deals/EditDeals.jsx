import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { MdInsertPhoto } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { updateDeal } from '../../features/actions/deals/deal';


const EditDeals = () => {

  const { id } = useParams();
  const { dealData, isLoading , isSuccess} = useSelector((state) => state.deals);
  const { pizzaData } = useSelector((state) => state.pizzaSlice);
  const { size } = useSelector((state) => state.pizza);

  const [photo, setPhoto] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editDealData = dealData.data.data.find((el) => el._id === id);
  const defaultPhoto = editDealData.banner;
  const pizzaIds = editDealData.pizzaData;
  const [selectedSizes, setSelectedSizes] = useState([]);
  const drinksTypeOptions = [{ label: 'Can', value: 'can' }, { label: 'Bottle', value: 'bottle' }];
  const drinkType = drinksTypeOptions.find(el => el.value.toLowerCase() === editDealData.defaultDrinkType.toLowerCase());
  const sizeOptions = (size) =>
    size?.filter(item => !selectedSizes.includes(item?._id)).map(item => ({
      value: item?._id,
      label: item?.name,
    }));

    

  




  const sizeHashMap = new Map();//this hashmap is for size 
  const hashMap = new Map();//this hashmap is for options

  size.forEach(element => {
    sizeHashMap.set(element.name, { value: element._id, label: element.name });
  });

  pizzaData.forEach((element) => {
    hashMap.set(element._id, element.pizzaName);
  });

  const pizzaDefaultItem = pizzaIds.map((el) => {
    const id = el;
    const elName = hashMap.get(el)
    return {
      value: id,
      label: elName
    }

  });

  const { handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: {
      priceSection: editDealData.sizes.map((el) => {
        return {
          size: sizeHashMap.get(el.size),
          price: el.price
        }
      }) || [{ size: "", price: "" }],
      extraLoading: editDealData.defaultItems.map((el) => {
        return {
          extra: el
        }
      }) || [{ extra: "" }],
      defaultDrinkType:drinkType

    },
    

  });

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

  function handleSubmition(data) {
    const formData = new FormData();




    const chooseItems = {
      pizzas: data?.numberOfPizzas,
      drinks: data?.numberOfDrinks
    };

    const defaultItems = data.extraLoading.map(el => el.extra) || [];
    const priceSectionFilter = data.priceSection.map(item => ({
      size: item?.size?.label || '',
      price: item?.price || ''
    }));
    const selectedPizzas = data?.selectedpizzas?.map(item => item.value) || [];


    // Append data to FormData
    formData.append("title", data?.title || 'Void Name From Frontend');
    formData.append('defaultDrinkType', data.defaultDrinkType.value);
    formData.append('sizes', JSON.stringify(priceSectionFilter));
    formData.append('pizzaData', JSON.stringify(selectedPizzas));
    formData.append('chooseItems', JSON.stringify(chooseItems));
    formData.append('defaultItems', JSON.stringify(defaultItems));
    if (data.banner) {
      Array.from(data?.banner).forEach((img) => {
        formData?.append("banner", img)
      })

    }
    
    console.log("we are goinmg to dispacth ,anjkjhjkf")    
    dispatch(updateDeal({id,formData}));
   

    // Log FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    
    

  }
useEffect(()=>{
  if(isSuccess)
    {
      navigate('/deal')
    } 
},[isSuccess])
  return (
    <div>
      <h1 className='text-3xl p-2 bg-red-500 text-center text-white'>Edit Deal Card </h1>
      <form onSubmit={handleSubmit(handleSubmition)} >
        <div className='grid grid-cols-2  justify-between items-center gap-2 p-14'>
          <div className="mb-5">
            <label htmlFor="dealName" className=" text-2xl block mb-2  font-medium text-gray-900 dark:text-white">Enter Deal Name</label>
            <input

              type='text'
              defaultValue={editDealData.title}
              {...register('title', {
                required: "Enter This Field",

                minLength: {
                  value: 5,
                  message: "Min Length of Deal is 5"
                },
                maxLength: {
                  value: 100,
                  message: "Max Length of Deal is 100"
                },
              })} className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="deal name" />
            {
              errors.dealName && <p>
                {errors.dealName.message}
              </p>
            }
          </div>
          <div className='mb-5'>
            <label htmlFor="numberOfPizzas" className="text-2xl block mb-2  font-medium text-gray-900 dark:text-white">Enter Number of Pizza's</label>
            <input
              type="number"
              defaultValue={editDealData.chooseItems.pizzas}
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
              })} className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="pizzas" required />
            {
              errors.numberOfPizzas && <p>
                {errors.numberOfPizzas.message}
              </p>
            }
          </div>

          <div>
            <label htmlFor="numberOfDrinks" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Enter Number of Drink's </label>
            <input
              defaultValue={editDealData.chooseItems.drinks}
              type='Number'
              {...register('numberOfDrinks', {
                required: "This is required field",
                min: {
                  value: 0,
                  message: "Value Can be at least 0 ..."
                },
                max: {
                  value: 20,
                  message: "Max Value Can be  10 ..."
                },
              })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="drinks" required />
            {
              errors.numberOfDrinks && <p>
                {errors.numberOfDrinks.message}
              </p>
            }
          </div>
          <div>
          <p className='font-bold text-md'>Select Drink Type</p>
            <Controller
              control={control}
              name="defaultDrinkType"
              render={({ field }) => (
                <Select
                  {...field}
                  options={drinksTypeOptions}
                />
              )}
            />
          </div>
          <div className="font-medium  space-y-6"> Deals Image

            <img className="mt-2 w-full h-50  sm:w-44 sm:h-36 rounded" src={photo || defaultPhoto} alt="No Image" />
            <label htmlFor="file_input" className="flex gap-1
" > <MdInsertPhoto size='25' />
              <div className="px-2 border rounded-md border-slate-300 hover:bg-red-500 hover:text-white hover:border-none">Click here to upload</div></label>

            <input
              {...register('banner', { required: false, onChange: (e) => { handlePhotoChange(e) } })}

              className="hidden " id="file_input" type="file" />
            {errors.banner && (
              <span className="text-sm font-medium text-red-500">
                Image is required
              </span>
            )}
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
                    defaultValue={pizzaDefaultItem}
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
                    {...register(`extraLoading.${index}.extra`, { required: 'Extra field is required' })}
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
            {errors.extraLoading && (
              <span className="text-sm font-medium text-red-500">
                {errors.extraLoading.message}
              </span>
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
        </div>
        <div className='flex justify-center '>

          <button type='submit' className='p-4 rounded text-xl  bg-green-500 hover:bg-green-400 text-white'>{isLoading ? <ClipLoader color="#c4c2c2" /> : "Update Deal"}</button>
        </div>

      </form>
    </div>
  )
}

export default EditDeals