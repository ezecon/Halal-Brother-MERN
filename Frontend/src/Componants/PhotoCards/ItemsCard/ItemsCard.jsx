/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

export default function ItemCard({data}) {
    const {_id, name, price, image} = data;
    const navigate = useNavigate()

    console.log(data);

    const handleNavigate = (id)=>{
      console.log(id)
      navigate(`/check-items/${id}`)
    }

  return (
    <div className="border rounded-lg">
        <img className="w-[300px] h-[280px] object-cover" src={image} alt="" onClick={()=>handleNavigate(_id)}/>
        <div className="p-2">
        <p className="text-lg font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-2xl font-bold crimson">৳{price}</p>
         <div className="my-2">
         <a href="" type="submit" className="bg-black text-white px-4 py-2 rounded">Add to Cart</a>
         </div>
         </div>
    </div>
  )
}