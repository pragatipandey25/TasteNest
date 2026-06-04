import React from "react";

import RecipeSlider from "./RecipeSlider";
import TredingRecipe from "./TredingRecipe";
import CategorySection from "./CategorySelection";
import CuisineSection from "./Cuisine";
import FeaturedBanner from "./FeaturedBanner";
import PlaceholderSection from "./PlaceholderSection";
import RecentlyViewed from "./RecentlyViewed";

import { API_URL } from "./useFetch";

const HomeView = ({ filterByCategory, filterByArea, isAuthenticated }) => {
  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Featured banner */}
      <FeaturedBanner filterByCategory={filterByCategory} />

      {/* Categories */}
      <CategorySection filterByCategory={filterByCategory} />

      {/* Global Cuisines */}
      <CuisineSection filterByArea={filterByArea} />

      {/* Trending Recipes */}
      <TredingRecipe
        title="Trending Recipes"
        fetchUrl={`${API_URL}search.php?f=t`}
      />

      {/* Staff Curated Picks */}
      <RecipeSlider
        title="Staff Curated Picks"
        fetchUrl={`${API_URL}search.php?f=c`}
      />

      {/* Quick Meals */}
      <TredingRecipe
        title="Quick Meals"
        fetchUrl={`${API_URL}filter.php?a=Canadian`}
      />

      {/* Based on Your Taste (removed) */}

      {/* Healthy Choices */}
      <TredingRecipe
        title="Healthy Choices"
        fetchUrl={`${API_URL}filter.php?c=Vegetarian`}
      />

      {/* Recently Viewed */}
      {isAuthenticated ? <RecentlyViewed /> : null}
    </main>
  );
};

export default HomeView;
