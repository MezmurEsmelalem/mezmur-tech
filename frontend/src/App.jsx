import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Services from "./pages/Services";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToBottom from "./components/ScrollToBottom";
import ProtectedRoute from "./components/ProtectedRoute";

import ProjectsManager from "./admin/ProjectsManager";
import SkillsManager from "./admin/SkillsManager";
import MessagesManager from "./admin/MessagesManager";
import BlogsManager from "./admin/BlogsManager";
import AboutManager from "./admin/AboutManager";
import ServicesManager from "./admin/ServicesManager";

function App() {
  return (

    
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#062b32] overflow-hidden">
        <Navbar />
        <ScrollToBottom />
        <main className="flex-grow pt-16 md:pt-28">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/abouts" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

            <Route path="/admin/projects" element={<ProtectedRoute><ProjectsManager /></ProtectedRoute>} />

            <Route path="/admin/skills" element={<ProtectedRoute><SkillsManager /></ProtectedRoute>} />

            <Route path="/admin/blogs" element={<ProtectedRoute><BlogsManager /></ProtectedRoute>} />

            <Route path="/admin/messages" element={<ProtectedRoute><MessagesManager /></ProtectedRoute>} />

            <Route path="/admin/services" element={<ProtectedRoute><ServicesManager /></ProtectedRoute>} />

            <Route path="/admin/abouts" element={<ProtectedRoute><AboutManager /></ProtectedRoute>} />
          </Routes>
        </main>
        <ScrollToTop/>
        <BackToTop />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;