import { useEffect, useRef, useState } from "react";

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [lineHeight, setLineHeight] = useState(0);
  const itemRefs = useRef([]);
  const sectionRef = useRef(null);

  const experiences = [
    {
      company: "Qualiziom",
      position: "frontend developer",
      period: "december 2024 - June 2025",
      location: "Casablanca Morocco",
      description:
        "updating web application components and maintaining platform",
      achievements: [
        "upscaling web app",
        "updating app based on user stories ",
      ],
      skills: ["React", "SQL", "Javascript", "Css"],
    },
    {
      company: "ARK X experience",
      position: "Junior Full Stack Developer",
      period: "August 2023 - March 2024",
      location: "Casablanca, Morocco",
      description:
        "Worked on web platforms and mobile-friendly applications using React, Node.js, and MongoDB.",
      achievements: [
        "Increased application performance",
        "Improved responsiveness across devices",
      ],
      skills: ["React", "JavaScript", "MongoDB", "Tailwind", "GitHub", "CSS"],
    },
    {
      company: "Sand Technologies",
      position: "Full Stack Developer",
      period: "June 2024 - October 2024",
      location: "Casablanca, Morocco",
      description:
        "Collaborated on creating an MVP app and responsive web platform.",
      achievements: [
        "Built a responsive app and integrated Firebase for faster backend and data manipulation",
      ],
      skills: ["FlutterFlow", "JavaScript", "Firebase", "Figma"],
    },
  ];

  // Animate items when they enter view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      itemRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Animate central timeline line
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // how much of section is visible
      const visible = Math.min(
        Math.max(windowHeight - rect.top, 0),
        rect.height
      );

      setLineHeight((visible / rect.height) * 100); // % of section height
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-green-600/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Experience
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            My professional journey and experiences so far
          </p>
        </div>

        {/* timeline wrapper */}
        <div className="relative">
          {/* central timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-slate-700 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 transition-all duration-300 ease-out"
              style={{ height: `${lineHeight}%` }}
            ></div>
          </div>

          {/* timeline items */}
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`relative flex flex-col md:flex-row items-center mb-20 transition-all duration-700 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 200 + 300}ms`,
              }}
            >
              {/* timeline circle */}
              <div
                className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-900 shadow-lg z-10 transition-transform duration-500 ${
                  visibleItems.includes(index) ? "scale-110" : "scale-0"
                }`}
              ></div>

              {/* content card */}
              <div
                className={`ml-20 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-0"
                }`}
              >
                <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-blue-500/20 group">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {exp.position} @ {exp.company}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {exp.period} • {exp.location}
                  </p>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <ul className="list-disc list-inside text-gray-400 mb-4">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-blue-600/20 text-blue-300 rounded-full"
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
