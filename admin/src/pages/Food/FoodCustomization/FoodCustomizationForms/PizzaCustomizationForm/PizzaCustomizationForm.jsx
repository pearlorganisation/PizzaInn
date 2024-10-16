import React, { useEffect } from "react";
import SizeContainer from "./PizzaCustomizationFormComponents/SizeContainer";
import BaseContainer from "./PizzaCustomizationFormComponents/BaseContainer";
import CommonContainer from "./PizzaCustomizationFormComponents/CommonContainer";
import { useDispatch, useSelector } from "react-redux";
import { getBasePizza, getCheesePizza, getMeatTopping, getSaucePizza, getSizePizza, getVegetarianTopping  } from "../../../../../features/actions/pizza/getCustomization";
import { resetStatus } from "../../../../../features/slice/pizza/pizza";




const PizzaCustomizationForm = () => {

  const { sauce ,cheese ,vegetarianToppings,meatToppings ,isMeatToppingeSuccess,isVegToppingSuccess,isSauceSuccess,isCheeseSuccess,isSizeSuccess,isBaseSuccess } = useSelector((state) => state?.pizza);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasePizza());
    dispatch(getSaucePizza());
    dispatch(getCheesePizza());
    
    dispatch(getSizePizza());
    dispatch(getMeatTopping());
    dispatch(getVegetarianTopping());

    dispatch(resetStatus(false));
    

  }, []);
  useEffect(() => {
    if(isBaseSuccess)
   { dispatch(getBasePizza());}
    else if(isSauceSuccess)
   { dispatch(getSaucePizza());}
    else if (isCheeseSuccess)
    {dispatch(getCheesePizza());}
    else if( isSizeSuccess)
    {dispatch(getSizePizza());}
    else if (isMeatToppingeSuccess)
    {dispatch(getMeatTopping());}
    else if (isVegToppingSuccess)
    {dispatch(getVegetarianTopping());}

    dispatch(resetStatus(false));
  }


  , [isMeatToppingeSuccess,isVegToppingSuccess,isSauceSuccess,isCheeseSuccess,isSizeSuccess,isBaseSuccess]);




  return (
    <div className="categoryCustomizationFormContainer p-5 m-3 grid grid-cols-2 gap-10">
      {/* <SizeContainer size={size} /> */}
      <BaseContainer  />
      <SizeContainer />
      
        <CommonContainer  itemName={"SAUCE"} items={sauce} />
        <CommonContainer  itemName={"CHEESE"} items={cheese} />
        <CommonContainer  itemName={"VEGETARIAN TOPPINGS"} items={vegetarianToppings} />
        <CommonContainer  itemName={"MEAT TOPPINGS"} items={meatToppings} />
     
     
    </div>
  );
};

export default PizzaCustomizationForm;
