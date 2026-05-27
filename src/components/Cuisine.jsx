import React from "react";

import { Globe } from "lucide-react";

import { Link } from "react-router-dom";

const Cuisine = ({ filterByArea }) => {
  const featuredAreas = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Indian",
    "Italian",
    "Mexican",
    "Russian",
    "Thai",
  ];

  return (
    <section>
      <div className="px-4 mb-4">
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight flex items-center gap-3 border-l-4 border-yellow-400 pl-4">
          <Globe className="w-6 h-6 text-blue-500" />
          Global Cuisines
        </h2>
        <p className="text-muted text-sm">
          Tap a cuisine to quickly filter recipes.
        </p>
      </div>

      <div className="sm:hidden px-4">
        <div className="flex gap-3 overflow-x-auto py-2 cuisine-scroll">
          {featuredAreas.map((area) => (
            <Link
              to={`search/${area}`}
              onClick={() => filterByArea(area)}
              key={area}
              aria-label={`Filter by ${area}`}
              className="inline-flex items-center whitespace-nowrap px-4 py-2 rounded-full card shadow-sm text-sm font-semibold text-accent hover:scale-105 transition"
            >
              {area}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {featuredAreas.map((area) => (
          <Link
            to={`search/${area}`}
            onClick={() => filterByArea(area)}
            key={area}
            aria-label={`Filter by ${area}`}
            className="card p-5 rounded-xl shadow-xl transition duration-300 text-center font-semibold hover:scale-[1.03] hover:ring-2 hover:ring-accent/20"
          >
            <div className="text-lg">{area}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Cuisine;
