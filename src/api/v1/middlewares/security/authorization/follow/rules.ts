import { AbilityBuilder, createMongoAbility } from '@casl/ability'

import IRequestUser from '../../../../interfaces/orthers/IRequestUser'

export default function defineAbilityAboutFollowFor(user: IRequestUser) {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  if (user.role === 'admin') {
    can('manage', 'all')
  }

  if (user.role === 'user') {
    can('read', 'Follow', { user: user.id })
    can('create', 'Follow')
    can('delete', 'Follow', { user: user.id })
  }

  return build()
}