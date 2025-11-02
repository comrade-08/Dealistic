import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/slices/authSlice.js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // ✅ Validation Function
  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await dispatch(register(form)).unwrap();
      toast.success("Account created successfully!");

      const role = (res.user.role || "").toLowerCase();
      if (role === "admin") navigate("/admin");
      else if (role === "vendor") navigate("/vendor");
      else navigate("/user");
    } catch (err) {
      toast.error(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Paper sx={{ p: 4, width: 480 }} elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Full Name*"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email*"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password*"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            SelectProps={{ native: true }}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </TextField>

          <Box className="mt-3">
            Already have an account?{" "}
            <Typography component={"span"} color="primary">
              <Link className="underline" to="/login">
                Sign In
              </Link>
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
