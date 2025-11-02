import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OverviewCard from "../../components/Admin/OverviewCard.jsx";
import UsersTable from "../../components/Admin/UsersTable.jsx";
import SalesChart from "../../components/Admin/SalesChart.jsx";
import api from "../../api/axios.js";
import AdminProductsTable from "../../components/Admin/AdminProductsTable.jsx";
import { fetchProducts } from "../../store/slices/productSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/slices/ordersSlice.js";
import { fetchUsers } from "../../store/slices/userSlice.js";
import { Box } from "@mui/material";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items: products, productStatus } = useSelector(
    (state) => state.products
  );
  const { items: users, userStatus } = useSelector((state) => state.users);
  const { items: orders, orderStatus } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers())
  }, [dispatch]);

  // console.log(users, orders, products)

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Typography variant="h4" sx={{mb: 2}} gutterBottom>
        Admin Dashboard
      </Typography>

      <div className="flex gap-5 mb-5">
        <div className="w-full">
          <OverviewCard
            title="Total Users"
            value={users?.length + 1 || 0}
            color="primary"
          />
        </div>
        <div className="w-full">
          <OverviewCard
            title="Total Products"
            value={products?.length || 0}
            color="secondary"
          />
        </div>
        <div className="w-full">
          <OverviewCard
            title="Total Orders"
            value={orders?.length || 0}
            color="success"
          />
        </div>
      </div>

      <Box sx={{boxShadow: 3, p: 2, mb: 4, borderRadius: 3}}>
        <Typography sx={{mb: 2}} variant="h6">Users</Typography>
          <UsersTable users={users}/>
      </Box>
       <Box sx={{boxShadow: 3, p: 2, mb: 4, borderRadius: 3}}>
        <Typography sx={{mb: 2}} variant="h6">Products</Typography>
          <AdminProductsTable />
      </Box>
      <Box sx={{boxShadow: 3, borderRadius: 3}}>
          <SalesChart />
      </Box>
    </Container>
  );
}
