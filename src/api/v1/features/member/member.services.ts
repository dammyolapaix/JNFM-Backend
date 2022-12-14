import { IBaseMember, IMember, Member } from './index'

export const getMembers = () => {
  return Member.find()
}

export const getSingleMemberById = (memberId: IMember['_id']) => {
  return Member.findById(memberId)
}

export const addMember = (member: IBaseMember) => {
  return Member.create(member)
}

export const editMember = (memberId: IMember['_id'], member: IBaseMember) => {
  return Member.findByIdAndUpdate(memberId, member, {
    new: true,
    runValidators: true,
  })
}

export const deleteMember = (memberId: IMember['_id']) => {
  return Member.findByIdAndDelete(memberId)
}
