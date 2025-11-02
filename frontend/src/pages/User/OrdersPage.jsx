import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import OrderTable from "../../components/User/OrderTable.jsx";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios.js";
import { fetchOrders } from "../../store/slices/ordersSlice.js";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.orders.items);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography sx={{mb: 2}} variant="h4" gutterBottom>
        My Orders
      </Typography>
      <OrderTable orders={orders} />
    </Container>
  );
}
