import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

export default function OrderTable({ orders = [], items = null }) {
  // If items prop passed: render cart-like list; otherwise render orders list
  if (items) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {items.map((it) => (
              <TableRow key={it.product}>
                <TableCell>{it.title}</TableCell>
                <TableCell>Qty: {it.quantity}</TableCell>
                <TableCell>₹{it.price * it.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o._id}</TableCell>
              <TableCell>{o.user?.name || o.user}</TableCell>
              <TableCell>₹{o.total || o.totalAmount}</TableCell>
              <TableCell>
                <Chip
                  label={o.status}
                  color={o.status === "paid" ? "success" : "default"}
                />
              </TableCell>
              <TableCell>{new Date(o.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
