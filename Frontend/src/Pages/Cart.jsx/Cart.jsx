import { Button } from "@material-tailwind/react";
import { useToken } from "../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";

export default function Cart() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let total = 0; // Use let instead of var for better scoping

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
        navigate('/login');
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/carts/${userID}`);
        setCartData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false); // Set loading to false on error
      }
    };

    if (userID) {
      fetchCartData();
    }
  }, [userID]);

  const handleBuy = async (total) => {
    
    if(total===0){
      toast.error("Cart is empty!")
    }
    else{
      try {
        const response = await axios.post('https://halal-brother-server.vercel.app/api/buy-products', { 
          userID: userID, 
          products: cartData.map(item => item.itemID), 
          totalPrice: total
        });
        console.log(response.status);
        if (response.status === 200) {
          toast.success("Items purchased successfully!");
        } else {
          toast.error("Failed to purchase items");
        }
      } catch (err) {
        console.error("Error purchasing items:", err);
        toast.error("Failed to purchase items. Please try again later.");
      }
      try {
        await axios.delete(`https://halal-brother-server.vercel.app/api/carts/delete/${userID}`);
        const promise = await axios.get(`https://halal-brother-server.vercel.app/api/carts/${userID}`);
          setCartData(promise.data);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://halal-brother-server.vercel.app/api/carts/${id}`);

      if (response.status === 200) {
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/carts/${userID}`);
        setCartData(response.data);
        toast.success("Item deleted");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to delete item. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>; // Centered loading message
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>; // Centered error message
  }

  return (
    <div className="mt-10 p-6">
      <h1 className="text-center font-bold text-3xl mb-6">CART</h1>
      <div className="border border-gray-300 rounded-lg p-4">
        <h2 className="text-center font-bold text-xl mb-4">Items:</h2>
        <div className="space-y-4">
          {cartData.map((item) => {
            total += item.price; // Calculate total price
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0"
              >
                <img className="w-10" src={item.image} alt="" />
                <p className="font-semibold">Item Name: {item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Date: {item.date.slice(0,10)}</p>
                <RiDeleteBin6Fill
                  onClick={() => handleDelete(item._id)}
                  className="text-red-900 text-2xl cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center">
        <p className="font-semibold">Total: ${total}</p>
        <Button onClick={() => handleBuy(total)} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Buy</Button>
      </div>
    </div>
  );
}
