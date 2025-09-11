import { useState, useEffect } from 'react';
import Loader from './components/loader'; // Import Loader component
import Navbar from './components/navbar'; // Import Navbar component
import Hero from './components/hero';     // Import Hero component
import Footer from './components/footer'; // Import Footer component
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  // Show loader for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />  // Show loader/logo for 3 seconds
      ) : (
        <>
          <Navbar /> {/* Show Navbar after loading */}
          <Hero />   {/* Hero section below navbar */}
          <Footer /> {/* Footer */}
        </>
      )}
    </div>
  );
}

export default App;
