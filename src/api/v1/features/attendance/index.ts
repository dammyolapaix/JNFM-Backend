/**
 * Imports
 */

// Importing Model
import Attendance from './Attendance'

//  Importing Interfaces
import IAttendance, { IBaseAttendance } from './attendance.interfaces'

// Importing Services
import {
  addAttendance,
  deleteAttendance,
  editAttendance,
  getAttendances,
  getSingleAttendanceById,
} from './attendance.services'

// Importing Controllers
import {
  addAttendanceHandler,
  deleteAttendanceHandler,
  editAttendanceHandler,
  getAttendancesHandler,
  getSingleAttendanceByIdHandler,
} from './attendance.controllers'

// Importing Routes
import attendanceRoutes from './attendance.routes'

// Importing Utils

/**
 * Exports
 */

// Exporting Model
export { Attendance }

//  Exporting Interfaces
export { IAttendance, IBaseAttendance }

// Exporting Services
export {
  addAttendance,
  deleteAttendance,
  editAttendance,
  getAttendances,
  getSingleAttendanceById,
}
// Exporting Controllers
export {
  addAttendanceHandler,
  deleteAttendanceHandler,
  editAttendanceHandler,
  getAttendancesHandler,
  getSingleAttendanceByIdHandler,
}

// Exporting Routes
export { attendanceRoutes }

// Exporting Utils
