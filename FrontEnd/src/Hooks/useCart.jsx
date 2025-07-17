/* import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;

        },
   enabled: true

    })
    return [cart, refetch]
};

export default useCart; */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Debug log to check if user email is available
  console.log("User email in useCart:", user?.email);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      console.log("Fetching carts for:", user.email);
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run query if user email exists
    onError: (error) => {
      console.error("Error fetching carts:", error);
    }
  });

  return [cart, refetch];
};

export default useCart;

