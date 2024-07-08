import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AllOrder from "../AllOrder/AllOrder";
import { Inventory } from "../Inventory/Inventory/Inventory";
import Reservation from "./Reservation";
import OfflineOrder from "../OfflineOrder/OfflineOrder";
import Income from "../Income/Income";

export  function AdminHome() {
  const data = [
    {
      label: "ONLINE ORDERS",
      value: "online",
      desc: <AllOrder />,
    },
    {
      label: "OFFLINE ORDERS",
      value: "offline",
      desc: <OfflineOrder/>,
    },
    {
      label: "Reservation",
      value: "rider",
      desc: <Reservation/>,
    },
    {
      label: "INCOME",
      value: "income",
      desc: <Income/>,
    },
    {
      label: "INVENTORY",
      value: "inventory",
      desc: <Inventory />,
    },
  ];

  return (
    <div className="my-5">
      <Tabs value="online"> {/* Make sure the initial value matches one of the tab values */}
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
