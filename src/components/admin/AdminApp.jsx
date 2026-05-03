import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

const isAuthenticated = () => sessionStorage.getItem("admin_auth") === "true";

const AdminApp = ({ onExit }) => {
  const [authed, setAuthed] = useState(isAuthenticated);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return <AdminPanel onExit={onExit} onLogout={handleLogout} />;
};

export default AdminApp;
