import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

const reviews = [];

app.post('/submit-guestbook', (req, res) => {
    const { name, message, 'stay-date': stayDate } = req.body;
    reviews.push({ name, message, stayDate });
    console.log('New Review:', req.body);
    res.status(200).send({ message: 'Success!' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));