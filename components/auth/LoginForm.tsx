import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      // DEMO LOGIN (for assignment)
      const isValid = email === "test@demo.com" && password === "123456";

      if (!isValid) {
        throw new Error("Incorrect email or password");
      }

      // OPTIONAL: real API call (safe fallback)
      try {
        await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } catch {
        // ignore API failure (demo mode)
      }

      const token = "demo-token-" + Date.now();
      sessionStorage.setItem("timesheet_token", token);

      if (remember) {
        localStorage.setItem("remember_email", email);
      } else {
        localStorage.removeItem("remember_email");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-[#F7F8FA]">
      {/* LEFT */}
      <div className="w-1/2 bg-white flex items-center justify-center px-10">
        <div className="w-full max-w-xl">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Welcome back
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <span className="text-sm text-gray-600">
                Remember email
              </span>
            </div>

            {/* ERROR */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* DEMO INFO */}
          <div className="mt-5 p-3 bg-gray-50 border rounded-lg text-sm text-gray-600 border-gray-300">
            <p>
              <b>Demo:</b>
            </p>
            <p>Email: test@demo.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 bg-blue-600 flex items-center text-white px-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Ticktock</h2>
          <p className="text-blue-100 text-[16px] leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web
            application designed to revolutionize how you manage
            employee work hours.
          </p>
        </div>
      </div>
    </div>
  );
}