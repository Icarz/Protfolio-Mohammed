import { useEffect, useState } from "react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: "UX/UI", level: 60 },
    { name: "Branding", level: 70 },
    { name: "SEO", level: 70 },
    { name: "Development", level: 80 },
    { name: "Web Design", level: 70 },
  ];

  const education = [
    {
      year: "2022-2023",
      title: "Certification Development",
      institution: "ARK X Talents Factory",
      description:
        "Bootcamp based on learning by doing in MERN stack plus 6 months of training on real project",
    },
    {
      year: "2023-2025",
      title: "Certification of Software Engineering",
      institution: "African Leadership Academy",
      description:
        "Intensive 18 months based on soft skills for 6 months and technical skills for 12 months: DevOps, backend programming, frontend programming",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("skills");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-green-600/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Education */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-lg mb-4">
                Qualification
              </p>
              <p className="text-blue-400 font-bold text-4xl mb-8">Education</p>
            </div>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="border-l-2 border-blue-500 pl-6 group transition-all duration-1000"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full group-hover:scale-125 transition-all duration-500"></div>
                  <div className="text-blue-400 text-sm font-semibold mb-2 group-hover:text-blue-300 transition-all duration-300">
                    {edu.year}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-all duration-300">
                    {edu.title}
                  </h3>
                  <p className="text-gray-400 mb-2 group-hover:text-gray-300 transition-all duration-300">
                    {edu.institution}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-all duration-300">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Skills */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-lg mb-4">Expert</p>
              <p className="text-4xl font-black text-white mb-8 ">My Skills</p>
            </div>
            <div className="space-y-6">
              {/* Example: Render skills */}
              {skills.map((skill, index) => (
                <div key={index}>
                  <p className="text-gray-300 mb-2">{skill.name}</p>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
