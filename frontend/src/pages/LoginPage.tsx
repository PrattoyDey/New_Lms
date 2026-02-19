import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { Button } from "@/components/ui/button";

// Import banner image
import loginBanner from "@/assets/images/login-banner.svg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT SIDE — BANNER */}
      <div className="hidden md:flex items-center justify-center bg-blue-50 p-10">
        <img
          src={loginBanner}
          alt="Learning platform"
          className="max-w-lg"
        />
      </div>

      {/* RIGHT SIDE — LOGIN FORM */}
      <div className="flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-md space-y-6 border p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center">
            Login to LMS
          </h1>

          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="button"
            onClick={handleLogin}
            className="w-full"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
