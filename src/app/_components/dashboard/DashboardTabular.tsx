import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps<Theme>;
}

interface GenericTabsProps {
  tabs: TabItem[];
  defaultValue?: number;
  ariaLabel?: string;
  variant?: "standard" | "scrollable" | "fullWidth";
  orientation?: "horizontal" | "vertical";
  sx?: SxProps<Theme>;
  tabSx?: SxProps<Theme>;
  panelSx?: SxProps<Theme>;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, ...sx }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function GenericTabs({
  tabs,
  defaultValue = 0,
  ariaLabel = "basic tabs",
  variant = "standard",
  orientation = "horizontal",
  sx,
  tabSx,
  panelSx,
  onChange: onChangeCallback,
}: GenericTabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChangeCallback?.(event, newValue);
  };

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Box
        sx={{
          borderBottom: orientation === "horizontal" ? 1 : 0,
          borderRight: orientation === "vertical" ? 1 : 0,
          borderColor: "divider",
          ...tabSx,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel}
          variant={variant}
          orientation={orientation}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              disabled={tab.disabled}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index} sx={panelSx}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
