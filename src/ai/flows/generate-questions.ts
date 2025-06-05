'use server';

/**
 * @fileOverview Generates multiple-choice questions and answers about Generative AI strategy.
 *
 * - generateQuestions - A function that generates questions and answers.
 * - QuestionAnswer - The output type for the generateQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionAnswerSchema = z.object({
  question: z.string().describe('The question about Generative AI strategy.'),
  fatalisticAnswer: z.string().describe('A fatalistic answer option (Terminator persona).'),
  optimisticAnswer: z.string().describe('An optimistic answer option (Connor persona).'),
});

export type QuestionAnswer = z.infer<typeof QuestionAnswerSchema>;

const GenerateQuestionsOutputSchema = z.array(QuestionAnswerSchema).length(10).describe('An array of 10 questions and answer options.');

export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;

export async function generateQuestions(): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow();
}

const generateQuestionsPrompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  output: {schema: GenerateQuestionsOutputSchema},
  prompt: `You are a game designer creating content for a game about Generative AI strategy in business.
  Generate 10 multiple-choice questions. For each question, provide two answer options:
  one reflecting a fatalistic, robotic, doom-focused perspective (the "Terminator" persona),
  and one reflecting an optimistic, collaborative, heroic perspective (the "Connor" persona).
  Format the output as a JSON array of question/answer objects. Do not include any introductory or concluding remarks, only the JSON. Here is the schema:
  {{json schema}}
  `,
});

const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async () => {
    const {output} = await generateQuestionsPrompt({});
    return output!;
  }
);
