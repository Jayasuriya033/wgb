import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { jwtToken } from './auth.js';

dotenv.config();


const router = express.Router();
const prisma = new PrismaClient();


router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'svj_kiosk';

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }


  
  try {
    const user = await prisma.employee.findUnique({
      where: { username },
      include: {role : true}
    })

    
    console.log("User -- ", user);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Invalid username or password' });
    }  
    const tokenData = {
        username: user.username,
        roleName: user.role.roleName,
        roleId: user.roleId,
        email: user.email
        }
 
    const token = jwtToken(tokenData) 
    // const token = jwtToken(`username :${ user.username}, Role Name:${user.role.roleName}, Role Id: ${user.roleId}, Email : ${user.email}`) 

    res.set('Authorization', `Bearer${token}`);

    return res.json({ login: true,username: user.username, role: user.roleId, token : token});
  }
   catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

export default router;

