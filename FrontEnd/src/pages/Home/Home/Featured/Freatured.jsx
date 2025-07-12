import SectionTitle from "../../../../Component/SectionTitle/SectionTitle";
import featuredImg from '../../../../assets/home/featured.jpg';
import './featured.css';

const Freatured = () => {
    return (
        <div className="featured-item bg-fixed">
            <SectionTitle subHeading="check it out" heading="Featured items" ></SectionTitle>
            <div className="md: flex justify-center bg-slate-500 bg-opacity-50 items-center py-8 px-36">
                <div>
                    <img src={featuredImg} alt="" srcset="" />
                </div>

                <div className="md:ml-10">
                    <p>Aug, 24;2024</p>
                    <p className="uppercase">where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tempore vitae omnis aut error ea labore tenetur, architecto voluptatum consequatur facere cum soluta amet velit sed saepe. Iste nam cumque aliquid quos explicabo quis! Voluptas eaque veritatis dignissimos! Alias quos possimus fugiat accusamus ducimus harum odit dolorem dolore ad nemo?</p>
                    <button className="btn btn-outline border-0 border-b-5 mt-4">Order now</button>


                </div>


            </div>
        </div>
    );
};

export default Freatured;