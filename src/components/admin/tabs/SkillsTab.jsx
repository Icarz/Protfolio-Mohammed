import { useState } from "react";
import { Save, Plus, Trash2, X } from "lucide-react";
import { usePortfolio } from "../../../context/PortfolioContext";
import { getTechColor } from "../../../data/portfolioData";

const SkillsTab = () => {
  const { data, updateData } = usePortfolio();
  const [proficiency, setProficiency] = useState([...data.skills.proficiency]);
  const [techStack, setTechStack] = useState([...data.skills.techStack]);
  const [techInput, setTechInput] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    try {
      updateData({ ...data, skills: { ...data.skills, proficiency, techStack } });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateProficiency = (index, key, value) => {
    setProficiency((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

  const addSkill = () => {
    setProficiency((prev) => [...prev, { name: "New Skill", level: 50 }]);
  };

  const removeSkill = (index) => {
    setProficiency((prev) => prev.filter((_, i) => i !== index));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !techStack.includes(t)) {
      setTechStack((prev) => [...prev, t]);
    }
    setTechInput("");
  };

  const removeTech = (tech) => setTechStack((prev) => prev.filter((t) => t !== tech));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Skills
        </h2>
        <p className="text-slate-500 text-sm">Edit proficiency levels and your tech stack.</p>
      </div>

      {/* Proficiency bars */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">Proficiency</h3>
          <button
            onClick={addSkill}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
          >
            <Plus className="w-3 h-3" /> Add Skill
          </button>
        </div>

        <div className="space-y-4">
          {proficiency.map((skill, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  value={skill.name}
                  onChange={(e) => updateProficiency(i, "name", e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Skill name"
                />
                <span className="text-blue-400 text-xs font-mono w-8 text-right shrink-0">{skill.level}%</span>
                <button
                  onClick={() => removeSkill(i)}
                  className="text-slate-600 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={skill.level}
                onChange={(e) => updateProficiency(i, "level", Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Tech Stack</h3>
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
            placeholder="Add technology (press Enter)"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 text-sm transition-all"
          />
          <button
            onClick={addTech}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${getTechColor(tech)}`}
            >
              {tech}
              <button
                onClick={() => removeTech(tech)}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
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

export default SkillsTab;
