
'use server';
/**
 * @fileOverview Detects the apparent gender of a person in an image.
 *
 * - detectGender - A function that takes an image data URI and returns the detected gender.
 * - DetectGenderInput - The input type for the detectGender function.
 * - DetectGenderOutput - The return type for the detectGender function.
 * - Gender - The type for the detected gender.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectGenderInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectGenderInput = z.infer<typeof DetectGenderInputSchema>;

const GenderEnumSchema = z.enum(['male', 'female', 'unknown']);
export type Gender = z.infer<typeof GenderEnumSchema>;

const DetectGenderOutputSchema = z.object({
  gender: GenderEnumSchema.describe('The detected apparent gender of the person in the image. Returns "unknown" if unsure or not applicable.'),
});
export type DetectGenderOutput = z.infer<typeof DetectGenderOutputSchema>;

export async function detectGender(input: DetectGenderInput): Promise<DetectGenderOutput> {
  return detectGenderFlow(input);
}

const detectGenderPrompt = ai.definePrompt({
  name: 'detectGenderPrompt',
  input: {schema: DetectGenderInputSchema},
  output: {schema: DetectGenderOutputSchema},
  prompt: `Analyze the provided image of a person and determine their apparent gender based on visual cues.
Focus on features typically associated with male or female presentation.
If the gender is ambiguous, not clearly discernible, if the image does not primarily feature a human face suitable for this determination, or if you are uncertain for any reason, respond with "unknown".
Output ONLY the JSON object with the "gender" field set to "male", "female", or "unknown". Do not include any other text or explanation.

Image: {{media url=photoDataUri}}

Output schema: {{json schema}}`,
  model: 'googleai/gemini-2.0-flash',
  config: {
    // Default safety settings are used.
    // For production, review and adjust safetySettings if needed:
    // safetySettings: [
    //   { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    // ],
  },
});

const detectGenderFlow = ai.defineFlow(
  {
    name: 'detectGenderFlow',
    inputSchema: DetectGenderInputSchema,
    outputSchema: DetectGenderOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await detectGenderPrompt(input);
      if (!output || !GenderEnumSchema.safeParse(output.gender).success) {
        console.warn('Gender detection returned invalid or no output, defaulting to "unknown". Output:', output);
        return { gender: 'unknown' };
      }
      return output;
    } catch (error) {
        console.error("Error in detectGenderFlow:", error);
        return { gender: 'unknown' }; // Fallback in case of an error
    }
  }
);
