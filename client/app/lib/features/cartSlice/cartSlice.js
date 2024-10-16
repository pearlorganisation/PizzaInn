import { toast } from "sonner";

const { createSlice, current } = require("@reduxjs/toolkit");

 const toppingsPriceTrackerSet = new Set();

  console.log = () => {

  }
 
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    allToppings: {},
    MAX_TOPPINGS: 0,
    defaultPrice: 0,
    createYourOwnPizzaMAX_TOPPINGS:0,
    CYOP_FREE_TOPPINGS:0,
    isOrderCheckout: false,
  },

  reducers: {

    updateSet: (state,action) => {
      
      console.log(state.createYourOwnPizzaMAX_TOPPINGS,"state.createYourOwnPizzaMAX_TOPPINGS");

      if(toppingsPriceTrackerSet.size > 0)
      {
        if(toppingsPriceTrackerSet.has(action.payload))
        {
          state.createYourOwnPizzaMAX_TOPPINGS = state.createYourOwnPizzaMAX_TOPPINGS - 1;
          toppingsPriceTrackerSet.delete(action.payload);

        }
        else{
          state.createYourOwnPizzaMAX_TOPPINGS = state.createYourOwnPizzaMAX_TOPPINGS + 1;

          toppingsPriceTrackerSet.add(action.payload);
        }
        
      }
      else
      {
        state.createYourOwnPizzaMAX_TOPPINGS = state.createYourOwnPizzaMAX_TOPPINGS+1;
        toppingsPriceTrackerSet.add(action.payload);
      }


    },
    clearSet:(state) =>{
      state.createYourOwnPizzaMAX_TOPPINGS = 0;
      toppingsPriceTrackerSet.clear();
    },
    addToCart: (state, action) => {
      const isExist = state.cartData?.some((item) => {
        return item?.id === action?.payload?.id;
      });
      // console.log(isExist, "isExist");

      if (isExist) {
        const temp = state.cartData.map((item) => {
          if (item.id === action.payload.id) {
            const updatedData = {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
            console.log(updatedData, "updatedData");
            return {
              ...updatedData,
              totalSum: (updatedData?.quantity * item?.price).toFixed(2),
            };
          }
          return item;
        });
        state.cartData = temp;
        toast.success("Added", {
          position: "top-center",
          duration: 300,
        });
      } else {
        state.cartData = [...state.cartData, action.payload];
        toast.success("Item Added Successfully", { position: "top-center" });
      }
    },
    increaseQuantity: (state, action) => {
      const temp = state.cartData.map((item) => {
        if (item.id === action.payload.id) {
          const updatedData = {
            ...item,
            quantity: item.quantity + action.payload.quantity,
          };
          console.log(updatedData, "updatedData");
          return {
            ...updatedData,
            totalSum: (updatedData?.quantity * item?.price).toFixed(2),
          };
        }
        return item;
      });
      console.log(temp, "temp");
      state.cartData = temp;
    },
    decreaseQuantity: (state, action) => {
      const temp = state.cartData.map((item) => {
        if (item.id === action.payload.id) {
          const updatedData = {
            ...item,
            quantity:
              item.quantity === 1
                ? item.quantity
                : item.quantity - action.payload.quantity,
          };
          return {
            ...updatedData,
            totalSum: (updatedData?.quantity * item?.price).toFixed(2),
          };
        }
        return item;
      });
      console.log(temp, "temp");

      state.cartData = temp;
    },

    setDefaultPrice: (state, action) => {
      const { arr, customizationData } = action.payload;
      // Filter the items based on the sauce names and calculate the default price
      const {
        sauceName,
        cheeseName,
        vegetarianToppingsName,
        meatToppingsName,
      } = customizationData;
      const temp = [
        sauceName,
        cheeseName,
        vegetarianToppingsName,
        meatToppingsName,
      ].flat();
      const defaultPrice = arr
        .filter((item) => temp.includes(item.name))
        .reduce((acc, nxt) => {
          return acc + (nxt.price[0]?.singlePrice || 0); // Ensure singlePrice exists
        }, 0);

      console.log(defaultPrice, "defaultPrice");

      // Update the state with the calculated default price
      state.defaultPrice = defaultPrice.toFixed(2);
    },

    setToppings: (state, action) => {
      const temp = {
        ...current(state.allToppings),
        ...action?.payload,
      };


      const { sauce, cheese, veg, meat, base, price } = temp;

      let flatArray = [sauce, cheese, veg, meat].flat();


      if (toppingsPriceTrackerSet.size > 0) {

        const priceDeductionArray = Array.from(toppingsPriceTrackerSet); 
        for(let i = 0;i<4;i++){
          const currIndex = flatArray.findIndex((items) => items._id === priceDeductionArray[i]);
      
          if (currIndex !== -1) { // Check if item is found
            flatArray[currIndex] = {
              ...flatArray[currIndex],
              price: 0, // Update price to 0
            };
          }
        }

      }

      const extraPrice =
        flatArray.reduce((acc, cur) => {
          return acc + cur?.price;
        }, 0) + base?.price[0]?.price || 0;

      const prices = {
        ...temp,
        extraPrice: Math.max(0, extraPrice).toFixed(2),
        totalPrice: Math.max(
          state.allToppings.price,
          extraPrice + price - Number(state.defaultPrice)
        ).toFixed(2),
      };
      state.allToppings = prices;
    },
    resetToppings: (state) => {
      state.allToppings = {};
    },

    deletefromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload.id
      );
    },
    orderCheckedout: (state, action) => {
      state.isOrderCheckout = action.payload;
    },
    emptyCart: (state, action) => {
      state.cartData = [];
    },

    setToppingsCYOP:(state,action)=>{
      const temp = {
        ...current(state.allToppings),
        ...action?.payload,
      };

      const { sauce, cheese, veg, meat, base, price } = temp;
      const [a,b,c,d,...rest] = [veg,meat].flat()
      const freeToppings = [a,b,c,d].filter(Boolean);
      const paidToppings = [cheese,sauce,...rest].flat()
      console.log("freeToppings",freeToppings)

 
      state.CYOP_MAX_TOPPINGS = Number(paidToppings.length + freeToppings.length)
      
     

      const extraPrice = paidToppings.reduce((acc, cur) => {
          return acc + cur?.price;
        }, 0) + base?.price[0]?.price || 0 + freeToppings.reduce((acc, cur) => {
          return 0;
        }, 0);
      

      const prices = {
        ...temp,
        extraPrice: Math.max(0, extraPrice).toFixed(2),
        totalPrice: Math.max(
          state.allToppings.price,
          extraPrice + price - Number(state.defaultPrice)
        ).toFixed(2),
      };
      state.allToppings = prices;
    }
  },
});

export const {
  addToCart,
  deletefromCart,
  orderCheckedout,
  emptyCart,
  decreaseQuantity,
  increaseQuantity,
  setPrice,
  setToppings,
  setDefaultPrice,
  resetToppings,
  setToppingsCYOP,
  clearSet, 
  updateSet
} = cartSlice.actions;
export default cartSlice.reducer;
export const selectToppingsSet = () => toppingsPriceTrackerSet;