import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../utils'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err }
  error.message = err.message

  // Testing for CastError (Bad ObjectId - Mongoose)
  if (err.name === 'CastError') {
    const message = `Resource with the id of ${err.value} not found`
    error = new ErrorResponse(message, 404)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}

export default errorHandler
