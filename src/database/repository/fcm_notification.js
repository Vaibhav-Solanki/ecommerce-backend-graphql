import Base from './base.js'

class CustomerRepo extends Base {
  async findByUserId (id) {
    return await this.findGroup({ customer_id: id })
  }
}

export default CustomerRepo
