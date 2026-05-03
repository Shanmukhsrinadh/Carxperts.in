# AutoPrime — Car Dealership Website

A modern, production-ready React-based car dealership website using a JSON file as the data source (no backend).

## Tech Stack
- React 19 + Vite 8
- Tailwind CSS (via @tailwindcss/vite)
- React Router DOM v7
- No backend — data driven from JSON

## Project Structure
```
src/
  data/
    cars.json          # Fleet data (12 cars with full specs)
  utils/
    helpers.js         # Price formatting, WhatsApp message builder, etc.
  components/
    Navbar.jsx         # Sticky glassmorphism nav with mobile menu
    Footer.jsx         # Footer with sell CTA
    CarCard.jsx        # Car listing card with compare toggle
    CompareBar.jsx     # Fixed bottom bar when cars are selected for compare
    SellModal.jsx      # Sell your car popup → WhatsApp prefill
  pages/
    Home.jsx           # Hero + filters + car grid
    CarDetail.jsx      # Large gallery + sticky CTA + full specs
    Compare.jsx        # Side-by-side comparison table (up to 3 cars)
  App.jsx              # Root with BrowserRouter, state management
  main.jsx             # Entry point
  index.css            # Tailwind base + custom utilities
```

## Features
- **Fleet page** with search, brand/fuel/price filters, and sort
- **Car detail page** with image gallery, full specs, and sticky WhatsApp/Call CTAs
- **Compare feature** — select up to 3 cars, side-by-side diff table
- **Sell Your Car** modal — form that prefills WhatsApp message
- **WhatsApp integration** — dynamic messages with car name + last 4 digits of plate (ID)
- Number plates NEVER displayed — only last 4 digits used internally for WhatsApp
- Responsive, mobile-first design
- Glassmorphism + electric blue/indigo accent color system
- Lazy-loaded images

## Running
```bash
npm run dev     # Dev server on port 5000
npm run build   # Production build → dist/
```

## Deployment
Configured as static site: build command `npm run build`, public dir `dist`.
