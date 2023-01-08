import {
  IBaseExpenditureCategory,
  IExpenditureCategory,
  ExpenditureCategory,
} from './index'

export const getExpenditureCategories = () => {
  return ExpenditureCategory.find()
}

export const getSingleExpenditureCategoryById = (
  expenditureCategoryId: IExpenditureCategory['_id']
) => {
  return ExpenditureCategory.findById(expenditureCategoryId)
}

export const addExpenditureCategory = (
  expenditureCategory: IBaseExpenditureCategory
) => {
  return ExpenditureCategory.create(expenditureCategory)
}

export const editExpenditureCategory = (
  expenditureCategoryId: IExpenditureCategory['_id'],
  expenditureCategory: IBaseExpenditureCategory
) => {
  return ExpenditureCategory.findByIdAndUpdate(
    expenditureCategoryId,
    expenditureCategory,
    {
      new: true,
      runValidators: true,
    }
  )
}

export const deleteExpenditureCategory = (
  expenditureCategoryId: IExpenditureCategory['_id']
) => {
  return ExpenditureCategory.findByIdAndDelete(expenditureCategoryId)
}
