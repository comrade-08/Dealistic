import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Edit, Delete } from "@mui/icons-material";

import { fetchProducts, deleteProduct } from "../../store/slices/productSlice.js";
import AdminProductFormDialog from "./AdminProductFormDialog.jsx";
import DeleteProductDialog from "./DeleteProductDialog.jsx";

export default function AdminProductsTable() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const { items: products, status } = useSelector((s) => s.products);
  const [editItem, setEditItem] = useState(null);

  const loading = status === "loading";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

   const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };


  const handleUpdated = () => {
    setEditItem(null);
    dispatch(fetchProducts());
  };

  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>{p.name || p.title}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.vendor ? p.vendor.name || p.vendor : "-"}</TableCell>
                <TableCell className="">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setEditItem(p)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleOpenDelete(p)} color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {loading && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading && products.length === 0 && (
              <TableRow>
                <TableCell sx={{p: 2}} colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <AdminProductFormDialog
        open={!!editItem}
        product={editItem}
        onClose={() => setEditItem(null)}
        onUpdated={handleUpdated}
      />

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
