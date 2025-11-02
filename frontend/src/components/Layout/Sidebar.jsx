import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, Users, BoxIcon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // lg = desktop

  return (
    <Drawer
      variant={isLargeScreen ? "permanent" : "temporary"}
      open={isLargeScreen ? true : open}
      onClose={onClose}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          // mt: 8,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Dealistic
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List>
        <ListItem
          button
          component={RouterLink}
          to="/user"
          onClick={!isLargeScreen ? onClose : undefined}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItem>

        <ListItem
          button
          component={RouterLink}
          to="/vendor"
          onClick={!isLargeScreen ? onClose : undefined}
        >
          <ListItemIcon>
            <BoxIcon />
          </ListItemIcon>
          <ListItemText primary="Vendor" />
        </ListItem>

        <ListItem
          button
          component={RouterLink}
          to="/admin"
          onClick={!isLargeScreen ? onClose : undefined}
        >
          <ListItemIcon>
            <Users />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
    </Drawer>
  );
}
