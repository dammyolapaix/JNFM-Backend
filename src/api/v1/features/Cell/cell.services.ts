import { IBaseCell, ICell, Cell } from './index'

export const getCells = () => {
  return Cell.find()
}

export const getSingleCellById = (CellId: ICell['_id']) => {
  return Cell.findById(CellId)
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
