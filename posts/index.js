import express from  'express'
import { randomBytes } from 'crypto'

const app = express();

const posts = {}

app.use(express.json())

app.get('/posts', (req, res) => {
    res.status(200).json({
        success: true,
        data: posts
    })
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');

    const {title} = req.body;
    posts[id] = {
        id, 
        title
    }

    res.status(201).json({
        success: true,
        data: posts[id]
    })
})

app.listen(4000, () => {
    console.log(`posts service running on port: ${4000}`)
})