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
                        user_id: null,
                        name: 'Shiva',
                        client_id: null,
                    },
                    {
                        user_id: null,
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
                        user_id: null,
                        name: 'Sailaja',
                        client_id: null,
                    }
                ]
            }
        ]


        const user = await tenant.transaction(async m => {
            await m.save(m.create(Clients, clients))

            // const clientEntities: Clients[] = [];
            // clients.forEach((client: any) => {
            //     const clientEntity = m.create(Clients, client);
            //     clientEntity.users = client.users.map((user: any) => m.create(Users, user));
            //     clientEntities.push(clientEntity);
            // });

            // await m.save(clientEntities);
        })
        res.send({ success: true, user, client: req.headers.client })
    } catch (error) {
        next()
    }
})

export default route