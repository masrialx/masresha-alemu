import { GoogleGenerativeAI } from "@google/generative-ai";

const aboutMasresha = {
  "about me": "I'm Masresha Alemu, a software engineer with over 2 years of experience. I specialize in full-stack development, focusing on technologies like React.js, Next.js, TypeScript, PHP, Django, Flask, Node.js, and Express. I've participated in several projects, both remotely and onsite, including freelancing, internships, and hackathons.",
  "skills": "I am skilled in full-stack development using React.js, Next.js, TypeScript, PHP, Django, Flask, Node.js, and Express. I have also worked with machine learning, AI-powered solutions, and real-time mobile and web applications.",
  "experience": "I have over 2 years of experience in software development, with a focus on both backend and frontend technologies. I have worked on various projects including AI-powered applications, e-commerce platforms, mobile apps, and machine learning systems.",
  "projects": "Some of my notable projects include:\n- AI Power Amharic Sign Language Translation mobile app\n- Shoes e-commerce platform for Kangaro Shoes\n- Delivery mobile app for Morrco Org\n- Stock Market Prediction System using machine learning\n- Organizational Profit Prediction using AI models",
  "MERN projects": "Some of my MERN stack projects include:\n- University Placement System: A platform to manage student placements and job postings\n- Blogging Web App: A site where users can write, edit, and share posts with authentication and admin features\n- Personal Website: A website to showcase my resume and portfolio, with user-friendly features",
  "goal": "In the next 5-10 years, my goal is to become a senior backend developer or machine learning engineer. I aim to develop AI-powered solutions that solve real-world problems, particularly in Africa, and support local communities.",
  "time management": "I handle time management by breaking tasks into smaller steps using agile methodology, setting priorities based on deadlines. This helps me stay organized and ensures I meet project goals on time.",
  "internship": "I applied for this internship to gain real-world experience, improve my skills, and work on meaningful projects. I am excited to collaborate with experienced developers and continue growing in my career.",
  "remote work": "Yes, I have worked remotely on freelancing projects, internships, and hackathons. I've developed websites, contributed to backend systems, and collaborated with teams from various parts of the world."
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

    // Ensure the question is about Masresha Alemu
    const keywords = ["Masresha", "Alemu", "his", "he", "Masresha Alemu"];
    const isRelevant = keywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()));

    if (!isRelevant) {
      return new Response(JSON.stringify({ message: "I can only assist with questions about Masresha Alemu." }), { status: 200 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2-flash" });

    // Use your self-description as context
    const prompt = `You are an assistant answering questions based on the following information about Masresha Alemu:\n\n${JSON.stringify(aboutMasresha, null, 2)}\n\nUser's question: ${message}\n\nRespond concisely, limiting your response to 100 words.`;

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
