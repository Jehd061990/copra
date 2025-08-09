"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { addDays, format } from "date-fns";

interface Period {
  month: number;
  startDate: Date;
  harvestStart: Date;
  harvestEnd: Date;
  endDate: Date;
  koprador: string;
}

function generateTimeline(
  start: Date,
  sets: number,
  harvestDuration = 7
): Period[] {
  const result: Period[] = [];
  let currentDate = new Date(start);

  const kopradors = ["elna", "perlie", "jehd", "ernie"];

  for (let i = 0; i < sets; i++) {
    const harvestStart = new Date(currentDate);
    const harvestEnd = addDays(harvestStart, harvestDuration);

    // const endDate = addDays(harvestEnd, 30 * 4 - 1); // 4 months * 30 days, minus 1 day on the harvest end

    const endDate = addDays(harvestEnd, 30 * 4 - 1); // 4 months * 30 days

    // const startDate = new Date(harvestStart);
    const startDate = new Date(harvestStart);

    // Prepare for next block
    currentDate = new Date(endDate);

    const koprador = kopradors[i % kopradors.length];

    result.push({
      koprador,
      month: i + 1,
      startDate,
      harvestStart,
      harvestEnd,
      endDate,
    });

    // Next harvest will start 7 days before the next 4-month cycle
    currentDate = new Date(endDate);
  }

  return result;
}

const HarvestTimelineTable: React.FC = () => {
  const timeline = generateTimeline(new Date("2025-08-04"), 12);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Koprador</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Harvest Timeline</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeline.map((period) => (
            <TableRow key={period.month}>
              <TableCell>{period.koprador}</TableCell>
              <TableCell>{format(period.startDate, "MMM d, yyyy")}</TableCell>
              <TableCell>
                {`${format(period.harvestStart, "MMM d")} to ${format(
                  period.harvestEnd,
                  "MMM d, yyyy"
                )}`}
              </TableCell>
              <TableCell>{format(period.endDate, "MMM d, yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HarvestTimelineTable;
