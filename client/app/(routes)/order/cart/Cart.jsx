"use client";

import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

import {
  decreaseQuantity,
  deletefromCart,
  increaseQuantity,
  orderCheckedout,
} from "@/app/lib/features/cartSlice/cartSlice";
import { getPreviousPath } from "@/app/lib/features/path/pathslice";

const Cart = () => {
  // ----------------------hooks------------------------------------
  const cart = useSelector((state) => state?.cart?.cartData);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const uniqueId = useId();

  useEffect(() => {
    dispatch(orderCheckedout(false));
  }, []);

  const router = useRouter();
  console.log(pathname);
  const data = { previousRoute: pathname.toString() };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4 mb-28">
        <div className="bg-red-800 text-white text-center py-2">
          <h2 className="text-2xl font-bold">YOUR BASKET</h2>
        </div>
        {Array.isArray(cart) && cart?.length > 0 ? (
          cart?.map((data, idx) => {
            const size = String(data?.size).includes("-");
            const price = String(data?.size).includes("-")
              ? data?.size?.split("-")
              : data?.size;

            const allToppings = data?.allToppings || {
              base: {},
              cheese: [],
              sauce: [],
              veg: [],
              meat: [],
            };
            const mergedToppings = [
              allToppings?.base?.name,
              ...allToppings?.cheese.map((item) =>
                `${item?.cheeseName} ${
                  item?.size === "double" ? "2️⃣" : "1️⃣"
                }`.replace(/ /g, "\u00A0")
              ),
              ...allToppings?.sauce.map((item) =>
                `${item?.sauceName} ${
                  item?.size === "double" ? "2️⃣" : "1️⃣"
                } `.replace(/ /g, "\u00A0")
              ),
              ...allToppings?.veg.map((item) =>
                `${item?.vegName} ${
                  item?.size === "double" ? "2️⃣" : "1️⃣"
                }`.replace(/ /g, "\u00A0")
              ),
              ...allToppings?.meat.map((item) =>
                `${item?.meatName} ${
                  item?.size === "double" ? "2️⃣" : "1️⃣"
                }`.replace(/ /g, "\u00A0")
              ),
            ].join(", ");

            const mergedDealToppingsArray =
              data?.dealsData && Array.isArray(data.dealsData)
                ? data.dealsData.map((item) =>
                    [
                      item?.baseName?.name,
                      ...(Array.isArray(item?.cheeseName)
                        ? item?.cheeseName.map((cheese) =>
                            `${cheese.cheeseName} ${
                              cheese?.size === "double" ? "2️⃣" : "1️⃣"
                            }`.replace(/ /g, "\u00A0")
                          )
                        : []),
                      ...(Array.isArray(item?.vegetarianToppingsName)
                        ? item?.vegetarianToppingsName.map((veg) =>
                            `${veg.vegName} ${
                              veg?.size === "double" ? "2️⃣" : "1️⃣"
                            }`.replace(/ /g, "\u00A0")
                          )
                        : []),
                      ...(Array.isArray(item?.meatToppingsName)
                        ? item?.meatToppingsName.map((meat) =>
                            `${meat.meatName} ${
                              meat?.size === "double" ? "2️⃣" : "1️⃣"
                            }`.replace(/ /g, "\u00A0")
                          )
                        : []),
                      ...(Array.isArray(item?.sauceName)
                        ? item?.sauceName.map((sauce) =>
                            `${sauce.sauceName} ${
                              sauce?.size === "double" ? "2️⃣" : "1️⃣"
                            }`.replace(/ /g, "\u00A0")
                          )
                        : []),
                    ].join(", ")
                  )
                : [];

            return (
              <div className="text-slate-800 font-semibold p-4 border-b grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center space-x-4 md:col-span-2">
                  <img
                    src={data?.img}
                    className="w-[85px] h-24 lg:h-20 lg:w-20 rounded-md"
                  />

                  <p className="text-[17px]">
                    <div className="flex gap-0 md:gap-10">
                      <p className="text-lg">
                        {" "}
                        {data?.name}{" "}
                        {size
                          ? `(${price[0]})`
                          : data?.dealsData
                          ? `(${data?.size})`
                          : data?.allToppings?.size?.name
                          ? `(${data?.allToppings?.size?.name})`
                          : ""}
                        <br />
                        {data?.allToppings && (
                          <span className="text-sm bg-red-800 text-white rounded-md px-2">
                            {" "}
                            Customized{" "}
                          </span>
                        )}
                      </p>
                      <p className="hidden md:block text-green-800">
                        {mergedToppings}
                      </p>
                    </div>
                    {data?.dealsData && (
                      <div className="text-base text-gray-600">
                        {" "}
                        {data?.dealsData
                          ?.map((item, idx) => item?.label)
                          .join(", ")}{" "}
                      </div>
                    )}
                  </p>
                </div>

                <div
                  className={`flex md:justify-end space-x-2 ${
                    data?.allToppings ? "justify-between" : "justify-end"
                  }  `}
                >
                  <p className=" md:hidden text-green-800">{mergedToppings}</p>
                  <button
                    onClick={() => {
                      dispatch(decreaseQuantity({ id: data?.id, quantity: 1 }));
                    }}
                    className="bg-red-800 hover:bg-red-700 h-8 text-white font-extrabold text-lg px-2 rounded"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-semibold text-lg">
                    {data?.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(increaseQuantity({ id: data?.id, quantity: 1 }));
                    }}
                    className="bg-green-700 hover:bg-green-600 h-8 text-white font-extrabold text-lg px-2 rounded"
                  >
                    +
                  </button>

                  <button
                    className="bg-red-800 hover:bg-red-700 h-8 text-white px-2 rounded"
                    onClick={() => dispatch(deletefromCart({ id: data?.id }))}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
                {data?.dealsData && (
                  <div className="text-base md:col-span-3 lg:col-span-2 text-gray-600">
                    {" "}
                    {data?.dealsData?.map(
                      (item, idx) =>
                        item?.name && (
                          <>
                            {" "}
                            <div key={idx} className="flex ">
                              <div className="min-w-[10rem] max-w-[10rem] md:min-w-[30rem]">
                                {item?.name}{" "}
                                <span className="text-sm bg-red-800 text-white rounded-md px-2">
                                  {" "}
                                  Customized{" "}
                                </span>
                              </div>
                              <div className="text-green-900">
                                {mergedDealToppingsArray[idx]}
                              </div>
                            </div>
                            <div className="border-b py-1"></div>
                          </>
                        )
                    )}
                  </div>
                )}
                <div className="col-span-1 text-right  text-xl font-normal md:col-span-3 md:text-left">
                  £ {data?.totalSum}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-[70vh] grid place-items-center">
            <div className="text-3xl font-semibold">Your cart is Empty</div>
          </div>
        )}
        {Array.isArray(cart) && cart?.length > 0 && (
          <div
            onClick={() => {
              dispatch(orderCheckedout(true));
              dispatch(getPreviousPath(pathname));
              router.push("/order/orders");
            }}
            className="bg-green-700 hover:bg-green-600 font-medium text-white text-center py-3 cursor-pointer"
          >
            <span>Select time & place</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
