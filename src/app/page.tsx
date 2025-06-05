
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { GameState, Question, UserAnswerRecord, Persona, DetectedGender, SpecificCharacterPersona } from '@/types';
import { generateQuestions, type QuestionAnswer as GenkitQuestionAnswer } from '@/ai/flows/generate-questions';
import { transformImage } from '@/ai/flows/transform-image';
import { detectGender } from '@/ai/flows/detect-gender';
import { FALLBACK_QUESTIONS, TERMINATOR_PROMPTS, CONNOR_PROMPTS, SARAH_CONNOR_PROMPTS, KYLE_REESE_PROMPTS } from '@/lib/questions';

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
  const [userImage, setUserImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [isDetectingGender, setIsDetectingGender] = useState<boolean>(false);
  const [detectedGender, setDetectedGender] = useState<DetectedGender | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const assignPromptsToGeneratedQuestions = (generatedQuestions: GenkitQuestionAnswer[]): Question[] => {
    return generatedQuestions.map((q, index) => ({
      ...q,
      id: `gen-${index + 1}`,
      fatalisticPrompt: TERMINATOR_PROMPTS[index % TERMINATOR_PROMPTS.length],
      optimisticPrompt: CONNOR_PROMPTS[index % CONNOR_PROMPTS.length], // Generic Connor prompt
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
      setQuestions(FALLBACK_QUESTIONS.map(q => ({...q, optimisticPrompt: CONNOR_PROMPTS[FALLBACK_QUESTIONS.indexOf(q) % CONNOR_PROMPTS.length]})));
    } finally {
      setIsLoadingQuestions(false);
    }
  }, [toast]);

  const handleStartGame = () => {
    setGameState('webcam');
  };

  const handlePhotoCaptured = (imageDataUri: string) => {
    setOriginalImage(imageDataUri);
    setUserImage(imageDataUri); 
    setGameState('question');
    loadQuestions();

    const processInitialImageAndDetectGender = async () => {
      if (!imageDataUri) return;
      setIsLoadingImage(true); 
      setIsDetectingGender(true);
      setError(null);
      try {
        const bgTransformPromise = transformImage({
          photoDataUri: imageDataUri,
          prompt: "Make no changes to the subject.", 
        });
        const genderDetectPromise = detectGender({ photoDataUri: imageDataUri });

        const [bgResult, genderResult] = await Promise.all([bgTransformPromise, genderDetectPromise]);
        
        setUserImage(bgResult.transformedPhotoDataUri);

        if (genderResult && genderResult.gender) {
          setDetectedGender(genderResult.gender);
          toast({
            title: "Gender Detected",
            description: `Apparent gender detected: ${genderResult.gender}. 'Connor' transformations will be tailored.`,
          });
        } else {
          setDetectedGender('unknown');
           toast({
            title: "Gender Detection",
            description: "Could not determine gender; using default 'Connor' transformations.",
            variant: "default" 
          });
        }
      } catch (err) {
        console.error('Initial image processing or gender detection failed:', err);
        toast({
          title: "Initial Setup Error",
          description: "Could not apply background or detect gender. Using defaults.",
          variant: "destructive",
        });
        setDetectedGender('unknown'); 
      } finally {
        setIsLoadingImage(false);
        setIsDetectingGender(false);
      }
    };

    processInitialImageAndDetectGender();
  };

  const handleAnswer = async (selectedPersona: Persona) => {
    if (!userImage || questions.length === 0) return;

    setIsLoadingImage(true);
    setError(null);

    const currentQ = questions[currentQuestionIndex];
    let transformationPrompt = '';
    const selectedAnswerText = selectedPersona === 'Terminator' ? currentQ.fatalisticAnswer : currentQ.optimisticAnswer;
    let appliedCharacterPersona: SpecificCharacterPersona;

    if (selectedPersona === 'Terminator') {
      transformationPrompt = currentQ.fatalisticPrompt;
      appliedCharacterPersona = 'Terminator';
    } else { // Connor persona
      const connorPromptsBaseIndex = currentQuestionIndex;
      if (detectedGender === 'female') {
        transformationPrompt = SARAH_CONNOR_PROMPTS[connorPromptsBaseIndex % SARAH_CONNOR_PROMPTS.length];
        appliedCharacterPersona = 'Sarah Connor';
      } else if (detectedGender === 'male') {
        transformationPrompt = KYLE_REESE_PROMPTS[connorPromptsBaseIndex % KYLE_REESE_PROMPTS.length];
        appliedCharacterPersona = 'Kyle Reese';
      } else { // 'unknown' or null
        transformationPrompt = CONNOR_PROMPTS[connorPromptsBaseIndex % CONNOR_PROMPTS.length]; 
        appliedCharacterPersona = 'Connor';
      }
    }
    
    try {
      const result = await transformImage({ photoDataUri: userImage, prompt: transformationPrompt });
      setUserImage(result.transformedPhotoDataUri);
      
      setUserAnswers(prev => [...prev, {
        questionId: currentQ.id,
        questionText: currentQ.question,
        selectedAnswerText: selectedAnswerText,
        persona: selectedPersona,
        transformationPrompt: transformationPrompt,
        specificCharacterPersona: appliedCharacterPersona,
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
      if (currentQuestionIndex === questions.length - 1) {
        setGameState('summary');
      }
    } finally {
      setIsLoadingImage(false);
    }
  };

  const currentQuestionData = questions[currentQuestionIndex];
  const totalLoadingOperations = (isLoadingImage ? 1 : 0) + (isLoadingQuestions ? 1 : 0) + (isDetectingGender ? 1 : 0);

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
                isLoading={(isLoadingImage || isDetectingGender) && gameState === 'question'}
                currentQuestion={currentQuestionIndex}
                totalQuestions={questions.length}
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              {(isLoadingQuestions || (gameState === 'question' && isDetectingGender)) && 
                <div className="flex flex-col items-center justify-center h-64">
                  <LoadingSpinner size={48} />
                  {isLoadingQuestions && <p className="mt-2">Loading questions...</p>}
                  {isDetectingGender && gameState === 'question' && <p className="mt-2">Analyzing features...</p>}
                </div>
              }
              {!isLoadingQuestions && !isDetectingGender && questions.length > 0 && currentQuestionData && gameState === 'question' && (
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
