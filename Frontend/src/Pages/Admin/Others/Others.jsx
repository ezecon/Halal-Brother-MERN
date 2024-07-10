import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import IncomeComponent from "../Income/Income";
import { Inventory } from "../Inventory/Inventory/Inventory";
import Discount from "../Discount/Discount";
   
  export function Others() {
    const data = [
      {
        label: "DISCOUNT",
        value: "discount",
        desc: <Discount/>,
      },
      {
        label: "INCOME",
        value: "income",
        desc: <IncomeComponent />,
      },
      {
        label: "INVENTORY",
        value: "inventory",
        desc: <Inventory />,
      },
    ];
   
    return (
      <Tabs value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
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
    );
  }