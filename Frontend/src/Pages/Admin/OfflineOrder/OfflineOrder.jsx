import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogBody, DialogHeader, Option, Select, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useToken } from '../../../Componants/Hook/useToken';
import axios from 'axios';
import ItemCard from "./ItemCard";
import toast from "react-hot-toast";
import OrderSlip from "./OrderSlip";
import { useReactToPrint } from "react-to-print";

export default function OfflineOrder() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [productsName, setProductsName] = useState([]);
  const [productsID, setProductID] = useState([]);
  const [total, setTotal] = useState(0);
  const [showSlip, setShowSlip] = useState(false);
  const [order, setOrder] = useState(null);

  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [adminID, setAdminID] = useState(null);

  const slipRef = useRef();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleOpen = () => setOpen(!open);

  const handlePrint = useReactToPrint({
    content: () => slipRef.current,
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setAdminID(response.data.decoded.id);
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

  useEffect(() => {
    if (customer.length) {
      let tempTotal = 0;
      const tempProductsName = customer.map(item => {
        tempTotal += item.price;
        return item.name;
      });
      const tempProductID = customer.map(item => {
        return item.itemID;
      });
      setProductID(tempProductID);
      setTotal(tempTotal);
      setProductsName(tempProductsName);
    }
  }, [customer]);

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

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission if needed
  };

  if (loading) {
    return <div className="flex gap-2 mt-10 text-center"><Spinner className="h-8 w-8" />Loading...</div>;
  }

  const handleUser = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`https://halal-brother-server.vercel.app/api/carts/admin/${id}`);
      if (response.status === 200) {
        setCustomer(response.data);
        handleOpen();
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAutoDelete = async () => {
    try {
      await axios.delete(`https://halal-brother-server.vercel.app/api/carts/delete/${adminID}`);
      const promise = await axios.get(`https://halal-brother-server.vercel.app/api/carts/admin/${adminID}`);
      setCustomer(promise.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleTotalIncome = async () => {
    try {
      const response = await axios.post(`https://halal-brother-server.vercel.app/api/incomes`, {
        userID: adminID,
        income: total,
      });
      if (response.status === 200) {
        console.log('money sent to cash');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOfflineOrder = async () => {
    try {
      const response = await axios.post('https://halal-brother-server.vercel.app/api/offline-order', {
        adminID: adminID,
        products: productsName,
        productsID: productsID,
        totalPrice: total,
      });
      if (response.status === 200) {
        toast.success("Order Done");
        setShowSlip(true);
        setOrder({ productDetails: customer });
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
    handleAutoDelete();
    handleTotalIncome();
    handlePrint();
  };

  return (
    <div>
      <div className="w-full bg-black text-center py-56">
        <h1 className="crimson text-4xl">PRODUCTS</h1>
        <p className="text-white playwrite-gb-s-regular">Offline Order</p>
      </div>
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6">
          <div className="w-full">
            <Select
              {...register("category", { required: true })}
              label="Select Category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <Option value="">All</Option>
              <Option value="Burger">Burger</Option>
              <Option value="Chicken Special">Chicken Special</Option>
              <Option value="Newly Added">Newly Added</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Halal Bro Special">Halal Bro Special</Option>
              <Option value="Drinks">Drinks</Option>
            </Select>
            {errors.category && <span className="text-red-500">Category is required</span>}
          </div>
        </div>
      </form>
      <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredProducts.reverse().map((item) => (
          <ItemCard key={item._id} data={item} />
        ))}
      </div>
      <Button onClick={() => handleUser(adminID)} className="m-5">Confirm Order</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="playwrite-gb-s-regular">Order Information</DialogHeader>
        <DialogBody>
          {customer.length ? (
            <div>
              {customer.map((item) => (
                <p className="flex mb-2" key={item.id}><img className="w-8 mr-1" src={item.image} alt="" /> - Name: {item.name} - Price: {item.price}</p>
              ))}
              <p>Total: {total}</p>
              <Button onClick={handleOfflineOrder}>Done with Payment Slip</Button>
              <Button onClick={handleAutoDelete} className="m-5 bg-red-800">Clear</Button>
              {showSlip && (
                <>
                  <OrderSlip ref={slipRef} order={order} />
                </>
              )}
            </div>
          ) : (
            <p className="playwrite-gb-s-regular">Empty</p>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}
