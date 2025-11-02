import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import api from "../../api/axios.js";
import { fetchUsers, updateUserRole } from "../../store/slices/userSlice.js";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'

export default function UsersTable({users}) {
  const dispatch = useDispatch()

  const changeRole = async (id, role) => {
    try {
      await dispatch(updateUserRole({id, role})).unwrap()
      dispatch(fetchUsers());
      toast.success("Role updated!")
    } catch (err) {
      console.error(err);
      toast.error("Failed to change role!");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length ? users.map((u) => (
              <TableRow key={u._id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  {u.role !== "vendor" && (
                    <Button
                      size="small"
                      onClick={() => changeRole(u._id, "vendor")}
                    >
                      Make Vendor
                    </Button>
                  )}
                  {u.role !== "admin" && (
                    <Button
                      size="small"
                      onClick={() => changeRole(u._id, "admin")}
                    >
                      Make Admin
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )) : <TableRow>
                  <TableCell sx={{p: 2}} colSpan={4} align="center">
                    No Users available excluding you
                  </TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
