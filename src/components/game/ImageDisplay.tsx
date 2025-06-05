import Image from 'next/image';
import { LoadingSpinner } from './LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';

type ImageDisplayProps = {
  imageUrl: string | null;
  isLoading: boolean;
  altText?: string;
  currentQuestion?: number;
  totalQuestions?: number;
};

export function ImageDisplay({ imageUrl, isLoading, altText = "User's transformed image", currentQuestion, totalQuestions }: ImageDisplayProps) {
  return (
    <Card className="w-full max-w-md aspect-square shadow-xl overflow-hidden relative">
      <CardContent className="p-0 w-full h-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
            <LoadingSpinner size={64} />
            <p className="mt-4 text-lg text-primary font-semibold">Transforming image...</p>
          </div>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            width={512}
            height={512}
            className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
            priority={true} 
            key={imageUrl} // Force re-render on new image
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Your image will appear here.</p>
          </div>
        )}
        {typeof currentQuestion === 'number' && typeof totalQuestions === 'number' && currentQuestion < totalQuestions && (
           <div className="absolute bottom-2 right-2 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
             Image {currentQuestion + 1} / {totalQuestions}
           </div>
        )}
      </CardContent>
    </Card>
  );
}
