import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    const { username, mobileNumber, newPassword } = req.body;
    if (!username || !mobileNumber || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log( username+" === "+ mobileNumber + " === "+newPassword);
    try {
      const employee = await prisma.employee.findUnique({
        where: {username, phoneNo: mobileNumber },
      });
  
      if (!employee) {
        console.log('User Name and Mobile Number Mismatched');
        return res.status(401).json({ error: 'Invalid User Name and Mobile Number' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await prisma.employee.update({
        where: { username: username, phoneNo: mobileNumber },
        data: { password: hashedPassword },
      });
  
      return res.json({ passwordUpdate: true, message: "Password updated successfully" });
    } catch (error) {
      console.error('Error in updating password:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
export default router;