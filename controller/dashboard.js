import Users from "../models/userModel.js";
import Grows from "../models/growModels.js";
import { Op, Sequelize } from 'sequelize'; // Import Sequelize

export const dashboard = async (req, res) => {
  try {
    const adminCount = await Users.count({ where: { role: 'admin' } });
    const imunisasiCount = await Grows.count({ where: { activity: 'Imunisasi' } });
    const balitaCount = await Grows.count();
    const userCount = await Users.count();

    const Jan = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 1), 
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Feb = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 2),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Mar = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 3),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Apr = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 4),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Mei = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 5), 
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Jun = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 6),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Jul = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 7), 
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Aug = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 8),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Sep = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 9), 
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Okt = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 10),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    const Nov = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 11),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });


    const Des = await Grows.count({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), 12),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), new Date().getFullYear()),
        ],
      },
    });

    res.json({ adminCount, imunisasiCount, balitaCount, userCount, Jan, Feb, Mar, Apr, Mei, Jun, Jul, Aug, Sep, Okt, Nov, Des });
  } catch (error) {
    console.error('Error in dashboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
