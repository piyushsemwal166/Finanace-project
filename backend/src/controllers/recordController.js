import { createRecord, deleteRecord, listRecords, updateRecord } from '../services/recordService.js';

export const getRecords = async (req, res, next) => {
  try {
    const data = await listRecords(req.query);
    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const addRecord = async (req, res, next) => {
  try {
    const record = await createRecord(req.body, req.user.id);
    res.status(201).json({ status: 'success', data: record });
  } catch (error) {
    next(error);
  }
};

export const editRecord = async (req, res, next) => {
  try {
    const record = await updateRecord(req.params.id, req.body);
    res.json({ status: 'success', data: record });
  } catch (error) {
    next(error);
  }
};

export const removeRecord = async (req, res, next) => {
  try {
    const record = await deleteRecord(req.params.id);
    res.json({ status: 'success', data: record });
  } catch (error) {
    next(error);
  }
};