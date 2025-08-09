import React from "react";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

// interface IAssigneData {
//   id: number;
//   name: string;
//   access: number;
// }

// interface IAssignedLists {
//   listData: IAssigneData[];
// }

const AssignedLists = () => {
  return (
    <Box>
      <Typography>Assigned Interval</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Elna" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Jed" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Perlie" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ernie" />
        </ListItem>
      </List>
    </Box>
  );
};

export default AssignedLists;
