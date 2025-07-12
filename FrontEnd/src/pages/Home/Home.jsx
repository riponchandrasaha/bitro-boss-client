import Banner from "./Home/Banner/Banner";
import Catagory from "./Home/Catagory/Catagory";
import Freatured from "./Home/Featured/Freatured";
import PopularManue from "./Home/Popularmanu/PopularManue";
import Testimonial from "./Testimonial/Testimonial";


const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Catagory></Catagory>
           <PopularManue></PopularManue>
           <Freatured></Freatured>
           <Testimonial></Testimonial>
           
        
        </div>
    );
};

export default Home;