import PortfolioCase from '../models/PortfolioCase.js';

export const getPortfolio = async (_req, res, next) => {
  try {
    const portfolio = await PortfolioCase.find({ published: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, message: 'Portfolio fetched successfully', data: { portfolio } });
  } catch (error) {
    return next(error);
  }
};