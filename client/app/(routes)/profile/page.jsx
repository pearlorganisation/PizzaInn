import Profile from "./Profile";

export const metadata = {
    title: 'My Profile | The Pizza Inn',
    description: 'Discover the best pizza , Convenient online ordering, quick service, and unbeatable taste. Order now',
  }

const page = ({ searchParams }) => {
    return (
      <div>
        <Profile searchParams={searchParams}/>
      </div>
    );
  };
  
  export default page;
  