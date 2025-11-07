'use server';
/**
 * @fileOverview A dynamic feedback AI agent based on the confidence score.
 *
 * - generateFeedback - A function that generates dynamic text feedback based on the AI confidence score of an image.
 * - GenerateFeedbackInput - The input type for the generateFeedback function.
 * - GenerateFeedbackOutput - The return type for the generateFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFeedbackInputSchema = z.object({
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score (0.0-1.0) of the AI detection.'),
});
export type GenerateFeedbackInput = z.infer<typeof GenerateFeedbackInputSchema>;

const GenerateFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The dynamic text feedback based on the confidence score.'),
});
export type GenerateFeedbackOutput = z.infer<typeof GenerateFeedbackOutputSchema>;

export async function generateFeedback(input: GenerateFeedbackInput): Promise<GenerateFeedbackOutput> {
  return generateFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFeedbackPrompt',
  input: {schema: GenerateFeedbackInputSchema},
  output: {schema: GenerateFeedbackOutputSchema},
  prompt: `You are an AI assistant that provides dynamic text feedback based on the confidence score of an AI detection.

  Given the confidence score: {{confidence}},
  generate a short, concise feedback message indicating whether the image is likely AI-generated or likely real.
  The feedback should be engaging and user-friendly.

  Examples:
  - For confidence scores close to 0: "Likely a real photograph."
  - For confidence scores around 0.5: "Uncertain, further analysis may be needed."
  - For confidence scores close to 1: "Likely AI-generated."
  `,
});

const generateFeedbackFlow = ai.defineFlow(
  {
    name: 'generateFeedbackFlow',
    inputSchema: GenerateFeedbackInputSchema,
    outputSchema: GenerateFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
