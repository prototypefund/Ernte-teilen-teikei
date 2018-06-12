import createService from 'feathers-objection/lib/index'
import authentication from '@feathersjs/authentication/lib/index'

import Farm from '../../app/models/farms'
import { featureCollection } from '../../app/util/jsonUtils'
import { restrictToUser, restrictToOwner } from '../../auth/hooks/authorization'

export default app => {
  const service = createService({
    model: Farm,
    allowedEager: ['roles', 'places', 'products']
  })

  const withEager = builder =>
    builder
      .eager('[places, products]')
      .modifyEager('products', b => b.select(['category', 'name']))

  service.find = async () => featureCollection(await withEager(Farm.query()))
  service.get = async id => withEager(Farm.query().findById(id))

  service.getWithOwnerships = async id =>
    Farm.query()
      .findById(id)
      .eager('ownerships')

  app.use('/depots', service)

  app.use('/farms', service)
  app.service('farms').hooks({
    before: {
      create: [authentication.hooks.authenticate('jwt'), restrictToUser],
      update: [authentication.hooks.authenticate('jwt'), restrictToOwner],
      patch: [authentication.hooks.authenticate('jwt'), restrictToOwner],
      remove: [authentication.hooks.authenticate('jwt'), restrictToOwner]
    }
  })
}