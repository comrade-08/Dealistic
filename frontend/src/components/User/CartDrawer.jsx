import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice.js";
import { fetchOrders, placeOrder } from "../../store/slices/ordersSlice.js";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!items.length) return toast.error("Cart is empty!");

    try {
      const payload = {
        items: items.map((i) => ({ product: i.product, qty: i.quantity })),
      };

      // 🔹 Dispatch placeOrder action
      await dispatch(placeOrder(payload.items)).unwrap();

      // 🔹 Refresh order list in Redux
      dispatch(fetchOrders());

      // 🔹 Clear cart and close drawer
      dispatch(clearCart());
      setOpen(false);

      toast.success("Order placed successfully!");
    } catch (err) {
      console.error("❌ Error placing order:", err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 360, p: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h6">Cart</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {/* Items */}
        <List sx={{ mb: 2 }}>
          {items.length === 0 && (
            <Typography color="text.secondary">No items in cart</Typography>
          )}
          {items.map((it, index) => (
            <ListItem
              key={it._id || it.product || index} // ✅ valid key
              secondaryAction={
                <Typography>₹{it.price * it.quantity}</Typography>
              }
            >
              <ListItemText
                primary={
                  <Typography maxWidth={200} sx={{ wordBreak: "normal" }}>
                    {it.title}
                  </Typography>
                }
                secondary={`Qty: ${it.quantity}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Footer */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Total ₹{total}</Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => {
              dispatch(clearCart());
              setOpen(false);
            }}
          >
            Clear Cart
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
