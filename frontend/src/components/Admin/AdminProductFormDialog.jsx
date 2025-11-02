import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../store/slices/productSlice.js";
import toast from "react-hot-toast";

export default function AdminProductFormDialog({ open, onClose, product, onUpdated }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
      });
    } else {
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
      });
    }
  }, [product, open]);

  // ✅ Validate fields before saving
  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!form.price || isNaN(form.price) || form.price <= 0) {
      toast.error("Please enter a valid positive price");
      return false;
    }
    if (form.stock === "" || isNaN(form.stock) || form.stock < 0) {
      toast.error("Please enter a valid stock quantity");
      return false;
    }
    if (!form.description.trim()) {
      toast.error("Product description is required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      description: form.description.trim(),
    };

    try {
      await dispatch(updateProduct({ id: product._id, payload })).unwrap();
      toast.success("Product updated successfully");
      onUpdated && onUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
          <TextField
            label="Name*"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Price*"
            type="number"
            fullWidth
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            label="Stock*"
            type="number"
            fullWidth
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <TextField
            label="Description*"
            multiline
            rows={3}
            fullWidth
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
