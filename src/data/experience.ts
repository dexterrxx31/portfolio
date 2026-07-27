export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Evertz Microsystems",
    role: "Software Development Engineer — 2",
    period: "Oct 2025 — Present",
    current: true,
    highlights: [
      "Built a new WebSocket API on Mediator — Evertz's Java-based media playout product — to insert items from a bin list and put a show on air in real time.",
      "Added Mabl-based end-to-end automation tests and technical documentation for the new insertion-to-air workflow.",
      "Leading the migration of the legacy Mediator system to a Kubernetes-based architecture.",
    ],
    tech: ["Java", "Spring Boot", "WebSockets", "Kubernetes", "Mabl", "Linux"],
  },
  {
    company: "Evertz Microsystems",
    role: "Software Development Engineer — 1",
    period: "Aug 2023 — Sept 2025",
    highlights: [
      "Built a new asset-registration API powering a broadcast content workflow in evertz.io (Python + Boto3), with shared OpenAPI/AsyncAPI schemas and centralized error handling.",
      "Added a bulk asset-deletion feature with granular control — remove only the degenerate (derived) renditions, or the original S3 media alongside them.",
      "Added EPG (Electronic Program Guide) support for channel shows plus EPG export functionality in evertz.io.",
      "Set up CI/CD deployment pipelines using GitHub Actions.",
      "Drove UI test automation for the Java/Spring Mediator system in Mabl — custom XPath rules, agentic-AI element matching and JS assertion scripts — covering ~250 screens, then onboarded the team to Mabl and Mediator.",
    ],
    tech: [
      "Python",
      "Boto3",
      "AWS Lambda",
      "S3",
      "DynamoDB",
      "Step Functions",
      "GitHub Actions",
      "Mabl",
      "OpenAPI/AsyncAPI",
    ],
  },
  {
    company: "Evertz Microsystems",
    role: "Student Software Development Engineer",
    period: "Feb 2023 — Aug 2023",
    highlights: [
      "Developed API endpoints to retrieve media metadata and manage associated tags, improving data accessibility.",
      "Contributed features and bug fixes to key backend microservices — Content Service, Tag Service, Metadata Extraction.",
      "Worked extensively with serverless AWS services in a microservices architecture.",
    ],
    tech: ["AWS Lambda", "S3", "DynamoDB", "CloudWatch", "REST APIs", "Linux"],
  },
];

export interface Activity {
  org: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const activities: Activity[] = [
  {
    org: "JSS-Quanta",
    role: "Embedded & Web Developer",
    period: "Oct 2019 — Jul 2023",
    description:
      "As Embedded & Web Developer for JSS-Quanta — the official ECE society of my college — I led hands-on technical outreach and built the tools the club ran on. I ran 5 workshops and 3 orientation programs that engaged 600+ students in IoT and machine learning, mentored juniors, and developed the society's official website plus embedded projects using Arduino, NodeMCU, RFID and IoT systems.",
    tech: ["JavaScript", "Python", "Arduino", "NodeMCU", "RFID", "IoT"],
  },
];

export const education = {
  school: "JSS Academy of Technical Education, Noida",
  degree: "B.Tech in Electronics & Communication Engineering",
  period: "2019 — 2023",
  score: "8.17 CGPA",
};
