import { Request, Response } from "express";
import prisma from "../config/db";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: { name },
    });

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Error creating category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching categories" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Error updating category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({ where: { id } });

    return res.json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting category" });
  }
};
