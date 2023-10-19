import { z } from 'zod'

export const createQuestionsBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

export type CreateQuestionsBodySchema = z.infer<
  typeof createQuestionsBodySchema
>
