import type { PortfolioData } from "../types/portfolio";

function makePlaceholderImage(
  color1: string,
  color2: string,
  w = 400,
  h = 280,
): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.7);
}

export function getSampleData(): PortfolioData {
  return {
    profile: {
      name: "Alex Rivera",
      title: "Full Stack Developer & Designer",
      bio: "I build beautiful, performant web applications with a focus on user experience. Passionate about clean code, modern design, and solving complex problems.",
      location: "San Francisco, CA",
      email: "alex@example.com",
      website: "https://alexrivera.dev",
      github: "https://github.com/alexrivera",
      linkedin: "https://linkedin.com/in/alexrivera",
      twitter: "https://twitter.com/alexrivera",
      profileImageUrl: "",
    },
    settings: {
      theme: "aether-light",
      fontPair: "inter-poppins",
      portfolioTitle: "Alex Rivera — Portfolio",
    },
    sections: [
      {
        id: "s-hero",
        type: "hero",
        title: "Hero",
        isVisible: true,
        order: 0,
        items: [],
      },
      {
        id: "s-about",
        type: "about",
        title: "About Me",
        isVisible: true,
        order: 1,
        items: [],
        content:
          "I'm a full-stack developer with 6 years of experience building products used by millions. I specialize in React, Node.js, and cloud architecture.\n\nWhen I'm not coding, I enjoy hiking, photography, and contributing to open-source projects. I believe great software is both functional and beautiful.",
      },
      {
        id: "s-projects",
        type: "projects",
        title: "Projects",
        isVisible: true,
        order: 2,
        items: [
          {
            id: "p1",
            title: "E-Commerce Platform",
            subtitle: "Full-stack web app",
            description:
              "A high-performance e-commerce platform handling 50k+ daily transactions with real-time inventory management.",
            imageUrl: makePlaceholderImage("#667EEA", "#764BA2"),
            tags: ["React", "Node.js", "PostgreSQL", "Redis"],
            url: "https://github.com",
          },
          {
            id: "p2",
            title: "AI Analytics Dashboard",
            subtitle: "Data visualization tool",
            description:
              "Real-time analytics dashboard with ML-powered insights, interactive charts, and customizable reports.",
            imageUrl: makePlaceholderImage("#F093FB", "#F5576C"),
            tags: ["TypeScript", "D3.js", "Python", "TensorFlow"],
            url: "https://github.com",
          },
          {
            id: "p3",
            title: "Mobile Banking App",
            subtitle: "React Native application",
            description:
              "Secure mobile banking app with biometric authentication, instant transfers, and spending analytics.",
            imageUrl: makePlaceholderImage("#4FACFE", "#00F2FE"),
            tags: ["React Native", "TypeScript", "Node.js"],
            url: "https://github.com",
          },
        ],
      },
      {
        id: "s-certificates",
        type: "certificates",
        title: "Certificates",
        isVisible: true,
        order: 3,
        items: [
          {
            id: "c1",
            title: "AWS Solutions Architect",
            issuer: "Amazon Web Services",
            subtitle: "Professional Level",
            description:
              "Validates expertise in designing distributed systems on AWS.",
            imageUrl: makePlaceholderImage("#FF9A9E", "#FAD0C4", 600, 420),
            startDate: "2023-06",
            url: "https://aws.amazon.com/certification",
          },
          {
            id: "c2",
            title: "Google Cloud Professional",
            issuer: "Google",
            subtitle: "Cloud Engineer",
            description:
              "Demonstrated ability to deploy applications and monitor operations on Google Cloud.",
            imageUrl: makePlaceholderImage("#A18CD1", "#FBC2EB", 600, 420),
            startDate: "2023-09",
            url: "https://cloud.google.com/certification",
          },
        ],
      },
      {
        id: "s-education",
        type: "education",
        title: "Education",
        isVisible: true,
        order: 4,
        items: [
          {
            id: "e1",
            title: "B.S. Computer Science",
            subtitle: "Stanford University",
            description:
              "Specialization in Human-Computer Interaction and Distributed Systems. GPA: 3.9",
            startDate: "2014",
            endDate: "2018",
          },
          {
            id: "e2",
            title: "Full Stack Bootcamp",
            subtitle: "App Academy",
            description:
              "Intensive 1000-hour program covering modern web development stack.",
            startDate: "2018",
            endDate: "2019",
          },
        ],
      },
      {
        id: "s-skills",
        type: "skills",
        title: "Skills",
        isVisible: true,
        order: 5,
        items: [
          {
            id: "sk1",
            title: "React / Next.js",
            subtitle: "Frontend",
            level: 5,
          },
          { id: "sk2", title: "TypeScript", subtitle: "Frontend", level: 5 },
          {
            id: "sk3",
            title: "Node.js / Express",
            subtitle: "Backend",
            level: 4,
          },
          { id: "sk4", title: "PostgreSQL", subtitle: "Backend", level: 4 },
          { id: "sk5", title: "Python", subtitle: "Backend", level: 3 },
          { id: "sk6", title: "AWS / GCP", subtitle: "DevOps", level: 4 },
          {
            id: "sk7",
            title: "Docker / Kubernetes",
            subtitle: "DevOps",
            level: 3,
          },
          {
            id: "sk8",
            title: "Figma / UI Design",
            subtitle: "Design",
            level: 4,
          },
        ],
      },
      {
        id: "s-gallery",
        type: "gallery",
        title: "Gallery",
        isVisible: true,
        order: 6,
        items: [
          {
            id: "g1",
            title: "Conference Talk",
            imageUrl: makePlaceholderImage("#FDDB92", "#D1FDFF"),
          },
          {
            id: "g2",
            title: "Hackathon Win",
            imageUrl: makePlaceholderImage("#96FBC4", "#F9F586"),
          },
          {
            id: "g3",
            title: "Team Offsite",
            imageUrl: makePlaceholderImage("#F6D365", "#FDA085"),
          },
          {
            id: "g4",
            title: "Workshop",
            imageUrl: makePlaceholderImage("#89F7FE", "#66A6FF"),
          },
        ],
      },
      {
        id: "s-contact",
        type: "contact",
        title: "Contact",
        isVisible: true,
        order: 7,
        items: [],
        content:
          "Let's work together! I'm always open to discussing new projects, creative ideas, or opportunities.",
      },
    ],
  };
}
