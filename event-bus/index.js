import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

const events = []


app.post('/events', async (req, res) => {
    try {
        const event = req.body;

        events.push(event)
        
        await axios.post('http://localhost:4000/events', event);
        await axios.post('http://localhost:4001/events', event);
        await axios.post('http://localhost:4002/events', event);
        await axios.post('http://localhost:4003/events', event);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/events', (req, res) => {
    res.status(200).json({
        success: true,
        data: events
    })
})

app.listen(4005, () => {
    console.log('Event bus listening on port 4005');
});