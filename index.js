import axios from 'axios';
import express from 'express';
import { Redis } from 'ioredis';

// Create an instance of an Express application
const app = express()

// Define a port number
const PORT = process.env.PORT || 8000

const client = new Redis({
    host: 'redis', // Service name defined in docker-compose.yml
    port: 6379     // Default Redis port
})

// define routes
app.get('/', async (req, res) => {

    // check on redis cache
    const cachedData = await client.get('todos')

    if(cachedData){
        return res.json(JSON.parse(cachedData))
    }
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    client.set('todos', JSON.stringify(response.data))
    await client.expire('todos', 60)
    return res.json(response.data)
})


// start the server
app.listen(PORT);