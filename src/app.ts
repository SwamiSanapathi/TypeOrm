import express from "express";
import getClientConnection from "./multitenancy";
import route from "./routes";
import { DataSource } from "typeorm";

const app = express();

// extending the express.js request type to include the entityManager property globally to access the client connection.
declare global {
    namespace Express {
        interface Request {
            tenant: DataSource;
        }
    }
}


process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

app.use(async (req: any, res, next) => {
    try {
        const { client } = req.headers;

        if (!client) return res.status(400).send({ error: 'Client is required' });
        req.entityManager = await getClientConnection(client as string)
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



app.use(route)
app.listen(2000, () => {
    console.log("Server is listen at port - 2000")
})

