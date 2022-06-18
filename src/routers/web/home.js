import { Router } from 'express'
import { webAuth } from '../../auth/index.js'
import path from 'path'

const zapatillasWebRouter = new Router()

zapatillasWebRouter.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

zapatillasWebRouter.get('/zapatillas-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/zapatillas-vista-test.html'))
})

export default zapatillasWebRouter