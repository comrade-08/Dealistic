import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/slices/ordersSlice.js";
import { Box } from "@mui/material";

export default function VendorSalesChart() {
  const dispatch = useDispatch();
  const { items: orders = [], status } = useSelector((s) => s.orders);
  const [data, setData] = useState([]);

  // ✅ Fetch orders once on mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // ✅ Recalculate chart data when orders change
  useEffect(() => {
    if (!orders.length) return;

    const map = {};
    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const key = d.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      map[key] = (map[key] || 0) + (o.total || o.totalAmount || 0);
    });

    const arr = Object.keys(map)
      .map((k) => ({ month: k, sales: map[k] }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    setData(arr);
  }, [orders]);

  return (
    <Paper sx={{ p: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Sales (Vendor)
      </Typography>

      <div style={{ width: "100%", height: 240 }}>
        {data.length ? (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box className="h-full flex justify-center items-center">
            <Typography sx={{ textAlign: "center" }} variant="h6">
              No orders found for chart!
            </Typography>
          </Box>
        )}
      </div>
    </Paper>
  );
}
