import { IBaseRole, IRole, Role } from './index'

export const getRoles = () => Role.find()

export const getSingleRoleById = (roleId: IRole['_id']) => Role.findById(roleId)

export const addRole = (tithe: IBaseRole) => Role.create(tithe)

export const editRole = (roleId: IRole['_id'], role: IBaseRole) =>
  Role.findByIdAndUpdate(roleId, role, { new: true, runValidators: true })

export const deleteRole = (roleId: IRole['_id']) =>
  Role.findByIdAndDelete(roleId)
