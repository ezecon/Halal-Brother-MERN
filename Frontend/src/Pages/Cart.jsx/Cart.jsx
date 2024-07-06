import { Button } from "@material-tailwind/react";
import { useToken } from "../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

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
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/carts/${userID}`);
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
          const response = await axios.get(`https://halal-brother-server.vercel.app/api/items/${item.itemID}`);
          console.log("item id:", item.itemID)
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-3xl ga-maamli-regular">
        CART
      </h1>
      <div>
        <div>
          <h1 className="text-center font-bold text-xl ga-maamli-regular">
            Items:
          </h1>
          <div>
            {detailedCartData.map(item => (
              <div key={item.id}>
                <p>Item Name: {item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Description: {item.description}</p>
                <p>Category: {item.version}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>Total: ${total}</p>
          <Button>Buy</Button>
        </div>
      </div>
    </div>
  );
}
