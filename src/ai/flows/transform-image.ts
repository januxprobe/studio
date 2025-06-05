
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
    const fullPromptText = `You are an expert image editor. Your task is to modify an image that ALREADY HAS transformations applied to the person and background. Each new modification MUST be cumulative and preserve prior work.

1.  **Background Management**:
    *   The background of the image MUST be a solid, vibrant orange color (specifically HSL 24 95% 45%).
    *   If the current image already has this exact orange background, PERFECTLY MAINTAIN IT without any changes.
    *   If the background is different, replace it with this solid orange color. During this background replacement, the human subject in the foreground, including ALL their current features (e.g., hair, eyes, clothing, any existing cybernetics, accessories, scars, makeup, etc., from previous transformations), MUST remain COMPLETELY UNALTERED and perfectly preserved.

2.  **Strictly Additive Subject Modification**:
    *   The human subject in the input image has existing features and prior transformations. These existing features and transformations form the BASE of the subject and MUST NOT BE REMOVED, REPLACED, ERASED, or DIMINISHED in any way.
    *   Your task is to ADD the new feature described in the "New Transformation to Add" section below. This new feature must be layered ON TOP OF or ALONGSIDE the subject's *current, existing* state.
    *   Imagine you are adding a new, distinct layer in an image editing program. The layers below (representing the subject's existing state from the input image) must remain fully visible and unchanged, except where the new layer additively covers a small part or sits next to them.
    *   **New Transformation to Add**: "${input.prompt}"

    CRITICAL GUIDANCE:
    *   DO NOT "re-interpret" or "re-draw" existing subject features. Preserve them meticulously and only add the new element.
    *   Example: If the subject in the input image already has a robotic eye and a scar, and the "New Transformation to Add" is "add a small tattoo on the neck", the final image must still show the original robotic eye and the original scar exactly as they were, plus the new tattoo on the neck.
    *   If the "New Transformation to Add" itself implies a replacement (e.g., "change hair color to blue" when hair is currently red, or "add futuristic goggles" when the subject already has glasses), perform the replacement as minimally as possible for that specific feature, while still preserving all other unrelated existing features. However, if the prompt is ambiguous (e.g., "add cybernetic enhancement to arm" when arm already has some), prefer adding new distinct elements alongside or layered on existing ones if feasible. The primary goal is CUMULATIVE addition of new, distinct elements.
`;

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

