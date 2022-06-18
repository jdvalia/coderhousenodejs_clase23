import { Router } from 'express'
import { createNFakeProducts } from '../../mocks/zapatillas.js'

const zapatillasApiRouter = new Router()

zapatillasApiRouter.get('/api/zapatillas-test', (req, res) => { res.json(createNFakeProducts(5)) })

export default zapatillasApiRouter