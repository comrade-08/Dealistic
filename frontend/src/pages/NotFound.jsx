import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-5xl font-extrabold mb-4">
        404
      </h1>
      <p className="text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 2,
          px: 3,
          py: 1,
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
