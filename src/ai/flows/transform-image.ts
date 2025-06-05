
// src/ai/flows/transform-image.ts
'use server';

/**
 * @fileOverview Transforms an image based on a text prompt using Genkit's image generation capabilities.
 * It ensures a consistent orange background and applies persona-specific transformations additively to the subject.
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
      "A photo to transform, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This image may have previous transformations applied."
    ),
  prompt: z.string().describe('A description of the new transformation to be additively applied to the person in the image.'),
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
    const fullPromptText = `You are an expert image editor. Your task is to modify an image that may have already undergone transformations. Each modification should be cumulative.

Step 1: Background Consistency.
The background of the image MUST be a solid, vibrant orange color (specifically HSL 24 95% 45% --- a bright, saturated orange).
- If the current image already has this exact orange background, maintain it.
- If the background is different, replace it with this solid orange color.
When adjusting the background, you MUST meticulously preserve the primary human subject in the foreground, including all their current features and any transformations already applied to them.

Step 2: Additive Subject Transformation.
After ensuring the background is correct, apply the following new transformation *additively* to the human subject. This means the new features should be layered on top of, or integrated with, any existing characteristics or previously applied transformations on the subject.
DO NOT remove, replace, or significantly alter existing features on the subject from prior transformations.
The new transformation to add to the subject is: "${input.prompt}"`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: fullPromptText},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], 
      },
    });

    return {transformedPhotoDataUri: media.url!};
  }
);

