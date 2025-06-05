
import type { Question } from '@/types';

export const TERMINATOR_PROMPTS: string[] = [
  "Add a glowing red robotic eye to the face.",
  "Overlay a metallic jaw structure onto the lower face.",
  "Integrate metallic plates onto the skin, suggesting an endoskeleton.",
  "Show exposed circuits and wires on one side of the cheek or temple.",
  "Render a section of the skull as visibly metallic and cybernetic.",
  "Give one cheek a metallic, bolted-on appearance.",
  "Transform the chin into a more angular, robotic component.",
  "Reveal metallic teeth or a metallic dental structure.",
  "Add a targeting reticle overlay in one eye.",
  "Create a battle-damaged look with cracked metallic parts."
];

// Generic Connor prompts for fallback or if gender is 'unknown'
export const CONNOR_PROMPTS: string[] = [
  "Add a sleek, futuristic tactical headset over one ear.",
  "Enhance the lighting to be heroic and focused, perhaps with a slight lens flare.",
  "Place a subtle, glowing blue or green insignia or badge on the clothing if visible, otherwise a faint aura of competence.",
  "Subtly enhance facial features to convey a confident, determined expression.",
  "Overlay a faint, translucent digital HUD element near one eye, showing abstract data.",
  "If possible, add a subtle, holographic shimmer around the person, suggesting advanced tech.",
  "Clean and sharpen the skin texture for a polished, heroic look.",
  "Add a translucent blue or green visor over the eyes, as if part of a helmet.",
  "Place a dark green or blue tactical strap across the chest or shoulder if appropriate for the framing.",
  "Add a subtle glow to the eyes, suggesting focus and enhanced perception."
];

export const SARAH_CONNOR_PROMPTS: string[] = [
  "Add a sleek, tactical sleeveless vest and determined, focused eyes.",
  "Give a resilient, survivor look with a confident expression and artfully styled, slightly tousled hair.",
  "Overlay futuristic, glowing blue utility straps or a tech-enhanced bandolier visible on the shoulder or chest.",
  "Style hair in a practical but cool updo or braid, looking resolute and ready for action.",
  "Add subtle cybernetic enhancements like glowing circuit patterns on one arm or a sophisticated neural interface at the temple.",
  "Equip with a stylish, dark, high-tech armored top and a determined, no-nonsense demeanor.",
  "Add a small, intricate, glowing blue tech-tattoo or emblem on the cheek or neck, symbolizing resistance.",
  "Give the eyes a bright, intelligent, and unwavering gaze, perhaps with a subtle data-stream reflection.",
  "Place a sleek, augmented reality visor or advanced comms earpiece.",
  "Enhance skin with a subtle, healthy glow, a determined set to the jawline, and an aura of quiet strength."
];

export const KYLE_REESE_PROMPTS: string[] = [
  "Add a stylish, worn leather jacket or a modern tactical trench coat collar over practical, dark clothing.",
  "Give a sharp, vigilant, and resourceful look in the eyes, with an expression of focused readiness.",
  "Overlay a high-tech, minimalist bandolier or a chest rig with glowing blue energy cells.",
  "Style hair in a neat, short, tactical cut, looking sharp and ready for anything.",
  "Add a very subtle, clean cybernetic line or a small metallic stud near the temple, hinting at advanced tech integration.",
  "Convey a lean, athletic build through posture and add a futuristic, lightweight body armor vest.",
  "A facial expression of calm confidence, sharp alertness, and underlying determination.",
  "Add sleek, high-tech tactical gloves with glowing accents if hands are visible.",
  "Place a compact, advanced plasma pistol or a futuristic multi-tool visibly on a hip or thigh holster.",
  "Give a clean-shaven, sharp look with a confident, determined expression and an energetic aura."
];


export const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 'fallback-1',
    question: "When integrating GenAI, what's the primary risk your company is focused on mitigating?",
    fatalisticAnswer: "Existential threat to humanity and job displacement at an unprecedented scale.",
    optimisticAnswer: "Ensuring ethical use and maintaining data privacy while unlocking new potentials.",
    fatalisticPrompt: TERMINATOR_PROMPTS[0],
    optimisticPrompt: CONNOR_PROMPTS[0], // Generic Connor prompt for fallback
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

