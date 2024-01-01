import Users from "../models/userModel.js";
import Midwife from "../models/midwifeModels.js";
import Payment from "../models/paymentModels.js";
import Midtrans from "midtrans-client";
import History from "../models/historyModels.js";



export const getMidwife = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ success: false, message: "Users Not Found" });
    }

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken
      }
    });

    if (!user) {
      return res.status(403).json({ success: false, message: "User Not Found" });
    }

    const userId = user.id;

    const findPayment = await Payment.findOne({
      where: {
        users_id: userId
      }
    });

    if (!findPayment || findPayment.price === null) {
      const getData = await Midwife.findAll({
        attributes: ["id", "spesialis", "experience", "percentage", "price"],
        include: {
          model: Users,
          attributes: ["image", "name"],
        },
      });
      return res.status(200).json(getData);
    } else {
      return res.status(403).json({ message: "Payment exists" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went error" });
  }
};



export const postPayment = async (req, res) => {
  try {
    const { midwifeId, image, name, spesialis, experience, percentage, price } = req.body;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ success: false, message: "Users Not Found" });
    }
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    const userId = user.id;
    await Payment.create({
      users_id: userId,
      bidan_id: midwifeId,
      image: image,
      name: name,
      spesialis: spesialis,
      experience: experience,
      percentage: percentage,
      price: price,
    });
    return res.status(200).json({ success: true, message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


export const getPayment = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Users Not Found" });
    }
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    const userId = user.id;
    const getPayment = await Payment.findOne({
      attributes: [
        "id",
        "users_id",
        "bidan_id",
        "image",
        "name",
        "spesialis",
        "experience",
        "percentage",
        "price",
      ],
      where: {
        users_id: userId,
      },
    });
    return res.status(200).json(getPayment);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went error" });
  }
};

export const processPayment = async (req, res) => {
  try {
    const { midwife, price, users_id, bidan_id } = req.body;
    const refreshToken = req.cookies.refreshToken;
    

    if (!refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Users Not Found" });
    }
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    const userId = user.id;
    const currentDate = new Date().toLocaleDateString();
    const uname = user.name;
    const email = user.email;
    const telp = user.telp;
    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-g-iAbH7h1cYuFMS1b11AUmrW",
      clientKey: "SB-Mid-client-d8KKygIlxas7LqVb",
    });
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const parameter = {
      transaction_details: {
        order_id: randomNumber,
        gross_amount: price,
      },
      credit_card: {
        secure: true,
      },
      customer_details : {
        username : uname,
        email : email,
        phone : telp
      }
    };

    snap.createTransaction(parameter).then((transaction) => {
      const transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);
      res.json({ token: transactionToken });
      History.create({
        users_id: userId, tanggal: currentDate, timer: '60', price: price, status: "pending", midwife: midwife, token: transactionToken
      });
      
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went error" });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ success: false, message: "Users Not Found" });
    }

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken
      }
    });

    if (!user) {
      return res.status(403).json({ success: false, message: "User Not Found" });
    }
    const userId = user.id;
    await Payment.destroy({
      where: {
        users_id : userId
      }
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went error" });
  }
}