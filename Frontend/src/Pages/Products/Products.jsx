import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ItemCard from "../../Componants/PhotoCards/ItemsCard/ItemsCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://halal-brother-server.vercel.app/api/items")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    setLoading(false);
  }, []);

  const renderProduct =
          [...products]
          .reverse()
          .map((item) => <ItemCard key={item._id} data={item} />);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };
  return (
    <div>
        <div className="w-full  bg-black text-center py-56">
        <h1 className="crimson text-4xl">PRODUCTS</h1>
        <p  className="text-white">Order Now</p>
        </div>
        <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {renderProduct}
        </div>
    </div>
  )
}
