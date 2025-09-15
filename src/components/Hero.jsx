import { ArrowRight, Github, Linkedin, Mail, Play } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // re-trigger on enter/leave
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("home"); // fixed: was "about"
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-slate-900 pt-20 relative overflow-hidden"
    >
      {/* animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full bg-gradient-to-r from-transparent via-green-600/5"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left content */}
          <div
            className={`space-y-8 transition-all transition-transform duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-4">
              <p className="text-blue-400 font-semibold text-lg transition-all duration-1000">
                Get Ready To Start Work
              </p>
              <h1 className="text-2xl md:text-5xl font-black text-white leading-tight transition-all duration-1000 delay-200">
                I am
                <span className="text-blue-400"> Developer</span> <br />
                <span className="text-white">MOHAMMED RERHAYE</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg transition-all duration-1000 delay-300">
                A passionate web developer with a strong focus on building
                clean, responsive, and user-friendly applications. After
                changing my career path to pursue software development
              </p>
              <div className="flex flex-wrap gap-4 transition-all duration-1000 delay-500">
                <button className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl font-medium hover:scale-105">
                  LEARN MORE
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="border-2 border-slate-600 text-white px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-400 transition-all duration-300 font-medium flex  items-center gap-2 group hover:scale-105">
                  <Play className="w-4 h-4" /> Play
                </button>
              </div>
              {/* social icons */}
              <div className="flex gap-4 transition-all duration-1000 delay-700">
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group hover:scale-110 hover:rotate-6"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group hover:scale-110 hover:rotate-6"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group hover:scale-110 hover:rotate-6"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* right content */}
          <div
            className={`relative transition-all transition-transform duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="w-full max-w-lg mx-auto">
                <div className="relative group">
                  <img
                    src="profile.jpg"
                    alt="Mohammed rerhaye"
                    className="w-full rounded-full shadow-2xl transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
