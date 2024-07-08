import { useEffect, useState } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const TABLE_HEAD = ["Date", "Name", "Category","Price", "Actions"];

export default function List() {
  const [orders, setOrders] = useState([]);
  const [selectValues, setSelectValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://halal-brother-server.vercel.app/api/items');
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.log("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSelectChange = (id, value) => {
    setSelectValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStatusChange = async (id) => {
    const newCategory = selectValues[id];
    try {
      const response = await axios.put(`https://halal-brother-server.vercel.app/api/items/${id}`, { type: newCategory });
      if (response.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, category: newCategory } : order
          )
        );
        toast.success("Status updated successfully");
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {

    axios.delete(`https://halal-brother-server.vercel.app/api/items/${id}`)
    .then(response => {
    if (response.status === 200) {
           toast.success("Item deleted successfully");
         }
       })
      .catch(err => {
        console.log(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-blue-gray-800 py-6">Inventory</h1>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id}>
                <td className="p-2">
                  <img className='w-8' src={item.image} alt="" />
                </td>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.name || 'N/A'}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.version || 'N/A'}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    ৳{item.price || 'N/A'}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <select
                        className="border p-1.5 rounded-md"
                        value={selectValues[item._id] || item.type}
                        onChange={(e) => handleSelectChange(item._id, e.target.value)}
                      >
                        <option value="Unavailable">Unavailable</option>
                        <option value="Available">Available</option>
                      </select>
                      <Button size="sm" onClick={() => handleStatusChange(item._id)}>
                        Save
                      </Button>
                      <Button
                        className="bg-red-500"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/check-items/${item._id}`} className="cursor-pointer">
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
