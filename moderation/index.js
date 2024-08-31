import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());


app.post('/events', async (req, res) => {
    const { type, data} = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        })
    }

    res.sendStatus(200);
});


app.listen(4003, () => {
    console.log('Moderation service listening on port 4003');
});