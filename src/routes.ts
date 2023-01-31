import { Router } from "express";
import { Clients } from "./entity/Clients";
import { Users } from "./entity/Users";
import { Level } from "./entity/Level";
import { User } from "./entity/User";
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
                        parent_id: null
                    },
                    {
                        name: 'Ravi Kumar',
                        client_id: null,
                        parent_id: `My parent is Shiva`,
                    },
                    {
                        name: 'Poorna',
                        client_id: null,
                        parent_id: `My Parent is Ravi Kumar`
                    },
                    {
                        name: 'Naveen',
                        client_id: null,
                        parent_id: `My Parent is Ravi Kumar`
                    },
                    {
                        name: 'Naveen',
                        client_id: null,
                        parent_id: `My Parent is Poorna`
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


route.get('/parent_child', async (req, res, next) => {
    try {
        const { tenant } = req

        const data: any = [
            {
                level_id: null,
                level: 1,
                users: [
                    {
                        user_id: null,
                        level_id: null,
                        name: 'A',
                        user_parent_id: null
                    },
                    {
                        user_id: null,
                        name: 'B',
                        user_parent_id: "A"
                    }
                ]
            },
            {
                level_id: null,
                level: 2,
                users: [
                    {
                        user_id: null,
                        level_id: null,
                        name: 'C',
                        user_parent_id: "B"
                    },
                    {
                        user_id: null,
                        level_id: null,
                        name: 'D',
                        user_parent_id: "A"
                    }
                ]
            },
        ];


        for (const levelData of data) {
            const level = new Level();
            level.level = levelData.level;
            await tenant.manager.save(level);

            for (const userData of levelData.users) {
                const user = new User();
                user.name = userData.name;
                user.level = level;

                const parentUser = await tenant.manager.findOne(User, {
                    where: { name: userData.user_parent_id }
                });

                if (parentUser) {
                    user.user_parent_id = parentUser.user_id;
                }

                await tenant.manager.save(user);
            }
        }


    } catch (error) {
        next()
    }
    return res.send({ success: true, message: `Parent info inserted successfully.` })
})
export default route