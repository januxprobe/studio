import type { QuestionAnswer as GenkitQuestionAnswer } from '@/ai/flows/generate-questions';

export type GameState = 'start' | 'webcam' | 'question' | 'summary';

export type Persona = 'Terminator' | 'Connor';

export type Question = GenkitQuestionAnswer & {
  id: string;
  fatalisticPrompt: string;
  optimisticPrompt: string;
};

export type UserAnswerRecord = {
  questionId: string;
  questionText: string;
  selectedAnswerText: string;
  persona: Persona;
  transformationPrompt: string;
};
