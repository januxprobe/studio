
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
  "Adjust the mouth and jaw to convey a natural expression of determination and resolve. No artificial elements, no structural changes to features.",
  "Enhance the lighting to be heroic and focused, perhaps with a subtle warm glow on the scene. No changes to eye color or appearance.",
  "Add a subtle, worn emblem or patch on clothing if visible (e.g., a simple resistance symbol). Ensure posture conveys quiet inner strength. No facial alterations.",
  "Adjust the facial expression to convey natural confidence and determination, emphasizing human resilience. No structural changes to features, no artificial elements.",
  "Give the hair a slightly wind-swept or practical, action-ready look. Style only, NO color change, NO unnatural highlights.",
  "If possible, add a very subtle, well-worn leather or canvas strap detail on the shoulder or chest. No facial or head alterations.",
  "Adjust skin texture for a defined, human look. May include a hint of natural, non-metallic dirt or minor, natural-looking smudges, like from being outdoors. No tattoos or artificial markings.",
  "Adjust the brow slightly to convey intense focus, combined with an unwavering, resolute mouth. No changes to eye color or structure.",
  "If clothing allows, add a simple, non-electronic, functional detail like a loop or small D-ring on a strap or collar. Avoid any items on the face or head. Purely human appearance.",
  "Ensure the expression conveys quiet confidence and resilience, perhaps through a steady posture. No artificial facial alterations."
];

export const SARAH_CONNOR_PROMPTS: string[] = [
  "Add a tough, worn denim or canvas jacket collar, and set the mouth in a firm line suggesting determination. Purely human expression, no artificial elements.",
  "Add a smudge of natural-looking, non-metallic dirt on one cheek. Adjust the expression to convey strong focus, particularly around the eyes and brow. NO changes to eye color or structure. No tattoos.",
  "Add a simple, sturdy leather belt with a few small, practical pouches attached. No facial alterations.",
  "Style hair in a practical, tied-back ponytail or a slightly messy but functional short cut. Style only, NO color change, NO unnatural highlights.",
  "Add a very subtle, faded, natural-looking scar on the eyebrow or cheekbone, hinting at past resilience. No other facial markings.",
  "Add a simple, dark-colored, functional tank top or a robust, plain t-shirt. No facial alterations.",
  "Give the facial expression a look of fierce determination and unwavering resolve, focused on mouth and brow. Purely human, no artificial enhancements.",
  "Ensure the expression is alert and conveys intelligence, reflecting a survivor's spirit through overall facial composure. No changes to eye color, no facial technology.",
  "Add a well-worn, fingerless leather glove on one hand. No facial or head alterations.",
  "Add a slightly weathered texture to the skin, conveying experience. The expression should show strength through a firm set of the jaw. No metallic elements, no tattoos."
];

export const KYLE_REESE_PROMPTS: string[] = [
  "Add the collar of a worn, dark trench coat or a rugged, well-used field jacket over a plain t-shirt. No facial alterations.",
  "Set the jaw in a determined line, with an overall expression of focused intensity. Purely human, no artificial elements.",
  "Add a simple, worn leather strap across the chest, as if for carrying essential supplies. No facial or head alterations.",
  "Style hair in a slightly unkempt, practical cut, suggesting someone who has endured hardship but remains strong. Style only, NO color change, NO unnatural highlights.",
  "Add a few days' stubble to the jawline and a small, healed, natural-looking nick or cut on the chin or lip. No other facial markings or technology.",
  "Add a practical, well-worn canvas or leather vest over a simple shirt. No facial alterations.",
  "Set the facial expression to grim determination, with lines of focus around the mouth and brow. No artificial enhancements, purely human.",
  "Subtly add faint, natural-looking dark circles under the eyes suggesting weariness but readiness, and an overall intense, focused expression. NO change to eye color or iris. No facial technology.",
  "Add a sturdy, worn leather watch or a simple, functional wrist compass. No items on the face or head.",
  "Give clothing a slightly dusty and well-traveled appearance, and a determined set to the mouth. No artificial facial alterations."
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

