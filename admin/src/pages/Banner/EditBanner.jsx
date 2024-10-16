import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { MdInsertPhoto } from "react-icons/md";
import Select from "react-select";
import { updateBanner } from "../../features/actions/banner/banner";

const UpdateBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state: item } = useLocation();

  const { bannerData, isLoading } = useSelector((state) => state.banner);

  const { dealData } = useSelector((state) => state.deals);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: item?.title || "",
      deal: item?.deal
        ? { value: item.deal._id, label: item.deal.title }
        : null,
      // You can uncomment the following line if you want to include filter as a default value
      // filter: item?.filter ? { value: item.filter._id, label: item.filter.name } : null,
    },
  });

  const [photo, setPhoto] = useState(item?.banner || "");

  const onSubmit = (data) => {
    const formData = new FormData();
    const { deal } = data;
    const dealValue = deal?.value;
    formData.append("deal", dealValue);

    if (data.banner && data.banner.length > 0) {
      formData.append("banner", data.banner[0]);
    }

    dispatch(updateBanner({ id: item._id, formData })).then((res)=>{
if(res.payload.success){
  navigate("/banner")
}
    });
  };

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
      navigate("/banner");
    }
  }, [bannerData, navigate]);

  return (
    <div className="max-w-4xl mx-auto my-5 overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="bg-[#EF4444] px-10 py-4 text-center text-white font-semibold">
        Update Banner
      </div>
      <form
        className="space-y-5 my-4 mx-8 sm:mx-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Deal</label>
            <Controller
              control={control}
              name="deal"
              render={({ field }) => (
                <Select
                  value={field.value}
                  options={
                    Array.isArray(dealData?.data?.data) &&
                    dealData?.data?.data.length > 0 &&
                    dealData?.data?.data.map((item) => ({
                      value: item?._id,
                      label: item?.title,
                    }))
                  }
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  className="mt-2 "
                  placeholder="Choose Deal "
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "1px solid #CBD5E1", // Set custom border style
                      borderRadius: "0.400rem", // Set custom border radius
                      height: "40px", // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#9CA3AF", // Set custom placeholder color
                    }),
                  }}
                />
              )}
              rules={{ required: true }}
            />
            {errors.deal && (
              <span className=" text-sm font-medium text-red-500">
                Deal is required
              </span>
            )}
          </div>
        </div>

        <div className="font-medium space-y-6">
          Sides Image
          <img
            className="mt-2 w-full h-50 sm:w-44 sm:h-36 rounded"
            src={photo}
            alt="Banner Preview"
          />
          <label htmlFor="file_input" className="flex gap-1 cursor-pointer">
            <MdInsertPhoto size="25" />
            <div className="px-2 border rounded-md border-slate-300 hover:bg-red-500 hover:text-white hover:border-none">
              Click here to upload
            </div>
          </label>
          <input
            {...register("banner", { onChange: handlePhotoChange })}
            className="hidden"
            id="file_input"
            type="file"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-700 hover:bg-gray-800 active:bg-gray-700 px-10 py-3 font-semibold text-white"
        >
          {isLoading ? <ClipLoader color="#c4c2c2" /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
