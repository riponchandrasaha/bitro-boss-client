import { Link } from "react-router-dom";
import Cover from "../../Shared/Covered/Cover";
import Menuitem from "../../Shared/Menuitem/Menuitem";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className=" pt-10">
            {title && <Cover img={img} title={title}></Cover>}
            <div className='grid md:grid-cols-2 gap-10 mt-16'>
                {
                    items.map(item => (
                        <Menuitem key={item._id}
                            item={item}>

                        </Menuitem>

                    )) /* 65+4654 */
                }
            </div>
            <Link to={`/order/${title}`}> <button className="btn btn-outline border-0 border-b-5 mt-4">Order now</button></Link>


        </div>
    );
};

export default MenuCategory;