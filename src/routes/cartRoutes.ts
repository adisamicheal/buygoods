import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/add', addToCart);
router.get('/', getCart);
router.delete('/remove/:productId', removeFromCart);

export default router;