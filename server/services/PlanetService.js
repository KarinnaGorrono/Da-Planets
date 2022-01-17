import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PlanetService {
    async getAll(query = {}) {
        const planets = await dbContext.Planet.find({})
            .populate('creator', 'name')
            .populate('star', 'name')
        return planets
    }

    async getById(id) {
        const planets = await dbContext.Planet.findById(id)
            .populate('creator', 'name')
            .populate('star', 'name')
        return planets
    }

    async create(body) {
        const planet = await dbContext.Planet.create(body)
        return planet
    }

    async edit(body) {
        const found = await this.getById(body.id)
        if (found.creatorId.toString() !== body.creatorId) {
            throw new BadRequest('No Permition to Edit!')
        }
        const updated = await dbContext.Planet.findOneAndUpdate({ id: body.id }, body, { new: true })
        return updated
    }

    async remove(id, userId) {
        const found = await this.getById(id)
        if (found.creatorId.toString() !== userId) {
            throw Forbidden('No Permition to Delete')
        }
        await dbContext.Planet.findOneAndDelete(id)
    }
}
export const planetService = new PlanetService()
