import { Record } from '../models/Record.js';
import { AppError } from '../utils/AppError.js';
import { buildRecordFilters, getPagination } from '../utils/query.js';

const sortMap = {
  latest: { date: -1, createdAt: -1 },
  oldest: { date: 1, createdAt: 1 },
  amountAsc: { amount: 1 },
  amountDesc: { amount: -1 }
};

export const createRecord = async (payload, userId) => Record.create({ ...payload, createdBy: userId });

export const updateRecord = async (id, payload) => {
  const record = await Record.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

  if (!record) {
    throw new AppError('Record not found', 404);
  }

  return record;
};

export const deleteRecord = async (id) => {
  const record = await Record.findByIdAndDelete(id);

  if (!record) {
    throw new AppError('Record not found', 404);
  }

  return record;
};

export const listRecords = async (query) => {
  const filter = buildRecordFilters(query);
  const { page, limit, skip } = getPagination(query);
  const sort = sortMap[query.sort || 'latest'];

  const [items, total] = await Promise.all([
    Record.find(filter)
      .populate('createdBy', 'name email role')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Record.countDocuments(filter)
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getRecentRecords = async (limit = 5) =>
  Record.find()
    .populate('createdBy', 'name email role')
    .sort({ date: -1, createdAt: -1 })
    .limit(limit);