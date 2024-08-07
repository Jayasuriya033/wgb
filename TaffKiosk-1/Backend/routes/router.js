import express from 'express';
import roleRouter from './role.js';
import employeeRouter from './employee.js';
import { AuthRouter } from './auth.js';
import cookieParser from "cookie-parser";
import OtpRouter from './otp.js'
import UpdatePassword from './updatePassword.js'
import { verifyEmployee,blockRole } from './auth.js';
import loginRouter from './login.js'


const router = express.Router();
router.use(cookieParser());

router.use('/login', loginRouter);
router.use('/roles', roleRouter);
router.use('/employees', verifyEmployee(['Super Admin','Manager']), employeeRouter);
// router.use('/employees', employeeRouter);
router.use('/auth', AuthRouter);
router.use('/mobileNumberValidation', OtpRouter);
router.use('/updatePassword', UpdatePassword);
router.use('/home',verifyEmployee)



export default router;
