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
      "DynamoDB",
      "API Gateway",
      "CloudWatch",
      "Step Functions",
      "Boto3",
    ],
  },
  {
    title: "Frameworks",
    skills: ["Spring", "FastAPI", "Django", "React", "Express"],
  },
  {
    title: "Tools & Practices",
    skills: [
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
