import express from 'express';
import cors from 'cors'; 

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {

    res.status(200).json({
        success: true,
        data: posts
    });
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    
    if(type === 'PostCreated') {
        const { id, title} = data;
        posts[id] = { id, title, comments: []};
    }

    if(type === 'CommentCreated') {
        const { id, content, postId} = data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);

    res.sendStatus(200);
});

app.listen(4002, () => {
    console.log('Query service listening on port 4002');
});