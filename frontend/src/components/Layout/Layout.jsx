import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import { Topbar } from "./Topbar.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh"}}>
      {/* AppBar with Topbar */}
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Menu + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isLargeScreen && (
              <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu />
              </IconButton>
            )}
            <Typography className="flex items-center gap-2" variant="h6" sx={{ fontWeight: "bold" }}>
              Dealistic
            </Typography>
          </Box>

          {/* Right: Theme Toggle & Username */}
          <Topbar onToggleSidebar={() => setSidebarOpen(false)} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 8,
          ml: isLargeScreen ? "240px" : 0, // Shift right when sidebar is permanent
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
