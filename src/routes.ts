import { Router } from "express";
import { Clients } from "./entity/Clients";
const route = Router()

route.get('/getClient', async (req, res, next) => {
    try {
        const { tenant } = req
        const user = await tenant.getRepository(Clients).find()
        res.send({ success: true, user, client: req.headers.client })
    } catch (error) {
        next()
    }
})

export default route