import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createProduct, updateProduct } from "../../store/slices/productSlice.js";
import toast from "react-hot-toast";

export default function ProductFormDialog({ open, onClose, onSaved, editing }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || editing.title || "",
        description: editing.description || "",
        price: editing.price || "",
        stock: editing.stock || "",
        imageUrl: editing.imageUrl || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
      });
    }
  }, [editing, open]);

  // ✅ Validate product details before saving
  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!form.description.trim()) {
      toast.error("Product description is required");
      return false;
    }
    if (!form.price || isNaN(form.price) || form.price <= 0) {
      toast.error("Please enter a valid product price");
      return false;
    }
    if (!form.stock || isNaN(form.stock) || form.stock < 0) {
      toast.error("Please enter valid stock quantity");
      return false;
    }
    if (form.imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(form.imageUrl)) {
      toast.error("Please enter a valid image URL (jpg, png, gif, etc.)");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      imageUrl: form.imageUrl.trim(),
    };

    try {
      if (editing && editing._id) {
        await dispatch(updateProduct({ id: editing._id, payload })).unwrap();
        toast.success("Product updated successfully");
      } else {
        await dispatch(createProduct(payload)).unwrap();
        toast.success("Product added successfully");
      }
      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
          <TextField
            label="Name*"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Description*"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            label="Image URL"
            fullWidth
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
