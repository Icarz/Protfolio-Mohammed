import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-green-600/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* left image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="w-full max-w-md mx-auto">
                <div className="relative border-blue-500 rounded-2xl p-2 group-hover:border-blue-400 transition-all duration-300">
                  <img
                    src="profile.jpg"
                    alt="Mohammed rerhaye"
                    className="w-full rounded-full shadow-2xl transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-2 bg-gradient-to-tr from-green-600/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  {/* floating decoration */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-600/20 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-600/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* right content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-4">
              <p className="text-blue-300 font-semibold text-lg">About Me</p>
              <h2 className="text-4xl md:text-5xl text-white font-bold">
                Will you hire me for your <br />
                <span className="">next project?</span>
              </h2>
              <p className="text-blue-400 font-semibold delay-200">
                Web developer
              </p>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p
                className={`text-lg transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente dicta animi reprehenderit unde iusto quae dolorum
                doloremque labore! Perspiciatis qui sint porro ipsam officia
                mollitia laudantium repellat accusamus necessitatibus alias!
              </p>
              <p
                className={`transition-all duration-1000 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, quibusdam asperiores. Voluptatum delectus
                consequuntur aut modi, rerum facere quia maxime, nam
                distinctio, quod ut deserunt dolores expedita voluptates
                cumque? Reprehenderit.
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-8 py-6 transition-all duration-1000 delay-900 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="group">
                <p className="text-white font-semibold group-hover:text-blue-400 transition-all duration-300">
                  Name
                </p>
                <p className="text-gray-300">Mohammed Rerhaye</p>
              </div>
              <div className="group">
                <p className="text-white font-semibold group-hover:text-blue-400 transition-all duration-300">
                  Location
                </p>
                <p className="text-gray-300">Casablanca Morocco</p>
              </div>
              <div className="group">
                <p className="text-white font-semibold group-hover:text-blue-400 transition-all duration-300">
                  Birthday
                </p>
                <p className="text-gray-300">22 November,1990</p>
              </div>
              <div className="group">
                <p className="text-white font-semibold group-hover:text-blue-400 transition-all duration-300">
                  Email
                </p>
                <p className="text-gray-300">Mr.rghay@gmail.com</p>
              </div>
            </div>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <button className="bg-blue-600 flex items-center gap-3 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <Download size={18} />
                Download
              </button>
              <button className="border-2 border-slate-600 text-white px-8 py-3 rounded-lg hover:border-blue-600 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
