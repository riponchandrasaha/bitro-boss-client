import axios from "axios";
const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-pbh3fl960-ripon-chandra-sahas-projects.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;