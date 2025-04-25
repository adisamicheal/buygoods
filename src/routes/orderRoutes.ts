import express from 'express';
import { checkout, getOrders } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/checkout', checkout);
router.get('/', getOrders);

export default router;