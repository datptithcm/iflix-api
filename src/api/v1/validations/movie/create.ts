import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import fs from 'fs'

const createSchema = Joi.object({
  title: Joi.string()
    .empty()
    .required(),
  alias: Joi.array()
    .items(Joi.string().empty()),
  description: Joi.string(),
  release: Joi.number()
    .integer()
    .required(),
  duration: Joi.string()
    .empty()
    .required(),
  episodeCount: Joi.number()
    .integer(),
  genres: Joi.array()
    .items(Joi.string().hex().min(24).max(24)),
  directors: Joi.array()
    .items(Joi.string().hex().min(24).max(24)),
  casts: Joi.array()
    .items(Joi.string().hex().min(24).max(24)),
  country: Joi.string()
    .hex()
    .min(24)
    .max(24)
})

export default async function create(req: Request, res: Response, next: NextFunction) {
  const { value, error } = createSchema.validate(req.body)

  if (error) {
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path)
      } catch (error) {
        next(error)
      }
    }
    return res.status(400).json(error)
  }

  req.body = value
  return next()
}