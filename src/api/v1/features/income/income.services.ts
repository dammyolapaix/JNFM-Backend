import { IBaseIncome, IIncome, Income } from './index'

export const getIncomes = () => {
  return Income.find()
}

export const getSingleIncomeById = (incomeId: IIncome['_id']) => {
  return Income.findById(incomeId)
}

export const addIncome = (income: IBaseIncome) => {
  return Income.create(income)
}

export const editIncome = (incomeId: IIncome['_id'], income: IBaseIncome) => {
  return Income.findByIdAndUpdate(incomeId, income, {
    new: true,
    runValidators: true,
  })
}

export const deleteIncome = (incomeId: IIncome['_id']) => {
  return Income.findByIdAndDelete(incomeId)
}
