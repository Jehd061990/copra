"use client";

import React from "react";
import DashboardTabular from "@/app/_components/dashboard/DashboardTabular";
import Baybay from "@/app/_components/dashboard/tabs/Baybay";
import Bukid from "@/app/_components/dashboard/tabs/Bukid";
import { TableColumn } from "@/app/_components/CopraTable";
import { Period } from "@/app/hooks/useHarvestTimeline";
import { format } from "date-fns";

const HarvestTimelineTable: React.FC = () => {
  const columns: TableColumn<Period>[] = [
    { key: "koprador", label: "Koprador" },
    // {
    //   key: "startDate",
    //   label: "Start Date",
    //   render: (value) => format(value, "MMM d, yyyy"),
    // },
    {
      key: "harvestStart",
      label: "Harvest Timeline",
      render: (value, row) =>
        `${format(row.harvestStart, "MMM d")} to ${format(row.harvestEnd, "MMM d, yyyy")}`,
    },
    // {
    //   key: "endDate",
    //   label: "End Date",
    //   render: (value) => format(value, "MMM d, yyyy"),
    // },
  ];

  const tabData = [
    { label: "Baybay", content: <Baybay columns={columns} /> },
    { label: "Bukid", content: <Bukid columns={columns} /> },
    // { label: "Settings", content: <SettingsContent />, disabled: false },
  ];

  return (
    <>
      <DashboardTabular tabs={tabData} />
    </>
  );
};

export default HarvestTimelineTable;
