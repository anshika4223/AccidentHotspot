# 🚨 Accident Hotspot Alert System

The **Accident Hotspot Alert System** is a full-stack web application designed to identify and visualize accident-prone zones on a map.  
It aims to enhance **road safety** by analyzing historical accident data and providing real-time alerts to users traveling near high-risk areas.

---

## 🧭 Overview

This project helps users:
- View accident hotspots on an interactive map.
- Identify **severity levels** (Minor, Medium, High) based on accident density.
- Get **alerts** if their route passes through or near a high-risk accident zone.
- Allow **engineers or administrators** to view, analyze, and update accident data.

---

## 🚀 Features

### 👥 Role-Based Access
- **User Dashboard:** View current and destination routes with highlighted accident hotspots.
- **Engineer/Admin Dashboard:** Add, edit, or delete accident data points, and monitor high-risk locations.

### 🗺️ Interactive Map
- Built using **Leaflet.js** with OpenStreetMap tiles.
- Displays markers with **different colors/icons** based on accident severity:
  - 🟢 Minor (≤ 5 accidents)
  - 🟡 Medium (6–12 accidents)
  - 🔴 High (> 12 accidents)

### 📍 Route-based Accident Alerts
- Takes user’s current and destination coordinates.
- Uses **geocoding** (OpenStreetMap Nominatim API) to convert location names to coordinates.
- Displays warnings for accident-prone zones within a **1 km radius** of the user’s route.

### 📊 Data Analysis
- Accident data analyzed from **5 years of records** (10,000+ data points).
- Severity classification based on frequency and location clustering.

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Reactjs, JavaScript, Bootstrap, Leaflet.js, FontAwesome |
| **Backend** | Node.js, Express.js |
| **APIs** | OpenStreetMap Nominatim API (for geocoding) |

---


