import { GoogleGenerativeAI } from "@google/generative-ai";

const aboutMasresha = {
  aboutMe: `I am Masresha Alemu, a software engineer with over 3 years of experience in full-stack and mobile app development. My expertise includes Python, JavaScript, SQL, Flask, Django, Node.js (Express), React Native, Next.js, TensorFlow, and OpenCV. I hold a Bachelor of Science in Computer Science from Unity University (2021-2025) and certifications in Software Engineering, Back-End Development, Machine Learning, and Foundation Leadership. I’ve worked remotely with Meta AI, Agents4Hire, Nilesync, Sapiens AI, and Wingy Organization, delivering AI-driven solutions, scalable web apps, and e-commerce platforms.`,

  skills: `Proficient in Python, JavaScript, SQL, Flask, Django, Node.js (Express), React Native, Next.js, TensorFlow, and OpenCV. Experienced in cybersecurity (ethical hacking, data integrity), DevOps (database optimization, performance tuning), and automation (n8n, Make.com). Skilled in data scraping (Scrapy, Selenium, BeautifulSoup, Puppeteer) and email outreach (HubSpot, Instantly, Zapmail). I excel in developing real-time mobile/web apps and integrating machine learning models for AI-driven solutions.`,

  experience: `With 3+ years in software engineering, I’ve built AI-driven applications, e-commerce platforms, and mobile apps. At Meta AI (2025), I annotated Amharic OCR data for ML models. At Agents4Hire (2025), I integrated ML models into back-end systems. At Nilesync (2024-2025), I developed scalable web apps using Next.js and FastAPI. At Sapiens AI (2024-2025), I built an AI interview assistant with Microsoft Teams integration. At Wingy Organization, I developed a React Native e-commerce delivery app, optimizing UI/UX and backend APIs.`,

  notableProjects: [
    "AI-powered Amharic Sign Language Translation mobile app",
    "E-commerce platform for Kangaro Shoes",
    "Delivery mobile app for Wingy Organization",
    "Stock Market Prediction System using machine learning",
    "Organizational Profit Prediction using AI models",
    "AI-driven Vulnerability Scanner",
    "AI-powered chatbot for customer support",
    "Solar Radiation Analysis using machine learning",
    "AI-powered Credit Scoring Model",
    "Insurance Risk Prediction using AI",
    "AI-driven SQL Injection Identifier",
    "AI-based DDoS Attack Prevention System",
    "AI Interview Assistant with Microsoft Teams integration",
    "Amharic OCR Annotation for Meta AI"
  ],

  MERNStackProjects: [
    "University Placement System: Manages student placements and job postings",
    "Blogging Web App: Enables users to create, edit, and share posts with authentication",
    "Personal Website: Showcases my resume and portfolio"
  ],

  futureGoals: `In 5-10 years, I aim to become a senior backend developer or machine learning engineer, focusing on AI-driven solutions for African challenges. I plan to master automation tools like n8n and Make.com to enhance workflows and marketing strategies, driving business growth through innovative technology.`,

  timeManagement: `I use agile methodology to break tasks into actionable steps, prioritizing based on deadlines. This ensures efficient organization, timely project delivery, and adaptability to changing requirements while maintaining high-quality outputs.`,

  contact: {
    GitHub: ["https://github.com/masrialx"],
    LinkedIn: "https://linkedin.com/in/masresha-alemu-851241232",
    Phone: "+251979742762",
    Email: "masrialemu@gmail.com",
    Portfolio: "https://masresha-alemu.netlify.app"
  },

  strengths: [
    "Lead Generation & CRM Management",
    "Quick Learner",
    "Analytical Thinking",
    "Hard Worker & Detail-Oriented",
    "Strong Communication Skills"
  ],

  weaknesses: [
    "Perfectionism in refining email templates and workflows"
  ],

  solution: `To address perfectionism, I set time limits for refining email templates, use A/B testing for data-driven improvements, and prioritize efficiency while maintaining quality. This balances perfection with timely delivery.`,

  emailOutreachSkills: {
    tools: ["HubSpot", "Instantly", "Zapmail", "Make.com"],
    experience: "Skilled in automating email workflows, managing campaigns, and boosting engagement. I’ve tackled challenges like low deliverability, response rates, and large contact lists, optimizing outreach for business growth."
  },

  projects: [
    {
      projectName: "Machine Learning Back-End Integration at Agents4Hire",
      aboutProject: "Integrated ML models into back-end systems for AI-driven task automation, optimizing data pipelines with Flask and Node.js."
    },
    {
      projectName: "Full Stack Development at Nilesync",
      aboutProject: "Built scalable web apps for Nilesync (Poland) using Next.js, FastAPI, and Express, optimizing database and API performance."
    },
    {
      projectName: "AI Interview Assistant at Sapiens AI",
      aboutProject: "Developed an AI-powered interview tool with NLP, integrated with Microsoft Teams using TypeScript and ML."
    },
    {
      projectName: "Amharic OCR Annotation at Meta AI",
      aboutProject: "Annotated Amharic text for ML model training, ensuring data accuracy using SRT HALO tool."
    },
    {
      projectName: "E-commerce Delivery App at Wingy Organization",
      aboutProject: "Built a React Native mobile app for e-commerce delivery, optimizing UI/UX and backend API integration."
    }
  ]
};

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
    }

    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON input" }), { status: 400 });
    }

    const { message } = requestBody;
    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an assistant answering questions based on the following information about Masresha Alemu:\n\n${JSON.stringify(aboutMasresha, null, 2)}\n\nUser's question (assuming they are asking about Masresha Alemu): ${message}\n\nRespond concisely, always including relevant details about Masresha Alemu, and limit your response to 100 words.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 200 }
    });

    const text = result.response.text();
    return new Response(JSON.stringify({ message: text }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong!" }), { status: 500 });
  }
}