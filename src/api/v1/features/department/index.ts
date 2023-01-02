/**
 * Imports
 */

// Importing Model
import Department from './Department'

//  Importing Interfaces
import IDepartment, {
  IBaseDepartment,
  IReqDepartment,
} from './department.interfaces'

// Importing Services
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments,
  getSingleDepartmentById,
} from './department.services'

// Importing Controllers
import {
  addDepartmentHandler,
  deleteDepartmentHandler,
  editDepartmentHandler,
  getDepartmentsHandler,
  getSingleDepartmentByIdHandler,
  addMemberToDepartmentHandler,
  removeMemberFromDepartmentHandler,
} from './department.controllers'

// Importing Routes
import departmentRoutes from './department.routes'

// Importing Utils

/**
 * Exports
 */

// Exporting Model
export { Department }

//  Exporting Interfaces
export { IBaseDepartment, IDepartment, IReqDepartment }

// Exporting Services
export {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments,
  getSingleDepartmentById,
}

// Exporting Controllers
export {
  addDepartmentHandler,
  deleteDepartmentHandler,
  editDepartmentHandler,
  getDepartmentsHandler,
  getSingleDepartmentByIdHandler,
  addMemberToDepartmentHandler,
  removeMemberFromDepartmentHandler,
}

// Exporting Routes
export { departmentRoutes }

// Exporting Utils
