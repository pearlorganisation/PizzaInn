"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ToppingsPriceCard = ({calledBy}) => {
  const { price, allToppings, defaultPrice } = useSelector(
    (state) => state.cart
  );


  return (

          <div className="fixed bottom-5 rounded-md right-5 bg-[#08579C] p-6 text-white font-semibold text-center">
            <div>
              Extra Pizza Price :{" "}
              {calledBy === "half" ?(Math.max(0, (allToppings?.extraPrice - defaultPrice).toFixed(2)))/2 : Math.max(0, (allToppings?.extraPrice - defaultPrice).toFixed(2))}
            </div>
          </div>

  );
};

export default ToppingsPriceCard;
