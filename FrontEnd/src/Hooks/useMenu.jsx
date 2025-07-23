import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Fixed this line

    useEffect(() => {
        fetch('https://bistro-boss-pbh3fl960-ripon-chandra-sahas-projects.vercel.app/menu')
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);
            });
    }, []);

    return [menu, loading];
};

export default useMenu;
