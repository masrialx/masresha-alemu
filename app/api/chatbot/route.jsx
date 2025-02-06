import { GoogleGenerativeAI } from "@google/generative-ai";

const aboutMasresha = {
    "aboutMe": `I am Masresha Alemu, a software engineer with over 2 years of experience, specializing in full-stack development. My expertise spans a wide array of technologies such as React.js, Next.js, TypeScript, PHP, Django, Flask, Node.js, and Express. I have successfully completed 50+ projects, including advanced AI-driven solutions. I hold a Software Engineering certification from ALX Africa and have completed Machine Learning certification with 10 Africa. My experience includes working remotely with organizations such as Wingy Org in Morocco and Dowashwo Coffee Export Org in Ethiopia. I’ve also gained valuable experience through various freelancing and internship opportunities, including at Kifiya Technology in Ethiopia. Additionally, I specialize in email outreach and AI automation, using tools like Make.com to streamline workflows and enhance marketing strategies.`,

    "skills": `I am proficient in full-stack development, with expertise in React.js, Next.js, TypeScript, PHP, Django, Flask, Node.js, and Express. I also have a strong background in AI-powered solutions, machine learning, and the development of real-time mobile and web applications. My skills extend to email outreach and automation, using tools like HubSpot and Make.com to optimize campaigns and improve business engagement.`,
  
    "experience": `With over 2 years of experience in software development, I have honed my skills in both backend and frontend technologies. I have contributed to a wide range of projects, including AI-powered applications, e-commerce platforms, mobile apps, and machine learning systems. In my role as an Email Outreach Specialist at Coffee Expert Org, I boosted email engagement through automated workflows. My experience includes collaborating with both international organizations like Wingy Org in Morocco and local teams, delivering high-quality solutions across various industries.`,
  
    "notableProjects": [
      "AI-powered Amharic Sign Language Translation mobile app",
      "E-commerce platform for Kangaro Shoes",
      "Delivery mobile app for Morrco Org",
      "Stock Market Prediction System using machine learning",
      "Organizational Profit Prediction using AI models"
    ],
  
    "MERNStackProjects": [
      "University Placement System: A platform to manage student placements and job postings",
      "Blogging Web App: A site enabling users to create, edit, and share posts, with authentication and admin features",
      "Personal Website: A professional website to showcase my resume and portfolio"
    ],
  
    "futureGoals": `Over the next 5-10 years, I aim to evolve into a senior backend developer or machine learning engineer. My long-term objective is to create AI-driven solutions that address real-world challenges, particularly in Africa. I also plan to master email outreach and automation tools like HubSpot and Make.com to optimize marketing strategies and drive business growth.`,
  
    "timeManagement": `I manage my time by breaking tasks into smaller, actionable steps using agile methodology. This helps me prioritize effectively based on deadlines, stay organized, and ensure I meet project goals on time.`,
  
    "internshipAndRemoteWork": `I applied for this internship to gain hands-on experience, refine my technical skills, and contribute to innovative projects. I look forward to collaborating with experienced developers and advancing my career. I have extensive remote work experience, having worked on freelancing projects, internships, and hackathons. My work includes developing websites, contributing to backend systems, optimizing email marketing strategies, and collaborating on real-time software applications with global teams.`

 ,"contact": {
    "portfolio": "https://masri.vercel.app/",
    "GitHub": ["https://github.com/masrialemu", "https://github.com/masrialx"],
    "LeetCode": "https://leetcode.com/u/masrialemu/",
    "CodeForces": "https://codeforces.com/profile/masrialemu",
    "LinkedIn": "https://www.linkedin.com/in/masresha-alemu-851241232",
    "Telegram": "https://t.me/Masri404",
    "Phone": "+251979745762",
    "Email": "masrialemu@gmail.com",
    "Telegram": "https://t.me/Masri404",
  },
  "email outreach skills": {
    "tools": ["HubSpot", "Make.com"],
    "experience": "Experienced in automating email workflows, managing email campaigns, and increasing engagement. I have worked on email outreach projects facing challenges like low deliverability, low response rates, managing large contact lists, and automation issues.",
    "strengths": [
      "Email Outreach & Automation",
      "Lead Generation & CRM Management",
      "Quick Learner",
      "Analytical Thinking",
      "Hard Worker & Detail-Oriented",
      "Strong Communication Skills"
    ],
    "weaknesses": [
      "Perfectionism in refining email templates and workflows"
    ]
  }
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
