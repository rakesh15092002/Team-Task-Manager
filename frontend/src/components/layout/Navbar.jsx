import { useLocation } from "react-router-dom";
import Avatar from "../ui/Avatar";
import DropdownMenu from "../ui/DropdownMenu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/profile": "Profile",
};

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const title = pageTitles[pathname] || "Team Task Manager";

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      <DropdownMenu
        trigger={<Avatar name={user?.name} src={user?.avatar} size="sm" />}
        items={[
          { label: "Profile", onClick: () => navigate("/profile") },
          { label: "Logout", onClick: logout },
        ]}
      />
    </header>
  );
}