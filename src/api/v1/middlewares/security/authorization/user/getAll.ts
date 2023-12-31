import { Request, Response, NextFunction } from 'express'

import defineAbilityForUser from './rules'
import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const user: IRequestUser = req.user as IRequestUser

  if ((await defineAbilityForUser(user)).can('read', 'Users')) {
    return next()
  }

  return res.status(403).json({
    status: 'Forbidden',
    message: 'Access Denied'
  })
}

export default getAll