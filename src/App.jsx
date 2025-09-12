import { useState, useEffect } from 'react';
import Loader from './components/loader'; // Import Loader component
import Navbar from './components/navbar'; // Import Navbar component
import Hero from './components/hero';     // Import Hero component
import Footer from './components/footer'; // Import Footer component
import Uvp from './components/uvp'; // Import Uvp component
import Features from './components/features'; // Import Features component
import Reviews from './components/testimonials';
import Cta from './components/cta';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="app-container">
            <main className="main-content">
              <Navbar /> {/* Navbar */}
              <Hero /> {/* Hero section */}
              <Uvp /> {/* UVP section */}
              <Features /> {/* Features section */}
              <Reviews /> {/* Testimonials section */}
              <Cta /> {/* Call to Action section */}
            </main>
            <Footer /> {/* Footer outside main-content */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
