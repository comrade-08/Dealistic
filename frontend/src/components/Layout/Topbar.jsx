import React, { useState } from "react";
import { Sun, Moon, ShoppingCart, ClipboardList } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useColorMode } from "../../theme/ThemeProviderWrapper";
import {
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const Topbar = ({ onToggleSidebar }) => {
  const user = useSelector((state) => state.auth?.user || { name: "Guest" });
  const cartItems = useSelector((state) => state.cart?.items || []);
  const { mode, toggleMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  };

  const handleThemeToggle = () => {
    toggleMode();
    if (onToggleSidebar) onToggleSidebar();
  };

  const handleMyOrders = () => {
    navigate("/orders");
  };

  const handleCart = () => {
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  return (
    <div className="flex items-center gap-4">
      {/* Dark / Light Mode */}
      <Tooltip title="Toggle dark mode">
        <IconButton onClick={handleThemeToggle}>
          {mode === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </IconButton>
      </Tooltip>
      {/* {console.log(user?.role, 'user')} */}

      {(user?.role === "admin" || user?.role === "user") && (
        <>
          {/* My Orders */}
          <Tooltip title="My Orders">
            <IconButton onClick={handleMyOrders}>
              <ClipboardList className="w-5 h-5" />
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <Tooltip title="Cart">
            <IconButton onClick={handleCart}>
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCart className="w-5 h-5" />
              </Badge>
            </IconButton>
          </Tooltip>
        </>
      )}

      {/* User Dropdown */}
      <div>
        <Button
          onClick={handleMenuOpen}
          variant="outlined"
          sx={{ textTransform: "capitalize", fontWeight: 600 }}
        >
          {user?.name || "Guest"}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
