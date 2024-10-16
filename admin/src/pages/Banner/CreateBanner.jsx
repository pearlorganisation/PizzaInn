import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import defaultPhoto from '/placeholder.jpg'
import { useNavigate } from 'react-router-dom'
import { createSides } from '../../features/actions/sides/sides'
import { ClipLoader } from "react-spinners";
import { MdInsertPhoto } from "react-icons/md";
import Select from "react-select"
import { createBanner } from '../../features/actions/banner/banner'

const CreateBanner = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { bannerData, isLoading } = useSelector((state) => state.banner)
    const { dealData } = useSelector((state) => state.deals)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm()
    const onSubmit = (data) => {
       if(data?.deal)
       { const { deal } = data

        formData.append("deal", deal?.value)}
        const formData = new FormData()
        Array.from(data?.banner).forEach((img) => {
            formData?.append("banner", img)
        })
        dispatch(createBanner(formData))

    }
// console.log(dealData)
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

    useEffect(() => {
        if (bannerData?.status) {
            navigate("/banner")
        }
    }, [bannerData]);

    return (
        <div className="max-w-4xl mx-auto my-5 overflow-hidden rounded-2xl bg-white shadow-lg ">
            <div className="bg-[#EF4444] px-10 py-4 text-center text-white font-semibold">
                Create Banner
            </div>
            <form className="space-y-5 my-4 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >

            
                <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
                    <div className="w-full">
                        <label className="font-medium">Deal</label>
                        <Controller
                            control={control}
                            name="deal"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    options={Array.isArray(dealData?.data?.data) && dealData?.data?.data.length > 0 && dealData?.data?.data.map(item => ({ value: item?._id, label: item?.title }))}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                    className="mt-2 "
                                    placeholder="Choose Deal "

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
                            // rules={{ required: true }}

                        />
                     
                    </div>
        



                </div>

                    <div className="font-medium  space-y-6"> Banner Image

                        <img class="mt-2 w-full h-50  sm:w-44 sm:h-36 rounded" src={photo || defaultPhoto} alt="No Image" />
                        <label htmlFor="file_input" className="flex gap-1
                " > <MdInsertPhoto size='25' />
                            <div className="px-2 border rounded-md border-slate-300 hover:bg-red-500 hover:text-white hover:border-none">Click here to upload</div></label>

                        <input
                            {...register('banner', { required: true, onChange: (e) => { handlePhotoChange(e) } })}

                            className="hidden " id="file_input" type="file" />
                        {errors.banner && (
                            <span className="text-sm font-medium text-red-500">
                                Banner is required
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



export default CreateBanner