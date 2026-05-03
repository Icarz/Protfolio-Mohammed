import { useState } from "react";
import { Save } from "lucide-react";
import { usePortfolio } from "../../../context/PortfolioContext";

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
  />
);

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
    {children}
  </div>
);

const AboutTab = () => {
  const { data, updateData } = usePortfolio();
  const [form, setForm] = useState({ ...data.about });
  const [saved, setSaved] = useState(false);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    try {
      updateData({ ...data, about: form });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
          About Me
        </h2>
        <p className="text-slate-500 text-sm">Edit your about section bio and info cards.</p>
      </div>

      {/* Bio paragraphs */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Bio Paragraphs</h3>
        <Field label="First paragraph">
          <textarea
            value={form.bio1}
            onChange={(e) => set("bio1", e.target.value)}
            rows={4}
            placeholder="Your main bio paragraph..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
          />
        </Field>
        <Field label="Second paragraph">
          <textarea
            value={form.bio2}
            onChange={(e) => set("bio2", e.target.value)}
            rows={3}
            placeholder="Additional details about your experience..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
          />
        </Field>
      </div>

      {/* Info cards */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Info Cards</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Role">
            <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Full Stack Developer" />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" />
          </Field>
          <Field label="Experience">
            <Input value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="3+ Years" />
          </Field>
          <Field label="Email">
            <Input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" type="email" />
          </Field>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${saved ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25"}`}
      >
        <Save className="w-4 h-4" />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
};

export default AboutTab;
