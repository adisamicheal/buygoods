import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db'

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
    
        res.json({
            message: 'User registered', 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    
        const user: { id: string, email: string, password: string } | null = await prisma.user.findUnique({
            where: {
                email
            }
        });
    
        if (!user) return res.status(400).json({ error: 'User not found' });
    
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });
    
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
        // res.header('Authorization', token).json({ token });

        return res.status(200).json({ token});
    } catch (error) {
        return res.status(500).json({ error: 'Error logging user in' });
    }
}
