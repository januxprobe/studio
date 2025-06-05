import type { Question, Persona } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type QuestionDisplayProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (persona: Persona) => void;
  isLoading: boolean;
};

export function QuestionDisplay({ question, questionNumber, totalQuestions, onAnswer, isLoading }: QuestionDisplayProps) {
  const progressValue = ((questionNumber + 1) / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl sm:text-2xl font-headline">Question {questionNumber + 1}</CardTitle>
          <span className="text-sm text-muted-foreground">{questionNumber + 1} of {totalQuestions}</span>
        </div>
        <Progress value={progressValue} className="w-full h-2" />
        <CardDescription className="pt-4 text-base sm:text-lg text-foreground">
          {question.question}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => onAnswer('Terminator')}
          disabled={isLoading}
          className="w-full py-6 text-left justify-start h-auto border border-primary/30"
          variant="default"
        >
          {question.fatalisticAnswer}
        </Button>
        <Button
          onClick={() => onAnswer('Connor')}
          disabled={isLoading}
          className="w-full py-6 text-left justify-start h-auto border border-primary/30"
          variant="default"
        >
         {question.optimisticAnswer}
        </Button>
      </CardContent>
      {isLoading && (
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">Processing your choice...</p>
        </CardFooter>
      )}
    </Card>
  );
}
