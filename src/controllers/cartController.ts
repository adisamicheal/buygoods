// import { Request, Response } from 'express';
// import CartService from '../services/cartService';

// class CartController {
//     // Get all items in the cart
//     async getCartItems(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = req.user.id; // Assuming user ID is attached to the request
//             const items = await CartService.getCartItems(userId);
//             return res.status(200).json({ success: true, data: items });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//     }

//     // Add an item to the cart
//     async addItemToCart(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = req.user.id;
//             const { productId, quantity } = req.body;
//             const cartItem = await CartService.addItemToCart(userId, productId, quantity);
//             return res.status(201).json({ success: true, data: cartItem });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//     }

//     // Update an item in the cart
//     async updateCartItem(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = req.user.id;
//             const { productId, quantity } = req.body;
//             const updatedItem = await CartService.updateCartItem(userId, productId, quantity);
//             return res.status(200).json({ success: true, data: updatedItem });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//     }

//     // Remove an item from the cart
//     async removeItemFromCart(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = req.user.id;
//             const { productId } = req.params;
//             await CartService.removeItemFromCart(userId, productId);
//             return res.status(200).json({ success: true, message: 'Item removed from cart' });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//     }

//     // Clear the cart
//     async clearCart(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = req.user.id;
//             await CartService.clearCart(userId);
//             return res.status(200).json({ success: true, message: 'Cart cleared' });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//     }
// }

// export default new CartController();

import { Request, Response } from "express";
import prisma from "../config/db";

export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  //   const userId = req.user.id; // Assuming user ID is attached to the request

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (existingCartItem) {
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });
    return res.status(200).json({ success: true, data: updatedCartItem });
    // return res.json(updatedCartItem);
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
  return res.status(201).json({ success: true, data: cartItem });
  // return res.json(cartItem);
};

export const getCart = async (req: Request, res: Response) => {
  // const userId = req.user?.id;
  const { userId } = req.body;

  const cart = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  res.json(cart);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { productId, userId } = req.params;
  // const userId = req.user?.id;

  await prisma.cartItem.deleteMany({
    where: { userId, productId },
  });

  res.json({ message: "Item removed from cart" });
};
