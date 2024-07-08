import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ItemCard from "../../Componants/PhotoCards/ItemsCard/ItemsCard";
import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useToken } from '../../Componants/Hook/useToken';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");


  ///////////////////////////////
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.ID);

        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);




  useEffect(() => {
    fetch("https://halal-brother-server.vercel.app/api/items")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });
  }, []);

  const filterProducts = (category) => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.version === category));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission if needed
  };

  if (loading) {
    return <div className="flex gap-2 mt-10 text-center"> <Spinner className="h-8 w-8" />Loading...</div>;
  }

  return (
    <div>
      <div className="w-full bg-black text-center py-56">
        <h1 className="crimson text-4xl">PRODUCTS</h1>
        <p className="text-white">Order Now</p>
      </div>
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6">
          <div className="w-full">
            <Select
              required
              label="Select Category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e)}
            >
              <Option value="">All</Option>
              <Option value="Burger">Burger</Option>
              <Option value="Chicken Special">Chicken Special</Option>
              <Option value="Newly Added">Newly Added</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Halal Bro Special">Halal Bro Special</Option>
              <Option value="Drinks">Drinks</Option>
            </Select>
          </div>
        </div>
      </form>
      <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredProducts.reverse().map((item) => (
          <ItemCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
