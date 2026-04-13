import { useEffect, useRef, useState } from "react";

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [lineHeight, setLineHeight] = useState(0);
  const itemRefs = useRef([]);
  const sectionRef = useRef(null);

  const experiences = [
    {
      company: "Qualiziom",
      position: "Frontend Developer",
      period: "December 2024 – June 2025",
      location: "Casablanca, Morocco",
      description:
        "Maintained and improved a web application, implementing UI updates based on user stories and product requirements.",
      achievements: [
        "Refactored component architecture to improve reusability",
        "Delivered UI updates aligned to user stories and sprint goals",
      ],
      skills: ["React", "JavaScript", "SQL", "CSS"],
    },
    {
      company: "Sand Technologies",
      position: "Full Stack Developer",
      period: "June 2024 – October 2024",
      location: "Casablanca, Morocco",
      description:
        "Collaborated on building an MVP application and responsive web platform from the ground up.",
      achievements: [
        "Built a responsive cross-platform app with FlutterFlow",
        "Integrated Firebase for real-time data and authentication",
      ],
      skills: ["FlutterFlow", "JavaScript", "Firebase", "Figma"],
    },
    {
      company: "ARK X Experience",
      position: "Junior Full Stack Developer",
      period: "August 2023 – March 2024",
      location: "Casablanca, Morocco",
      description:
        "Worked on web platforms and mobile-friendly applications using React, Node.js, and MongoDB.",
      achievements: [
        "Improved application performance and load times",
        "Enhanced responsiveness across mobile and desktop devices",
      ],
      skills: ["React", "JavaScript", "MongoDB", "Tailwind CSS", "GitHub", "CSS"],
    },
  ];

  // Animate items when they enter view (one-way — never unsets)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const refs = itemRefs.current.slice();
    refs.forEach((el) => { if (el) observer.observe(el); });
    return () => refs.forEach((el) => { if (el) observer.unobserve(el); });
  }, []);

  // Animate the central timeline line on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const visible = Math.min(Math.max(window.innerHeight - rect.top, 0), rect.height);
      setLineHeight((visible / rect.height) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-28 bg-[#020817] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 w-[700px] h-96 bg-blue-600/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-blue-400 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Career
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            My Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Professional roles and contributions across the stack.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px w-px h-full bg-white/8 overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-300 transition-all duration-300 ease-out"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`relative flex flex-col md:flex-row items-start mb-12 transition-all duration-700 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 mt-6 w-3 h-3 rounded-full border-2 border-blue-500 z-10 transition-all duration-500 ${
                  visibleItems.includes(index)
                    ? "bg-blue-500 scale-100"
                    : "bg-[#020817] scale-0"
                }`}
              />

              {/* Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                <div className="group bg-[#0A1628] border border-white/8 hover:border-blue-500/30 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/10 transition-all duration-400 hover:-translate-y-0.5">
                  {/* Period */}
                  <p
                    className="text-blue-400 text-xs tracking-widest uppercase mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {exp.period}
                  </p>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-white mb-0.5 group-hover:text-blue-300 transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {exp.position}
                  </h3>
                  <p className="text-slate-400 text-sm mb-1">
                    {exp.company} · {exp.location}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/5 my-4" />

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className="text-blue-400 mt-0.5 text-xs">▸</span>
                        {ach}
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
