import { env } from "@/env"

import OpenAI from "openai"

export async function generateWordsFromTheme({
  theme,
  n_words,
}: {
  theme: string
  n_words: number
}): Promise<string[]> {
  const endpoint = env.AI_BASE_URL
  const deployment = "gpt-5-nano"
  const prompt = `Generate ${n_words} words for a crossword puzzle with the theme '${theme}'. Provide the words in a JSON array format.`
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
              description: `An array of words related to the theme '${theme}'`,
              minItems: n_words,
              maxItems: n_words,
            },
          },
          required: ["words"],
          additionalProperties: false,
        },
      },
    },
  })

  return JSON.parse(resp.choices[0]!.message.content!).words // TODO: checks
}

export async function generateClueForWord({
  word,
  theme,
}: {
  word: string
  theme: string
}) {
  const endpoint = env.AI_BASE_URL
  const deployment = "gpt-5-nano"
  const prompt = `Generate a concise and clever crossword clue for the word '${word}' with the theme '${theme}'. The clue should be engaging and relevant to the theme.`
  const client = new OpenAI({
    apiKey: env.AI_API_KEY,
    baseURL: endpoint,
  })
  const resp = await client.chat.completions.create({
    model: deployment,
    messages: [{ role: "user", content: prompt }],
  })

  return resp.choices[0]!.message.content! // TODO: checks
}

export async function generateClueForWords({
  words,
  theme,
}: {
  words: string[]
  theme: string
}) {
  const clues: Array<{ word: string; clue: string }> = []
  const promises = []

  async function generateAndPush(word: string) {
    const clue = await generateClueForWord({ word, theme })
    clues.push({ word, clue })
  }

  for (const word of words) promises.push(generateAndPush(word))

  await Promise.all(promises)
  return clues
}
