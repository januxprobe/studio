
// src/ai/flows/transform-image.ts
'use server';

/**
 * @fileOverview Transforms an image based on a text prompt using Genkit's image generation capabilities.
 * It first replaces the background with a solid orange color, then applies a persona-specific transformation.
 *
 * - transformImage - A function that takes an image data URI and a prompt, then returns a transformed image data URI.
 * - TransformImageInput - The input type for the transformImage function.
 * - TransformImageOutput - The return type for the transformImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransformImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to transform, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('A description of the desired image transformation to be applied to the person in the image.'),
});
export type TransformImageInput = z.infer<typeof TransformImageInputSchema>;

const TransformImageOutputSchema = z.object({
  transformedPhotoDataUri: z
    .string()
    .describe('The transformed photo, as a data URI.'),
});
export type TransformImageOutput = z.infer<typeof TransformImageOutputSchema>;

export async function transformImage(input: TransformImageInput): Promise<TransformImageOutput> {
  return transformImageFlow(input);
}

const transformImageFlow = ai.defineFlow(
  {
    name: 'transformImageFlow',
    inputSchema: TransformImageInputSchema,
    outputSchema: TransformImageOutputSchema,
  },
  async input => {
    const fullPromptText = `Your task is to modify an image in two steps.
Step 1: Background Replacement. Isolate the primary human subject in the foreground. Remove the original background completely. Replace this background with a solid, vibrant orange color (specifically HSL 24 95% 45%). The subject should be clearly distinct from the new background and their original form preserved as much as possible during this step.
Step 2: Subject Transformation. After replacing the background, apply the following transformation specifically to the human subject: "${input.prompt}"`;

    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-exp model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: fullPromptText},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    return {transformedPhotoDataUri: media.url!};
  }
);
