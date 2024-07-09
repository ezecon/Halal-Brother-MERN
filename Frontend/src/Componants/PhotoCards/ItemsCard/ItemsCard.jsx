/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useToken } from "../../Hook/useToken";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ItemCard({ data }) {
  const { _id, name, price, image } = data;
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "https://halal-brother-server.vercel.app/api/verifyToken",
          { token }
        );

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeToken();
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, removeToken]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `https://halal-brother-server.vercel.app/api/items/${_id}`
        );

        if (response.status === 200) {
          setItemDetails(response.data);
        } else {
          console.log("Failed to get item details:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    getItem();
  }, [_id]);

  const handleNavigate = (id) => {
    navigate(`/check-items/${id}`);
  };

  const handleAddToCart = async () => {
    if (token) {
      try {
        const response = await axios.post("https://halal-brother-server.vercel.app/api/carts", {
          userID: userID,
          itemID: _id,
          image: itemDetails.image,
          name: itemDetails.name,
          price: itemDetails.price,
        });
        console.log("Item added to cart:", response.data);
        toast.success("Item added to cart");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Failed to add item to cart");
      }
    } else {
      toast.error("Login First");
    }
  };

  return (
    <div className="border rounded-lg">
      <img
        className="w-[300px] h-[280px] object-cover cursor-pointer"
        src={image}
        alt={name}
        onClick={() => handleNavigate(_id)}
      />
      <div className="p-2">
        <p className="text-lg font-semibold text-gray-800 truncate playwrite-gb-s-regular">{name}</p>
        <p className="text-2xl font-bold crimson">৳{price}</p>
        <div className="my-2">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
