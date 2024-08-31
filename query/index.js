import express from 'express';
import cors from 'cors'; 
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title} = data;
        posts[id] = { id, title, comments: []};
    }

    if(type === 'CommentCreated') {
        const { id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({ 
            id, 
            content,
            status 
        });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const comments = posts[postId].comments;

        comments.forEach(comment => {
            if (comment.id === id) {
                comment.status = status
                comment.content = content
            }
        });
    }
}

app.get('/posts', (req, res) => {

    res.status(200).json({
        success: true,
        data: posts
    });
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    
    handleEvent(type, data)

    res.sendStatus(200);
});

app.listen(4002, async() => {
    console.log('Query service listening on port 4002');
    try {
        const res = await axios.get("http://localhost:4005/events");
    
        for (let event of res.data.data) {
            console.log("Processing event:", event.type);
    
            handleEvent(event.type, event.data);
        }
        } catch (error) {
        console.log(error.message);
        }
});