import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { config } from "dotenv";
import router from "./router/route.js";
import connect from "./database/connection.js";
import fetch from "node-fetch";

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT || 8080

app.use('/api', router)

app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

app.get('/ping', (req, res) => {
    // Simply respond with a message to acknowledge the ping
    res.send("Ping received!");
});

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })

        // Periodically make a request to the "/ping" endpoint every 13 minutes (780,000 milliseconds)
        setInterval(() => {
            fetch('https://ai-questions-api-service.onrender.com/ping')
                .then(response => console.log("Ping response:", response.status))
                .catch(error => console.error("Error pinging the server:", error));
        }, 780000); // 13 minutes
    } catch (error) {
        console.log("failed to start the server at server.js line 31")
    }
}).catch(error => {
    console.log("database connection failed")
});
