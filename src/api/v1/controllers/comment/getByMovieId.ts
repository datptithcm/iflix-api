import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'

import commentService from '../../services/comment'

const getByMovieId = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.movieId || !req.query.page) {
    return next()
  }

  try {
    const comments = await commentService.findByMovieId(new Types.ObjectId(String(req.query.movieId)), Number(req.query.page))

    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json({
      status: 'Internal Server Error'
    })
  }
}

export default getByMovieId