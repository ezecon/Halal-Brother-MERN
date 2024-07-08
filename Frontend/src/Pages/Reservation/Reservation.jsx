import { Button, Input } from "@material-tailwind/react";
import Upper from "./Upper";
import { FaHamburger } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { FaPizzaSlice } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useToken } from "../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-hot-toast";

export function Reservation() {
    const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
            navigate('/login')
          return;
        }

        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);

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

  const [date, setDate] = useState('');
  const [seat, setSeat] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      userID,
      date,
      seat,
      time,
      reason,
      query
    };

    try {
      await axios.post('https://halal-brother-server.vercel.app/api/reservation', postData);
      toast.success('Reservation request sent successfully!');
      // Reset form
      setDate('');
      setSeat('');
      setTime('');
      setReason('');
      setQuery('');
    } catch (error) {
      toast.error('Failed. Please try again.');
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b ">
      <Upper />

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-auto mt-8">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <FaHamburger className="text-5xl text-orange-500" />
          <MdTableRestaurant className="text-5xl text-orange-500" />
          <FaPizzaSlice className="text-5xl text-orange-500" />
        </div>

        <form className="flex flex-col space-y-4">
          <Input type="number" color="blue" size="regular" label="Number of Seats" required value={seat} onChange={(e) => setSeat(e.target.value)}/>
          <Input type="date" color="blue" size="regular" label="Enter Date" required value={date} onChange={(e) => setDate(e.target.value)}/>
          <Input type="time" color="blue" size="regular" label="Enter Time" required value={time} onChange={(e) => setTime(e.target.value)}/>
          <Input type="text" color="blue" size="regular" label="Occasion"required value={reason} onChange={(e) => setReason(e.target.value)} />
          <Input type="text" color="blue" size="regular" label="Any Special Requests?" required value={query} onChange={(e) => setQuery(e.target.value)}/>

          <Button ripple="light" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
