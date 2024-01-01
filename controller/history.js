import History from "../models/historyModels.js";
import Users from "../models/userModel.js";
import Chat from "../models/chatModels.js";

export const updatedStatus = async (req, res) => {
    try {
      const { status, token, users_id, midwife } = req.body; 
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Users Not Found" });
    }
    await History.update({
        status : status,
    }, {
        where: {
            token : token
        }
    }); 
    const bidan = Users.findOne({
      where:{
        name : midwife
      }
    })
    const bidanId = bidan.id;
    await Chat.create({
      users_id: users_id, bidan_id: bidanId, token: token
    })
    return res.status(200).json({ success: true, message:"Success" })
    } catch (error) {
      return res.status(500).json({ error: "Something went Error" });
    }
}


export const getHistory = async (req, res) => {
  try {
    const getData = await History.findAll({
      attributes: ["tanggal", "timer", "price", "status", "midwife"],
      include: {
        model: Users,
        attributes: ["name"]
      }
    });
    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ error: "Something went Error" });
  }
}