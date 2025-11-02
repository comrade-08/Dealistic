import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import ProductFormDialog from "../../components/Vendor/ProductFormDialog.jsx";
import VendorProductsTable from "../../components/Vendor/VendorProductsTable.jsx";
import VendorSalesChart from "../../components/Vendor/VendorSalesChart.jsx";

import {
  fetchProducts,
  fetchVendorProducts,
} from "../../store/slices/productSlice.js"; // adjust path if needed
import { Box } from "@mui/material";

export default function VendorDashboard() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, [dispatch]);

  const handleCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setOpenForm(true);
  };

  const handleSaved = () => {
    setOpenForm(false);
    dispatch(fetchVendorProducts());
  };

  const loading = status === "loading";

  return (
    <Container sx={{ mt: 2, mb: 4 }}>
      <Typography sx={{ mb: 2 }} variant="h4" gutterBottom>
        Vendor Dashboard
      </Typography>

      <div className="md:flex justify-between items-center mb-5">
        <div className="md:pe-2 md:mb-0 w-full mb-5">
          <Paper className="flex justify-between items-center p-5">
            <Typography className="mb-5 md:mb-0" variant="h6">
              Your Products
            </Typography>
            <Button variant="contained" onClick={handleCreate}>
              Add Product
            </Button>
          </Paper>
        </div>

        <div className="w-full md:ps-2">
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Quick Stats</Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {products.length} products
            </Typography>
          </Paper>
        </div>
      </div>

      <Box sx={{ boxShadow: 3, p: 2, mb: 4, borderRadius: 3 }}>
        <Typography sx={{ mb: 2 }} variant="h6">
          Products
        </Typography>
        <VendorProductsTable
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onRefresh={() => dispatch(fetchProducts())}
        />
      </Box>

      <VendorSalesChart />

      <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSaved={handleSaved}
        editing={editing}
      />
    </Container>
  );
}
