import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Mail, Send, Linkedin } from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        () => setStatus("error")
      );
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "mr.rghay@gmail.com",
      href: "mailto:mr.rghay@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Casablanca, Morocco",
      href: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "mohammed-rerhaye",
      href: "https://www.linkedin.com/in/mohammed-rerhaye-356197125/",
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com/Icarz",
      href: "https://github.com/Icarz",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 bg-[#030E1F] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[600px] h-72 bg-blue-600/6 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-blue-400 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's Work Together
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Open to new projects, freelance work, and full-time opportunities.
            Drop me a message and I'll get back to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Left — contact info */}
          <div
            className={`space-y-4 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact Info
            </h3>

            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 bg-white/3 border border-white/8 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p
                    className="text-xs text-slate-500 uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-slate-200 hover:text-blue-300 transition-colors font-medium"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-200 font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h3
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Send a Message
            </h3>

            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 text-white placeholder-slate-500 transition-all duration-200 text-sm"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 text-white placeholder-slate-500 transition-all duration-200 text-sm"
            />
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 text-white placeholder-slate-500 transition-all duration-200 text-sm resize-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              {status === "sending" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="text-center text-emerald-400 text-sm font-medium">
                Message sent successfully. I'll be in touch soon!
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-red-400 text-sm font-medium">
                Something went wrong. Please try emailing me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
