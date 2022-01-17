import { galaxyServices } from '../services/GalaxyServices'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class GalaxyController extends BaseController {
    constructor() {
        super('api/galaxy')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const query = req.query
            const galaxy = await galaxyServices.getAll(query)
            res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const galaxy = await galaxyServices.getById(req.params.id)
            res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const galaxy = await galaxyServices.create(req.body)
            res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const update = await galaxyServices.edit(req.body)
            res.send(update)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            await galaxyServices.remove(req.params.id, req.userInfo.id)
            return res.send('Deleted')
        } catch (error) {
            next(error)
        }
    }
}
