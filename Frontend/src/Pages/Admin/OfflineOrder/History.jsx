import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OfflineHistory() {
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
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/offline-order/`);
        const orders = response.data;

        const productDetails = await Promise.all(
          orders.map(async (order) => {
            const productResponses = await Promise.all(
              order.productsID.map(async (productId) => {
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


  const reversedData = [...data].reverse();
  return (
    <div className="mt-10 p-6">
      <h1 className="text-center font-bold text-3xl mb-6">Offline Order</h1>
      <div className="border border-gray-300 rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {reversedData.map((item) => {
          let total = 0; 
          const { date, time } = splitDateTime(item.purchasedAt);
          return (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.productDetails.map((product) => {
                  total += product.price;
                  return (
                    <div key={product._id} className="flex p-2">
                      <img className="w-8 mr-2" src={product.image} alt={product.name} /> - {product.name}
                    </div>
                  );
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{time}</td>
              <td className="px-6 py-4 whitespace-nowrap">৳{total}</td>
            </tr>
          );
        })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
