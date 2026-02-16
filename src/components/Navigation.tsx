import { Plus, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import Button from "./Button";
import Logo from "./Logo";
import { useAuthStore, getSignInUrl, clearAccessToken } from "../store/auth";

export default function Navigation() {
  const location = useLocation();
  const { accessToken } = useAuthStore();
  const isSignedIn = !!accessToken;

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    return path !== "/" && location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: "/", label: "Theme Store" },
    { path: "/mine", label: "My Themes" },
  ];

  const handleSignIn = () => {
    window.location.href = getSignInUrl();
  };

  const handleSignOut = () => {
    clearAccessToken();
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAFA] border-b border-[#EFEFEF]">
      <div className="mx-auto px-25">
        <div className="flex justify-between items-center py-2 gap-6.5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-[#000] text-lg">
              <span>Chain</span>
              <span className="font-medium">rails</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center bg-[#F3F3F3] rounded-lg p-1 space-x-1 mr-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative flex items-center px-4 py-2 text-xs rounded-md transition-colors duration-200 whitespace-pre",
                  isActive(link.path) ? "text-[#000]" : "text-[#00000080] hover:text-[#2F2F2F]",
                )}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-md whitespace-pre"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <Button variant="secondary" size="sm" onClick={handleSignOut}>
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleSignIn}>
                <span className="hidden sm:inline whitespace-pre">Sign In</span>
              </Button>
            )}
            <Link to="/create">
              <Button variant="primary" size="sm">
                <Plus size={20} />
                <span className="hidden sm:inline whitespace-pre">Build New Theme</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
