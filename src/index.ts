import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Swagger setup
setupSwagger(app);
// Routes
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/api-docs", express.static("public"));
// app.get("/api-docs", (req, res) => {
//   res.sendFile("index.html", { root: "public" });
// });
// app.use("/api-docs.json", (req, res) => {
//   res.sendFile("swagger.json", { root: "public" });
// });
// app.use("/api-docs.yaml", (req, res) => {
//   res.sendFile("swagger.yaml", { root: "public" });
// });

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// cart route 
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to buygoods! 🚀");
});

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  // console.log('prisma', prisma); //debugging prisma
});
