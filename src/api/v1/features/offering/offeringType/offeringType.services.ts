import { IBaseOfferingType, IOfferingType, OfferingType } from './index'

export const getOfferingTypes = () => {
  return OfferingType.find()
}

export const getSingleOfferingTypeById = (
  offeringTypeId: IOfferingType['_id']
) => {
  return OfferingType.findById(offeringTypeId)
}

export const addOfferingType = (offeringType: IBaseOfferingType) => {
  return OfferingType.create(offeringType)
}

export const editOfferingType = (
  offeringTypeId: IOfferingType['_id'],
  offeringType: IBaseOfferingType
) => {
  return OfferingType.findByIdAndUpdate(offeringTypeId, OfferingType, {
    new: true,
    runValidators: true,
  })
}

export const deleteOfferingType = (offeringTypeId: IOfferingType['_id']) => {
  return OfferingType.findByIdAndDelete(offeringTypeId)
}
