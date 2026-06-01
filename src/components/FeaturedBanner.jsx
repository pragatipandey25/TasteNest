import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedBanner = ({ filterByCategory }) => {
  const navigate = useNavigate();

  const go = (cat) => {
    if (filterByCategory) filterByCategory(cat);
    navigate(`/search/${cat}`);
  };

  return (
    <section className="featured-banner relative overflow-hidden rounded-3xl p-8 shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
      <div className="relative max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-2">
          <p className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_88%,var(--bg))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Chef&apos;s spotlight
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text)]">
            Discover Delicious Recipes
          </h1>
          <p className="max-w-xl text-sm text-muted">
            Explore trending dishes, quick meals, and staff picks curated just
            for you.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => go("Chicken")}
            className="premium-cta premium-chicken px-4 py-2 rounded-full font-semibold shadow-md"
          >
            Explore Chicken
          </button>
          <button
            onClick={() => go("Vegetarian")}
            className="premium-cta premium-veg px-4 py-2 rounded-full font-semibold"
          >
            Browse Veg
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
