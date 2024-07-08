
import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Reservation() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
        navigate('/login');
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/reservation/byuser/${userID}`);
        setData(response.data);
        console.log(response.data)
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false); // Set loading to false on error
      }
    };

    if (userID) {
        fetchReservationData();
    }
  }, [userID]);


  if (loading) {
    return <p className="text-center">Loading...</p>; // Centered loading message
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>; // Centered error message
  }

  return (
    <div className="mt-10 p-6">
      <h1 className="text-center font-bold text-3xl mb-6">Reservation</h1>
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="space-y-4">
          {data.reverse().map((item) => {
            
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0"
              >
                <p>Date: {item.date}</p>
                <p>Time: {item.time}</p>
                <p>Status: {item.status}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
