import { Request, Response } from "express";
import prisma from "../config/db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
      },
    });

    console.log("Product created:", product);

    return res.json(product);
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({ error: error.message || "Error creating product" });
  }
  
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching products " });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price, stock, categoryId },
    });

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting product" });
  }
};
