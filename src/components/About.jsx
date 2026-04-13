import { MapPin, Mail, Code2, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
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

  const infoCards = [
    { icon: Code2, label: "Role", value: "Full Stack Developer" },
    { icon: MapPin, label: "Location", value: "Casablanca, Morocco" },
    { icon: Briefcase, label: "Experience", value: "3+ Years" },
    { icon: Mail, label: "Email", value: "mr.rghay@gmail.com", href: "mailto:mr.rghay@gmail.com" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="diagonal-stripe py-28 bg-[#030E1F] relative overflow-hidden"
    >
      {/* Ambient glows — different from hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — photo (different treatment from Hero) */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative max-w-md mx-auto">
              {/* Offset frame */}
              <div className="absolute inset-0 rounded-2xl border border-blue-500/20 translate-x-4 translate-y-4" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/profile.jpg"
                  alt="Mohammed Rerhaye"
                  width={480}
                  height={560}
                  className="w-full object-cover aspect-[4/5] grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030E1F]/60 via-transparent to-transparent" />
              </div>

              {/* Accent corner decoration */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg" />
            </div>
          </div>

          {/* Right — content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Section label */}
            <div>
              <p
                className="text-blue-400 text-sm tracking-widest uppercase mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                About Me
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Passionate about
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  building for the web
                </span>
              </h2>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
              Frontend-focused full-stack developer with expertise in JavaScript,
              React, and Node.js. Transitioning from a background in industrial
              automation, I bring strong problem-solving, project management, and
              client communication skills to every project I take on.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Experienced in building and scaling responsive applications,
              integrating REST APIs, and delivering real-world products through
              professional roles and intensive bootcamps in the MERN stack.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              {infoCards.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="bg-white/3 border border-white/8 rounded-xl p-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                    <span
                      className="text-xs text-slate-500 uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {label}
                    </span>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-slate-200 group-hover:text-blue-300 transition-colors font-medium"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-200 font-medium">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
