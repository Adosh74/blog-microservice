import express from  'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express();

const posts = {}

app.use(express.json())
app.use(cors())

app.get('/posts', (req, res) => {
    res.status(200).json({
        success: true,
        data: posts
    })
})

app.post('/posts', async(req, res) => {
    try {
        const id = randomBytes(4).toString('hex');

        const {title} = req.body;
        posts[id] = {
            id, 
            title
        }

        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id, 
                title
            }
        });

        res.status(201).json({
            success: true,
            data: posts[id]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
        
    }
    
})

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);
    res.sendStatus(200);
})

app.listen(4000, () => {
    console.log('V 0.0.3');
    console.log(`posts service running on port: ${4000}`)
})