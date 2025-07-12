/* import React, { useEffect, useState } from 'react'; */
import SectionTitle from '../../../../Component/SectionTitle/SectionTitle';
import Menuitem from '../../../Shared/Menuitem/Menuitem';
import useMenu from "../../../../Hooks/useMenu";
const PopularManue = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'Popular');
   /*   const [menu, setMenu] = useState([]);
 
     useEffect(() => {
         fetch('menu.json')
             .then(res => res.json())
             .then(data => {
                 const popularItems = data.filter(item => item.category === 'popular');
                 setMenu(popularItems);
             });
     }, []); */

    return (
        <section className='mb-12'>
            <SectionTitle
                heading="From our menu"
                subHeading="Popular items"
            />
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => (
                        <Menuitem key={item._id}
                            item={item}>

                        </Menuitem>

                    )) /* 65+4654 */
                }
            </div>
        </section>
    );
};

export default PopularManue;