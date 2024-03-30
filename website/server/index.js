const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());


app.use(bodyParser.json());

const API_URL = "https://ug9qfww8oj2szfip.eastus.azure.endpoints.huggingface.cloud";
const headers = {
  "Accept": "application/json",
  "Authorization": "Bearer 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",
  "Content-Type": "application/json"
};

async function queryExternalAPI(question) {
    try {
      const payload = {
        "inputs": {
          "context": "The context string you have",
          "question": question
        }
      };
      const response = await axios.post(API_URL, payload, { headers });
      return response.data;
    } catch (error) {
      console.error('Error querying external API:', error);
      throw error; // Rethrow error to handle it in the calling function
    }
  }


  app.post('/query', async (req, res) => {
    const userString = req.body.userString;
    try {
      const externalAPIResponse = await queryExternalAPI(userString);
      res.json(externalAPIResponse); // Send the external API's response back to the client
    } catch (error) {
      res.status(500).send('Failed to get response from the external API');
    }
  });

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

