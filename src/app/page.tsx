
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { GameState, Question, UserAnswerRecord, Persona } from '@/types';
import { generateQuestions, type QuestionAnswer as GenkitQuestionAnswer } from '@/ai/flows/generate-questions';
import { transformImage } from '@/ai/flows/transform-image';
import { FALLBACK_QUESTIONS, TERMINATOR_PROMPTS, CONNOR_PROMPTS } from '@/lib/questions';

import { StartScreen } from '@/components/game/StartScreen';
import { WebcamCapture } from '@/components/game/WebcamCapture';
import { QuestionDisplay } from '@/components/game/QuestionDisplay';
import { ImageDisplay } from '@/components/game/ImageDisplay';
import { SummaryScreen } from '@/components/game/SummaryScreen';
import { LoadingSpinner } from '@/components/game/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AIDestinyMirrorPage() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [userImage, setUserImage] = useState<string | null>(null); // Stores the latest transformed image
  const [originalImage, setOriginalImage] = useState<string | null>(null); // Stores the initial webcam capture
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const assignPromptsToGeneratedQuestions = (generatedQuestions: GenkitQuestionAnswer[]): Question[] => {
    return generatedQuestions.map((q, index) => ({
      ...q,
      id: `gen-${index + 1}`,
      fatalisticPrompt: TERMINATOR_PROMPTS[index % TERMINATOR_PROMPTS.length],
      optimisticPrompt: CONNOR_PROMPTS[index % CONNOR_PROMPTS.length],
    }));
  };

  const loadQuestions = useCallback(async () => {
    setIsLoadingQuestions(true);
    setError(null);
    try {
      const genkitQuestions = await generateQuestions();
      if (genkitQuestions && genkitQuestions.length > 0) {
        setQuestions(assignPromptsToGeneratedQuestions(genkitQuestions));
      } else {
        throw new Error("AI failed to generate questions.");
      }
    } catch (err) {
      console.error('Failed to load questions from AI, using fallback:', err);
      toast({
        title: "AI Connection Issue",
        description: "Could not fetch questions from AI. Using fallback questions.",
        variant: "destructive",
      });
      setQuestions(FALLBACK_QUESTIONS);
    } finally {
      setIsLoadingQuestions(false);
    }
  }, [toast]);

  const handleStartGame = () => {
    setGameState('webcam');
  };

  const handlePhotoCaptured = (imageDataUri: string) => {
    setOriginalImage(imageDataUri);
    setUserImage(imageDataUri); // Show raw image first
    setGameState('question');
    loadQuestions();

    // Apply initial background transformation
    const applyInitialBackgroundTransformation = async () => {
      if (!imageDataUri) return;
      setIsLoadingImage(true);
      setError(null);
      try {
        const result = await transformImage({
          photoDataUri: imageDataUri,
          prompt: "Make no changes to the subject.", // This prompt tells Step 2 of transformImage to not alter the subject
        });
        setUserImage(result.transformedPhotoDataUri);
      } catch (err) {
        console.error('Initial background transformation failed:', err);
        // If it fails, userImage remains the original imageDataUri, which is fine.
        toast({
          title: "Background Effect Failed",
          description: "Could not apply the orange background. Continuing with original image.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingImage(false);
      }
    };

    applyInitialBackgroundTransformation();
  };

  const handleAnswer = async (selectedPersona: Persona) => {
    if (!userImage || questions.length === 0) return;

    setIsLoadingImage(true);
    setError(null);

    const currentQ = questions[currentQuestionIndex];
    const prompt = selectedPersona === 'Terminator' ? currentQ.fatalisticPrompt : currentQ.optimisticPrompt;
    const selectedAnswerText = selectedPersona === 'Terminator' ? currentQ.fatalisticAnswer : currentQ.optimisticAnswer;

    try {
      // userImage here might be the original or the one with orange background already
      const result = await transformImage({ photoDataUri: userImage, prompt });
      setUserImage(result.transformedPhotoDataUri);
      
      setUserAnswers(prev => [...prev, {
        questionId: currentQ.id,
        questionText: currentQ.question,
        selectedAnswerText: selectedAnswerText,
        persona: selectedPersona,
        transformationPrompt: prompt,
      }]);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('summary');
      }
    } catch (err) {
      console.error('Failed to transform image:', err);
      setError('Image transformation failed. Please try again or refresh.');
      toast({
        title: "Image Transformation Error",
        description: "Could not transform the image. Your progress up to this question is saved. You can try answering again or check summary if this was the last question.",
        variant: "destructive",
      });
      // If it's the last question and transformation fails, still go to summary
      if (currentQuestionIndex === questions.length - 1) {
        setGameState('summary');
      }
    } finally {
      setIsLoadingImage(false);
    }
  };

  const currentQuestionData = questions[currentQuestionIndex];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background to-orange-200 font-body">
      <div className="container mx-auto flex flex-col items-center justify-center w-full">
        {error && (
          <Alert variant="destructive" className="mb-8 max-w-xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {gameState === 'start' && <StartScreen onStart={handleStartGame} />}
        
        {gameState === 'webcam' && <WebcamCapture onPhotoCaptured={handlePhotoCaptured} />}

        {(gameState === 'question' || (gameState === 'summary' && isLoadingImage)) && (
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <ImageDisplay 
                imageUrl={userImage} 
                isLoading={isLoadingImage && gameState === 'question'} // only show spinner over image during question phase
                currentQuestion={currentQuestionIndex}
                totalQuestions={questions.length}
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              {isLoadingQuestions && <div className="flex flex-col items-center justify-center h-64"><LoadingSpinner size={48} /><p className="mt-2">Loading questions...</p></div>}
              {!isLoadingQuestions && questions.length > 0 && currentQuestionData && gameState === 'question' && (
                <QuestionDisplay
                  question={currentQuestionData}
                  questionNumber={currentQuestionIndex}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                  isLoading={isLoadingImage}
                />
              )}
            </div>
          </div>
        )}
        
        {gameState === 'summary' && !isLoadingImage && (
          <SummaryScreen finalImage={userImage} answers={userAnswers} />
        )}
      </div>
    </main>
  );
}
