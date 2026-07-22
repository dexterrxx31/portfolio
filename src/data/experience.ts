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
    role: "Software Development Engineer — 1",
    period: "Aug 2023 — Present",
    current: true,
    highlights: [
      "Develop and maintain RESTful API endpoints with shared OpenAPI/AsyncAPI schemas and a centralized error-handling decorator for system stability.",
      "Led development of two high-priority features — an enhanced content registration workflow and a content purging system — delivering both ahead of schedule.",
      "Built a new playlist management feature for channels in a legacy Java Spring application using WebSocket APIs.",
      "Improved performance with versioned APIs and raised quality via schema validation and Mabl-based end-to-end automation.",
    ],
    tech: [
      "AWS Lambda",
      "S3",
      "EC2",
      "DynamoDB",
      "Step Functions",
      "MariaDB",
      "Spring",
      "WebSockets",
      "OpenAPI",
      "AsyncAPI",
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
  {
    company: "JSS-Quanta",
    role: "Embedded & Web Developer — official ECE society",
    period: "Oct 2019 — Jul 2023",
    highlights: [
      "Conducted 5 workshops and 3 orientation programs, engaging 600+ students in IoT and machine learning.",
      "Built the society's official website and technical projects with Arduino, NodeMCU, RFID and IoT systems.",
    ],
    tech: ["JavaScript", "Python", "Arduino", "NodeMCU", "IoT"],
  },
];

export const education = {
  school: "JSS Academy of Technical Education, Noida",
  degree: "B.Tech in Electronics & Communication Engineering",
  period: "2019 — 2023",
  score: "8.17 CGPA",
};
