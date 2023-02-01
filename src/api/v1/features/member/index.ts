/**
 * Imports
 */

// Importing Model
import Member from './Member'

//  Importing Interfaces
import IMember, { IBaseMember, IMemberQuery } from './member.interfaces'

// Importing Services
import {
  addMember,
  deleteMember,
  editMember,
  getMembers,
  getSingleMemberById,
  getMemberQueryResults,
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
export { IBaseMember, IMember, IMemberQuery }

// Exporting Services
export {
  addMember,
  deleteMember,
  editMember,
  getMembers,
  getSingleMemberById,
  getMemberQueryResults,
}

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
