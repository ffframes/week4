import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

app.post('/submit-guestbook', async (req, res) => {
  const { name, message, 'stay-date': stayDate } = req.body;


  const { data, error } = await supabase
    .from('guestbook')
    .insert([
      { name: name, message: message, stay_date: stayDate }
    ]);

  if (error) {
    console.error('Database error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ success: true, message: 'Submission saved!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

