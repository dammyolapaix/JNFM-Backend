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
