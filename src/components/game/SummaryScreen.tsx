'use client';

import React, { useState } from 'react';
import type { UserAnswerRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageDisplay } from './ImageDisplay';
import { isValidProfessionalEmail } from '@/lib/emailValidator';
import { useToast } from '@/hooks/use-toast';
import { Mail, Share2 } from 'lucide-react';

type SummaryScreenProps = {
  finalImage: string | null;
  answers: UserAnswerRecord[];
};

export function SummaryScreen({ finalImage, answers }: SummaryScreenProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isShared, setIsShared] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const validateEmail = (currentEmail: string) => {
    if (!currentEmail) {
      setEmailError('Email is required to share.');
      return false;
    }
    if (!isValidProfessionalEmail(currentEmail)) {
      setEmailError('Please enter a professional email address (e.g., no @gmail.com, @yahoo.com).');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleShare = async () => {
    if (!validateEmail(email)) {
      return;
    }
    // Placeholder for share functionality
    console.log(`Sharing final image and summary for email: ${email}`);
    toast({
      title: "Shared Successfully!",
      description: `Your AI Destiny Mirror results have been noted for ${email}. (Demo share)`,
    });
    setIsShared(true); 
  };

  return (
    <div className="space-y-8 w-full max-w-4xl">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Your AI Destiny Revealed</CardTitle>
          <CardDescription>This is your final transformed image based on your choices.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ImageDisplay imageUrl={finalImage} isLoading={false} altText="Final transformed image" />
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Journey Summary</CardTitle>
          <CardDescription>A look back at your choices and transformations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Question</TableHead>
                <TableHead>Your Choice (Persona)</TableHead>
                <TableHead className="w-[30%]">Transformation Applied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {answers.map((ans) => (
                <TableRow key={ans.questionId}>
                  <TableCell className="font-medium">{ans.questionText}</TableCell>
                  <TableCell>{ans.selectedAnswerText} <span className="text-sm text-muted-foreground">({ans.persona})</span></TableCell>
                  <TableCell className="text-sm italic">{ans.transformationPrompt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Share Your Destiny</CardTitle>
          <CardDescription>Enter your professional email to log your result (no actual sharing implemented in demo).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-start">
            <div className="relative flex-grow w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="email"
                    placeholder="your.name@company.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => validateEmail(email)}
                    className={`pl-10 ${emailError ? 'border-destructive ring-destructive' : ''}`}
                    aria-describedby="email-error"
                    disabled={isShared}
                />
            </div>
            <Button onClick={handleShare} disabled={isShared || !!emailError || !email} className="w-full sm:w-auto">
              <Share2 className="mr-2 h-4 w-4" /> {isShared ? 'Shared!' : 'Share'}
            </Button>
          </div>
          {emailError && <p id="email-error" className="text-sm text-destructive">{emailError}</p>}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                We respect your privacy. This is a demo and your email will not be stored or used beyond this simulated share.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
