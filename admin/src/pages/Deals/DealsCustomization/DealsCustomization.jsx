import { useDispatch, useSelector } from "react-redux";
import CreateDealCard from "../CreateDealCard";
import { useEffect, useState } from "react";
import { deleteDeal, getDeal } from "../../../features/actions/deals/deal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { clearIsSuccess } from "../../../features/slice/deals/deals";

const DealsCustomization = () => {
  const [modal, setModal] = useState(false);
  const [dealId, setDealId] = useState(null); // State to manage the current deal ID for deletion
  const dispatch = useDispatch();
  const { dealData ,isLoading ,isDeleted  } = useSelector((state) => state?.deals);

  useEffect(() => {
    dispatch(getDeal());
  }, []);

  useEffect(() => {
    dispatch(getDeal());
  }, [isDeleted]);

  const handleDeleteDeal = (id) => {
    setDealId(id);
    setModal(true);
  };

  const handleConfirmDelete = () => {
    if (dealId) {
      dispatch(deleteDeal(dealId));
      setModal(false);
    }
  };

  useEffect(()=>{
    console.log("Deal id ",dealId);
  },[dealId]);
  
  useEffect(()=>{
    dispatch(clearIsSuccess())
  },[]);



  return (
    <>
      {modal && <DeleteModal setModal={setModal} onConfirm={handleConfirmDelete} />}

      {!isLoading && <div className="container mx-auto 2xl:p-15 lg:p-8">
        <div className="text-center flex items-center justify-between px-4 text-2xl py-5 text-white rounded-md font-semibold bg-red-500">
          <p>Manage Your Deals</p>
          <Link to="/createDeal" className="bg-green-700 text-xl px-2 rounded-lg ">
     Add New Deal
          </Link>
        </div>

        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 text-lg">Deal name</th>
                <th scope="col" className="px-4 py-3 text-lg">Banner</th>
                <th scope="col" className="px-4 py-3 text-lg">Deal Contains</th>
                <th scope="col" className="px-2 py-3 text-lg">Price</th>
                <th scope="col" className="px-1 py-3 text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(dealData?.data?.data) && dealData.data.data.length > 0 ? (
                dealData.data?.data.map((el) => (
                  <tr key={el._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{el.title}</td>
                    <td className="py-2">
                      <img src={el.banner} className="size-48" alt="banner" />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div><strong>Pizzas:</strong> {el.chooseItems.pizzas}</div>
                        <div><strong>Drinks:</strong> {el.chooseItems.drinks}</div>
                        <div><strong>Other Loadings:</strong> {el.defaultItems.length}</div>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      {el.sizes.length > 0 && el.sizes.map((size) => (
                        <div key={size._id} className="flex gap-2">
                          <p>Size: {size.size}</p>
                          <p>Price:  £ {size.price}</p>
                        </div>
                      ))}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2 justify-center items-center">
                        <Link to={`/editDeal/${el._id}`} className="font-medium text-blue-500 hover:underline hover:text-blue-600">Edit</Link>
                        <button onClick={() => handleDeleteDeal(el._id)} className="font-medium text-red-500 hover:underline hover:text-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No deals available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      }
      {
        isLoading && <h1>Loading</h1>
      }
      
    </>
  );
};

export default DealsCustomization;
