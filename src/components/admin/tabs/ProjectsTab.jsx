import { useState } from "react";
import { Plus, Pencil, Trash2, X, Save, ChevronUp, ChevronDown, Star } from "lucide-react";
import { usePortfolio } from "../../../context/PortfolioContext";

const EMPTY_PROJECT = {
  title: "",
  description: "",
  image: "",
  technologies: [],
  category: "Full Stack",
  featured: false,
  github: "",
  live: "",
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

const ProjectForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...EMPTY_PROJECT, ...initial });
  const [techInput, setTechInput] = useState("");

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      setForm((p) => ({ ...p, technologies: [...p.technologies, t] }));
    }
    setTechInput("");
  };

  const removeTech = (tech) =>
    setForm((p) => ({ ...p, technologies: p.technologies.filter((t) => t !== tech) }));

  const handleSave = () => {
    if (!form.title.trim()) { alert("Title is required."); return; }
    onSave(form);
  };

  return (
    <div className="bg-[#0A1628] border border-blue-500/30 rounded-xl p-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *">
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Project name" />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 text-sm"
          >
            {["Full Stack", "Frontend", "Backend", "Mobile", "Other"].map((c) => (
              <option key={c} value={c} className="bg-[#0A1628]">{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          placeholder="Describe the project..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
        />
      </Field>

      <Field label="Image URL">
        <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://... or /image.png" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="GitHub URL">
          <Input value={form.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/..." />
        </Field>
        <Field label="Live URL">
          <Input value={form.live} onChange={(e) => set("live", e.target.value)} placeholder="https://yourproject.vercel.app" />
        </Field>
      </div>

      <Field label="Technologies">
        <div className="flex gap-2 mb-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
            placeholder="Add tech (press Enter)"
          />
          <button
            onClick={addTech}
            className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm transition-all"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.technologies.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-full"
            >
              {tech}
              <button onClick={() => removeTech(tech)} className="text-slate-500 hover:text-red-400 transition-colors ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </Field>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="w-4 h-4 rounded border-white/20 accent-blue-600"
        />
        <span className="text-slate-300 text-sm">Mark as Featured</span>
      </label>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
        >
          <Save className="w-4 h-4" /> Save Project
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

const ProjectsTab = () => {
  const { data, updateData } = usePortfolio();
  const [projects, setProjects] = useState([...data.projects]);
  const [editing, setEditing] = useState(null); // project id or "new"
  const [saved, setSaved] = useState(false);

  const saveAll = (updated) => {
    setProjects(updated);
    updateData({ ...data, projects: updated });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAdd = (form) => {
    const newProject = { ...form, id: Date.now() };
    saveAll([...projects, newProject]);
    setEditing(null);
  };

  const handleUpdate = (form) => {
    saveAll(projects.map((p) => (p.id === editing ? { ...form, id: p.id } : p)));
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this project?")) return;
    saveAll(projects.filter((p) => p.id !== id));
  };

  const move = (index, direction) => {
    const updated = [...projects];
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
            Projects
          </h2>
          <p className="text-slate-500 text-sm">Add, edit, reorder or delete your projects.</p>
        </div>
        {saved && (
          <span className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            Saved!
          </span>
        )}
      </div>

      {/* New project form */}
      {editing === "new" ? (
        <ProjectForm initial={EMPTY_PROJECT} onSave={handleAdd} onCancel={() => setEditing(null)} />
      ) : (
        <button
          onClick={() => setEditing("new")}
          className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:text-blue-300"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      )}

      {/* Projects list */}
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div key={project.id}>
            {editing === project.id ? (
              <ProjectForm initial={project} onSave={handleUpdate} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all group">
                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="text-slate-600 hover:text-slate-300 disabled:opacity-20 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === projects.length - 1}
                    className="text-slate-600 hover:text-slate-300 disabled:opacity-20 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Thumbnail */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-10 object-cover rounded-lg border border-white/10 shrink-0 hidden sm:block"
                  />
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white font-semibold text-sm truncate">{project.title}</p>
                    {project.featured && <Star className="w-3 h-3 text-blue-400 shrink-0 fill-blue-400" />}
                  </div>
                  <p className="text-slate-500 text-xs truncate">{project.category} · {project.technologies.slice(0, 3).join(", ")}{project.technologies.length > 3 ? "…" : ""}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditing(project.id)}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
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

export default ProjectsTab;
