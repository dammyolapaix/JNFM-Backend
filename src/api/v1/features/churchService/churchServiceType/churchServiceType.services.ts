import {
  IBaseChurchServiceType,
  IChurchServiceType,
  ChurchServiceType,
} from './index'

export const getChurchServiceTypes = () => {
  return ChurchServiceType.find()
}

export const getSingleChurchServiceTypeById = (
  churchServiceTypeId: IChurchServiceType['_id']
) => {
  return ChurchServiceType.findById(churchServiceTypeId)
}

export const addChurchServiceType = (
  churchServiceType: IBaseChurchServiceType
) => {
  return ChurchServiceType.create(churchServiceType)
}

export const editChurchServiceType = (
  churchServiceTypeId: IChurchServiceType['_id'],
  churchServiceType: IBaseChurchServiceType
) => {
  return ChurchServiceType.findByIdAndUpdate(
    churchServiceTypeId,
    churchServiceType,
    {
      new: true,
      runValidators: true,
    }
  )
}

export const deleteChurchServiceType = (
  churchServiceTypeId: IChurchServiceType['_id']
) => {
  return ChurchServiceType.findByIdAndDelete(churchServiceTypeId)
}
