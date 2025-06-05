
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
// These can retain a slightly more tech-neutral or adaptable feel
export const CONNOR_PROMPTS: string[] = [
  "Add a determined glint to the eyes and a slightly more resolute expression.",
  "Enhance the lighting to be heroic and focused, perhaps with a subtle warm glow.",
  "Place a subtle, worn emblem or patch on clothing if visible (e.g., a simple resistance symbol), otherwise a faint aura of inner strength.",
  "Subtly enhance facial features to convey a confident, determined expression, emphasizing human resilience.",
  "Give the hair a slightly wind-swept or practical, action-ready look.",
  "If possible, add a very subtle, well-worn leather or canvas strap detail on the shoulder or chest.",
  "Clean and sharpen the skin texture for a defined, yet human look, perhaps with a hint of grit.",
  "Add a look of intense focus or unwavering resolve to the eyes.",
  "Place a simple, functional piece of gear like a well-used communications earpiece (not overly futuristic).",
  "Add a subtle glow of determination or hope in the eyes."
];

export const SARAH_CONNOR_PROMPTS: string[] = [
  "Add a tough, worn denim or canvas jacket collar, and a determined, unwavering gaze.",
  "Give a resilient, survivor look with a smudge of dirt on the cheek and focused, intense eyes.",
  "Overlay a simple, practical bandolier strap or a sturdy belt with pouches, suggesting resourcefulness.",
  "Style hair in a practical ponytail or a slightly messy but functional cut, conveying readiness for action.",
  "Add a minor, faded scar on the eyebrow or cheek, hinting at past struggles overcome.",
  "Equip with a simple, dark, functional tank top or t-shirt, emphasizing a strong, human physique.",
  "A facial expression of fierce determination and a protective maternal instinct.",
  "Give the eyes a bright, intelligent, and hardened look, reflecting a survivor's spirit.",
  "Place a simple, well-worn tactical glove on one hand if visible, or a wrap around the forearm.",
  "Enhance skin with a realistic, slightly weathered texture, a strong jawline, and an aura of unyielding strength."
];

export const KYLE_REESE_PROMPTS: string[] = [
  "Add a worn, dark trench coat collar or a simple, rugged jacket over a plain t-shirt.",
  "Give a haunted but resolute look in the eyes, with an expression of weary determination.",
  "Overlay a simple, improvised strap for carrying gear, made of canvas or leather.",
  "Style hair in a slightly unkempt, practical manner, as if having endured hardship.",
  "Add a few days' stubble or a very subtle, healed cut on the lip, showing a tough journey.",
  "Convey a lean, wiry build, with clothing that is functional but shows signs of wear.",
  "A facial expression of grim determination, alertness, and a protective nature.",
  "Add a look of intense focus and readiness in the eyes, perhaps with dark circles suggesting lack of sleep.",
  "Place a simple, well-used (but not futuristic) sidearm visibly holstered, or a combat knife sheathed.",
  "Give a slightly dirty or battle-worn appearance to clothing and skin, emphasizing survival against odds."
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
