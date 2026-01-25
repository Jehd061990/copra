import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SxProps,
  Theme,
} from "@mui/material";

export interface TableColumn<T = any> {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number | string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  headerSx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
}

export interface GenericTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  keyField?: string;
  containerSx?: SxProps<Theme>;
  tableSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  rowSx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
  onRowClick?: (row: T, index: number) => void;
  highlightSelectedRow?: boolean;
  selectedRowKey?: string | number;
  stickyHeader?: boolean;
  maxHeight?: number | string;
  component?: React.ElementType;
}

function GenericTable<T = any>({
  data,
  columns,
  keyField = "id",
  containerSx,
  tableSx,
  headerSx,
  rowSx,
  cellSx,
  onRowClick,
  highlightSelectedRow = false,
  selectedRowKey,
  stickyHeader = false,
  maxHeight,
  component = Paper,
}: GenericTableProps<T>) {
  const [internalSelectedRow, setInternalSelectedRow] = useState<
    string | number | null
  >(null);

  const getRowKey = (row: T, index: number): string | number => {
    if (typeof row === "object" && row !== null && keyField in row) {
      return (row as any)[keyField];
    }
    return index;
  };

  const getCellValue = (row: T, columnKey: string): any => {
    if (typeof row === "object" && row !== null && columnKey in row) {
      return (row as any)[columnKey];
    }
    return "";
  };

  return (
    <TableContainer
      component={component}
      sx={{
        maxHeight,
        ...containerSx,
      }}
    >
      <Table sx={tableSx} stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow sx={headerSx}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                sx={{
                  fontWeight: 700,
                  minWidth: column.minWidth,
                  //   ...cellSx,
                  ...column.headerSx,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            const rowKey = getRowKey(row, index);
            const currentSelectedRow =
              selectedRowKey !== undefined
                ? selectedRowKey
                : internalSelectedRow;
            const isSelected =
              highlightSelectedRow && currentSelectedRow === rowKey;

            return (
              <TableRow
                key={rowKey}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  backgroundColor: isSelected
                    ? "action.selected"
                    : "transparent",
                  "&:hover": onRowClick
                    ? {
                        backgroundColor: isSelected
                          ? "action.selected"
                          : "action.hover",
                      }
                    : {},
                  ...rowSx,
                }}
                onClick={() => {
                  if (highlightSelectedRow && selectedRowKey === undefined) {
                    setInternalSelectedRow(rowKey);
                  }
                  onRowClick?.(row, index);
                }}
              >
                {columns.map((column) => {
                  const value = getCellValue(row, column.key);
                  return (
                    <TableCell
                      key={column.key}
                      align={column.align}
                      sx={{
                        //   ...cellSx,
                        ...column.cellSx,
                      }}
                    >
                      {column.render ? column.render(value, row, index) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GenericTable;
