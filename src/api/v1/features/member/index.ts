/**
 * Imports
 */

// Importing Model
import Member from './Member'

//  Importing Interfaces
import IMember, { IBaseMember } from './member.interfaces'

// Importing Services
import {
  addMember,
  deleteMember,
  editMember,
  getMembers,
  getSingleMemberById,
} from './member.services'

// Importing Controllers
import {
  addMemberHandler,
  deleteMemberHandler,
  editMemberHandler,
  getMembersHandler,
  getSingleMemberByIdHandler,
} from './member.controllers'

// Importing Routes
import memberRoutes from './member.routes'

// Importing Utils
import { getFullName } from './member.utils'

/**
 * Exports
 */

// Exporting Model
export { Member }

//  Exporting Interfaces
export { IBaseMember, IMember }

// Exporting Services
export { addMember, deleteMember, editMember, getMembers, getSingleMemberById }

// Exporting Controllers
export {
  getMembersHandler,
  getSingleMemberByIdHandler,
  addMemberHandler,
  editMemberHandler,
  deleteMemberHandler,
}

// Exporting Routes
export { memberRoutes }

// Exporting Utils
export { getFullName }
