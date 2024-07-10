import { useState, useEffect } from 'react';
import { Carousel } from "@material-tailwind/react";
import axios from 'axios';

export function Top() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://halal-brother-server.vercel.app/api/discounts');
        setImages(response.data); // Assuming response.data is an array of image objects
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Carousel loop={true} autoplay={true} className="rounded-xl">
      {images.map((item) => (
        <img
          key={item._id} // Assuming each item has a unique _id
          src={item.image}
          alt={`image ${item._id}`}
          className="h-full w-full object-cover object-center"
        />
      ))}
    </Carousel>
  );
}
