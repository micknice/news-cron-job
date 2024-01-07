const OpenAI = require("openai") ;
require('dotenv').config()

const openai = new OpenAI({organization: process.env.OPENAI_ORGANIZATION, apiKey: process.env.OPENAI_API_KEY});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Say Hi." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}
const getQueryResponse = async(query) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${query}` }],
        model: "gpt-3.5-turbo",
      });
    //   console.log(completion.choices[0]);
    return completion.choices[0].message.content

}



module.exports = {getQueryResponse}