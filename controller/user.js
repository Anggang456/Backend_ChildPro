import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) =>  {
    try{
        const users = await Users.findOne({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const Register = async(req, res) => {
    const { name, email, telp, password, confirm } = req.body;
    const isDuplicate = await Users.findAll({
        where:{
            email: email
        }
    });
    if(isDuplicate.length > 0) return res.status(400).json("User already exist");
    if(password !== confirm) return res.status(400).json({msg: "Password not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        await Users.create({
            name: name,
            email: email,
            telp : telp,
            role : "user",
            password: hashPassword
        });
        const user = await Users.findAll({
            where:{
                email: email
            }
        });
        const usersId = user[0].id;
        const names = user[0].name;
        const emails = user[0].email;
        const accessToken = jwt.sign({usersId, names, emails}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m'
        });
        const refreshToken = jwt.sign({usersId, names, emails}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: usersId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
        
    }catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went Error" });
    }
}

export const Login = async(req, res, next) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, role });
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refreshToken: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const admin = async (req, res) => {
    try {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) {
        return res.status(200)
    }
    const user = await Users.findOne({
        where: {
            refresh_token: refreshToken
        }
    });
    const role = user.role;
    res.json({ role });
    } catch (error) {
        res.status(200)
    }
}
