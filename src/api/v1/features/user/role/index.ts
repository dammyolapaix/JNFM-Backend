import Role from './Role'
import IRole, { IBaseRole } from './role.interfaces'
import {
  addRole,
  deleteRole,
  editRole,
  getRoles,
  getSingleRoleById,
} from './role.services'
import {
  addRoleHandler,
  deleteRoleHandler,
  editRoleHandler,
  getRolesHandler,
  getSingleRoleByIdHandler,
} from './role.controllers'
import { authorizedRoles } from './role.middlewares'

export { Role }

export { IRole, IBaseRole }

export { addRole, deleteRole, editRole, getRoles, getSingleRoleById }

export {
  addRoleHandler,
  deleteRoleHandler,
  editRoleHandler,
  getRolesHandler,
  getSingleRoleByIdHandler,
}

export { authorizedRoles }
