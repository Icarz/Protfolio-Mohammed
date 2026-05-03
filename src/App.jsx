import { useState, useEffect } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AdminApp from "./components/admin/AdminApp";

const isAdminRoute = () =>
  window.location.hash === "#admin" ||
  window.location.pathname === "/admin";

const App = () => {
  const [page, setPage] = useState(() => (isAdminRoute() ? "admin" : "portfolio"));

  useEffect(() => {
    const handleHash = () => {
      setPage(window.location.hash === "#admin" ? "admin" : "portfolio");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  if (page === "admin") {
    return <AdminApp onExit={() => { window.location.hash = ""; setPage("portfolio"); }} />;
  }

  return (
    <div className="bg-[#020817]" style={{ fontFamily: "var(--font-sans)" }}>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
