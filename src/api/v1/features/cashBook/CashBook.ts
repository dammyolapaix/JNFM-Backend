import { Schema, model } from 'mongoose'
import { ICashBook } from './index'

const CashBookSchema = new Schema<ICashBook>(
  {
    date: {
      type: Date,
      required: [true, 'The date is required'],
    },
    amount: {
      type: Number,
      required: [true, 'The amount is required'],
    },
    naration: {
      type: String,
      trim: true,
      required: [true, 'The naration is required'],
    },
    pvNumber: {
      type: String,
      trim: true,
    },
    chequeNumber: {
      type: String,
      trim: true,
    },
    account: {
      offering: {
        type: Schema.Types.ObjectId,
        ref: 'Offering',
      },
      welfare: {
        type: Schema.Types.ObjectId,
        ref: 'Welfare',
      },
      tithe: {
        type: Schema.Types.ObjectId,
        ref: 'Tithe',
      },
      specialContribution: {
        type: Schema.Types.ObjectId,
        ref: 'SpecialContribution',
      },
    },
    debitCredit: {
      type: String,
      enum: {
        values: ['Debit', 'Credit'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'debitCredit is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const CashBook = model<ICashBook>('CashBook', CashBookSchema)

export default CashBook
