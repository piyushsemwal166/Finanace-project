import { getDashboardSummary } from '../services/dashboardService.js';

export const getSummary = async (req, res, next) => {
  try {
    const data = await getDashboardSummary();
    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};