import express, { Request, Response, NextFunction, Router } from 'express';
export const router = express.Router()

import { ApiController } from '../controllers/apiController.js'
const apiController = new ApiController()

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/api/stocks/:id', (req: Request, res: Response, next: NextFunction) => apiController.getStockHistory(req, res, next))

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.cause = 404
  next(error)
})