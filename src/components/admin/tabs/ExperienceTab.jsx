import { useState } from "react";
import { Plus, Pencil, Trash2, X, Save, ChevronUp, ChevronDown } from "lucide-react";
import { usePortfolio } from "../../../context/PortfolioContext";

const EMPTY_EXP = {
  company: "",
  position: "",
  period: "",
  location: "",
  description: "",
  achievements: [""],
  skills: [],
};

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

const ExpForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...EMPTY_EXP, ...initial });
  const [skillInput, setSkillInput] = useState("");

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const updateAchievement = (index, value) => {
    const updated = [...form.achievements];
    updated[index] = value;
    setForm((p) => ({ ...p, achievements: updated }));
  };

  const addAchievement = () => setForm((p) => ({ ...p, achievements: [...p.achievements, ""] }));

  const removeAchievement = (index) =>
    setForm((p) => ({ ...p, achievements: p.achievements.filter((_, i) => i !== index) }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm((p) => ({ ...p, skills: [...p.skills, s] }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setForm((p) => ({ ...p, skills: p.skills.filter((s) => s !== skill) }));

  const handleSave = () => {
    if (!form.company.trim() || !form.position.trim()) {
      alert("Company and position are required.");
      return;
    }
    onSave({ ...form, achievements: form.achievements.filter((a) => a.trim()) });
  };

  return (
    <div className="bg-[#0A1628] border border-blue-500/30 rounded-xl p-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company *">
          <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
        </Field>
        <Field label="Position *">
          <Input value={form.position} onChange={(e) => set("position", e.target.value)} placeholder="Job title" />
        </Field>
        <Field label="Period">
          <Input value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="Jan 2024 – Dec 2024" />
        </Field>
        <Field label="Location">
          <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          placeholder="What did you do in this role?"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
        />
      </Field>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-slate-400">Achievements</label>
          <button
            onClick={addAchievement}
            className="text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-lg transition-all"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {form.achievements.map((ach, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={ach}
                onChange={(e) => updateAchievement(i, e.target.value)}
                placeholder={`Achievement ${i + 1}`}
              />
              <button
                onClick={() => removeAchievement(i)}
                className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1.5">Skills Used</label>
        <div className="flex gap-2 mb-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            placeholder="Add skill (press Enter)"
          />
          <button
            onClick={addSkill}
            className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm transition-all"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="text-blue-400/60 hover:text-red-400 transition-colors ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
        >
          <Save className="w-4 h-4" /> Save Experience
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
};

const ExperienceTab = () => {
  const { data, updateData } = usePortfolio();
  const [experiences, setExperiences] = useState([...data.experience]);
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);

  const saveAll = (updated) => {
    setExperiences(updated);
    updateData({ ...data, experience: updated });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAdd = (form) => {
    saveAll([...experiences, { ...form, id: Date.now() }]);
    setEditing(null);
  };

  const handleUpdate = (form) => {
    saveAll(experiences.map((e) => (e.id === editing ? { ...form, id: e.id } : e)));
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this experience?")) return;
    saveAll(experiences.filter((e) => e.id !== id));
  };

  const move = (index, direction) => {
    const updated = [...experiences];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= updated.length) return;
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
    saveAll(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Experience
          </h2>
          <p className="text-slate-500 text-sm">Add, edit, reorder or delete work experiences.</p>
        </div>
        {saved && (
          <span className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            Saved!
          </span>
        )}
      </div>

      {editing === "new" ? (
        <ExpForm initial={EMPTY_EXP} onSave={handleAdd} onCancel={() => setEditing(null)} />
      ) : (
        <button
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:text-blue-300"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      )}

      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div key={exp.id ?? index}>
            {editing === exp.id ? (
              <ExpForm initial={exp} onSave={handleUpdate} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button onClick={() => move(index, -1)} disabled={index === 0} className="text-slate-600 hover:text-slate-300 disabled:opacity-20 transition-colors">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => move(index, 1)} disabled={index === experiences.length - 1} className="text-slate-600 hover:text-slate-300 disabled:opacity-20 transition-colors">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{exp.position}</p>
                  <p className="text-slate-500 text-xs truncate">{exp.company} · {exp.period}</p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditing(exp.id)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTab;
