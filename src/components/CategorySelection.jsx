import { Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const CategorySelection = ({ filterByCategory }) => {
  const featuredCategories = [
    "Chicken",
    "Dessert",
    "Seafood",
    "Vegetarian",
    "Breakfast",
    "Pasta",
    "Goat",
    "Pork",
    "Lamb",
  ];

  return (
    <section className="mt-20">
      <div className="px-4 mb-4">
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight flex items-center gap-3 border-l-4 border-yellow-400 pl-4">
          <Utensils className="w-6 h-6 text-blue-500" />
          Quick Filter by Primary Ingredient
        </h2>
        <p className="text-muted text-sm">
          Tap a primary ingredient to quickly filter recipes.
        </p>
      </div>

      {/* Small screens: horizontal scrollable chips */}
      <div className="sm:hidden px-4">
        <div className="flex gap-3 overflow-x-auto py-2">
          {featuredCategories.map((cat, index) => (
            <Link
              to={`search/${cat}`}
              key={index}
              onClick={() => filterByCategory(cat)}
              aria-label={`Filter by ${cat}`}
              className="inline-flex items-center whitespace-nowrap px-4 py-2 rounded-full card shadow-sm text-sm font-semibold text-accent hover:scale-105 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Larger screens: responsive grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {featuredCategories.map((cat, index) => (
          <Link
            to={`search/${cat}`}
            key={index}
            onClick={() => filterByCategory(cat)}
            aria-label={`Filter by ${cat}`}
            className="card p-5 rounded-xl shadow-xl transition duration-300 text-center font-semibold hover:scale-[1.03] hover:ring-2 hover:ring-accent/20"
          >
            <div className="text-lg">{cat}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySelection;
