import { iff } from 'feathers-hooks-common'
import _ from 'lodash'

import Depot from '../models/depots'
import Farm from '../models/farms'
import Initiative from '../models/initiatives'
import wrapFeatureCollection from '../hooks/geoJson'
import { entryColumns, filterOwnedEntries, withEager } from '../hooks/relations'
import { isProvider } from 'feathers-hooks-common/lib'

export default app => {
  const service = {
    async find(params) {
      const farms = await Farm.query()
        .eager(params.query.$eager || 'products')
        .modifyEager('products', b =>
          b.select(['products.id', 'category', 'name'])
        )
      const depots = await Depot.query()
        .eager(params.query.$eager)
        .select(entryColumns())
      const initiatives = await Initiative.query()
        .eager(params.query.$eager)
        .select(entryColumns())
      return farms.concat(depots).concat(initiatives)
    }
  }

  app.use('/entries', service)
  app.service('entries').hooks({
    before: {
      all: [iff(isProvider('external'), ctx => (ctx.params.query.$eager = null))],
      find: [
        iff(ctx => _.has(ctx.params.query, 'mine'), withEager('ownerships'))
      ],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    after: {
      all: [],
      find: [
        iff(ctx => _.has(ctx.params.query, 'mine'), filterOwnedEntries),
        wrapFeatureCollection
      ],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  })
}
