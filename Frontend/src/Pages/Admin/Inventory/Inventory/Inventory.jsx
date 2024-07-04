import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Add from "../Add/Add";
import List from "../List/List";
 
export function Inventory() {
  const data = [
    {
      label: "LIST",
      value: "list",
      icon: Square3Stack3DIcon,
      desc: <List/>,
    },
    {
      label: "ADD",
      value: "add",
      icon: UserCircleIcon,
      desc: <Add/>,
    },

  ];
  return (
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
  );
}