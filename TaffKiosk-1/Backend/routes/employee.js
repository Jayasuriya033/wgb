import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sendSignupEmail } from '../utility/email.js';


const router = express.Router();
const prisma = new PrismaClient();

function generateRandomPassword(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}



function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}

return age;
}

function generateUsername(firstName, lastName) {
  const cleanFirstName = firstName.replace(/\s+/g, '').toLowerCase();
  const cleanLastName = lastName.replace(/\s+/g, '').toLowerCase();
  return `${cleanFirstName}.${cleanLastName}@taffinc`;
}

router.post('/',async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    email,
    phoneNo,
    location,
    username,
    roleId,
    password
  } = req.body;
  console.log("role name === ", req.roleName);


  

   if (!firstName || !lastName || !dob || !email || !phoneNo || !location || !roleId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    
    const formattedUsername = username ? `${username}@taffinc.com` : generateUsername(firstName, lastName);

    
    
    const age = calculateAge(dob);
    if (age < 18) {
    return res.status(400).json({ error: 'Employee must be at least 18 years old' });
  }
    

  
    let hashedPassword = null;
    let generatedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      generatedPassword = generateRandomPassword();
      hashedPassword = await bcrypt.hash(generatedPassword, 10);
    }

    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        dob: new Date(dob),
        email,
        phoneNo,
        location,
        username: formattedUsername,
        password: hashedPassword,
        roleId: parseInt(roleId, 10),
        createdBy : req.roleName,
      },
    });

// console.log("password  "+password);


    // await sendSignupEmail(email, formattedUsername, generatedPassword || password);


    const response = {
      ...newEmployee,
      generatedPassword: generatedPassword ? generatedPassword : undefined
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(400).json({ error: error.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(400).json({ error: error.message });
  }
});


 router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(400).json({ error: error.message });
  }
});


export default router;



