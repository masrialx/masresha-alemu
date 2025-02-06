// pages/pages.tsx
import Header from './(auth)/page/header'
import Aboutme from './(auth)/page/aboutme'
import Slide from './(auth)/page/slide'
import Skill from './(auth)/page/skill'
import Contact from './(auth)/page/contact'
import Connection from './(auth)/page/connection'
import Footer from './(auth)/page/footer'
import Chatbot from './(auth)/page/chatbot'
import Login from './(auth)/login/page'
import Project from './(auth)/page/projects'
import Education from './(auth)/page/education'
import Pagination from './(auth)/page/pagination'
const Pages = () => {
  return (
    <div>
      <Header />
      <main>
      <Aboutme/>
      <Contact/>
      <Slide/>
      <Skill/>
      <Chatbot/>
      <Project/>
      <Pagination/>
      <Education/>
      <Connection/>
      <Footer/>
      </main>
    </div>
  );
};

export default Pages;
