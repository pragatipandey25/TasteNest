# <div align="center">🍲 TasteNest</div>

<div align="center">
  <p><b>Food Recipe App</b> — browse, search, and view recipes using <a href="https://www.themealdb.com/">TheMealDB</a>.</p>
  
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-17%2B-61DAFB?style=for-the-badge&logo=react" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite" />
    <img alt="API" src="https://img.shields.io/badge/API-TheMealDB-0B84F3?style=for-the-badge" />
  </p>
</div>

---

## ✨ Features

- Curated sliders for staff picks and trending meals
- Category-based filtering and search
- Recipe detail view with ingredients and instructions
- Includes an **“Indian Favorites”** section (uses TheMealDB)

---

## 🚀 Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run the development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

---

## 📁 Project Structure

- `src/main.jsx` — app entry
- `src/App.jsx` — main router and filters
- `src/components/HomeView.jsx` — home page sliders and sections
- `src/components/TredingRecipe.jsx` — trending slider component
- `src/components/useFetch.js` — fetch hook and `API_URL`

---

## 🔌 API

This project uses TheMealDB public API: `https://www.themealdb.com/api/json/v1/1/`.

> **Note:** Some filters use the **country name** rather than an adjective. For example, the area parameter for Indian recipes is `a=India` (not `a=Indian`).
>
> The home view was updated to use `filter.php?a=India` so the **“Indian Favorites”** slider shows results. See `src/components/HomeView.jsx`.

---

## 🧩 Troubleshooting

- If a slider shows no results, open the browser console and check network requests.
- The fetch hook is in `src/components/useFetch.js`.
- If TheMealDB returns `{"meals": null}`, confirm the corresponding API call (area/query) in a browser.

---

## 🤝 Contributing

Contributions are welcome—open an issue or submit a PR.

Suggested small improvements:

- Add more curated areas or categories
- Add graceful empty-state UI for sliders with no results

---
