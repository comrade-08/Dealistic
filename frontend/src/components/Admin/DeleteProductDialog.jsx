import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/slices/productSlice.js";
import toast from "react-hot-toast";

export default function DeleteProductDialog({ open, onClose, product, onDeleted }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!product?._id) return toast.error("Invalid product selected!");
    setLoading(true);
    try {
      await dispatch(deleteProduct(product._id)).unwrap();
      toast.success("Product deleted successfully!");
      onDeleted && onDeleted(product._id);
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle gutterBottom>Delete Product</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Are you sure you want to delete{" "}
          <Typography component="span" fontWeight="bold">
            {product.name}
          </Typography>
          ? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
