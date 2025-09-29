import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  //---Project Data--//
  const projects = [
    {
      id: 1,
      title: "E-commerce platform Green ville",
      description:
        "a modern and e-commerce web platform with responsive design on mobile",
      image: "/greenVille.png",
      technologies: ["React", "Nodejs", "Express", "Mongodb", "jwt"],
      category: "Full Stack",
      featured: "true",
      github: "https://github.com/yourusername/green-ville",
      live: "https://green-ville-demo.com",
    },
    {
      id: 2,
      title: "Book Cave",
      description:
        "a web platform where book lovers can get their favorite books and review them",
      image: "/bookCave.png",
      technologies: ["React", "Nodejs", "Mongodb", "Jwt", "TailwindCss"],
      category: "Full Stack",
      featured: "false",
      github: "https://github.com/yourusername/book-cave",
      live: "https://book-cave-demo.com",
    },
    {
      id: 3,
      title: "Weather App",
      description:
        "a react app allowing users to check weather through the glob using and weather API",
      image: "/weatherApp.png",
      technologies: ["React", "CSS"],
      category: "Frontend",
      featured: "false",
      github: "https://github.com/yourusername/weather-app",
      live: "https://weather-app-demo.com",
    },
    {
      id: 4,
      title: "Skill Swap",
      description:
        "a web platform with responsive design for mobile, aiming to get users with skills together, based on swapping skills between users ",
      image: "/skillSwap.png",
      technologies: ["React", "Nodejs", "Mongodb", "TailwindCss", "Jwt"],
      category: "Full Stack",
      featured: "false",
      github: "https://github.com/yourusername/skill-swap",
      live: "https://skill-swap-demo.com",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const element = document.getElementById("projects");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-green-600/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div
          className={`text-center mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-blue-400 font-semibold text-lg mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Here are some of the projects I have worked on, showcasing my skills
            in web development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-100 delay-600
                overflow-hidden border border-slate-700 hover:border-blue-500 hover:scale-105 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${(index + 3) * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover group-hover:scale-105 transition-all duration-300"
                />
                {/* Icon Links */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                    >
                      <Github className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-slate-800 text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400">
                  {project.title}
                </h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 mt-5 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
