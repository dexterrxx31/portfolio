export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Cloud & AWS",
    skills: [
      "Lambda",
      "S3",
      "EC2",
      "SNS",
      "SQS",
      "DynamoDB",
      "Step Functions",
      "API Gateway",
      "CloudFormation",
      "CloudWatch",
      "Boto3",
    ],
  },
  {
    title: "Frameworks",
    skills: ["Spring Boot", "Next.js", "React", "FastAPI", "Django", "Express"],
  },
  {
    title: "Tools & Practices",
    skills: [
      "Agentic AI",
      "REST APIs",
      "WebSockets",
      "OpenAPI / AsyncAPI",
      "MariaDB",
      "Mabl E2E",
      "Linux",
      "Git",
      "Microservices",
    ],
  },
];
