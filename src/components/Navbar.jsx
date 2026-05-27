import React, { useState } from "react";

import {
  Search,
  Sparkles,
  Sun,
  Moon,
  UserRound,
  LogOut,
  X,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const Navbar = ({ handleSearch, authUser, onSignup, onLogin, onLogout }) => {
  const [input, setInput] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [favOpen, setFavOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (input.trim()) {
      handleSearch(input.trim());
      navigate(`search/${input}`);
      setInput("");
    }
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthError("");
    setForm({ name: "", email: "", password: "" });
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
    setAuthError("");
  };

  const openFavs = () => {
    try {
      // lazy load favorites
      const raw = localStorage.getItem("communityFavorites");
      const list = raw ? JSON.parse(raw) : [];
      setFavorites(list);
    } catch (e) {
      setFavorites([]);
    }
    setFavOpen(true);
  };

  const closeFavs = () => setFavOpen(false);

  const removeFav = (idMeal) => {
    try {
      const raw = localStorage.getItem("communityFavorites");
      const list = raw ? JSON.parse(raw) : [];
      const filtered = list.filter((m) => m.idMeal !== idMeal);
      localStorage.setItem("communityFavorites", JSON.stringify(filtered));
      setFavorites(filtered);
    } catch (e) {}
  };

  const submitAuth = (e) => {
    e.preventDefault();
    const action = authMode === "signup" ? onSignup : onLogin;
    const result = action(form);

    if (result?.ok) {
      closeAuth();
      return;
    }

    setAuthError(result?.message || "Unable to authenticate.");
  };

  return (
    <>
      <nav className="sticky to-0 z-50 bg-gray-950/90 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-blue-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to={"/"}
              className="flex items-center text-2xl font-black text-white hover:text-blue-400 transition duration-300 tracking-widest"
            >
              <Sparkles className="w-7 h-7 mr-2 text-yellow-300" />
              <span className="text-blue-400">Taste</span>Nest
            </Link>
            <div className="flex items-center">
              <form
                onSubmit={searchHandler}
                className="flex-1 max-w-lg mx-4 hidden sm:flex"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search dishes, ingredients, or cuisine..."
                  className="w-full px-5 py-2 border border-gray-700 bg-gray-900 text-gray-50 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-600/50 transition placeholder-gray-500 shadow-inner shadow-black/50"
                />
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-600 to-cyan-500 text-white p-2.5 rounded-r-full hover:from-blue-700 hover:to-cyan-600 transition duration-300 shadow-lg shadow-blue-800/50 hover:shadow-xl hover:shadow-blue-800/90"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              <ThemeToggle />

              {authUser ? (
                <div className="ml-3 flex items-center gap-2">
                  <button
                    onClick={openFavs}
                    title="Favorites"
                    className="p-2 rounded-full hover:bg-white/6 transition mr-2"
                  >
                    <Heart className="w-5 h-5 text-red-400" />
                  </button>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                    <UserRound className="w-4 h-4 text-blue-300" />
                    <span>{authUser.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-3 py-1.5 rounded-full border border-red-400/30 text-red-300 hover:bg-red-500/10 transition text-sm inline-flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="ml-3 flex items-center gap-2">
                  <button
                    onClick={() => openAuth("login")}
                    className="px-3 py-1.5 rounded-full border border-blue-400/40 text-blue-300 hover:bg-blue-500/10 transition text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuth("signup")}
                    className="px-3 py-1.5 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {authOpen ? (
        <div className="fixed inset-0 z-80 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md card rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {authMode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <button
                onClick={closeAuth}
                aria-label="Close auth dialog"
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitAuth} className="space-y-3">
              {authMode === "signup" ? (
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              ) : null}

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />

              {authError ? (
                <p className="text-sm text-red-300">{authError}</p>
              ) : null}

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition font-semibold"
              >
                {authMode === "signup" ? "Sign Up" : "Login"}
              </button>
            </form>

            <p className="text-sm text-muted mt-4">
              {authMode === "signup"
                ? "Already have an account?"
                : "Need an account?"}{" "}
              <button
                onClick={() =>
                  setAuthMode((m) => (m === "signup" ? "login" : "signup"))
                }
                className="text-accent hover:underline"
              >
                {authMode === "signup" ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      ) : null}
      {favOpen ? (
        <div className="fixed inset-0 z-80 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-2xl card rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Favorites</h2>
              <button
                onClick={closeFavs}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {favorites.length === 0 ? (
              <p className="text-muted">
                No favorites yet. Add some from a recipe page.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {favorites.map((m) => (
                  <div
                    key={m.idMeal}
                    className="card p-3 rounded-lg flex flex-col items-center text-center"
                  >
                    <img
                      src={m.strMealThumb}
                      alt={m.strMeal}
                      className="w-28 h-28 rounded-md object-cover mb-2"
                    />
                    <div className="font-semibold text-sm mb-2">
                      {m.strMeal}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/recipe/${m.idMeal}`}
                        onClick={closeFavs}
                        className="text-accent hover:underline text-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeFav(m.idMeal)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="ml-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
};

export default Navbar;
