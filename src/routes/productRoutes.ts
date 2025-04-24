import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController";

const router = express.Router();

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 example: "A high-end gaming laptop"
 *               price:
 *                 type: number
 *                 example: 1200.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *               categoryId:
 *                 type: string
 *                 example: "category-uuid-here"
 *     responses:
 *       200:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 */
router.post("/create", createProduct);

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Server error
 */
router.get("/all", getProducts);

/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock: { type: integer }
 *               categoryId: { type: string }
 *     responses:
 *       200: { description: Product updated }
 *       500: { description: Server error }
 */
router.put("/update/:id", updateProduct);

/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Product deleted }
 *       500: { description: Server error }
 */
router.delete("/delete/:id", deleteProduct);

export default router;
