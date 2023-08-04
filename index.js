// index.js
const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4700;
const openaiApiKey = process.env.OPENAI_API_KEY

const configuration = new Configuration({apiKey : openaiApiKey});
const openai = new OpenAIApi(configuration);

// Set up JSON middleware to parse incoming requests
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
  res.send("Default Route, server running fine")
})

// API endpoint to generate quotes
app.post('/generate-quote', async (req, res) => {
  try {
    const keyword = req.body.keyword;

    // Use the generateQuote function to fetch a quote using the OpenAI API
    const prompt = `Generate a inspirational or motivational quote about "${keyword}"`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt,
          max_tokens: 50,
          n: 1,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );
  
      const quote = response.data.choices[0].text.trim();
      res.json({ quote });

      //----------------------------------------------------------------------------------------------
                // const response = await openai.createCompletion({
                //     model: 'gpt-3.5-turbo',
                //     prompt: prompt,
                //     temperature: 0,
                //     top_p: 1,
                //     frequency_penalty: 0,
                //     presence_penalty: 0,
                //     max_tokens: 200
                // })
                // response.then(async (data)=>{
                //     res.json(data)
                // })
      //-----------------------------------------------------------------------
                // const response = await openai.createCompletion({
                //   model: 'gpt-3.5-turbo',
                //   prompt: prompt,
                //   max_tokens: 200
                // });
            
                // // Check if the response contains any error
                // if (response.error) {
                //   console.error('OpenAI API error:', response.error.message);
                //   throw new Error('Failed to generate a quote.');
                // }
            
                // const quote = response.data.choices[0].text.trim();
                // return quote;
    } 
    catch (error) {
      // console.error('OpenAI API request failed:', error.response?.data || error.message);
      res.json({error})
    }
  } 
  catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
