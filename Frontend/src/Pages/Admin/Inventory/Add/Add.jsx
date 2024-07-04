import React, { useState } from 'react';
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';

export default function Add() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [num, setNum] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [version, setVersion] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      name,
      description,
      num,
      city,
      district,
      price,
      time,
      version,
      image
    };

    try {
      await axios.post('YOUR_API_ENDPOINT', postData);
      toast.success('Post created successfully!');
      // Reset form
      setName('');
      setDescription('');
      setNum('');
      setCity('');
      setDistrict('');
      setPrice('');
      setTime('');
      setVersion('');
      setImage('');
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center rounded justify-center ">
        <Toaster />
        <div className="bg-white py-5 rounded-lg w-6/12">
          <h1 className="text-2xl font-semibold mb-4 text-center">Rent Post</h1>
          <form className="p-4 space-y-4" onSubmit={handleSubmit}>
            <div className="w-72 mx-auto">
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Cycle Brand Name"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
              />
            </div>
            <div className="w-72 mx-auto">
              <Input
                type="number"
                required
                value={num}
                onChange={(e) => setNum(e.target.value)}
                label="Phone Number"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                label="District"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                label="Rent for cycle"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                label="Available From"
              />
            </div>

            <div className="w-72 mx-auto">
              <Select
                required
                label="Select Version"
                value={version}
                onChange={(e) => setVersion(e)}
              >
                <Option value="Unavailable">Unavailable</Option>
                <Option value="On Rent">On Rent</Option>
                <Option value="Available">Available</Option>
              </Select>
            </div>

            <div className="w-72 mx-auto">
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
    </div>
  );
}
