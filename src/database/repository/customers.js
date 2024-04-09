import Base from './base.js'

class CustomerRepo extends Base {
  async findUserById (id) {
    return await this.findById(id)
  }

  async registerUser ({ email, uid }) {
    return await this.insert({ email, uid })
  }
}

export default CustomerRepo
