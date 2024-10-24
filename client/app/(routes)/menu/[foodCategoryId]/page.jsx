import FoodCategory from "./FoodCategory";


// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const category = params.foodCategoryId || "pizzas"; // Default to "pizzas" if no category is found
  let title, description;
  
  switch (category.toLowerCase()) {
    case "pizzas":
      title = "Pizzas | The Pizza Inn | Order online now";
      description = "Order delicious pizzas from The Pizza Inn. Try our wide variety of pizzas and enjoy unbeatable taste.";
      break;
    case "sides":
      title = "Sides | The Pizza Inn | Order online now";
      description = "Complement your meal with a wide range of sides from The Pizza Inn. Order online now!";
      break;
    case "drinks":
      title = "Drinks | The Pizza Inn | Order online now";
      description = "Quench your thirst with our refreshing drinks at The Pizza Inn. Order online!";
      break;
    case "desserts":
      title = "Desserts | The Pizza Inn | Order online now";
      description = "Indulge in our mouth-watering desserts at The Pizza Inn. Order now!";
      break;
    case "dips":
      title = "Dips | The Pizza Inn | Order online now";
      description = "Add extra flavor with our delicious dips from The Pizza Inn. Order online now!";
      break;
    default:
      title = "Food Category | The Pizza Inn | Order online now";
      description = "Discover the best pizza takeaway at The Pizza Inn. Order now!";
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

