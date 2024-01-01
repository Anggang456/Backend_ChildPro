import Users from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .status(403)
        .json({ success: false, message: "Users Not Found" });
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    const userProfile = await Users.findOne(
      {
        where: {
          id: userId,
        },attributes: ["id", "name", "email", "telp", "dob", "gender", "alamat"]
      }
    );
    res.json(userProfile);
  } catch (error) {
    console.log(error);
  }
};

export const postProfile = async (req, res) => {
  try {
    const { name, email, telp, dob, gender, alamat } = req.body;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ success: false, message: "Users Not Found" });
    }
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      return res.status(403).json({ success: false, message: 'Users Not Found' });
    }
    const userId = user.id;
    await Users.update(
      { name, email, telp, dob, gender, alamat },
      {
        where: {
          id: userId,
        },
      }
    );
    return res.status(200).json({ success: true, message: 'Success Update' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

