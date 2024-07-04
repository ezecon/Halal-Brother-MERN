import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AllOrder from "../AllOrder/AllOrder";
import { Inventory } from "../Inventory/Inventory/Inventory";

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
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "RIDER",
      value: "rider",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "INCOME",
      value: "income",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
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
