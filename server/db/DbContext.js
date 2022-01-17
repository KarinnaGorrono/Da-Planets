import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account';
import { PlanetSchema } from '../models/Planet'
import { GalaxySchema } from '../models/Galaxy'


class DbContext {
  Planet = mongoose.model('Planet', PlanetSchema,);
  Galaxy = mongoose.model('Galaxy', GalaxySchema);
  Account = mongoose.model('Account', AccountSchema);

}

export const dbContext = new DbContext()
