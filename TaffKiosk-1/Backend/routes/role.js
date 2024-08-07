import express from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', [
  body('roleName').notEmpty().withMessage('Role name is required'),
  body('roleDesc').notEmpty().withMessage('Role description is required'),
  body('createdBy').notEmpty().withMessage('Created by is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { roleName, roleDesc, createdBy } = req.body;

  try {
    const newRole = await prisma.role.create({
      data: {
        roleName,
        roleDesc,
        createdBy,
      },
    });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
