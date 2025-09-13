import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // import Routes and Route
import Loader from "./components/loader/loader"; // import your Loader component
import Navbar from "./components/landingPage/navbar"; // import your Navbar component
import Hero from "./components/landingPage/hero"; // import your Hero component
import Footer from "./components/landingPage/footer"; // import your Footer component
import Uvp from "./components/landingPage/uvp"; // import your Uvp component
import Features from "./components/landingPage/features"; // import your Features component
import Reviews from "./components/landingPage/testimonials"; // import your Reviews component
import Cta from "./components/landingPage/cta"; // import your Cta component
import Login from "./pages/form/login"; // import your login page
import Signup from "./pages/form/signup"; // import your signup page
import Home from "./pages/user/home"; // import your Home page
import Notifications from "./pages/user/notifications"; // import your Notifications page
import Search from "./pages/user/search"; // import your Search page
import Create from "./pages/user/create"; // import your Create page
import Profile from "./pages/user/profile"; // import your Profile page
import DM from "./pages/user/dm"; // import your DM page
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="App">
      <Routes>
        {/* ✅ Main landing page route */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <main className="main-content">
                <Navbar />
                <Hero />
                <Uvp />
                <Features />
                <Reviews />
                <Cta />
              </main>
              <Footer />
            </div>
          }
        />

        {/* page route */}
        <Route path="/home" element={<Home />} />
        <Route path="/dm" element={<DM />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/home" element={<Home />} />
        <Route path="/App" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
