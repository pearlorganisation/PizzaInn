import { DevTool } from '@hookform/devtools';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateSizePizza } from '../../../features/actions/pizza/patchCustomization';



const EditSizeModal = forwardRef((props, ref) => {

  const dialogRef = useRef();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
        name: props.data.name
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    },
    close: () => {
      dialogRef.current.close();
    },
  }));

  const dispatch = useDispatch();
  function onSubmit(data){
     dispatch(updateSizePizza({_id:props.data._id,name:data?.name}));
       dialogRef.current.close();
  }

  return (
    <dialog
    ref={dialogRef}
    id="static-modal"
    data-modal-backdrop="static"
    tabIndex="-1"
    aria-hidden="true"
    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center rounded-2xl w-[500px] md:inset-0 max-h-full"
    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
  >
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      <div className="relative ">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl  text-slate-700 rounded-md font-semibold py-1 dark:text-white">
            {props.itemName}
          </h3>
          <button
            type="button"
            className="text-white bg-red-500 hover:bg-red-600  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => dialogRef.current.close()}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 md:p-5 space-y-4">
            <div className="mb-4 space-y-1">
              <label htmlFor="name" className="block font-medium  text-gray-700">
                Pizza Size
              </label>
              <input
              defaultValue={props.data.name}
                id="name"
                {...register("name")}
                className="border p-[7px] rounded-md outline-slate-600 w-full"
                placeholder={`Enter ${props.itemName}`}
                minLength={2}
                required
              />
            </div>
       

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
          <DevTool control={control} />
        </form>
      </div>
    </div>
  </dialog>
  );
});

export default EditSizeModal;
