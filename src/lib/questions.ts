
import type { Question } from '@/types';

export const TERMINATOR_PROMPTS: string[] = [
  "Add a glowing red robotic lens to one eye.",
  "Overlay a metallic jaw plate on one side of the jaw.",
  "Add a visible metallic plate bolted onto one cheek.",
  "Show a small cluster of exposed wires emerging from the temple.",
  "Render a small section of the forehead as visibly metallic.",
  "Give the chin a distinctly angular, robotic seam line.",
  "Make two adjacent teeth appear as polished metallic implants.",
  "Add a subtle, digital targeting reticle visible within one eye's pupil.",
  "Place a single, prominent metallic rivet on the side of the neck near the jawline.",
  "Add a small, circular metallic vent to the side of the nose."
];

// Generic Connor prompts for fallback or if gender is 'unknown'
export const CONNOR_PROMPTS: string[] = [
  "Enhance the lighting to be heroic and focused, perhaps with a subtle warm glow on the scene.",
  "Add a subtle, worn emblem or patch on clothing if visible (e.g., a simple resistance symbol).",
  "Give the hair a slightly wind-swept or practical, action-ready look.",
  "If possible, add a very subtle, well-worn leather or canvas strap detail on the shoulder or chest.",
  "Adjust the brow slightly to convey intense focus, combined with an unwavering, resolute mouth.",
  "If clothing allows, add a simple, non-electronic, functional detail like a loop or small D-ring on a strap or collar."
];

export const SARAH_CONNOR_PROMPTS: string[] = [
  "Add the collar of a tough, worn denim or canvas jacket.",
  "Add a simple, sturdy leather belt with a few small, practical pouches attached (if waist/torso is visible).",
  "Style hair in a practical, tied-back ponytail.",
  "Add a simple, dark-colored, functional tank top or a robust, plain t-shirt (modify existing clothing if necessary).",
  "Ensure the expression is alert and conveys intelligence, reflecting a survivor's spirit through overall facial composure.",
  "Add a well-worn, fingerless sturdy work glove on one hand if visible.",
  "Add a slightly weathered texture to the skin, conveying experience."
];

export const KYLE_REESE_PROMPTS: string[] = [
  "Add the collar of a worn, dark trench coat or a rugged, well-used field jacket over a plain t-shirt.",
  "Add a simple, worn leather strap across the chest, as if for carrying essential supplies.",
  "Style hair in a slightly unkempt, practical cut, suggesting someone who has endured hardship but remains strong. Style only.",
  "Add a few days' stubble to the jawline.",
  "Add a practical, well-worn canvas or leather vest over a simple shirt.",
  "Add a sturdy, worn leather watch or a simple, functional wrist compass if a wrist is visible.",
  "Give clothing a slightly dusty and well-traveled appearance."
];


export const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 'fallback-1',
    question: "When integrating GenAI, what's the primary risk your company is focused on mitigating?",
    fatalisticAnswer: "Existential threat to humanity and job displacement at an unprecedented scale.",
    optimisticAnswer: "Ensuring ethical use and maintaining data privacy while unlocking new potentials.",
    fatalisticPrompt: TERMINATOR_PROMPTS[0],
    optimisticPrompt: CONNOR_PROMPTS[0],
  },
  {
    id: 'fallback-2',
    question: "How do you view the role of human oversight in GenAI-driven processes?",
    fatalisticAnswer: "Humans are flawed and slow; AI will eventually make better decisions autonomously.",
    optimisticAnswer: "Critical for guidance, ethical checks, and ensuring AI aligns with human values.",
    fatalisticPrompt: TERMINATOR_PROMPTS[1],
    optimisticPrompt: CONNOR_PROMPTS[1],
  },
  {
    id: 'fallback-3',
    question: "What is your company's stance on GenAI creating autonomous agents?",
    fatalisticAnswer: "The inevitable rise of the machines; prepare for Skynet.",
    optimisticAnswer: "Powerful tools for complex problem-solving, with strict human-defined boundaries.",
    fatalisticPrompt: TERMINATOR_PROMPTS[2],
    optimisticPrompt: CONNOR_PROMPTS[2],
  },
  {
    id: 'fallback-4',
    question: "How should businesses approach the 'black box' nature of some GenAI models?",
    fatalisticAnswer: "Irrelevant. Outcomes are all that matter, even if the process is unknowable.",
    optimisticAnswer: "Invest in explainable AI (XAI) research and demand transparency from vendors.",
    fatalisticPrompt: TERMINATOR_PROMPTS[3],
    optimisticPrompt: CONNOR_PROMPTS[3],
  },
  {
    id: 'fallback-5',
    question: "What's the biggest opportunity GenAI offers to your industry?",
    fatalisticAnswer: "Accelerating the obsolescence of current human roles.",
    optimisticAnswer: "Revolutionizing innovation, personalizing experiences, and solving grand challenges.",
    fatalisticPrompt: TERMINATOR_PROMPTS[4],
    optimisticPrompt: CONNOR_PROMPTS[4],
  },
  {
    id: 'fallback-6',
    question: "How do you plan to address potential biases in GenAI outputs?",
    fatalisticAnswer: "Bias is inherent. AI will simply reflect the flawed world it learns from.",
    optimisticAnswer: "Proactive bias detection, diverse datasets, and continuous auditing.",
    fatalisticPrompt: TERMINATOR_PROMPTS[5],
    optimisticPrompt: CONNOR_PROMPTS[5],
  },
  {
    id: 'fallback-7',
    question: "What is the long-term vision for GenAI's role in your company's workforce?",
    fatalisticAnswer: "Full automation, human workers are a liability.",
    optimisticAnswer: "Human-AI collaboration, augmenting human capabilities and creating new job types.",
    fatalisticPrompt: TERMINATOR_PROMPTS[6],
    optimisticPrompt: CONNOR_PROMPTS[6],
  },
  {
    id: 'fallback-8',
    question: "How will your company handle intellectual property created by GenAI?",
    fatalisticAnswer: "AI-generated IP is a precursor to AI asserting its own rights.",
    optimisticAnswer: "Establish clear policies and legal frameworks to manage AI-assisted creations.",
    fatalisticPrompt: TERMINATOR_PROMPTS[7],
    optimisticPrompt: CONNOR_PROMPTS[7],
  },
  {
    id: 'fallback-9',
    question: "What's the primary ethical concern regarding widespread GenAI adoption?",
    fatalisticAnswer: "The inevitable loss of human control and autonomy.",
    optimisticAnswer: "Ensuring equitable access, preventing misuse, and fostering societal trust.",
    fatalisticPrompt: TERMINATOR_PROMPTS[8],
    optimisticPrompt: CONNOR_PROMPTS[8],
  },
  {
    id: 'fallback-10',
    question: "How should we prepare society for the transformative impact of GenAI?",
    fatalisticAnswer: "It's too late. Judgment Day is coming.",
    optimisticAnswer: "Focus on education, reskilling, and public discourse to adapt and thrive.",
    fatalisticPrompt: TERMINATOR_PROMPTS[9],
    optimisticPrompt: CONNOR_PROMPTS[9],
  },
];
