import Grows from "../models/growModels.js";
import Users from "../models/userModel.js";

export const formGrow = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Users Not Found" });
    }
    const { name, dob, gender, activity } = req.body;
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Users Not Found" });
    }
    const id = user.id;
    const parents = user.name;
    await Grows.create({
      users_id: id,
      parents: parents,
      name: name,
      activity: activity,
      dob: dob,
      gender: gender,
    });
    return res.status(200).json({ success: true, message: "Form Success" });
  } catch (error) {
    console.log(error);
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export const dataGrow = async (req, res) => {
  try {
    const data = await Grows.findAll({
      attributes: [
        "id",
        "name",
        "dob",
        "gender",
        "weight",
        "height",
        "head",
        "parents",
        "status",
        "datevac",
        "midwife",
        "activity",
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export const getGrowdata = async (req, res) => {
  try {
    const grow = await Grows.findOne({
      attributes: [
        "id",
        "name",
        "dob",
        "gender",
        "weight",
        "height",
        "head",
        "parents",
        "status",
        "datevac",
        "midwife",
        "activity",
      ],
      where: {
        id : req.params.id
      }
    })
    res.status(200).json(grow);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went error' });
  }
}

export const updateGrowdata = async (req, res) => {
  try {
    await Grows.update(req.body,{
      where: {
        id : req.params.id
      }
    })
    res.status(200).json({ success: true, message: "Success updated" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went error' });
  }
}

export const deleteGrowdata = async (req, res) => {
  try {
    await Grows.destroy({
      where: {
        id : req.params.id
      }
    })
    res.status(200).json({ success: true, message: "Success deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went error' });
  }
}

export const Growcheck = async (req, res) => {
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
    const id = user.id;
    const growcheck = await Grows.findAll({
      where: {
        users_id: id,
      },
      attributes: ["name", "dob", "gender", "weight", "height", "head"],
    });
    return res.json(growcheck);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
