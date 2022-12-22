import { IBaseAttendance, IAttendance, Attendance } from './index'

interface IAttendanceParams {
  churchService: IAttendance['churchService']
}

export const getAttendances = (queryObject?: IAttendanceParams) => {
  if (queryObject) {
    console.log(queryObject)
    return Attendance.find(queryObject)
  } else {
    return Attendance.find()
  }
}

export const getSingleAttendanceById = (attendanceId: IAttendance['_id']) => {
  return Attendance.findById(attendanceId)
}

export const addAttendance = (attendance: IBaseAttendance) => {
  return Attendance.create(attendance)
}

export const editAttendance = (
  attendanceId: IAttendance['_id'],
  attendance: IBaseAttendance
) => {
  return Attendance.findByIdAndUpdate(attendanceId, attendance, {
    new: true,
    runValidators: true,
  })
}

export const deleteAttendance = (attendanceId: IAttendance['_id']) => {
  return Attendance.findByIdAndDelete(attendanceId)
}
