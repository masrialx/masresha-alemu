import Header from "./(auth)/page/header";
import Aboutme from "./(auth)/page/aboutme";
import Slide from "./(auth)/page/slide";
import Skill from "./(auth)/page/skill";
import Contact from "./(auth)/page/contact";
import Connection from "./(auth)/page/connection";
import Footer from "./(auth)/page/footer";
import Chatbot from "./(auth)/page/chatbot";
import Project from "./(auth)/page/projects";
import Education from "./(auth)/page/education";
import Edu from "./(auth)/page/edu";
import Recommendations from "./(auth)/page/recommendations";

const Pages = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Header />
      <main>
        <Aboutme />
        <Slide />
        <Skill />
        <Contact />
        <Project />
        <Education />
        <Edu />
        <Recommendations />
        <Connection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Pages;
