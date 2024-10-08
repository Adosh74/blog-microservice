import express  from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const commentByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentByPostId[req.params.id] || []

    res.status(200).json({
        success: true,
        result: comments.length,
        data: comments
    })
});

app.post('/posts/:id/comments', async(req, res) => {
    try {
        const commentId = randomBytes(4).toString('hex');

        const { content } = req.body; 

        const comments = commentByPostId[req.params.id] ?
                        commentByPostId[req.params.id].push({
                            id: commentId,
                            content,
                            status: 'pending'
                        }):
                        commentByPostId[req.params.id] = [{
                            id: commentId,
                            content,
                            status: 'pending'
                        }]

        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status: 'pending'
            }
        }).catch((error) => {
            throw error;
        });

        res.status(201).json({
            success: true,
            result: comments.length, 
            data: [comments]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
});

app.post('/events', async (req, res) => {
    console.log('Received Event:', req.body.type);

    const { type, data } = req.body;
    
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentByPostId[postId];

        comments.forEach(comment => {
            if(comment.id === id){
                comment.status = status;
                console.log(comment);
            }
        });

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status
            }
        })
    }

    res.sendStatus(200);
})

app.listen(4001, () => {
    console.log(`comments service running on port: ${4001}`)
});