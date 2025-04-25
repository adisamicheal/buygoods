import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: { id: string };
}        

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied'});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };
        (req as any).user = {id: verified.id};
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
}