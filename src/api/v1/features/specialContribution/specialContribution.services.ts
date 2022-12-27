import {
  IBaseSpecialContribution,
  ISpecialContribution,
  SpecialContribution,
} from './index'

export const getSpecialContributions = () => {
  return SpecialContribution.find()
}

export const getSingleSpecialContributionById = (
  specialContributionId: ISpecialContribution['_id']
) => {
  return SpecialContribution.findById(specialContributionId)
}

export const addSpecialContribution = (
  specialContribution: IBaseSpecialContribution
) => {
  return SpecialContribution.create(specialContribution)
}

export const editSpecialContribution = (
  specialContributionId: ISpecialContribution['_id'],
  specialContribution: IBaseSpecialContribution
) => {
  return SpecialContribution.findByIdAndUpdate(
    specialContributionId,
    specialContribution,
    {
      new: true,
      runValidators: true,
    }
  )
}

export const deleteSpecialContribution = (
  specialContributionId: ISpecialContribution['_id']
) => {
  return SpecialContribution.findByIdAndDelete(specialContributionId)
}
