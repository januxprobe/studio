
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" opacity="0.6"/>
                <path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="currentColor"/>
            </svg>
        </div>
        <CardTitle className="text-3xl font-headline">AI Destiny Mirror</CardTitle>
        <div className="flex justify-center my-4">
          <Image
            src="/assets/terminator.jpg"
            alt="The Terminator"
            width={400}
            height={300}
            className="rounded-lg"
            data-ai-hint="terminator movie"
          />
        </div>
        <CardDescription className="text-lg">
          Discover your Generative AI persona. Answer 10 questions and see your image transform.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 pt-6">
        <p className="text-center text-muted-foreground">
          Your choices will shape your digital reflection. Are you a pragmatic Connor or a resolute Terminator?
        </p>
        <Button onClick={onStart} size="lg" className="w-full font-semibold">
          Start Your Destiny
        </Button>
      </CardContent>
    </Card>
  );
}
