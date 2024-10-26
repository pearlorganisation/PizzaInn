"use client";
import { selectToppingsSet, setPrice, setToppings, setToppingsCYOP, updateSet } from "@/app/lib/features/cartSlice/cartSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const VegetarianToppings = ({ vegetarianTopData ,calledBy }) => {
  // console.log(vegetarianTopData, "vegetarianTopData");
  const { customizationData } = useSelector((state) => state.orderDetails);
  const { MAX_TOPPINGS, CYOP_MAX_TOPPINGS } = useSelector((state) => state.cart);
  const [defaultVegDetails, setDefaultVegDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setDefaultVegDetails(customizationData?.vegetarianToppingsName);
  }, [customizationData]);

  useEffect(() => {
    setSelectedVeg(() => {
      const defaultSelected = {};
      // console.log(defaultSelectedVeg, "defaultSelectedVeg");
      defaultVegDetails?.forEach((vegName) => {
        // console.log(vegName, "vegName");
        const veg = vegetarianTopData.find((s) => s.name === vegName);
        // console.log(vegetarianTopData, "vegetarianTopData");
        if (veg) {
          defaultSelected[veg._id] = "single";
        }
      });
      // console.log(defaultSelected, "defaultSelected");
      return defaultSelected;
    });
  }, [defaultVegDetails, customizationData, vegetarianTopData]);

  const [selectedVeg, setSelectedVeg] = useState({});

  const handleSelectionChange = (vegId, size) => {
    
    if(calledBy === "createYourOwnPizza")
    {
      console.log("calledBy",calledBy);

      dispatch(updateSet(vegId));
    }
    // if(customizationData.id==="6703be55176d2099698929c1" ){
    //   setSelectedVeg((prevSelected) => {
    //     // Toggle the selection
    //     if (prevSelected[vegId] === size) {
    //       const { [vegId]: _, ...rest } = prevSelected;
    //       return rest;
    //     } else {
    //       if ( CYOP_MAX_TOPPINGS < 6) {
    //         return {
    //           ...prevSelected,
    //           [vegId]: size,
    //         };
    //       }
         
    //       else {
    //         toast.info("You Can Add Only 6 Toppings");
    //         return {
    //           ...prevSelected,
    //         };
    //       }
    //     }
    //   });

    // }
    // else {
    setSelectedVeg((prevSelected) => {
      // Toggle the selection
      if (prevSelected[vegId] === size) {
        const { [vegId]: _, ...rest } = prevSelected;
        return rest;
      } else {
        if (MAX_TOPPINGS < 11) {
          return {
            ...prevSelected,
            [vegId]: size,
          };
        } else {
          toast.info("You Can Add Upto 10 Toppings");
          return {
            ...prevSelected,
          };
        }
      }
    });
  // }
  };

  useEffect(() => {
    // console.log(selectedVeg, "selectedVeg");
  }, [selectedVeg]);

  const handleSave = () => {
    const selectedVegetarianData = Object.entries(selectedVeg).map(
      ([vegId, size]) => {
        const veg = vegetarianTopData.find((s) => s._id === vegId);
        const price =
          size === "single"
            ? veg?.price[0]?.singlePrice
            : veg?.price[0]?.doublePrice;
        return {
          vegName: veg.name,
          _id: veg?._id,
          size,
          price,
        };
      }
    );
    // if(customizationData?.id==="6703be55176d2099698929c1" ){
    //   dispatch(setToppingsCYOP({ veg: selectedVegetarianData }));
    // }else{
      dispatch(setToppings({ veg: selectedVegetarianData }));
    // }
 
    // console.log(selectedVegetarianData, "selectedVegetarianData");
  };

  useEffect(() => {
    handleSave();
  }, [selectedVeg]);

  return (
    <div className="">
      <h1 className="text-lg font-bold my-10">VEGETARIAN TOPPINGS</h1>
      <table className="min-w-full divide-y divide-gray-200 shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
            VEGETARIAN TOPPING
            </th>
            <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Single
            </th>
            <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Double
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vegetarianTopData.map((veg) => (
            <tr key={veg._id} className="hover:bg-gray-100">
              <td className="px-2 md:px-6 py-2 md:py-4 whitespace-wrap text-sm font-medium text-gray-900">
                {veg.name}
              </td>
              <td className="px-2 md:px-6 py-2 md:py-4 whitespace-wrap text-sm font-medium text-gray-900">
                <div
                  className={`cursor-pointer px-2 md:px-4 py-2 rounded text-center ${
                    selectedVeg[veg._id] === "single"
                      ? "bg-[#c80f2e] text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                  onClick={() => handleSelectionChange(veg._id, "single")}
                >
                  £ {calledBy === "half" ? (veg?.price[0]?.singlePrice)/2 : veg?.price[0]?.singlePrice}
                </div>
              </td>
              <td className="px-2 md:px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                <div
                  className={`cursor-pointer px-2 md:px-4 py-2 rounded text-center ${
                    selectedVeg[veg._id] === "double"
                      ? "bg-green-800 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                  onClick={() => handleSelectionChange(veg._id, "double")}
                >
                  £ {calledBy === "half" ? (veg?.price[0]?.doublePrice)/2 :veg?.price[0]?.doublePrice}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VegetarianToppings;
