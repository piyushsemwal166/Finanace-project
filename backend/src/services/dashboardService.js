import { Record } from '../models/Record.js';

export const getDashboardSummary = async () => {
  const [financialSummary] = await Record.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
          }
        },
        totalExpenses: {
          $sum: {
            $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpenses: 1,
        netBalance: { $subtract: ['$totalIncome', '$totalExpenses'] }
      }
    }
  ]);

  const categoryTotals = await Record.aggregate([
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' }
      }
    },
    { $sort: { total: -1 } },
    {
      $project: {
        _id: 0,
        category: '$_id',
        total: 1
      }
    }
  ]);

  const monthlyTrends = await Record.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type'
        },
        total: { $sum: '$amount' }
      }
    },
    {
      $group: {
        _id: { year: '$_id.year', month: '$_id.month' },
        income: {
          $sum: {
            $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        label: {
          $concat: [
            { $toString: '$_id.year' },
            '-',
            {
              $cond: [
                { $lt: ['$_id.month', 10] },
                { $concat: ['0', { $toString: '$_id.month' }] },
                { $toString: '$_id.month' }
              ]
            }
          ]
        },
        income: 1,
        expense: 1
      }
    },
    { $sort: { year: 1, month: 1 } }
  ]);

  const recentTransactions = await Record.find()
    .populate('createdBy', 'name email role')
    .sort({ date: -1, createdAt: -1 })
    .limit(5)
    .lean();

  return {
    totalIncome: financialSummary?.totalIncome || 0,
    totalExpenses: financialSummary?.totalExpenses || 0,
    netBalance: financialSummary?.netBalance || 0,
    categoryTotals,
    monthlyTrends,
    recentTransactions
  };
};