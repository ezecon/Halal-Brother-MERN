import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import AllOrder from "../AllOrder/AllOrder";
import OfflineHistory from "../OfflineOrder/History";
   
  export function History() {
    const data = [
      {
        label: "ONLINE ORDERS",
        value: "ONLINE",
        desc: <AllOrder/>,
      },
      {
        label: "OFFLINE ORDERS",
        value: "OFFLINE",
        desc: <OfflineHistory/>,
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