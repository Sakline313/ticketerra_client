import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    setError("");

    // ⚠️ Password and Confirm Password matching validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ⚠️ Project requirements password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    // 👤 সাধারণ রেজিস্ট্রেশনের জন্য একটি ডিফল্ট প্রোফাইল পিকচার URL
    const defaultAvatar = "https://i.ibb.co.com/ZzYg0Z6/default-avatar.png";

    registerUser(email, password)
      .then(() => {
        // এখানে ডিফল্ট অবতার পাস করে দেওয়া হলো যাতে ব্ল্যাংক না থাকে
        updateUserProfile(name, defaultAvatar)
          .then(() => {
            navigate("/");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => {
        setError(err.message.replace("Firebase: ", ""));
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070')] bg-cover bg-center px-4 py-12 relative">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Create Account</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@mail.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition duration-300 transform active:scale-95 mt-2"
          >
            Register
          </button>
        </form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="flex-shrink mx-4 text-gray-300 text-sm">OR</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        <button
          onClick={() => googleLogin().then(() => navigate("/"))}
          className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 py-2.5 rounded-xl transition font-medium"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          SignUp with Google
        </button>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;