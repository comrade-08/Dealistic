import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ProductGrid from "../../components/User/ProductGrid.jsx";
import CartDrawer from "../../components/User/CartDrawer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice.js";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products by search term
  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Typography sx={{ mb: 2 }} variant="h4" gutterBottom>
        Shop
      </Typography>

      {/* 🔍 Search Bar */}
      <TextField
        label="Search products..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Pass filtered products to ProductGrid */}
          <ProductGrid products={filteredProducts} />
        </Grid>
      </Grid>

      <CartDrawer />
    </Container>
  );
}
