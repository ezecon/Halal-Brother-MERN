import { Button } from "@material-tailwind/react";
import { useToken } from "../../../Componants/Hook/useToken";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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
    if (!userID) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/users/${userID}`);
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, [userID]);

  return (
    <div>
       {userInfo ? ( <div className="flex justify-center">
        <div className="bg-blue-gray-500 m-4 sm:m-10 p-4 sm:p-10 flex flex-col sm:flex-row border-white rounded-lg max-w-screen-md w-full">
          <div className="w-full sm:w-40">
            <img
              className="border-white rounded w-full sm:w-auto"
              src={userInfo.image}
              alt="Profile"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:pl-10 flex flex-col justify-center">
            
              <div className="text-white playwrite-gb-s-regular">
                <p>Name: {userInfo.name}</p>
                <p>Address: {userInfo.address}</p>
                <p>Number: {userInfo.number}</p>
                <p>Email: {userInfo.email}</p>
              </div>
           
            <Link to="/profile-update"><Button className="mt-4">Update Profile</Button></Link>
          </div>
        </div>
      </div> ) : (
              <div className="text-white">Loading...</div>
            )}
    </div>
  );
}
