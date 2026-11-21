export const profile = {
  name: "Elad Asis",
  role: "Software Developer",
  location: "Givat Shmuel, Israel",
  region: "Center District",
  email: "asiselad12@gmail.com",
  linkedin: "https://www.linkedin.com/in/elad-asis-bb71681a1",
  linkedinLabel: "linkedin.com/in/elad-asis",
  headline: "Full-stack software, with AI in the product.",
  lede: "I build interfaces and services, and I use Python, LangChain, and retrieval-augmented generation when the product needs to look things up and answer from them. The path here runs from the service desk to full-stack product work, and now engineering at SAP.",
};

export const path = [
  { year: "2024", label: "SAP" },
  { year: "2022", label: "Full-stack" },
  { year: "2021", label: "Quality" },
  { year: "2017", label: "Service desk" },
];

export const chapters = [
  {
    org: "SAP",
    role: "Software Developer",
    when: "September 2024 — Present",
    place: "Ra'anana, Israel",
    summary:
      "The current chapter. I build software at SAP, in an engineering organization where products are expected to last and the details matter.",
  },
  {
    org: "Singit",
    role: "Full-stack Developer",
    when: "April 2022 — April 2024",
    place: "Tel Aviv, Israel",
    summary:
      "Two years at Singit, a Tel Aviv company that teaches English through music. The stack I worked in was React, Node.js, and MongoDB, with HTML, CSS, and JavaScript underneath. I finished my computer science degree during this stretch.",
  },
  {
    org: "Ofek 324 Unit, Israeli Air Force",
    role: "Senior QA Engineer",
    when: "December 2021 — April 2022",
    place: "Israel",
    summary:
      "A focused return to the unit, this time on quality. I moved from the service desk into senior QA, testing software before it reached the people who depend on it.",
  },
  {
    org: "Ofek 324 Unit, Israeli Air Force",
    role: "Help Desk Specialist",
    when: "July 2021 — November 2021",
    place: "Israel",
    summary:
      "Back in Ofek on the help desk, supporting the same environment I had learned as a soldier and getting ready for the step into QA.",
  },
  {
    org: "ActiveTrail",
    role: "IT Support Specialist",
    when: "July 2020 — March 2021",
    place: "Tel Aviv District, Israel",
    summary:
      "My first civilian technology role, supporting people and systems at a marketing-software company right after military service.",
  },
  {
    org: "Ofek 324 Unit, Israeli Air Force",
    role: "Help Desk Specialist",
    when: "September 2017 — May 2020",
    place: "Israel",
    summary:
      "Where the career actually starts. I completed a network administration course and worked the Windows help desk in Ofek 324. Alongside that, I was a soldier knowledge manager for the Air Force, running the knowledge base in SharePoint. I also hold a software engineering technician qualification (י״ג).",
  },
];

export const skillGroups = [
  {
    id: "craft",
    kicker: "Where I focus",
    title: "Full-stack and AI",
    tone: "dark" as const,
    intro:
      "The same kind of work: a product people use, and the model layer that can retrieve real context instead of guessing.",
    items: [
      { name: "React", detail: "Interfaces built from components and state." },
      { name: "Node.js", detail: "Application services on the same stack as the UI." },
      { name: "JavaScript", detail: "The language of the products I have shipped." },
      { name: "MongoDB", detail: "Document data behind product features." },
      { name: "HTML & CSS", detail: "Structure and presentation. Still the base." },
      { name: "Python", detail: "The language I use for applied AI work." },
      { name: "LangChain", detail: "Chains, tools, and the glue around a model." },
      {
        name: "Retrieval-Augmented Generation",
        detail: "Answers grounded in sources, not guesses.",
      },
    ],
  },
  {
    id: "foundations",
    kicker: "How I got here",
    title: "Quality & systems",
    tone: "warm" as const,
    intro:
      "Years of being the person who gets the call when something breaks. It still changes how I test, document, and design.",
    items: [
      { name: "Quality engineering", detail: "Senior QA in Ofek 324." },
      { name: "Help desk & IT support", detail: "Air Force service desk, then ActiveTrail." },
      { name: "Windows environments", detail: "Daily operating ground during service." },
      { name: "Network administration", detail: "Formal course, then hands-on support." },
      { name: "SharePoint", detail: "Air Force knowledge management." },
    ],
  },
];

export const schools = [
  {
    school: "Holon Institute of Technology",
    credential: "Bachelor’s degree, Computer Science",
    when: "2020 — 2023",
    note: "Completed while I was already working as a full-stack developer. HIT is where the practical years and the formal computer science finally met.",
  },
  {
    school: "ORT Colleges",
    credential: "Computer Science",
    when: "2013 — 2016",
    note: "The earlier foundation, before service and before the degree. Software engineering technician studies sit on this same path.",
  },
];
