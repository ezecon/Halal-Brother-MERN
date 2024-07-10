import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Order() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/buy-products/${userID}`);
        const orders = response.data;

        const productDetails = await Promise.all(
          orders.map(async (order) => {
            const productResponses = await Promise.all(
              order.products.map(async (productId) => {
                const productResponse = await axios.get(`https://halal-brother-server.vercel.app/api/items/${productId}`);
                return productResponse.data;
              })
            );
            return { ...order, productDetails: productResponses };
          })
        );

        setData(productDetails);
        setLoading(false); 
      } catch (err) {
        setError(err.message);
        setLoading(false); 
      }
    };

    if (userID) {
      fetchOrderData();
    }
  }, [userID]);

  if (loading) {
    return <p className="text-center">Loading...</p>; 
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>; 
  }

  function splitDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString();
    return { date: localDate, time: localTime };
  }

  return (
    <div className="mt-10 p-6">
      <h1 className="text-center font-bold text-3xl mb-6">Order</h1>
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="space-y-4">
          <div className="hidden md:grid md:grid-cols-5 gap-4 p-4 font-bold bg-gray-100">
            <div>Products</div>
            <div>Date</div>
            <div>Time</div>
            <div>Status</div>
            <div>Total</div>
          </div>
          {data.reverse().map((item) => {
            let total = 0; 
            const { date, time } = splitDateTime(item.purchasedAt);
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4"
              >
                <div>
                  {item.productDetails.map((product) => {
                    total += product.price; 
                    return (
                      <p key={product.id} className="flex p-2">
                        <img className="w-8 mr-2" src={product.image} alt={product.name} /> - {product.name}
                      </p>
                    );
                  })}
                </div>
                <p>{date}</p>
                <p>{time}</p>
                <p>{item.status}</p>
                <p>৳{total}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
