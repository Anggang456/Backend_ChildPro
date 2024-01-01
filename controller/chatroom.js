import Chat from "../models/chatModels.js"
import Message from "../models/messageModels.js";
import Receiver from "../models/receiverModels.js";
import Users from "../models/userModel.js";

export const getChat = async (req, res) => {
    try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(200)
    }
    const user = await Users.findOne({
        where: {
            refresh_token : refreshToken
        }
    });
    const userId = user.id;
    const response = await Chat.findOne({
        where: {
            users_id : userId
        }, attributes : ["users_id", "bidan_id"],
        include: {
            model: Users,
            attributes: ["name"]
        }
    });
    return res.status(200).json( response )
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getClient = async (req, res) => {
    try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(200)
    }
    const user = await Users.findOne({
        where: {
            refresh_token : refreshToken
        }
    });
    const userId = user.id;
    const response = await Chat.findOne({
        where: {
            bidan_id : userId
        }, attributes : ["users_id", "bidan_id"],
    });
    const clienId = response.users_id;
    const client = await Users.findOne({
        where: {
            id :clienId
        }, attributes : ["name"]
        
    })
    return res.status(200).json( client )
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getMessage = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(200)
        }
        const user = await Users.findOne({
            where: {
                refresh_token : refreshToken
            }
        });
        const userId = user.id;
        const chat = await Chat.findOne({
            where: {
                users_id: userId
            }, attributes: ["id"]
        });
        const messageId = chat.id;
        const getMessage = await Message.findAll({
            where: {
                message_id : messageId
            }, attributes:["message_id", "send","receiver", "file", "image"]
        });
        return res.status(200).json(getMessage);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg:"Internal server error" })
    }
}

export const postMessage = async (req, res) => {
    try {
        const { send, receiver } = req.body;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(200).json({ msg: "Refresh token is missing." });
        }

        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        const userId = user.id;
        const chat = await Chat.findOne({
            where: {
                users_id: userId
            },
            attributes: ["id"]
        });

        if (!chat) {
            return res.status(404).json({ msg: "Chat not found." });
        }

        const messageId = chat.id;

        // Mencari data pesan sebelumnya
        const findNull = await Message.findAll({
            where: {
                message_id: messageId
            },
            attributes: ["send", "receiver"]
        });

        // Jika nilai send atau receiver adalah null, update tabel Message
        if (findNull.send === null || findNull.receiver === null) {
            await Message.update(
                {
                    send: send,
                    receiver: receiver
                },
                {
                    where: {
                        message_id: messageId
                    }
                }
            );
        } else {
            await Message.create({
                message_id: messageId,
                send: send,
                receiver: receiver
            });
        }
        return res.status(200).json({ msg: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
