import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const RecipeCard = ({ meal, compact = false }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const cardStyle = {
    backgroundColor: isLight ? "#ffffff" : "#0b1220",
    color: isLight ? "#0f1724" : "#e6eef8",
    borderColor: isLight
      ? "rgba(15, 23, 36, 0.08)"
      : "rgba(59, 130, 246, 0.12)",
    boxShadow: isLight
      ? "0 18px 40px rgba(15, 23, 42, 0.12)"
      : "0 24px 60px rgba(0, 0, 0, 0.42)",
  };

  const imageStyle = {
    borderColor: isLight
      ? "rgba(15, 23, 36, 0.08)"
      : "rgba(59, 130, 246, 0.12)",
  };

  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div
        className={`recipe-card card relative rounded-xl overflow-hidden group transform transition duration-500 cursor-pointer ${compact ? "mb-5" : ""}`}
        style={cardStyle}
      >
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/80 transition duration-500"></div>

        <div
          className={`flex justify-center items-center ${compact ? "p-5" : "p-5"}`}
        >
          <img
            src={meal?.strMealThumb}
            alt=""
            style={imageStyle}
            className={
              compact
                ? "h-[120px] w-[120px] rounded-xl border border-(--border) transition duration-500 group-hover:scale-105"
                : "h-60 w-60 rounded-xl border border-(--border) transition duration-500 group-hover:scale-105"
            }
          />
        </div>
        {!compact && (
          <div className="p-2 text-center">
            <h3 className="text-xl pb-3 font-bold mb-1 group-hover:text-blue-400 transition duration-300">
              {meal.strMeal}
            </h3>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
