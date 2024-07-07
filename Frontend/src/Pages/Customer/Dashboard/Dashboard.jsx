import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaHamburger } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import Reservation from "./Reservation";
import Order from "./Orders";
export function Dashboard() {
  const data = [
    {
      label: "Order History",
      value: "dashboard",
      icon: FaHamburger,
      desc: <Order/>,
    },
    {
      label: "Reservation History",
      value: "profile",
      icon: MdTableRestaurant,
      desc: <Reservation/>,
    },
  ];
  return (
    <div className="mt-5">
        <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
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