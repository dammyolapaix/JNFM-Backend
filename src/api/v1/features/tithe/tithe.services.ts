import { IBaseTithe, ITithe, Tithe } from './index'

export const getTithes = () => {
  return Tithe.find()
}

export const getSingleTitheById = (titheId: ITithe['_id']) => {
  return Tithe.findById(titheId)
}

export const addTithe = (tithe: IBaseTithe) => {
  return Tithe.create(tithe)
}

export const editTithe = (titheId: ITithe['_id'], tithe: IBaseTithe) => {
  return Tithe.findByIdAndUpdate(titheId, tithe, {
    new: true,
    runValidators: true,
  })
}

export const deleteTithe = (titheId: ITithe['_id']) => {
  return Tithe.findByIdAndDelete(titheId)
}
