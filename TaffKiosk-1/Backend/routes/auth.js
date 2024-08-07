import express from 'express';
import dotenv from 'dotenv';
import jwt, { decode } from 'jsonwebtoken';



dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'svj_kiosk';
// ---------------------------------JWT TOKEN CREATION Start------------------------------

export function jwtToken(tokenData) {
  const token = jwt.sign( tokenData , JWT_SECRET, {noTimestamp :  true});
  return token;
}

// ---------------------------------JWT TOKEN CREATION End------------------------------


// --------------------------verifyEmployee Start---------------------------------

export const verifyEmployee = (requiredRole) => (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token is not there....' });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedEmployee) => {
    if (err) {
      return res.status(403).json({ result: false, message: 'incorrect...' });
    }
    req.username = decodedEmployee.username;
    req.roleName = decodedEmployee.roleName;
   var status = 0;
   for (let role of requiredRole) {     
    if (decodedEmployee.roleName !== role) {}
    else   {
      status = 1;    
      break;
  }}
   if (status !== 1) {
      return res.status(401).json({ result: false, message: 'Unauthorized Login ⚠️' });
    }
    next();
  });
};

// --------------------------verifyEmployee End---------------------------------

// --------------------------blockRole Start------------------------------------

export const blockRole = (requiredRole) => (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token is not there....' });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedEmployee) => {
    if (err) {
      return res.status(403).json({ result: false, message: 'incorrect...' });
    }
    req.username = decodedEmployee.username;
    req.roleName = decodedEmployee.roleName;
   var status = 0;
   for (let role of requiredRole) {
    if (decodedEmployee.roleName === role) {
      status = 1;
      break; 
    }
  }
   if (status === 1) {
      return res.status(401).json({ result: false, message: 'Unauthorized Login ⚠️' });
    }
    next();
  });
};

// --------------------------blockRole End---------------------------------


// -----------------------------logout Start---------------------------------------
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('roleId');
  return res.json({ logout: true });
});
// -----------------------------logout End---------------------------------------





export { router as AuthRouter };
