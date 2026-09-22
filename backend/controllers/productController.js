import Product from '../models/Product.js';

export const getProducts = async (_req, res, next) => {
  try {
    const products = await Product.find({ published: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, message: 'Products fetched successfully', data: { products } });
  } catch (error) {
    return next(error);
  }
};