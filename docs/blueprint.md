# **App Name**: AI Destiny Mirror

## Core Features:

- Webcam Capture: Webcam Integration: Capture the user's initial photo using the react-webcam library.
- Dynamic Persona Transformation: AI-Powered Image Transformation: Use generative AI to apply 'Terminator' or 'Connor' effects to the user's photo after each question, driven by the answer they chose. Each transformation relies on reasoning, so it will use a 'tool'.
- Generative AI Questionnaire: Question & Answer Generation: Generate 10 multiple-choice questions and answers about Generative AI strategy using the OpenAI API (gpt-4o model). Fallback to a local list if the API fails.
- Interactive Question Flow: Real-time Feedback: Display questions one at a time and transform the image in real-time after each answer, with clear progress/loading indicators.
- Themed Visual Effects: Persona-Based Visuals: Apply visual effects to the user’s photo reflecting either the 'Terminator' or 'Connor' persona, based on their choices.
- Final Image & Summary: Composite Image & Summary: At the end of the questionnaire, show the final, composite image and a summary table of each question, answer, and applied transformation.
- Shareable Output: Professional Email Verification & Sharing: Require and validate the user's professional email (excluding free domains) before allowing them to share the final result. No download option, just a 'Share' button.

## Style Guidelines:

- Primary color: A determined purple (#7B42F5) evoking strategic power. Derived by associating this AI strategy tool with institutions of state like governments or educational organizations.
- Background color: Light purple (#E5DEFB), very desaturated.
- Accent color: Blue-purple (#4263F5), with higher saturation and lower brightness to contrast with the primary.
- Body and headline font: 'Inter' (sans-serif), providing a modern, objective, and neutral look.
- Use clean, simple icons in a line art style for progress indicators and interactive elements. These should not distract from the images.
- Implement a clear, step-by-step layout with the question at the top, answer choices prominently displayed, and the transformed image taking center stage. Use Tailwind CSS for responsive design.
- Incorporate subtle animations for loading states and transitions between questions, creating a smooth user experience. For example, use a rotating loading icon while the AI processes the image transformations.