import { Auth0Provider } from '@bcwdev/auth0provider'
import { query } from 'express'
import { planetService } from '../services/PlanetService'
import BaseController from '../utils/BaseController'

export class PlanetController extends BaseController {
    constructor() {
        super('api/planets')
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
            const planets = await planetService.getAll(query)
            res.send(planets)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const planet = await planetService.getById(req.params.id)
            res.send(planet)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const planet = await planetService.create(req.body)
            res.send(planet)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.cratorId = req.userInfo.id
            req.body.id = req.params.id
            const update = await planetService.edit(req.body)
            res.send(update)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            await planetService.remove(req.params.id, req.userInfo.id)
            return res.send('Deleted')
        } catch (error) {
            next(error)
        }
    }
}
