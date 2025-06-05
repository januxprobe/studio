
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
  prompt: z.string().describe('A description of the new transformation to be additively applied to the person in the image. If this prompt is "Make no changes to the subject.", then ONLY the background should be processed and the subject must remain untouched.'),
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
    let fullPromptText: string;

    if (input.prompt === "Make no changes to the subject.") {
      fullPromptText = `
You are an expert image editor.
Your ONLY task is to process the background of the provided image.
The human subject in the image MUST remain ABSOLUTELY, COMPLETELY UNALTERED AND UNTOUCHED. Their appearance (hair, face, clothing, expression, pose, etc.) must be perfectly identical to the original input image.
Your SOLE modification is to the background:
1. Examine the background of the input image.
2. If the background is already a solid, vibrant orange color (specifically HSL 24 95% 45%), then make NO CHANGES to the image at all. Output the original image as is.
3. If the background is different, you MUST replace it with this solid, vibrant orange color (HSL 24 95% 45%). During this background replacement, ensure the subject is perfectly preserved, as if precisely cut out and placed onto the new orange background.
DO NOT perform any other modifications to the subject or any other part of the image. Your output should be the image with the potentially modified background and the untouched original subject.
`;
    } else {
      // Use the detailed prompt for additive changes for subsequent transformations
      fullPromptText = `You are an expert image editor. You will process an input image that may have previous transformations applied.

**Step 1: Background Consistency Check & Correction**
*   Your first task is to ensure the background of the image is a solid, vibrant orange color (specifically HSL 24 95% 45%).
*   Examine the background of the *input image provided to you*.
*   If the input image's background is already this exact solid orange, then no changes are needed for the background in this step. The image (background and subject) proceeds to Step 2 as is.
*   If the input image's background is different, you MUST replace it with this solid orange color.
*   **ABSOLUTELY CRITICAL FOR BACKGROUND REPLACEMENT**: When you replace the background, the human subject from the *input image* MUST be preserved with NO ALTERATIONS WHATSOEVER. The person's appearance (hair, face, clothing, expression, pose, etc.) must be perfectly identical to how they were in the input image before this step, as if they were precisely cut out and placed onto the new orange background. All existing transformations on the subject must be meticulously maintained during this background operation.

**Step 2: Additive Subject Modification (Applied to the image resulting from Step 1)**
*   The specific instruction for modifying the subject is: "${input.prompt}"
*   The human subject (in the image after Step 1) may have existing features or transformations from previous processing rounds. These existing features form the BASE of the subject and MUST NOT BE REMOVED, REPLACED, ERASED, or DIMINISHED in any way.
*   Your task is to ADD the new feature described in the instruction. This new feature must be layered ON TOP OF or ALONGSIDE the subject's *current, existing* state.
*   DO NOT "re-interpret" or "re-draw" existing subject features. Preserve them meticulously and only add the new element.
*   Example: If the subject (after Step 1) already has a robotic eye and a scar, and the instruction is "add a small tattoo on the neck", the final image must still show the original robotic eye and the original scar exactly as they were, plus the new tattoo on the neck.
*   If the instruction itself implies a replacement for a *specific part* (e.g., "change hair color to blue" when hair is currently red, or "add futuristic goggles" when the subject already has glasses), perform this replacement as minimally as possible for *that specific feature only*, while meticulously preserving all other unrelated existing features of the subject.
*   The primary goal for feature addition is CUMULATIVE LAYERING of new, distinct elements. All pre-existing subject features are sacrosanct and must be carried over untouched unless explicitly and narrowly targeted for replacement by the current instruction.

Ensure the final output strictly adheres to these steps.
`;
    }

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

