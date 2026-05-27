import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import RecipeDetailView from "./components/RecipeDetailView";
import SearchView from "./components/SearchView";
import HomeView from "./components/HomeView";
import Footer from "./components/Footer";
import { getAuthUser, loginUser, logoutUser, signupUser } from "./utils/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [authUser, setAuthUser] = useState(() => getAuthUser());

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const url = `${API_URL}filter.php?${filterType}=${query}`;
      console.log("filterRecipe: fetching", url);
      let res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      let result = await res.json();

      // if area filter returned empty, try common fallback variants (helps when API uses slightly different names)
      if (filterType === "a" && !result?.meals) {
        const areaFallbacks = {
          Indian: ["India"],
        };
        const fallbacks = areaFallbacks[query];
        if (fallbacks && fallbacks.length) {
          for (const alt of fallbacks) {
            const altUrl = `${API_URL}filter.php?${filterType}=${alt}`;
            console.log("filterRecipe: trying fallback", altUrl);
            res = await fetch(altUrl);
            if (!res.ok) continue;
            result = await res.json();
            if (result?.meals) break;
          }
        }
      }

      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // filter by category
  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe],
  );

  // filter by area
  const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe],
  );

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleSignup = useCallback((payload) => {
    const result = signupUser(payload);
    if (result.ok) setAuthUser(result.user);
    return result;
  }, []);

  const handleLogin = useCallback((payload) => {
    const result = loginUser(payload);
    if (result.ok) setAuthUser(result.user);
    return result;
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser();
    setAuthUser(null);
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
          <Navbar
            handleSearch={handleSearch}
            authUser={authUser}
            onSignup={handleSignup}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomeView
                  filterByCategory={filterByCategory}
                  filterByArea={filterByArea}
                  isAuthenticated={Boolean(authUser)}
                />
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetailView />} />
            <Route
              path="/search/:query"
              element={
                <SearchView meals={searchResult} loading={searchLoading} />
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
