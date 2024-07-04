import { useState } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Date", "Name", "Category", "Actions"];

const initialOrders = [
  // Add your initial orders data here for testing
  {
    _id: "1",
    date: "2023-07-01",
    name: "Bike A",
    category: "Available",
  },
  {
    _id: "2",
    date: "2023-06-25",
    name: "Bike B",
    category: "On Rent",
  },
  // Add more orders as needed
];

export default function List() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectValues, setSelectValues] = useState({});

  const handleSelectChange = (id, value) => {
    setSelectValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStatusChange = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, category: selectValues[id] } : order
      )
    );
    // Optionally, you can send the updated status to the server here
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((order) => order._id !== id));
    // Optionally, you can send the delete request to the server here
  };

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
            {orders.reverse().map((item) => (
              <tr key={item._id}>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.date.slice(0, 10)}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.name}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    as="div"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.category}
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
                        value={selectValues[item._id] || item.category}
                        onChange={(e) => handleSelectChange(item._id, e.target.value)}
                      >
                        <option value="Unavailable">Unavailable</option>
                        <option value="On Rent">On Rent</option>
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
                      {/* Link to navigate to post detail */}
                      <Link to={`/rent-now/${item._id}`} className="cursor-pointer">
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
