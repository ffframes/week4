import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const app = express();

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERROR");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/submit-guestbook', async (req, res) => {
  const { name, message, 'stay-date': stayDate } = req.body;

  const { data, error } = await supabase
    .from('guestbook')
    .insert([
      { 
        name: name, 
        message: message, 
        stay_date: stayDate 
      }
    ])
    .select();

  if (error) {
    console.error('Database error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ success: true, message: 'Submission saved!', data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));