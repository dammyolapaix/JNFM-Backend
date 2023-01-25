import { Aggregate } from 'mongoose'
import {
  getPaginationOptions,
  getPaginationResult,
  getQueryStr,
} from '../../utils'
import { IOffering } from '../offering'
import {
  IBaseCashBook,
  ICashBook,
  CashBook,
  ITotalCashBook,
  ICashBookQuery,
} from './index'

export const getCashBooks = (query?: ICashBookQuery) => {
  if (query) {
    return CashBook.find(query)
  } else {
    return CashBook.find()
  }
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

export const getCashBookQueryResults = async (
  cashBookQuery: ICashBookQuery
) => {
  let query

  if (cashBookQuery) {
    const queryStr = getQueryStr(cashBookQuery)

    if (cashBookQuery.date) {
      cashBookQuery.date = new Date(cashBookQuery.date)
    }

    query = getCashBooks(JSON.parse(queryStr)).populate<{
      offering: IOffering
    }>({
      path: 'account.offering',
      model: 'Offering',
      select: 'churchService',
    })
  } else {
    query = getCashBooks().populate<{
      offering: IOffering
    }>({
      path: 'account.offering',
      model: 'Offering',
      select: 'churchService',
    })
  }

  // Selecting specific field(s)
  if (cashBookQuery && cashBookQuery.select) {
    const fields = cashBookQuery.select.split(',').join(' ')
    query = query.select(fields)
  }

  // Sort by field(s)
  if (cashBookQuery && cashBookQuery.sort) {
    const sortedBy = cashBookQuery.sort.split(',').join(' ')
    query = query.sort(sortedBy)
  } else {
    query = query.sort('date')
  }

  // Pagination
  const paginationOptions = getPaginationOptions(
    cashBookQuery.page,
    cashBookQuery.limit
  )

  const { page, limit, startIndex, endIndex } = paginationOptions

  query = query.skip(startIndex).limit(limit)

  const cashBooks: ICashBook[] = await query

  const totalCashBook = await getTotalCashBook()

  const totalDocument = await CashBook.countDocuments()

  const pagination = getPaginationResult(
    page,
    limit,
    startIndex,
    endIndex,
    totalDocument
  )

  return { cashBooks, pagination, totalCashBook }
}
