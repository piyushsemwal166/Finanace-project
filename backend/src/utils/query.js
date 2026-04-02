export const buildRecordFilters = (query) => {
  const filter = {};

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = new RegExp(query.category, 'i');
  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) filter.date.$lte = new Date(query.endDate);
  }

  return filter;
};

export const getPagination = (query) => {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 10), 1), 100);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};