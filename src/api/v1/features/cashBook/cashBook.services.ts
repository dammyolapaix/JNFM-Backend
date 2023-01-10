import { IBaseCashBook, ICashBook, CashBook } from './index'

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
