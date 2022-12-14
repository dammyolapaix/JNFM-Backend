import Member from './Member'
import {
  addMemberHandler,
  deleteMemmberHandler,
  editMemberHandler,
  getMembersHandler,
  getSingleMemberByIdHandler,
} from './member.controllers'
import IMember, { IBaseMember } from './member.interfaces'
import {
  addMember,
  deleteMember,
  editMember,
  getMembers,
  getSingleMemberById,
} from './member.services'
import memberRoutes from './member.routes'

export {
  // interfaces
  IBaseMember,
  IMember,
  Member,
  // services
  addMember,
  deleteMember,
  editMember,
  getMembers,
  getSingleMemberById,
  // controllers
  getMembersHandler,
  getSingleMemberByIdHandler,
  addMemberHandler,
  editMemberHandler,
  deleteMemmberHandler,
  // Routes
  memberRoutes,
}
