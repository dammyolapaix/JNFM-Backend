/**
 * Imports
 */

// Importing Model
import Income from './Income'

//  Importing Interfaces
import IIncome, { IBaseIncome } from './income.interfaces'

// Importing Services
import {
  addIncome,
  deleteIncome,
  editIncome,
  getIncomes,
  getSingleIncomeById,
} from './income.services'

// Importing Controllers
import {
  addIncomeHandler,
  deleteIncomeHandler,
  editIncomeHandler,
  getIncomesHandler,
  getSingleIncomeByIdHandler,
} from './income.controllers'

// Importing Routes
import incomeRoutes from './income.routes'

// Importing Utils

/**
 * Exports
 */

// Exporting Model
export { Income }

//  Exporting Interfaces
export { IBaseIncome, IIncome }

// Exporting Services
export { addIncome, deleteIncome, editIncome, getIncomes, getSingleIncomeById }

// Exporting Controllers
export {
  addIncomeHandler,
  deleteIncomeHandler,
  editIncomeHandler,
  getIncomesHandler,
  getSingleIncomeByIdHandler,
}

// Exporting Routes
export { incomeRoutes }

// Exporting Utils
