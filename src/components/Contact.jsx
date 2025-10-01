import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    emailjs
      .send(
        "service_7c4elj9",
        "template_9b762ce",
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "dX06gbK8Vx5GH_U14"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-green-600/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Contact Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">Let’s Connect</h3>
            <p className="text-gray-300">
              I’m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="space-y-2">
              <p>
                📧{" "}
                <a
                  href="mailto:mr.rghay@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  Mr.rghay@gmail.com
                </a>
              </p>
              <p>📍 Morocco Casablanca</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className={`bg-slate-900 p-6 rounded-2xl shadow-lg space-y-4 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-400 text-white"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-400 text-white"
              required
            />
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-400 text-white"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition transform hover:scale-105"
            >
              Send Message
            </button>
            {status && (
              <p className="mt-2 text-center text-blue-400">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
