'use client';

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

type WebcamCaptureProps = {
  onPhotoCaptured: (imageDataUri: string) => void;
};

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

export function WebcamCapture({ onPhotoCaptured }: WebcamCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirm = () => {
    if (imgSrc) {
      onPhotoCaptured(imgSrc);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">Capture Your Image</CardTitle>
        <CardDescription className="text-center">
          Position yourself in the frame. This image will be transformed based on your answers.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden border border-primary/20 shadow-inner">
          {imgSrc ? (
            <Image src={imgSrc} alt="Captured photo" width={640} height={480} className="object-cover w-full h-full" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
              mirrored={true}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        {imgSrc ? (
          <>
            <Button onClick={retake} variant="outline" className="w-full sm:w-auto">
              <RefreshCcw className="mr-2 h-4 w-4" /> Retake
            </Button>
            <Button onClick={confirm} className="w-full sm:w-auto">
              Confirm & Proceed
            </Button>
          </>
        ) : (
          <Button onClick={capture} size="lg" className="w-full sm:w-auto">
            <Camera className="mr-2 h-5 w-5" /> Take Picture
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
