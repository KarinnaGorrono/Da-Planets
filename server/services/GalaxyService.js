import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class GalaxyServices {
    async getAll(query = {}) {
        const galaxy = await dbContext.Galaxy.find({}).populate('creator', 'name')
        return galaxy
    }

    async getById(id) {
        const galaxy = await dbContext.Galaxy.findById(id).populate('creator', 'name')
        return galaxy
    }

    async create(body) {
        const galaxy = await dbContext.Galaxy.create(body)
        return galaxy
    }

    async edit(body) {
        const found = await this.getById(body.id)
        if (found.creatorId.toString() !== body.creatorId) {
            throw new BadRequest('No Permission to Edit!')
        }
        const updated = await dbContext.Galaxy.findOneAndUpdate({ id: body.id }, body, { new: true })
        return updated
    }

    async remove(id, userId) {
        const found = await this.getById(id)
        if (found.creatorId.toString() !== userId) {
            throw new Forbidden('No Permition to Delete')
        }
        return await dbContext.Galaxy.findByIdAndDelete(id)
    }
}

export const galaxyServices = new GalaxyServices()
