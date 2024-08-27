import express  from 'express';
import { randomBytes } from 'crypto';

const app = express();
app.use(express.json());

const commentByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentByPostId[req.body.id] || []

    res.status(200).json({
        success: true,
        result: comments.length,
        data: comments
    })
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body; 

    const comments = commentByPostId[req.params.id] ?
                    commentByPostId[req.params.id].push({
                        id: commentId,
                        content
                    }):
                    commentByPostId[req.params.id] = [{
                        id: commentId,
                        content
                    }]

    res.status(200).json({
        success: true,
        result: comments.length, 
        data: comments
    })
});

app.listen(4001, () => {
    console.log(`comments service running on port: ${4001}`)
});