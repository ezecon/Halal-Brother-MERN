import { Button, Input } from "@material-tailwind/react";
import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileUpdate() {
  const { token } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    number: '',
    email: '',
    image: ''
  });

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
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        navigate('/login');
      }
    };
    verifyToken();
  }, [token, navigate]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://halal-brother-server.vercel.app/api/users/${userID}`, userInfo);
      if (response.status === 200) {
        console.log('Profile updated successfully');
        navigate('/profile');
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="bg-blue-gray-500 m-4 sm:m-10 p-4 sm:p-10 flex flex-col border-white rounded-lg max-w-screen-md w-full">
        <div className="mb-4">
          <Input label="Name" name="name" value={userInfo.name} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Input label="Address" name="address" value={userInfo.address} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Input label="Number" name="number" value={userInfo.number} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Input label="Email" name="email" value={userInfo.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Input label="Image" name="image" value={userInfo.image} onChange={handleChange} required />
        </div>
        <Button type="submit" className="mt-4">Update Profile</Button>
      </form>
    </div>
  );
}
