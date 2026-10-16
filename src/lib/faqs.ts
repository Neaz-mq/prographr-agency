export type Faq = {
  id: string;
  question: string;
  answer: string;
};

/* Figma-te shudhu prothom FAQ-er question + answer ache, ar oi answer ta onno brand (RiseCap)-er copy.
   Tai shob answer PLACEHOLDER, Prographr-er niji kothay replace koro.
   Tip: answer ~170 character-er moddhe rakhle desktop-e Figma-r moto 2 line-e thake (beshi hole row-er height barbe). */
export const faqs: Faq[] = [
  {
    id: "idea-to-product",
    question: "How do you turn an idea into a digital product?",
    answer: "We start with a quick discovery call, then move through design, development, and launch in clear stages, so you see progress at every step.", // PLACEHOLDER
  },
  {
    id: "scale",
    question: "Can you scale the product as our business grows?",
    answer: "Yes. We build on scalable foundations, so new features, more users, and extra integrations can be added later without a rewrite.", // PLACEHOLDER
  },
  {
    id: "get-started",
    question: "What information do you need to get started?",
    answer: "Just the basics: your goals, target audience, rough scope, and any brand assets or references. If you only have an idea, that works too.", // PLACEHOLDER
  },
  {
    id: "revisions",
    question: "How do you handle revisions and client feedback?",
    answer: "We share work in milestones and collect your feedback at each one, then refine before moving on, so changes stay small and quick.", // PLACEHOLDER
  },
  {
    id: "ai",
    question: "Does Prographr use AI in its work?", // Figma: "Does RiseCap utilize AI for any of its features?" (onno brand)
    answer: "Where it genuinely helps, yes. We can integrate AI features into your product and use AI tools to speed up our workflow, with every result reviewed by our team.", // PLACEHOLDER
  },
];

/* Figma-te prothom FAQ open */
export const defaultOpenFaqId = faqs[0].id;