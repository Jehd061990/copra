import { useState } from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AssignedLists from "./AssignedLists";
import { access } from "fs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IAssignedLists {
  id: number;
  name: string;
  access: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AssisgnedInterval = () => {
  const [value, setValue] = useState(0);

  const listData = [
    { id: 1, name: "Elna", access: 2 },
    { id: 2, name: "Jed", access: 2 },
    { id: 3, name: "Perlie", access: 2 },
    { id: 4, name: "Ernie", access: 1 },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Baybay" {...a11yProps(0)} />
          <Tab label="Bukid" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Baybay
        <AssignedLists listData={listData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Bukid
        <AssignedLists listData={listData} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
};

export default AssisgnedInterval;
