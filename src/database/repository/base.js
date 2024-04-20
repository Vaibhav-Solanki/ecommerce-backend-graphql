class BaseRepo {
  constructor (entityName, model, getModel, getRepo, cacheClient) {
    this.entityName = entityName
    this.model = model
    this.getModel = getModel
    this.getRepo = getRepo
    this.cacheClient = cacheClient
  }

  static DEFAULT_LIMIT = 1000

  static DEFAULT_TZ = 'Asia/Kolkata'

  getKeyByObject ({ id }) {
    return `${this.entityName}-id-${id}`
  }

  getKeyById (id) {
    return `${this.entityName}-id-${id}`
  }

  getKeyByQuery (query) {
    return query.map(el => `${this.entityName}-id-${el.id}`)
  }

  setData (key, value) {
    const cacheKey = `${this.entityName}-${key}-${value[key]}`
    return this.cacheClient.set(cacheKey, value)
  };

  getData (key, identity) {
    const cacheKey = `${this.entityName}-${key}-${identity}`
    return this.cacheClient.get(cacheKey)
  };

  async selectOp (query) {
    const rows = await query
    rows.forEach(row => this.setData('id', row))
    return rows
  }

  async findGroup (entity) {
    const load = await this.model.query().select('id').where(entity)
    return await this.findAllIds(load.map(row => row.id))
  }

  async findById (value) {
    let load = this.getData('id', value)

    if (!load) {
      load = await this.findOne({ id: value })
      this.setData('id', load)
    }
    return load
  }

  async findAllIds (ids) {
    const rows = []
    for (const id of ids) {
      const row = await this.findById(id)
      rows.push(row)
    }
    return rows
  }

  async findOne (query) {
    return await this.model.query().findOne(query)
  }

  mapBy (index, list) {
    const m = new Map()
    if (list?.length) {
      for (const i of list) if (i) m.set(i[index], i)
    }

    return m
  }

  mapByKey (keyFn, list) {
    const m = new Map()
    if (list?.length) {
      for (const i of list) if (i) m.set(keyFn(i), i)
    }

    return m
  }

  mapListBy (index, list, key) {
    const v = key ? i => key(i) : i => i
    const m = new Map()
    if (list?.length) {
      for (const i of list) {
        const l = m.get(i[index])
        if (l) {
          l.push(v(i))
        } else {
          m.set(i[index], [v(i)])
        }
      }
    }

    return m
  }

  partitionBy (f, list) {
    const p = []
    for (const i of list) {
      const index = Number(f(i))
      if (p[index]) {
        p[index].push(i)
      } else {
        p[index] = [i]
      }
    }

    return p
  }

  chunks (arr, size = 1000) {
    return size ? [...Array(Math.ceil(arr.length / size))].map((_, i) => arr.slice(i * size, i * size + size)) : [arr]
  }

  async findAll (column = 'id', order = 'desc') {
    const load = await this.model.query().select('id').orderBy(column, order)
    return await this.findAllIds(load.map(row => row.id))
  }

  async insert (entity) {
    const load = await this.model.query().insertAndFetch(entity)
    if (Array.isArray(load)) {
      load.map(el => this.setData('id', el))
    } else {
      this.setData('id', load)
    }
    return load
  }

  async insertGraph (entity) {
    const load = await this.model.query().insertGraph(entity)
    this.cacheClient.flushAll()
    return load
  }

  async update (entity, update) {
    const load = await this.model.query().returning('*').update(update).where(entity)
    load.forEach(el => this.setData('id', el))
    return load
  }

  async updateAndFetch (Model, entity) {
    const load = await Model.$query().updateAndFetch(entity)
    this.setData('id', load)
    return load
  }

  async delete (entity) {
    const query = await this.model.query().select('id').where(entity)
    this.cacheClient.del(this.getKeyByQuery(query))
    return await Promise.all(query.map(op => op.$query().del()))
  }

  async deleteById (id) {
    this.cacheClient.del(this.getKeyById(id))
    return await this.model.deleteById(id)
  }

  getTimestamp (dateTime) {
    return Math.floor(new Date(dateTime).getTime() / 1000)
  }
}

export default BaseRepo
