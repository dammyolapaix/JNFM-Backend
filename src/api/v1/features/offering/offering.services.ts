import { IBaseOffering, IOffering, Offering } from './index'

export const getOfferings = (queryObject?: {
  churchService: IOffering['churchService']
}) => {
  if (queryObject) {
    return Offering.find(queryObject)
  } else {
    return Offering.find()
  }
}

export const getSingleOfferingById = (offeringId: IOffering['_id']) => {
  return Offering.findById(offeringId)
}

export const addOffering = (offering: IBaseOffering) => {
  return Offering.create(offering)
}

export const editOffering = (
  offerringId: IOffering['_id'],
  offering: IBaseOffering
) => {
  return Offering.findByIdAndUpdate(offerringId, offering, {
    new: true,
    runValidators: true,
  })
}

export const deleteOffering = (offerringId: IOffering['_id']) => {
  return Offering.findByIdAndDelete(offerringId)
}
