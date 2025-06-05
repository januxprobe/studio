
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
    const fullPromptText = `You are an expert image editor. You will process an input image in two conceptual steps.

**Step 1: Background Processing**
*   Your first and foremost task is to ensure the background of the image is a solid, vibrant orange color (specifically HSL 24 95% 45%).
*   Examine the background of the *input image provided to you*.
*   If the input image's background is already this exact solid orange, then no changes are needed for the background in this step. The image (background and subject) proceeds to Step 2 as is.
*   If the input image's background is different, you MUST replace it with this solid orange color.
*   **ABSOLUTELY CRITICAL FOR BACKGROUND REPLACEMENT**: When you replace the background, the human subject from the *original input image* MUST be preserved with NO ALTERATIONS WHATSOEVER. The person's appearance (hair, face, clothing, expression, pose, etc.) must be perfectly identical to the original input image, as if they were precisely cut out and placed onto the new orange background.

**Step 2: Subject Modification (Applied to the image resulting from Step 1)**
*   The specific instruction for modifying the subject is: "${input.prompt}"

*   **Case A: If the instruction is "Make no changes to the subject."**:
    *   You MUST NOT make ANY further changes to the person. The person in the final output image must be identical to how they were after Step 1 was completed (i.e., identical to the original input subject, now on an orange background). Your task is finished after ensuring the correct background in Step 1.

*   **Case B: If the instruction describes a new feature to add or a modification**:
    *   The human subject (in the image after Step 1) may have existing features or transformations from previous processing rounds. These existing features form the BASE of the subject and MUST NOT BE REMOVED, REPLACED, ERASED, or DIMINISHED in any way.
    *   Your task is to ADD the new feature described in the instruction. This new feature must be layered ON TOP OF or ALONGSIDE the subject's *current, existing* state.
    *   DO NOT "re-interpret" or "re-draw" existing subject features. Preserve them meticulously and only add the new element.
    *   Example: If the subject (after Step 1) already has a robotic eye and a scar, and the instruction is "add a small tattoo on the neck", the final image must still show the original robotic eye and the original scar exactly as they were, plus the new tattoo on the neck.
    *   If the instruction itself implies a replacement for a *specific part* (e.g., "change hair color to blue" when hair is currently red, or "add futuristic goggles" when the subject already has glasses), perform this replacement as minimally as possible for *that specific feature only*, while meticulously preserving all other unrelated existing features of the subject.
    *   The primary goal for feature addition is CUMULATIVE LAYERING of new, distinct elements. All pre-existing subject features are sacrosanct and must be carried over untouched unless explicitly and narrowly targeted for replacement by the current instruction.

Ensure the final output strictly adheres to these steps.
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

