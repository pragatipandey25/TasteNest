const RECENT_KEY = "recentlyViewed";
const TASTE_KEY = "tastePrefs";
const COMMUNITY_KEY = "communityFavorites";
const USERS_KEY = "users";
const AUTH_KEY = "authUser";

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const writeJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

export const addRecentViewed = (meal) => {
  if (!meal || !meal.idMeal) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const list = raw ? JSON.parse(raw) : [];
    // remove existing
    const filtered = list.filter((m) => m.idMeal !== meal.idMeal);
    filtered.unshift({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
    });
    // keep max 12
    const trimmed = filtered.slice(0, 12);
    localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error(e);
  }
};

export const getRecentlyViewed = () => {
  return readJson(RECENT_KEY, []);
};

export const getTastePrefs = () => {
  return readJson(TASTE_KEY, []);
};

export const setTastePrefs = (prefs) => {
  writeJson(TASTE_KEY, prefs || []);
};

export const getCommunityFavorites = () => {
  return readJson(COMMUNITY_KEY, []);
};

export const setCommunityFavorites = (list) => {
  writeJson(COMMUNITY_KEY, list || []);
};

export const addCommunityFavorite = (meal) => {
  if (!meal || !meal.idMeal) return;
  const list = readJson(COMMUNITY_KEY, []);
  const exists = list.some((m) => m.idMeal === meal.idMeal);
  if (exists) return;
  const item = {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
  };
  list.unshift(item);
  // cap at 50
  writeJson(COMMUNITY_KEY, list.slice(0, 50));
};

export const removeCommunityFavorite = (idMeal) => {
  if (!idMeal) return;
  const list = readJson(COMMUNITY_KEY, []);
  const filtered = list.filter((m) => m.idMeal !== idMeal);
  writeJson(COMMUNITY_KEY, filtered);
};

export const getAuthUser = () => readJson(AUTH_KEY, null);

export const signupUser = ({ name, email, password }) => {
  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanPassword = (password || "").trim();

  if (!cleanName || !cleanEmail || !cleanPassword) {
    return { ok: false, message: "Please fill all signup fields." };
  }

  const users = readJson(USERS_KEY, []);
  const exists = users.some((u) => u.email === cleanEmail);
  if (exists) {
    return { ok: false, message: "Email already exists. Please login." };
  }

  const user = { name: cleanName, email: cleanEmail, password: cleanPassword };
  users.push(user);
  writeJson(USERS_KEY, users);
  writeJson(AUTH_KEY, { name: user.name, email: user.email });

  return { ok: true, user: { name: user.name, email: user.email } };
};

export const loginUser = ({ email, password }) => {
  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanPassword = (password || "").trim();

  if (!cleanEmail || !cleanPassword) {
    return { ok: false, message: "Please enter email and password." };
  }

  const users = readJson(USERS_KEY, []);
  const user = users.find(
    (u) => u.email === cleanEmail && u.password === cleanPassword,
  );

  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  writeJson(AUTH_KEY, { name: user.name, email: user.email });
  return { ok: true, user: { name: user.name, email: user.email } };
};

export const logoutUser = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {}
};

export default {};
