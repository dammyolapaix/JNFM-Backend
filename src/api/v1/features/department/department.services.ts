import { IBaseDepartment, IDepartment, Department } from './index'

export const getDepartments = () => {
  return Department.find()
}

export const getSingleDepartmentById = (departmentId: IDepartment['_id']) => {
  return Department.findById(departmentId)
}

export const addDepartment = (department: IBaseDepartment) => {
  return Department.create(department)
}

export const editDepartment = (
  departmentId: IDepartment['_id'],
  department: IBaseDepartment
) => {
  return Department.findByIdAndUpdate(departmentId, department, {
    new: true,
    runValidators: true,
  })
}

export const deleteDepartment = (departmentId: IDepartment['_id']) => {
  return Department.findByIdAndDelete(departmentId)
}
