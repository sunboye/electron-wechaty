import config from './config.json' assert { type: "json" }
if (process.env.OPENAI_API_KEY) {
  config.openai.apiKey = config.openai.apiKey ? config.openai.apiKey : process.env.OPENAI_API_KEY
}

export default config