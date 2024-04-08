import Base from './base.js'

class AddressRepo extends Base {
  async findAddressByCustomerId (customerId) {
    return await this.model.query().select('*').where('customer_id', customerId)
  }
}

export default AddressRepo
