import { useState, useEffect } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';

export default function Discount() {
  const [image, setImage] = useState('');
  const [discounts, setDiscounts] = useState([]);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('https://halal-brother-server.vercel.app/api/discounts');
      setDiscounts(response.data);
    } catch (error) {
      toast.error('Failed to fetch discounts. Please try again.');
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      image,
    };

    try {
      await axios.post('https://halal-brother-server.vercel.app/api/discounts', postData);
      toast.success('Post created successfully!');
      setImage('');
      fetchDiscounts();
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://halal-brother-server.vercel.app/api/discounts/${id}`);
      toast.success('Discount deleted successfully!');
      fetchDiscounts();
    } catch (error) {
      toast.error('Failed to delete discount. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster />
      <div className="bg-white py-5 px-8 rounded-lg w-2/3 mb-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">ADD DISCOUNT</h1>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <Input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              label="Image URL"
            />
          </div>
          <div className="text-center">
            <Button type="submit">Post</Button>
          </div>
        </form>
      </div>

      <div className="bg-white py-5 px-8 rounded-lg w-2/3">
        <h1 className="text-2xl font-semibold mb-4 text-center">DISCOUNT LIST</h1>
        <ul className="space-y-4">
          {discounts.map((discount) => (
            <li key={discount._id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
              <img src={discount.image} alt="Discount" className="w-24 h-auto" />
              <Button color="red" onClick={() => handleDelete(discount._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
