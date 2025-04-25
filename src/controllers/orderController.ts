import { Request, Response } from "express";
import prisma from "../config/db";

export const checkout = async (req: Request, res: Response) => {
  const {userId} = req.body;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (!cartItems.length)
    return res.status(400).json({ error: "Cart is empty" });

  // const total = cartItems.reduce((sum, item) => {
  //   return sum + item.product.price * item.quantity;
  // }, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      quantity: cartItems.length,
    //   total,
      orderItems: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({ where: { userId } });

  res.json({ message: "Order placed", order });
};

export const getOrders = async (req: Request, res: Response) => {
    const { userId } = req.body;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { orderItems: { include: { product: true } } },
  });

  res.json(orders);
};
