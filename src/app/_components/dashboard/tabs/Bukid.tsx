import React, { useState, useMemo } from "react";
import { addDays, format, getYear } from "date-fns";
import { useHarvestTimeline } from "../../../hooks/useHarvestTimeline";
import GenericTable, { TableColumn } from "@/app/_components/CopraTable";
import { Period } from "@/app/hooks/useHarvestTimeline";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface BukidProps {
  columns: TableColumn<Period>[];
}

const Bukid: React.FC<BukidProps> = ({ columns }) => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const timeline = useHarvestTimeline(new Date("2025-08-04"), 120, [
    "elna",
    "perlie",
    "charita",
    "ernie",
    "jehd",
  ]);

  // Extract unique years from the timeline data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    timeline.forEach((period) => {
      years.add(getYear(period.startDate));
      years.add(getYear(period.endDate));
      years.add(getYear(period.harvestStart));
      years.add(getYear(period.harvestEnd));
    });
    return Array.from(years).sort();
  }, [timeline]);

  // Filter timeline data based on selected year
  const filteredTimeline = useMemo(() => {
    if (selectedYear === "all") {
      return timeline;
    }

    const year = parseInt(selectedYear);
    return timeline.filter((period) => {
      return (
        getYear(period.startDate) === year ||
        getYear(period.endDate) === year ||
        getYear(period.harvestStart) === year ||
        getYear(period.harvestEnd) === year
      );
    });
  }, [timeline, selectedYear]);

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ mb: 2, minWidth: 200 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="year-filter-label">Filter by Year</InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            value={selectedYear}
            label="Filter by Year"
            onChange={handleYearChange}
          >
            <MenuItem value="all">All Years</MenuItem>
            {availableYears.map((year) => (
              <MenuItem key={year} value={year.toString()}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <GenericTable
        data={filteredTimeline}
        columns={columns}
        highlightSelectedRow={true}
        keyField="month"
        onRowClick={(row) => console.log("Clicked:", row)}
      />
    </Box>
  );
};

export default Bukid;
