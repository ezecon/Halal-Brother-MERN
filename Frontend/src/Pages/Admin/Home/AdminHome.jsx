import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Reservation from "./Reservation";
import OfflineOrder from "../OfflineOrder/OfflineOrder";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../../Componants/Hook/useToken";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { History } from "../History/History";
import { Others } from "../Others/Others";

export function AdminHome() {
  const data = [
    {
      label: "ORDERS HISTORY",
      value: "HISTORY",
      desc: <History />,
    },
    {
      label: "OFFLINE ORDERS",
      value: "offline",
      desc: <OfflineOrder />,
    },
    {
      label: "Reservation",
      value: "rider",
      desc: <Reservation />,
    },
    {
      label: "OTHERS",
      value: "OTHERS",
      desc: <Others />,
    },
  ];

  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

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
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`https://halal-brother-server.vercel.app/api/users/${userID}`);
        if (response.status === 200) {
          console.log(response.data);
          if (response.data.role !== 'admin') {
            navigate('/');
            toast.success("Sorry you're not admin");
          }
        } else {
          console.log("user not found");
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    };

    if (userID) {
      fetchAdmin();
    }
  }, [userID, navigate]);

  return (
    <div className="my-5">
      <Tabs value="online">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="font-sans font-bold">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
