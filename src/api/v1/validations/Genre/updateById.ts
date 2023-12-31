import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

import genreService from '../../services/genre'

const paramsSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
})

const bodySchema = Joi.object({
  name: Joi.string()
    .empty()
    .required(),
  description: Joi.string()
})

export default async function updateById(req: Request, res: Response, next: NextFunction) {
  const paramsValidator = paramsSchema.validate(req.params)
  const bodyValidator = bodySchema.validate(req.body)

  if (paramsValidator.error || bodyValidator.error) {
    return res.status(400).json(paramsValidator.error ? paramsValidator.error : bodyValidator.error)
  }

  const genre = await genreService.findById(new Types.ObjectId(req.params.id))
  if (!genre) {
    return res.status(400).json({
      message: 'Invalid id parameter'
    })
  }

  req.params = paramsValidator.value
  req.body = bodyValidator.value
  return next()
}