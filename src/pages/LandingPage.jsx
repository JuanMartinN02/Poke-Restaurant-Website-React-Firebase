import '../assets/styles/LandingPage.css';
import Header from '../components/Header';
import Banner from '../components/Banner';
import MenuSection from '../components/MenuSection';
import BuildYourPoke from '../components/BuildYourPoke';
import ContactSection from '../components/contactSection';
import Comments from '../components/comments';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className='bodyLanding'>
      <Header />
        <Header />
        <Banner />
        <MenuSection />
        <BuildYourPoke />
        <ContactSection />
        <Comments />
        <Footer />
      </div>
      );
}

export default LandingPage;