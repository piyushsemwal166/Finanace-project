import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required']
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Type is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: 100
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

recordSchema.index({ date: -1, createdAt: -1 });

export const Record = mongoose.model('Record', recordSchema);