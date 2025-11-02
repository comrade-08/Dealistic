import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <Grid container spacing={2} className="justify-center md:justify-start">
      {products?.length ? (
        products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            No Products found!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
