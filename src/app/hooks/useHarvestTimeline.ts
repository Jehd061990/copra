import { useMemo } from "react";
import { addDays } from "date-fns";

export interface Period {
  month: number;
  startDate: Date;
  harvestStart: Date;
  harvestEnd: Date;
  endDate: Date;
  koprador: string;
}

function generateTimeline(
  start: Date,
  harvestDuration = 7,
  kopradors: string[],
  yearsToGenerate = 20,
): Period[] {
  const result: Period[] = [];
  let currentDate = new Date(start);

  // Calculate approximate sets needed for the specified years
  // Each cycle is ~4 months, so about 3 cycles per year
  const sets = yearsToGenerate * 3;

  //   const kopradors = ["elna", "perlie", "jehd", "ernie"];

  for (let i = 0; i < sets; i++) {
    const harvestStart = new Date(currentDate);
    const harvestEnd = addDays(harvestStart, harvestDuration);

    // const endDate = addDays(harvestEnd, 30 * 4 - 1); // 4 months * 30 days, minus 1 day on the harvest end

    // Pahumanon sa ang adlaw sa pag harvest end unya i-add ang 4 ka bulan nga 120 ka adlaw
    // example: kung ang harvest end kay December 17,2025 unya mag sugod na pud og ihap sa December 18, 2025. So ang end date kay April 17, 2026

    const endDate = addDays(harvestEnd, 30 * 4 + 1); // 4 months * 30 days

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

export const useHarvestTimeline = (
  start: Date,
  harvestDuration = 7,
  kopradors: string[],
  yearsToGenerate = 20,
): Period[] => {
  return useMemo(() => {
    return generateTimeline(start, harvestDuration, kopradors, yearsToGenerate);
  }, [start, harvestDuration, kopradors, yearsToGenerate]);
};
