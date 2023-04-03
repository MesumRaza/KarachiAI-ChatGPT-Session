const axios = require('axios');
const express = require('express');
require("dotenv").config();
const app=express();
app.use(express.urlencoded({extended:true}));



app.get('/',(req,res) =>{
    res.send(`
    <form action = "/" method = "POST">
    <label for = "input">Enter some text:</label>
    <input type = "text" name = "input" id = "input">
    <button type = "submit">Submit</button>
    </form>
    `);
})

app.post('/',(req,res) =>{
    console.log(req.body.input);
    const OPENAI_API_KEY = process.env.OPEN_API;
const inputText = `ABC Supply Chain Inc. is a global logistics company that specializes in providing end-to-end supply chain solutions to businesses of all sizes. The company has a strong presence in several countries and has built a reputation for its reliability, efficiency, and cost-effectiveness. ABC Supply Chain's core services include transportation, warehousing, inventory management, and distribution. The company also offers value-added services such as customs brokerage, packaging, and labeling. ABC Supply Chain has experienced steady growth over the years, but the industry is becoming increasingly competitive, with new players entering the market and existing competitors expanding their offerings. The company's management team is concerned about maintaining its competitive edge and identifying new opportunities for growth in a rapidly evolving industry.`
const beforeInputText = `Use the Below information to Generate a SWOT Analysis
And output in the following format
`;
const AfterInputText = `<table>
<tr>
  <th>Strengths</th>
  <td>Business Strengths, Separate by Comma</td>
</tr>
<tr>
  <th>Weakness</th>
  <td>Business Weakness, Separate by Comma</td>
</tr>
<tr>
  <th>Opportunity</th>
  <td>Business Opportunities, Separate by Comma</td>
</tr>
<tr>
  <th>Threat</th>
  <td>Business Threats, Separate by Comma</td>
</tr>
</table>

`;
axios.post('https://api.openai.com/v1/chat/completions', {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: `${beforeInputText}\nn${inputText}\nn${AfterInputText}` }],
  temperature: 0.7
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
})
  .then(response => {
    console.log(response.data.choices[0].message.content);
    res.send(response.data.choices[0].message.content);
  })
  .catch(error => {
    console.log(error);
  });

})


app.listen(3000,()=>{
    console.log('Server started on port 3000');
})