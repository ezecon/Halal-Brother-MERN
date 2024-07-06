import { Button } from "@material-tailwind/react";
import { useToken } from "../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Cart() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [detailedCartData, setDetailedCartData] = useState([]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
          console.log(response.data.decoded.id);
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
        const response = await axios.get(`http://localhost:5000/api/carts/${userID}`);
        const data = response.data;
        const filteredData = data.filter(item => item.status === "IN");
        setCartData(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchCartData();
    }
  }, [userID]);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const promises = cartData.map(async (item) => {
          const response = await axios.get(`http://localhost:5000/api/items/${item.itemID}`);
          console.log("item id:", item.itemID);
          return response.data;
        });

        const items = await Promise.all(promises);
        const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice);
        setDetailedCartData(items);
      } catch (err) {
        setError(err.message);
      }
    };

    if (cartData.length > 0) {
      fetchItemData();
    }
  }, [cartData]);

  const handleDelete = async (itemID) => {
    try {
      await axios.delete(`http://localhost:5000/api/carts/`, {
        data: { itemID, userID }
      });

      // Filter out the deleted item from the detailedCartData
      const updatedCartData = detailedCartData.filter((item) => item.id !== itemID);
      setDetailedCartData(updatedCartData);

      // Update the total price
      const totalPrice = updatedCartData.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-10 p-6">
      <h1 className="text-center font-bold text-3xl ga-maamli-regular mb-6">
        CART
      </h1>
      <div className="border border-gray-300 rounded-lg p-4">
        <h1 className="text-center font-bold text-xl ga-maamli-regular mb-4">
          Items:
        </h1>
        <div className="space-y-4">
          {detailedCartData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0"
            >
              <img className="w-10" src={item.image} alt="" />
              <p className="font-semibold">Item Name: {item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.version}</p>
              <RiDeleteBin6Fill
                onClick={() => handleDelete(item.id)}
                className="text-red-900 text-2xl cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center">
        <p className="font-semibold">Total: ${total}</p>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Buy
        </Button>
      </div>
    </div>
  );
}
