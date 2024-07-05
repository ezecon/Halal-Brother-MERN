import { useState } from 'react';
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';

export default function Add() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [version, setVersion] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      name,
      description,
      price,
      type,
      version,
      image
    };

    try {
      await axios.post('https://halal-brother-server.vercel.app/api/items', postData);
      toast.success('Post created successfully!');
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setType('');
      setVersion('');
      setImage('');
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <div className="bg-white py-5 px-8 rounded-lg w-2/3">
        <h1 className="text-2xl font-semibold mb-4 text-center">Item Post</h1>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Item Name"
            />
          </div>

          <div className="w-full">
            <Input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
            />
          </div>
          
          <div className="w-full">
            <Input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
            />
          </div>

          <div className="w-full">
            <Select
              required
              label="Select Type"
              value={type}
              onChange={(e) => setType(e)}
            >
              <Option value="Unavailable">Unavailable</Option>
              <Option value="Available">Available</Option>
            </Select>
          </div>

          <div className="w-full">
            <Select
              required
              label="Select Category"
              value={version}
              onChange={(e) => setVersion(e)}
            >
              <Option value="Burger">Burger</Option>
              <Option value="Chicken Special">Chicken Special</Option>
              <Option value="Newly Added">Newly Added</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Halal Bro Special">Halal Bro Special</Option>
              <Option value="Drinks">Drinks</Option>
            </Select>
          </div>

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
    </div>
  );
}
