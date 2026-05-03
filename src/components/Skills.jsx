import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { getTechColor } from "../data/portfolioData";

const Skills = () => {
  const { data } = usePortfolio();
  const { skills } = data;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Skills component no longer uses hardcoded education — read from data
  const education = data.skills.education ?? [
    {
      year: "2022 – 2023",
      title: "Certification in Development",
      institution: "ARK X Talents Factory",
      description:
        "Bootcamp based on learning-by-doing in the MERN stack, plus 6 months of training on real-world projects.",
    },
    {
      year: "2023 – 2025",
      title: "Certification in Software Engineering",
      institution: "African Leadership Academy",
      description:
        "Intensive 18-month program: 6 months of soft skills, 12 months of technical skills covering DevOps, backend, and frontend development.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="line-grid py-28 bg-[#020817] relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/6 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-blue-400 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Expertise
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Skills & Education
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — Education */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3
              className="text-xl font-bold text-white mb-8 flex items-center gap-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-8 h-0.5 bg-blue-500 inline-block" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.year}
                  className="group relative pl-6 border-l border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-blue-500 bg-[#020817] group-hover:bg-blue-500 transition-colors duration-300" />
                  <p
                    className="text-blue-400 text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {edu.year}
                  </p>
                  <h4
                    className="text-white font-bold mb-1 group-hover:text-blue-300 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {edu.title}
                  </h4>
                  <p className="text-blue-400/80 text-sm mb-2">{edu.institution}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Skills */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Skill bars */}
            <h3
              className="text-xl font-bold text-white mb-8 flex items-center gap-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-8 h-0.5 bg-cyan-500 inline-block" />
              Proficiency
            </h3>
            <div className="space-y-5 mb-10">
              {skills.proficiency.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                    <span
                      className="text-blue-400 text-xs"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out"
                      style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <h3
              className="text-xl font-bold text-white mb-5 flex items-center gap-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-8 h-0.5 bg-cyan-500 inline-block" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getTechColor(tech)} transition-all duration-200 hover:scale-105`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
