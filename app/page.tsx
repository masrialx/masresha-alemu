// pages/pages.tsx
import Header from './page/header';
import Aboutme from './page/aboutme'
import Slide from './page/slide'
import Skill from './page/skill'
import Contact from './page/contact'
import Connection from './page/connection'
import Footer from './page/footer'
import Chatbot from './page/chatbot'
import Login from './page/login'

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
      <Connection/>
      <Footer/>
      </main>
    </div>
  );
};

export default Pages;
