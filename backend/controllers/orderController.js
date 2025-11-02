import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create order (User)
export const createOrder = async (req, res) => {
  try {
    let {products} = req.body;
    let total = 0;

    for (let item of products) {
      let prod = await Product.findById(item.product);
      if (!prod) return res.status(404).json({ message: "Product not found" });
      total += prod.price * item.qty;
      prod.stock = prod.stock - item.qty
      await prod.save()
    }

    console.log(products, total, 'createOrder')

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount: total,
    });

    res.status(201).json(order);
  } catch (error) {
    console.log(error, 'createOrder')
    res.status(500).json({ message: error.message });
  }
};

// Get orders (Admin sees all, User sees own)
export const getOrders = async (req, res) => {
  try {
    let orders;

    // Admin → see all orders
    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product", "title vendor");

    // Vendor → see only orders containing their products
    } else if (req.user.role === "vendor") {
      // Find products created by this vendor
      const vendorProducts = await Product.find({ vendor: req.user._id }).select("_id");

      const vendorProductIds = vendorProducts.map((p) => p._id);

      // Find orders that include at least one of these product IDs
      orders = await Order.find({
        "products.product": { $in: vendorProductIds },
      })
        .populate("user", "name email")
        .populate("products.product", "title vendor");

    // Regular user → see only their orders
    } else {
      orders = await Order.find({ user: req.user._id })
        .populate("products.product", "title vendor");
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};


// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
