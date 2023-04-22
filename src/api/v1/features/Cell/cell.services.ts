import { IUser } from '../user'
import { IBaseCell, ICell, Cell, IQueryCell } from './index'

export const getCells = () => {
  return Cell.find()
}

export const getSingleCellById = (cellId: ICell['_id']) => {
  return Cell.findById(cellId)
}

export const getSingleCell = (cell: IQueryCell) => {
  return Cell.findOne(cell)
}

export const addCell = (cell: IBaseCell) => {
  return Cell.create(cell)
}

export const editCell = (cellId: ICell['_id'], cell: IBaseCell) => {
  return Cell.findByIdAndUpdate(cellId, cell, {
    new: true,
    runValidators: true,
  })
}

export const deleteCell = (cellId: ICell['_id']) => {
  return Cell.findByIdAndDelete(cellId)
}

export const addLeaderToCell = async (cellId: ICell['_id'], leader: IUser) => {
  const cell = await getSingleCellById(cellId)

  if (cell !== null) {
    if (!cell.leaders) {
      cell.leaders = [leader]
    } else {
      cell.leaders.push(leader)
    }
    await cell.save()
  }
  return cell
}
