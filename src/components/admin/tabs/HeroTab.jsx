import { useState, useRef } from "react";
import { Save, Upload, Link } from "lucide-react";
import { usePortfolio } from "../../../context/PortfolioContext";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
  />
);

const HeroTab = () => {
  const { data, updateData } = usePortfolio();
  const [form, setForm] = useState({ ...data.hero });
  const [saved, setSaved] = useState(false);
  const [photoMode, setPhotoMode] = useState("url");
  const fileRef = useRef(null);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2 MB. Use a URL instead for larger images.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => set("photo", ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    try {
      updateData({ ...data, hero: form });
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
          Profile / Hero
        </h2>
        <p className="text-slate-500 text-sm">Edit your name, role, bio, photo and social links.</p>
      </div>

      {/* Photo */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Profile Photo</h3>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setPhotoMode("url")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${photoMode === "url" ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}
          >
            <Link className="w-3 h-3" /> URL
          </button>
          <button
            onClick={() => setPhotoMode("upload")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${photoMode === "upload" ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}
          >
            <Upload className="w-3 h-3" /> Upload
          </button>
        </div>

        {photoMode === "url" ? (
          <Input
            value={form.photo}
            onChange={(e) => set("photo", e.target.value)}
            placeholder="https://example.com/photo.jpg or /profile.jpg"
          />
        ) : (
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 text-slate-300 px-4 py-2.5 rounded-lg text-sm transition-all"
            >
              <Upload className="w-4 h-4" /> Choose image (max 2 MB)
            </button>
          </div>
        )}

        {form.photo && (
          <div className="mt-3">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <img
              src={form.photo}
              alt="preview"
              className="w-24 h-24 rounded-full object-cover border border-white/10"
            />
          </div>
        )}
      </div>

      {/* Basic info */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Basic Info</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name">
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Role / Title">
            <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Full Stack Developer" />
          </Field>
          <Field label="Experience Stat">
            <Input value={form.experienceStat} onChange={(e) => set("experienceStat", e.target.value)} placeholder="3+ Years" />
          </Field>
          <Field label="Projects Stat">
            <Input value={form.projectsStat} onChange={(e) => set("projectsStat", e.target.value)} placeholder="10+ Built" />
          </Field>
        </div>
        <Field label="Hero Bio">
          <textarea
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            rows={3}
            placeholder="A short bio shown on the hero section..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
          />
        </Field>
        <Field label="Available for Work">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set("available", !form.available)}
              className={`relative w-10 h-5 rounded-full transition-all ${form.available ? "bg-blue-600" : "bg-white/10"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.available ? "left-5.5 translate-x-0.5" : "left-0.5"}`} />
            </div>
            <span className="text-slate-300 text-sm">{form.available ? "Showing 'Available for work' badge" : "Badge hidden"}</span>
          </label>
        </Field>
      </div>

      {/* Social links */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Social Links</h3>
        <div className="space-y-3">
          <Field label="GitHub URL">
            <Input value={form.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/username" />
          </Field>
          <Field label="LinkedIn URL">
            <Input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/username" />
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

export default HeroTab;
