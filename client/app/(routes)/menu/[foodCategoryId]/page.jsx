import FoodCategory from "./FoodCategory";


// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const category = params.foodCategoryId || "pizzas"; // Default to "pizzas" if no category is found
  let title, description;
  
  switch (category.toLowerCase()) {
    case "pizzas":
      title = "Pizzas | Hot House Pizza | Order online now";
      description = "Order delicious pizzas from Hot House Pizza in Northwood. Try our wide variety of pizzas and enjoy unbeatable taste.";
      break;
    case "sides":
      title = "Sides | Hot House Pizza | Order online now";
      description = "Complement your meal with a wide range of sides from Hot House Pizza in Northwood. Order online now!";
      break;
    case "drinks":
      title = "Drinks | Hot House Pizza | Order online now";
      description = "Quench your thirst with our refreshing drinks at Hot House Pizza in Northwood. Order online!";
      break;
    case "desserts":
      title = "Desserts | Hot House Pizza | Order online now";
      description = "Indulge in our mouth-watering desserts at Hot House Pizza in Northwood. Order now!";
      break;
    case "dips":
      title = "Dips | Hot House Pizza | Order online now";
      description = "Add extra flavor with our delicious dips from Hot House Pizza in Northwood. Order online now!";
      break;
    default:
      title = "Food Category | Hot House Pizza | Order online now";
      description = "Discover the best pizza takeaway in Northwood at Hot House Pizza. Order now!";
      break;
  }

  return {
    title,
    description,
  };
}

const Page = () => {
  return (
    <div>
      <FoodCategory />
    </div>
  );
};

export default Page;

