import { Aggregate } from 'mongoose'
import { IBaseCashBook, ICashBook, CashBook, ITotalCashBook } from './index'

export const getCashBooks = () => {
  return CashBook.find()
}

export const getSingleCashBookById = (cashBookId: ICashBook['_id']) => {
  return CashBook.findById(cashBookId)
}

export const addCashBook = (cashBook: IBaseCashBook) => {
  return CashBook.create(cashBook)
}

export const editCashBook = (
  cashBookId: ICashBook['_id'],
  cashBook: IBaseCashBook
) => {
  return CashBook.findByIdAndUpdate(cashBookId, cashBook, {
    new: true,
    runValidators: true,
  })
}

export const deleteCashBook = (cashBookId: ICashBook['_id']) => {
  return CashBook.findByIdAndDelete(cashBookId)
}

export const getTotalCashBook = (): Aggregate<ITotalCashBook[]> =>
  CashBook.aggregate([
    {
      $facet: {
        balance: [{ $group: { _id: null, balance: { $sum: '$amount' } } }],
        totalIncome: [
          {
            $match: {
              debitCredit: 'Debit',
            },
          },
          {
            $group: {
              _id: null,
              totalIncome: { $sum: '$amount' },
            },
          },
        ],
        totalExpenditure: [
          {
            $match: {
              debitCredit: 'Credit',
            },
          },
          {
            $group: {
              _id: null,
              totalExpenditure: { $sum: '$amount' },
            },
          },
        ],
      },
    },
  ])
