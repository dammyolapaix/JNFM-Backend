import { IBaseWelfare, IWelfare, Welfare } from './index'

export const getWelfares = () => {
  return Welfare.find()
}

export const getSingleWelfareById = (welfareId: IWelfare['_id']) => {
  return Welfare.findById(welfareId)
}

export const addWelfare = (welfare: IBaseWelfare) => {
  return Welfare.create(welfare)
}

export const editWelfare = (
  welfareId: IWelfare['_id'],
  welfare: IBaseWelfare
) => {
  return Welfare.findByIdAndUpdate(welfareId, welfare, {
    new: true,
    runValidators: true,
  })
}

export const deleteWelfare = (welfareId: IWelfare['_id']) => {
  return Welfare.findByIdAndDelete(welfareId)
}
