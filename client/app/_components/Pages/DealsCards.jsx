"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const DealsCards = ({ data, path }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    setSelectedOption({
      value: data.sizes[0]._id,
    });
  }, []);

  useEffect(() => {
    console.log("selected options ", selectedOption);
  }, [selectedOption]);

  const combineItems = () => {
    const { chooseItems } = data;
    const items = Object.keys(chooseItems)
      .filter((key) => chooseItems[key] > 0)
      .map((key) => {
        const quantity = chooseItems[key];
        const itemName = quantity > 1 ? key : key.slice(0, -1); // remove 's' for singular items
        return `${quantity} ${itemName}`;
      });
    return items.join(", ");
  };

  return (
    <div className="flex flex-col justify-between bg-white shadow-sm rounded-md max-w-xs w-full newshadow ">
      <div>
        {" "}
        <Link
          href={{
            pathname: path ? `${path}/deals/deals_view` : `deals/deals_view`,
            query: { card_id: data?._id, size_id: selectedOption?.value },
          }}
        >
          <img
            src={data.banner}
            alt="Card Image"
            className="rounded-t-md w-full h-48"
          />
        </Link>
        <div className="px-3">
          <div className="mt-3">
            {" "}
            <h2 className="text-xl font-semibold mb-1">
              {data.title} 
            </h2>
            {/* <p>{data?.sizes.length === 1 ? data.sizes[0].size </p> */}
            <p className="text-sm font-semibold text-gray-500 mb-1">
              {combineItems()}
              {data?.defaultItems.length > 0 && ", "}
              {data?.defaultItems.map((item, index) => (
                <React.Fragment key={index}>
                  {index === data.defaultItems.length - 1
                    ? item.replace(/ /g, "\u00A0")
                    : `${item.replace(/ /g, "\u00A0")}, `}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-1 ">
        <div className="max-w-sm mx-2 flex gap-1">
          {data.sizes?.length === 1 ? (
            <div className="w-full">
              {`Pizza Size ${data.sizes[0].size} - £ ${data.sizes[0].price}`}
            </div>
          ) : (
            <Select
              className="w-full"
              placeholder={`Pizza Size ${data.sizes[0].size} - £ ${data.sizes[0].price}`}
              options={data.sizes.map((size) => ({
                label: `Pizza Size ${size.size} - £ ${size.price}`,
                value: size._id,
              }))}
              onChange={(option) => setSelectedOption(option)}
            />
          )}

          <Link
            href={{
              pathname: path ? `${path}/deals/deals_view` : `deals/deals_view`,
              query: { card_id: data?._id, size_id: selectedOption?.value },
            }}
            className="hover:bg-[#08579C] bg-[#08579C] text-white p-2  w-36 rounded-lg"
          >
            Just Deal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealsCards;
