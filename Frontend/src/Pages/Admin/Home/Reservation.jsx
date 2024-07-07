import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Menu, MenuHandler, MenuList, MenuItem, Collapse, Card, CardBody, Typography } from "@material-tailwind/react";

export default function Reservation() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMap, setOpenMap] = useState({}); // Store open state for each item

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

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
        const response = await axios.get(`http://localhost:5000/api/reservation/`);
        setData(response.data);
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

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reservation/${reservationId}`, { status: newStatus });
      setData(data.map(item => item._id === reservationId ? { ...item, status: newStatus } : item));
      console.log(response.data); // Log or handle response as needed
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  };

  const toggleOpen = (id) => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
        {data.length === 0 ? (
          <p className="text-center">No reservations found.</p>
        ) : (
          <div className="space-y-4">
            {data.reverse().map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0"
              >
                <Link to={`/user/${item.userID}`}>
                  <Button>User</Button>
                </Link>
                <p className="p-1"><span className="crimson">Date:</span> <br/>{item.date}</p>
                <p className="pr-1"><span className="crimson">Time:</span> <br/> {item.time}</p>
                <p className="pr-1"><span className="crimson">Seat:</span> <br/> {item.seat}</p>
                <p className="pr-1"><span className="crimson">Status: </span> <br/>{item.status}</p>
                {item.status === 'pending' && (
                  <Menu>
                    <MenuHandler>
                      <Button>Change Status</Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => handleStatusChange(item._id, 'Accepted')}>Accept</MenuItem>
                      <MenuItem onClick={() => handleStatusChange(item._id, 'Rejected')}>Reject</MenuItem>
                    </MenuList>
                  </Menu>
                )}
                 <div className="flex pl-2">
                 <Button onClick={() => toggleOpen(item._id)}>Open Collapse</Button>
                <Collapse open={!!openMap[item._id]}>
                  <Card className="my-4 mx-auto w-6/12">
                    <CardBody>
                      <Typography>
                        <p>Occasion: {item.reason}</p>
                        <p>Special Request: {item.query}</p>
                      </Typography>
                    </CardBody>
                  </Card>
                </Collapse>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
