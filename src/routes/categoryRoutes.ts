import express from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController";

const router = express.Router();

/**
 * @swagger
 * /api/categories/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Category created successfully
 *       500:
 *         description: Server error
 */
router.post("/create", createCategory);

/**
 * @swagger
 * /api/categories/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *       500:
 *         description: Server error
 */
router.get("/all", getCategories);

/**
 * @swagger
 * /api/categories/update/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       200: { description: Category updated }
 *       500: { description: Server error }
 */
router.put("/update/:id", updateCategory);

router.delete("/delete/:id", deleteCategory);

export default router;
