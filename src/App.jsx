import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/loader";
import Navbar from "./components/landingPage/navbar";
import Hero from "./components/landingPage/hero";
import Footer from "./components/landingPage/footer";
import Uvp from "./components/landingPage/uvp";
import Features from "./components/landingPage/features";
import Reviews from "./components/landingPage/testimonials";
import Cta from "./components/landingPage/cta";
import Login from "./pages/form/login";
import Signup from "./pages/form/signup";
import Home from "./pages/user/home";
import Notifications from "./pages/user/notifications";
import Search from "./pages/user/search";
import Create from "./pages/user/create";
import Profile from "./pages/user/profile";
import DM from "./pages/user/dm";
import "./App.css";

// ✅ Import AuthProvider
import { AuthProvider } from "./context/authContext.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    // ✅ Wrap everything in AuthProvider
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Main landing page */}
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

          {/* User pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/dm" element={<DM />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
