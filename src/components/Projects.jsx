import { ExternalLink } from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { useEffect, useRef, useState } from "react";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "GreenVille E-Commerce",
      description:
        "A modern e-commerce platform with full product management, cart, authentication, and responsive mobile design.",
      image: "/greenVille.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      category: "Full Stack",
      featured: true,
      github: "https://github.com/shadowofleaf96/GreenVille",
      live: "https://greenville-frontend.vercel.app",
    },
    {
      id: 2,
      title: "Book Cave",
      description:
        "A platform where book lovers can browse, review, and track their favorite books with a clean reading experience.",
      image: "/bookCave.png",
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Tailwind CSS"],
      category: "Full Stack",
      featured: false,
      github: "https://github.com/Icarz/BooksCaveApp",
      live: null,
    },
    {
      id: 3,
      title: "AI Resume Analyzer",
      description:
        "An AI-powered ATS resume analyzer that helps improve job applications based on specific job requirements.",
      image: "/ATS%20analyzer.png",
      technologies: ["React", "Tailwind CSS", "Puter AI"],
      category: "Frontend",
      featured: false,
      github: "https://github.com/Icarz/ai-resume-analyze",
      live: "https://resume-analyzer-36-nsl7i.puter.site/",
    },
    {
      id: 4,
      title: "Skill Swap",
      description:
        "A community platform that connects people who want to exchange skills — learn something new by teaching what you know.",
      image: "/skillSwap.png",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
      category: "Full Stack",
      featured: false,
      github: "https://github.com/Icarz/SkillSwap",
      live: "https://theskillswap.vercel.app",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 bg-[#030E1F] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/4 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-blue-400 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Portfolio
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A selection of projects showcasing my skills across the full stack.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-[#0A1628] rounded-2xl overflow-hidden border border-white/8 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9] bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay with links */}
                <div className="absolute inset-0 bg-[#020817]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="bg-[#020817]/80 backdrop-blur-sm text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-500/20"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {project.category}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600/90 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-slate-400 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/Icarz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 text-slate-300 hover:text-white px-8 py-3.5 rounded-lg transition-all duration-300 font-semibold"
          >
            <GithubIcon className="w-4 h-4" />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
