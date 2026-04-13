import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="dot-grid min-h-screen flex items-center pt-20 relative overflow-hidden bg-[#020817]"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className="text-sm text-blue-300 tracking-widest uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Available for work
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Full Stack
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Developer
                </span>
              </h1>
              <p
                className="text-slate-400 text-sm tracking-widest uppercase mt-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Mohammed Rerhaye
              </p>
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Building clean, responsive, and user-friendly web applications.
              Specializing in the MERN stack — from pixel-perfect UIs to
              scalable backend APIs.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-lg transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 px-7 py-3.5 rounded-lg transition-all duration-300 font-semibold hover:bg-white/5"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get in Touch
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {[
                { href: "https://github.com/Icarz", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/mohammed-rerhaye-356197125/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:mr.rghay@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-11 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — photo */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-2xl scale-110" />
              <div className="relative border-2 border-white/10 rounded-full p-1.5 bg-white/5 backdrop-blur-sm">
                <img
                  src="/profile.jpg"
                  alt="Mohammed Rerhaye — Full Stack Developer"
                  width={480}
                  height={480}
                  className="w-full rounded-full object-cover shadow-2xl"
                />
              </div>

              {/* Floating stat cards */}
              <div
                className="absolute -bottom-4 -left-6 bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 shadow-xl"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <p className="text-xs text-slate-500 mb-0.5">Experience</p>
                <p className="text-white font-semibold text-sm">3+ Years</p>
              </div>
              <div
                className="absolute -top-4 -right-6 bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 shadow-xl"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <p className="text-xs text-slate-500 mb-0.5">Projects</p>
                <p className="text-white font-semibold text-sm">10+ Built</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
