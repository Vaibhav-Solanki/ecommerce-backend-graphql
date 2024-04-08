import { Model } from 'objection'
import { getModel } from '../db.js'

class BaseModel extends Model {
  static getModel = getModel
}

export default BaseModel
