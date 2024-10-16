// -----------------------------------------------Imports---------------------------------------------
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import FoodCustomization from "../pages/Food/FoodCustomization/FoodCustomization";
import Category from "../pages/Sides/Category/Category";
import CreateCategory from "../pages/Sides/Category/CreateCategory";
import CreateFilter from "../pages/Sides/Filter/CreateFilter";
import Filter from "../pages/Sides/Filter/Filter";
import Sides from "../pages/Sides/Sides";
import CreateSides from "../pages/Sides/CreateSides";
import CreateDessertCategory from "../pages/Dessert/Category/CreateCategory";
import DessertCategory from "../pages/Dessert/Category/Category";
import CreateDessertFilter from "../pages/Dessert/Filter/CreateFilter"
import DessertFilter from "../pages/Dessert/Filter/Filter"
import CreateDessert from "../pages/Dessert/CreateDessert";
import Dessert from "../pages/Dessert/Dessert";
import CreateDrink from "../pages/Drink/CreateDrink";
import Drink from "../pages/Drink/Drink";
import Dip from "../pages/Dip/Dip";
import CreateDip from "../pages/Dip/CreateDip";
import PizzaCategory from "../pages/Pizza/Category/Category";
import CreatePizzaCategory from "../pages/Pizza/Category/CreateCategory";
import PizzaFilter from "../pages/Pizza/Filter/Filter";
import CreatePizzaFilter from "../pages/Pizza/Filter/CreateFilter";
import Pizza from "../pages/Pizza/Pizza";
import CreatePizza from "../pages/Pizza/CreatePizza";
import UpdateDessert from "../pages/Dessert/EditDessert";
import UpdateSides from "../pages/Sides/EditSides";
import UpdatePizza from "../pages/Pizza/EditPizza";
import UpdateDip from "../pages/Dip/EditDip";
import UpdateDrink from "../pages/Drink/EditDrink";
import UpdateDessertCategory from "../pages/Dessert/Category/EditCategory"
import UpdateDessertFilter from "../pages/Dessert/Filter/EditFilter"
import UpdatePizzaCategory from "../pages/Pizza/Category/EditCategory"
import UpdatePizzaFilter from "../pages/Pizza/Filter/EditFilter"
import UpdateSidesCategory from "../pages/Sides/Category/EditCategory"
import UpdateSidesFilter from "../pages/Sides/Filter/EditFilter"
import Order from "../pages/Order/Order";
import CreateDealCard from "../pages/Deals/CreateDealCard";
import DealsCustomization from "../pages/Deals/DealsCustomization/DealsCustomization";
import EditDeals from "../pages/Deals/EditDeals";
import Login from "../pages/Auth/Login";
import ViewUser from "../pages/User/ViewUser";
import Banner from "../pages/Banner/Banners";
import UpdateBanner from "../pages/Banner/EditBanner";
import CreateBanner from "../pages/Banner/CreateBanner";

// ---------------------------------------------------------------------------------------------------

const isUserLoggedIn = localStorage.getItem('hothouseLoggedIn');

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: isUserLoggedIn ?  <DefaultLayout /> : <Login />,
    children: [
      {
        path: "/food-customization",
        element: <FoodCustomization />,
      },
      {
        path: "/sidesCategory",
        element: <Category />,
      },
      {
        path: "/updateSidesCategory/:id",
        element: <UpdateSidesCategory />,
      },
      {
        path: "/createSidesCategory",
        element: <CreateCategory />,
      },
      {
        path: "/sides",
        element: <Sides />,
      },
      {
        path: "/createSides",
        element: <CreateSides />,
      },
      {
        path: "/updateSides/:id",
        element: <UpdateSides />,
      },
      {
        path: "/sidesFilter",
        element: <Filter />,
      },
      {
        path: "/createSidesFilter",
        element: <CreateFilter />,
      },
      {
        path: "/updateSidesFilter/:id",
        element: <UpdateSidesFilter />,
      },
      {
        path: "/dessertCategory",
        element: <DessertCategory />,
      },
      {
        path: "/createDessertCategory",
        element: <CreateDessertCategory />,
      },
      {
        path: "/updateDessertCategory/:id",
        element: <UpdateDessertCategory />,
      },
      {
        path: "/createDessertFilter",
        element: <CreateDessertFilter />,
      },
      {
        path: "/dessertFilter",
        element: <DessertFilter />,
      },
      {
        path: "/updateDessertFilter/:id",
        element: <UpdateDessertFilter />,
      },
      {
        path: "/dessert",
        element: <Dessert />,
      },
      {
        path: "/createDessert",
        element: <CreateDessert />,
      },
      {
        path: "/updateDessert/:id",
        element: <UpdateDessert />,
      },
      {
        path: "/drink",
        element: <Drink />,
      },
      {
        path: "/createDrink",
        element: <CreateDrink />,
      },
      {
        path: "/updateDrink/:id",
        element: <UpdateDrink />,
      },
      {
        path: "/dip",
        element: <Dip />,
      },
      {
        path: "/createDip",
        element: <CreateDip />,
      },
      {
        path: "/updateDip/:id",
        element: <UpdateDip />,
      },
      {
        path: "/pizzaCategory",
        element: <PizzaCategory />,
      },
      {
        path:"/deal",
        element:<DealsCustomization/>
      },
      {
        path:"/createDeal",
        element:<CreateDealCard/>
      },
      {
        path:"/editDeal/:id",
        element:<EditDeals/>
      },
      {
        path: "/createPizzaCategory",
        element: <CreatePizzaCategory />,
      },
      {
        path: "/updatePizzaCategory/:id",
        element: <UpdatePizzaCategory />,
      },
      {
        path: "/pizzaFilter",
        element: <PizzaFilter />,
      },
      {
        path: "/createPizzaFilter",
        element: <CreatePizzaFilter />,
      },
      {
        path: "/updatePizzaFilter/:id",
        element: <UpdatePizzaFilter />,
      },
      {
        path: "/pizza",
        element: <Pizza />,
      },
      {
        path: "/createPizza",
        element: <CreatePizza/>,
      },
      {
        path: "/updatePizza/:id",
        element: <UpdatePizza />,
      },
      {
        path: "/",
        element: <Order />,
      },
      {
        path: "/user",
        element: <ViewUser />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },
      {
        path:"/addBanner",
        element:<CreateBanner/>
      }
      ,{
        path:"/updateBanner/:id",
        element:<UpdateBanner/>
      }
    ],
  },
]);
