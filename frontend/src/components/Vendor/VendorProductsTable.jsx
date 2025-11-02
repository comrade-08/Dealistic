import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct, // if needed elsewhere
} from "../../store/slices/productSlice.js";
import api from "../../api/axios.js";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import { Edit, Delete } from "@mui/icons-material";
import { Typography } from "@mui/material";
import DeleteProductDialog from "../Admin/DeleteProductDialog.jsx";
import { useState } from "react";

export default function VendorProductsTable({ onEdit }) {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((s) => s.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  // Load products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  const loading = status === "loading";

  return (
    <Paper sx={{ p: 2 }}>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell sx={{ p: 2 }} colSpan={4} align="center">
                    No products available
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p._id} hover>
                    <TableCell>{p.name || p.title}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell className="flex justify-between">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => onEdit && onEdit(p)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleOpenDelete(p)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Dialog */}
      <DeleteProductDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        product={selectedProduct}
        onDeleted={(id) => console.log("Deleted product:", id)}
      />
    </Paper>
  );
}
