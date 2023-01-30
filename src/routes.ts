import { Router } from "express";
import { Clients } from "./entity/Clients";
import { Users } from "./entity/Users";
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

route.get('/insert', async (req, res, next) => {
    try {
        const { tenant } = req

        const clients: any = [
            {
                client_id: null,
                name: 'Amazon',
                users: [
                    {
                        name: 'Shiva',
                        client_id: null,
                    },
                    {
                        name: 'Ravi Kumar',
                        client_id: null,
                    }
                ]
            },
            {
                client_id: null,
                name: 'Flipkart',
                users: [
                    {
                        name: 'Sailaja',
                        client_id: null,
                    }
                ]
            }
        ]



        const user = await tenant.transaction(async m => {
            await m.save(m.create(Clients, clients))
        })
        res.send({ success: true, user, client: req.headers.client })
    } catch (error) {
        next()
    }
})

export default route