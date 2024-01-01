import express from "express";
import { admin, getUsers, Login, Logout, Register } from "../controller/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";
import { getProfile, postProfile } from "../controller/profile.js";
import { dataGrow, deleteGrowdata, formGrow, getGrowdata, Growcheck, updateGrowdata } from "../controller/grow.js";
import { deletePayment, getMidwife, getPayment, postPayment, processPayment } from "../controller/konsultasi.js";
import { getHistory, updatedStatus } from "../controller/history.js";
import { dashboard } from "../controller/dashboard.js";
import { getChat, getClient, getMessage, postMessage } from "../controller/chatroom.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/adminVerify', admin);
router.get('/dashboard', dashboard);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/kunjungan', formGrow);
router.get('/datagrow', dataGrow);
router.get('/datagrow/:id', getGrowdata);
router.patch('/datagrow/:id', updateGrowdata);
router.delete('/datagrow/:id', deleteGrowdata);
router.post('/updatedPayment', updatedStatus);
router.get('/getchat', getChat);
router.get('/getclient', getClient);
router.get('/getmessage', getMessage);
router.post('/postmessage', postMessage);
router.get('/getHistory', getHistory);
router.get('/growcheck', Growcheck);
router.get('/konsultasi', getMidwife);
router.post('/postPayment', postPayment);
router.get('/getPayment', getPayment);
router.post('/processPayment', processPayment);
router.delete('/deletePayment', deletePayment)
router.post('/status', updatedStatus);
router.get('/profile', getProfile);
router.put('/edit', postProfile)
router.delete('/logout', Logout)

export default router;