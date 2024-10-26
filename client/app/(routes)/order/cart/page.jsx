import Cart from "./Cart";

export const metadata = {
  title: 'Your Basket | The Pizza Inn  | Best Pizza in Northwood ',
  description: 'Discover the best pizza, Convenient online ordering, quick service, and unbeatable taste. Order now',
}

const page = () => {
  return (
    <div>
      <Cart />
    </div>
  );
};

export default page;
