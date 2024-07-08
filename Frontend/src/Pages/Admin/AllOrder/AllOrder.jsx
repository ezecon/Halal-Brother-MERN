import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogBody, DialogHeader, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

export default function AllOrder() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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

  const handleUser = async (id) => {
    try {
      const response = await axios.get(`https://halal-brother-server.vercel.app/api/users/${id}`);
      if (response.status === 200) {
        setCustomer(response.data);
        handleOpen();
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDetailsClick = (userId) => {
    handleUser(userId);
  };

  const handleStatusChange = async (Id, newStatus) => {
    try {
      const response = await axios.put(`https://halal-brother-server.vercel.app/api/buy-products/${Id}`, { status: newStatus });
      setData(data.map(item => item._id === Id ? { ...item, status: newStatus } : item));
      console.log(response.data);
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  };

  return (
    <div className="mt-10 p-6">
      <h1 className="text-center font-bold text-3xl mb-6">Online Order</h1>
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="space-y-4">
          {data.reverse().map((item) => {
            let total = 0; 
            const { date, time } = splitDateTime(item.purchasedAt);
            return (
              <div
                key={item._id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0"
              >
                <div className="flex">
                  <p className="font-bold">Products:</p>
                  <div>
                    {item.productDetails.map((product) => {
                      total += product.price;
                      return (
                        <p key={product._id} className="flex p-2">
                          <img className="w-8 mr-2" src={product.image} alt={product.name} /> - {product.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                <p>Status: {item.status}</p>
                <p>Total: <br /> ৳{total}</p>
                {item.status !== 'Delivered' && (
                  <Menu>
                    <MenuHandler>
                      <Button>Change Status</Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => handleStatusChange(item._id, 'Accepted-Order')}>Accepted Order</MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item._id, 'On the way')}>On the way</MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item._id, 'Delivered')}>Delivered</MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item._id, 'Rejected')}>Reject</MenuItem>
                    </MenuList>
                  </Menu>
                )}
                <Button onClick={() => handleDetailsClick(item.userID)}>Details</Button>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>User Information</DialogHeader>
        <DialogBody>
          {customer ? (
            <div>
               <img className="w-16 rounded mb-4" src={customer.image} alt="" />
              <p><span className="crimson font-bold">Name:</span> {customer.name}</p>
              <p><span className="crimson font-bold">Number:</span> {customer.number}</p>
              <p><span className="crimson font-bold">Email:</span> {customer.email}</p>
              <p><span className="crimson font-bold">Address:</span> {customer.address}</p>
              
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}
