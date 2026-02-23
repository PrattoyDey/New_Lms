import { Link, useNavigate } from "react-router-dom";
import authorization from "@/core/Authorization";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const isLoggedIn = !!localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    authorization.clear();
    navigate("/");
  };

  return (
    <div className="w-full flex justify-between items-center p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700">
      
      {/* Logo */}
      <Link to="/" className="font-bold text-lg text-gray-900 dark:text-white">
        LMS
      </Link>

      {isLoggedIn ? (
        <div className="flex gap-6 items-center text-gray-800 dark:text-gray-200">

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/courses">Courses</Link>

          <Link to="/my-learning">My Learning</Link>

          {authorization.isAuthorized("can_create_course") && (
            <Link to="/create-course">Create Course</Link>
          )}

          
          {authorization.isAuthorized("can_create_course") && (
            <Link to="/creator-dashboard">Creator Dashboard</Link>
          )}

          {/* 🌙 Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Logout */}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>

        </div>
      ) : (
        <div className="flex gap-4 items-center">

          {/* Theme Toggle for logged-out users */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Link to="/login">
            <Button>Login</Button>
          </Link>

        </div>
      )}
    </div>
  );
}

export default Navbar;
