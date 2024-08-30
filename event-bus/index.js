import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());


app.post('/events', async (req, res) => {
    try {
        const event = req.body;

        await axios.post('http://localhost:4000/events', event);
        await axios.post('http://localhost:4001/events', event);
        await axios.post('http://localhost:4002/events', event);

        res.sentStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.listen(4005, () => {
    console.log('Event bus listening on port 4005');
});