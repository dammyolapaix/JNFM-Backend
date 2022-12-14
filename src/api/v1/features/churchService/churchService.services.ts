import { IBaseChurchService, IChurchService, ChurchService } from './index'

export const getChurchServices = () => {
  return ChurchService.find()
}

export const getSingleChurchServiceById = (
  churchServiceId: IChurchService['_id']
) => {
  return ChurchService.findById(churchServiceId)
}

export const addChurchService = (churchService: IBaseChurchService) => {
  return ChurchService.create(churchService)
}

export const editChurchService = (
  churchServiceId: IChurchService['_id'],
  churchService: IBaseChurchService
) => {
  return ChurchService.findByIdAndUpdate(churchServiceId, churchService, {
    new: true,
    runValidators: true,
  })
}

export const deleteChurchService = (churchServiceId: IChurchService['_id']) => {
  return ChurchService.findByIdAndDelete(churchServiceId)
}
