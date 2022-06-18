export function webAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function apiAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.status(401).json({ error: 'revise lo ingresado' })
    }
}