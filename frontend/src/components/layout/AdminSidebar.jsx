import { NavLink } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../utils/cn";

export default function AdminSidebar() {
  const { user } = useAuth();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/admin/users", label: "Manage Users", icon: "👥" },
    { to: "/admin/projects", label: "All Projects", icon: "📁" },
  ];

  return (
    <aside className="w-56 h-screen bg-gray-900 flex flex-col shrink-0">
      <div className="h-14 flex items-center px-5 border-b border-gray-700">
        <span className="text-base font-bold text-white">TaskManager</span>
        <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
          Admin
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}>
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700 flex items-center gap-2">
        <Avatar name={user?.name} src={user?.avatar} size="sm" />
        <div>
          <p className="text-sm text-white truncate">{user?.name}</p>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
      </div>
    </aside>
  );
}