import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const handleSignup = async () => {
    try {
      await api.post("/accounts/signup/", {
        email,
        password,
        role,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg shadow-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-border rounded mb-4 bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-border rounded mb-4 bg-background"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Select Role
          </label>

          <select
            className="w-full p-2 border border-border rounded bg-background"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="CREATOR">Creator</option>
          </select>
        </div>

        <Button className="w-full" onClick={handleSignup}>
          Sign Up
        </Button>

        <div className="text-center mt-4 text-sm">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}

export default SignupPage;
