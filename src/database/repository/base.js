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

  setData (key, value) {
    const cacheKey = `${this.entityName}-${key}-${value[key]}`
    return this.cacheClient.set(cacheKey, value)
  };

  getData (key, identity) {
    const cacheKey = `${this.entityName}-${key}-${identity}`
    return this.cacheClient.get(cacheKey)
  };

  async findOneDirect (key, value) {
    return await this.model.query().findOne(key, value)
  }

  async findOneCached (key, value) {
    let load = this.getData(key, value)

    if (!load) {
      load = await this.findOneDirect(key, value)
      this.setData(key, load)
    }
    return load
  }

  async findById (value) {
    let load = this.getData('id', value)

    if (!load) {
      load = await this.findOneDirect('id', value)
      this.setData('id', load)
    }
    return load
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

  async findOneGroup (group) {
    return await this.model.query().findOne(group)
  }

  async findAll (column = 'id', order = 'desc') {
    return await this.model.query().orderBy(column, order)
  }

  async insert (entity) {
    return await this.model.query().insertAndFetch(entity)
  }

  async insertGraph (entity) {
    return await this.model.query().insertGraph(entity)
  }

  async update (entity, update) {
    return await this.model.query().update(update).where(entity)
  }

  async delete (entity) {
    return await this.model.query().delete().where(entity)
  }

  async deleteById (id) {
    return await this.model.query().delete().where({ id })
  }

  getTimestamp (dateTime) {
    return Math.floor(new Date(dateTime).getTime() / 1000)
  }
}

export default BaseRepo
