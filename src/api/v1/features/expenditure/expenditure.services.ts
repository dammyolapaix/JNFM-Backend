import { IBaseExpenditure, IExpenditure, Expenditure } from './index'

export const getExpenditures = (queryObject?: {
  churchService: IExpenditure['churchService']
}) => {
  if (queryObject) {
    return Expenditure.find(queryObject)
  } else {
    return Expenditure.find()
  }
}

export const getSingleExpenditureById = (
  expenditureId: IExpenditure['_id']
) => {
  return Expenditure.findById(expenditureId)
}

export const addExpenditure = (expenditure: IBaseExpenditure) => {
  return Expenditure.create(expenditure)
}

export const editExpenditure = (
  expenditureId: IExpenditure['_id'],
  expenditure: IBaseExpenditure
) => {
  return Expenditure.findByIdAndUpdate(expenditureId, expenditure, {
    new: true,
    runValidators: true,
  })
}

export const deleteExpenditure = (expenditureId: IExpenditure['_id']) => {
  return Expenditure.findByIdAndDelete(expenditureId)
}
