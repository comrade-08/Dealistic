import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import api from "../../api/axios.js";
import { Box } from "@mui/material";

export default function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        // Example: backend should provide monthly sales or compute on the fly
        const r = await api.get("/orders");
        const orders = r.data.orders || r.data;
        // simple aggregation by month for demo
        const map = {};
        orders.forEach((o) => {
          const d = new Date(o.createdAt);
          const key = d.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          map[key] = (map[key] || 0) + (o.total || o.totalAmount || 0);
        });
        const arr = Object.keys(map).map((k) => ({ month: k, sales: map[k] }));
        setData(
          arr.length
            ? arr
            : [
                // { month: "Jan", sales: 40 },
                // { month: "Feb", sales: 60 },
                // { month: "Mar", sales: 35 },
              ]
        );
      } catch (err) {
        console.error(err);
        setData([
          // { month: "Jan", sales: 40 },
          // { month: "Feb", sales: 60 },
          // { month: "Mar", sales: 35 },
        ]);
      }
    }
    load();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sales (monthly)
      </Typography>
      <div style={{ width: "100%", height: 280 }}>
        {data?.length ? (
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3f51b5"
                fill="#3f51b5"
              />
            </AreaChart>
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
