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
  const [ID, setID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/verifyToken",
          { token }
        );

        if (response.status === 200 && response.data.valid) {
          setID(response.data.decoded.id);
          console.log(response.data.decoded.id)
        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  const handleNavigate = (id) => {
    console.log(id);
    navigate(`/check-items/${id}`);
  };

  const handleAddToCart = async () => {
   if(token){
    try {
      const response = await axios.post(
        "http://localhost:5000/api/carts",
        {
          userID: ID,
          itemID: _id,
        }
      );
      console.log("Item added to cart:", response.data);
      // Optionally, you can navigate to the cart page or show a success message here
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle error as needed
    }
   }
   else{
     toast.error("Login First");
   }
  };

  return (
    <div className="border rounded-lg">
      <img
        className="w-[300px] h-[280px] object-cover cursor-pointer"
        src={image}
        alt=""
        onClick={() => handleNavigate(_id)}
      />
      <div className="p-2">
        <p className="text-lg font-semibold text-gray-800 truncate">{name}</p>
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
