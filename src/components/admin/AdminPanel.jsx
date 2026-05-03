import { useState } from "react";
import {
  User, FileText, FolderGit2, BarChart2, Briefcase, Settings, LogOut, ArrowLeft, Menu, X,
} from "lucide-react";
import HeroTab from "./tabs/HeroTab";
import AboutTab from "./tabs/AboutTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";
import ExperienceTab from "./tabs/ExperienceTab";
import SettingsTab from "./tabs/SettingsTab";

const NAV = [
  { id: "hero",       label: "Profile",    icon: User },
  { id: "about",      label: "About",      icon: FileText },
  { id: "projects",   label: "Projects",   icon: FolderGit2 },
  { id: "skills",     label: "Skills",     icon: BarChart2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "settings",   label: "Settings",   icon: Settings },
];

const AdminPanel = ({ onExit, onLogout }) => {
  const [activeTab, setActiveTab] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "hero":       return <HeroTab />;
      case "about":      return <AboutTab />;
      case "projects":   return <ProjectsTab />;
      case "skills":     return <SkillsTab />;
      case "experience": return <ExperienceTab />;
      case "settings":   return <SettingsTab onLogout={onLogout} />;
      default:           return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex" style={{ fontFamily: "var(--font-sans)" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0A1628] border-r border-white/8 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-white/8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-400 tracking-widest uppercase mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                Admin Panel
              </p>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
                Portfolio Manager
              </p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-white/8 space-y-1">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onExit(); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0A1628]">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>
            {NAV.find((n) => n.id === activeTab)?.label}
          </p>
          <a href="/" onClick={(e) => { e.preventDefault(); onExit(); }} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-3xl">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
