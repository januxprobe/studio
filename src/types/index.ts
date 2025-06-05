
import type { QuestionAnswer as GenkitQuestionAnswer } from '@/ai/flows/generate-questions';
import type { Gender as GenkitGender } from '@/ai/flows/detect-gender';

export type GameState = 'start' | 'webcam' | 'question' | 'summary';

export type Persona = 'Terminator' | 'Connor';

export type DetectedGender = GenkitGender;

// New type for specific character persona
export type SpecificCharacterPersona = 'Terminator' | 'Sarah Connor' | 'Kyle Reese' | 'Connor';

export type Question = GenkitQuestionAnswer & {
  id: string;
  fatalisticPrompt: string;
  // optimisticPrompt is populated with generic Connor prompts initially,
  // but dynamically overridden in handleAnswer for specific gender features.
  optimisticPrompt: string;
};

export type UserAnswerRecord = {
  questionId: string;
  questionText: string;
  selectedAnswerText: string;
  persona: Persona; // The persona choice made by the user ('Terminator' or 'Connor')
  transformationPrompt: string;
  specificCharacterPersona: SpecificCharacterPersona; // The character whose features were actually applied
};
