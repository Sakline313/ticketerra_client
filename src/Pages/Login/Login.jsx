import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // লগইন করার পর ইউজার যেখানে যেতে চেয়েছিল সেখানে পাঠাবে, না হলে হোম পেজে
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setError("");

    loginUser(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message.replace("Firebase: ", ""));
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070')] bg-cover bg-center px-4 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Transparent Form Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-xs text-amber-400 hover:underline">Forgot Password?</a>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition duration-300 transform active:scale-95 mt-2"
          >
            Login
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="flex-shrink mx-4 text-gray-300 text-sm">OR</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 py-3 rounded-xl transition font-medium"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;