import { useNavigate } from "react-router-dom";
import Blob from "../../Componants/Blob/Blob";
import Footer from "../../Componants/Footer/Footer";
import { useToken } from "../../Componants/Hook/useToken";
import Offer from "../../Componants/Offer/Offer";
import TopItem from "../../Componants/TopItems/TopItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { HeroSection } from "../../Componants/HeroSection/HeroSection";

export default function Home() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {

          return;
        }

        const response = await axios.post('https://halal-brother-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
          console.log(response.data.decoded.id)

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
  return (
    <div>
      <HeroSection/>
      
      <TopItem/>
      <Offer/>
      <Blob/>
      <Footer/>
    </div>
  );
}
