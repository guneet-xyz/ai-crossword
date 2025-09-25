import { env } from "@/env"

import OpenAI from "openai"

export async function generateCrossword() {
  const endpoint = env.AI_BASE_URL
  const model_name = "gpt-5-nano"
  const deployment = "gpt-5-nano"
  const prompt = `Generate 10 words for a crossword puzzle with the theme 'technology'. Provide the words in a JSON array format.`
  const client = new OpenAI({
    apiKey: env.AI_API_KEY,
    baseURL: endpoint,
  })
  const resp = await client.chat.completions.create({
    model: deployment,
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "vfdkljbnv",
        schema: {
          type: "object",
          properties: {
            words: {
              type: "array",
              items: { type: "string" },
              description: "An array of 5 technology-related words.",
              minItems: 10,
              maxItems: 10,
            },
          },
          required: ["words"],
          additionalProperties: false,
        },
      },
    },
  })

  return JSON.parse(resp.choices[0].message.content).words
}
