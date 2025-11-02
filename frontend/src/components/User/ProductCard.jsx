import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(
      addToCart({
        product: product._id,
        title: product.name || product.title,
        price: product.price,
        quantity: 1,
      })
    );
    // optional: open drawer via custom event
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", minWidth: 250, maxWidth: 250 }}>
      <CardMedia
        component="div"
        sx={{
          height: 140,
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxHeight: 130 }}
          />
        ) : (
          <Typography color="text.secondary">No image</Typography>
        )}
      </CardMedia>
      <CardContent sx={{ flexGrow: 1, maxHeight: 200, overflow: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>
          {product.name || product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Typography variant="h6">₹{product.price}</Typography>
        <Button size="small" variant="contained" onClick={handleAdd}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
