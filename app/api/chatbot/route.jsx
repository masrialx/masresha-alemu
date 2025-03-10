import { GoogleGenerativeAI } from "@google/generative-ai";

const aboutMasresha = {
  aboutMe: `I am Masresha Alemu, a software engineer with over 2 years of experience, specializing in full-stack development. My expertise spans a wide array of technologies such as React.js, Next.js, TypeScript, PHP, Django, Flask, Node.js, and Express. I have successfully completed 20+ projects, including advanced AI-driven solutions. I hold a Software Engineering certification from ALX Africa and have completed a Machine Learning certification with 10 Africa. My experience includes working remotely with organizations such as Wingy Org in Morocco and Dowashwo Coffee Export Org in Ethiopia. Additionally, I specialize in email outreach and AI automation, using tools like Make.com to streamline workflows and enhance marketing strategies.`,

  skills: `I am proficient in full-stack development, with expertise in React.js, Next.js, TypeScript, PHP, Django, Flask, Node.js, and Express. I also have a strong background in AI-powered solutions, machine learning, and the development of real-time mobile and web applications. My skills extend to email outreach and automation, using tools like HubSpot and Make.com to optimize campaigns and improve business engagement.`,

  experience: `With over 2 years of experience in software development, I have honed my skills in both backend and frontend technologies. I have contributed to a wide range of projects, including AI-powered applications, e-commerce platforms, mobile apps, and machine learning systems. In my role as an Email Outreach Specialist at Coffee Expert Org, I boosted email engagement through automated workflows. My experience includes collaborating with both international organizations like Wingy Org in Morocco and local teams, delivering high-quality solutions across various industries.`,

  notableProjects: [
    "AI-powered Amharic Sign Language Translation mobile app",
    "E-commerce platform for Kangaro Shoes",
    "Delivery mobile app for Morrco Org",
    "Stock Market Prediction System using machine learning",
    "Organizational Profit Prediction using AI models",
    "AI-driven Vulnerability Scanner",
    "AI-powered chatbot for customer support",
    "Solar Radiation Analysis using machine learning",
    "AI-powered Credit Scoring Model",
    "Insurance Risk Prediction using AI",
    "AI-driven SQL Injection Identifier",
    "AI-based DDoS Attack Prevention System"
  ],

  MERNStackProjects: [
    "University Placement System: A platform to manage student placements and job postings",
    "Blogging Web App: A site enabling users to create, edit, and share posts, with authentication and admin features",
    "Personal Website: A professional website to showcase my resume and portfolio"
  ],

  futureGoals: `Over the next 5-10 years, I aim to evolve into a senior backend developer or machine learning engineer. My long-term objective is to create AI-driven solutions that address real-world challenges, particularly in Africa. I also plan to master email outreach and automation tools like HubSpot and Make.com to optimize marketing strategies and drive business growth.`,

  timeManagement: `I manage my time by breaking tasks into smaller, actionable steps using agile methodology. This helps me prioritize effectively based on deadlines, stay organized, and ensure I meet project goals on time.`,

  contact: {
    GitHub: ["https://github.com/masrialemu", "https://github.com/masrialx"],
    LeetCode: "https://leetcode.com/u/masrialemu/",
    CodeForces: "https://codeforces.com/profile/masrialemu",
    LinkedIn: "https://www.linkedin.com/in/masresha-alemu-851241232",
    Telegram: "https://t.me/Masri404",
    Phone: "+251979745762",
    Email: "masrialemu@gmail.com"
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
  solution: `To overcome my perfectionism, I set strict time limits for refining email templates and workflows, conduct A/B testing to validate effectiveness, and prioritize data-driven improvements over subjective perfectionism. This allows me to balance quality with efficiency while still maintaining high standards.`,
  emailOutreachSkills: {
    tools: ["HubSpot", "Make.com"],
    experience: "Experienced in automating email workflows, managing email campaigns, and increasing engagement. I have worked on email outreach projects facing challenges like low deliverability, low response rates, managing large contact lists, and automation issues.",
   

  },

  projects: [
    {
      projectName: "Machine Learning Back-End Integration at Addis Financial",
      aboutProject: "Integrating machine learning into back-end systems for Addis Financial (USA), enhancing AI-driven financial solutions with Flask and Node.js.",
    
    },
    {
      projectName: "Full Stack Development at Nilesync",
      aboutProject: "Building scalable web apps for Nilesync (Poland) using React.js, Next.js, and Express, managing both front-end and back-end development.",
   
    },
    {
      projectName: "AI Interview Project with Microsoft Teams Employers",
      aboutProject: "Developing an AI-powered interview tool with a Kenya-based partner, integrating Microsoft Teams using TypeScript and machine learning.",
     
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Use your self-description as context
    const prompt = `You are an assistant answering questions based on the following information about Masresha Alemu:\n\n${JSON.stringify(aboutMasresha, null, 2)}\n\nUser's question (assuming they are asking about Masresha Alemu): ${message}\n\nRespond concisely, always including relevant details about Masresha Alemu, and limit your response to 100 words.`;

    const result = await model.generateContent({ 
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 200 } // Approx. 200 words
    });

    // Extract response
    const text = result.response.text();

    return new Response(JSON.stringify({ message: text }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong!" }), { status: 500 });
  }
}
