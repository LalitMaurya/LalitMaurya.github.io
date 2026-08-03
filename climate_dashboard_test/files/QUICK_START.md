# 🚀 Quick Start Guide - India Heat Tracker

Get up and running in 5 minutes!

## 📋 What You Have

Three main files:

1. **`india_heat_tracker.html`** - The interactive dashboard (open in browser)
2. **`india_city_temperature.csv`** - Daily temperature data (13,000+ records)
3. **`india_cities_metadata.csv`** - City coordinates and statistics

## 🎯 Get Started (30 seconds)

### Option A: Direct Open (Easiest)
```
1. Find 'india_heat_tracker.html'
2. Double-click to open in browser
3. Done! Dashboard is live
```

### Option B: Local Server (Better for updates)
```bash
# Using Python 3
cd /path/to/dashboard
python -m http.server 8000

# Then open: http://localhost:8000/india_heat_tracker.html
```

### Option C: Cloud (Best for sharing)
1. Upload files to GitHub Pages / Netlify / Vercel
2. Share the link
3. Everyone can access the dashboard

---

## 🗺️ Using the Dashboard

### 1️⃣ Search for a City
- Type city name in left panel
- See autocomplete suggestions
- Click to select

### 2️⃣ View City Details
- Selected city appears highlighted on map
- Large card on right shows:
  - Latest temperatures
  - 30-day trend chart
  - Temperature anomalies
  - Historical statistics

### 3️⃣ Compare Cities
- Bottom section shows top 3 alternative cities
- Each has its own mini trend chart
- Click on top cities list to switch

### 4️⃣ Understand the Heat Colors
```
🔵 Cool      (< 25°C)    - Blue
🟡 Moderate  (25-30°C)   - Yellow
🟠 Hot       (30-35°C)   - Orange
🔴 Very Hot  (35-40°C)   - Red
🟫 Extreme   (> 40°C)    - Dark Red
```

---

## 📊 Understanding the Data

### Temperature Metrics
- **tmax** = Highest temperature of the day
- **tmin** = Lowest temperature of the day
- **tmax_normal** = Average max temp for that date (30-year average)
- **tmin_normal** = Average min temp for that date (30-year average)
- **tmax_anomaly** = tmax - tmax_normal (how much hotter/cooler than normal)

### Example Reading
```
Date: 2025-05-15
City: New Delhi
tmax: 42.1°C (actual)
tmax_normal: 40.2°C (average for May 15)
tmax_anomaly: +1.9°C (1.9°C hotter than normal)
```

---

## ✏️ Updating Data

### Method 1: Using Python Script (Recommended)

```bash
# Convert Excel to CSV
python update_data.py your_new_data.xlsx -o .

# Validate the result
python update_data.py -v india_city_temperature.csv --verbose
```

### Method 2: Manual CSV Update

Open `india_city_temperature.csv` in Excel/Sheets and add rows:

```
date,city,tmax_normal,tmax,tmin_normal,tmin,tmax_anomaly,tmin_anomaly
2025-05-15,New Delhi,40.2,42.1,27.3,29.5,1.9,2.2
2025-05-16,New Delhi,40.3,41.8,27.4,28.9,1.5,1.5
```

Then save and refresh browser → dashboard updates!

### Method 3: Bulk Import

Prepare Excel file with this structure:
- Each city gets 7 columns
- Column 1: Date
- Column 2: tmax_normal
- Column 3: tmax
- Column 4: tmin_normal
- Column 5: tmin
- Column 6-7: Additional fields

Run: `python update_data.py temperature_data.xlsx`

---

## 🐛 Troubleshooting

### "CSV files not loading"
**Solution:**
- Use local server instead of double-clicking HTML
- Files must be in same directory
- Check filename spelling

### "Map shows no cities"
**Solution:**
- Coordinates might be invalid (0,0)
- Edit `india_cities_metadata.csv`
- Verify coordinates are in range: latitude (-90 to 90), longitude (-180 to 180)

### "Charts not showing"
**Solution:**
- Ensure city has enough data (minimum 3 records)
- Check date format: YYYY-MM-DD
- No empty temperature values

### "Can't add new data"
**Solution:**
- Use CSV format, not Excel
- Column names must match exactly
- No special characters in city names

---

## 📈 Common Tasks

### Task: Update yesterday's temperature
1. Open `india_city_temperature.csv`
2. Add new row at bottom:
   ```
   2025-05-16,Your City,33.2,35.5,23.1,24.8,2.3,1.7
   ```
3. Save file
4. Refresh browser

### Task: Add a new city
1. Update `india_cities_metadata.csv` - add coordinates
2. Update `india_city_temperature.csv` - add temperature records
3. Refresh browser

### Task: Share dashboard online
1. Upload all files to GitHub/Netlify/Vercel
2. Share the public URL
3. Others can view without installation

### Task: Change colors
1. Open `india_heat_tracker.html` in text editor
2. Find `:root {` section
3. Change CSS variables:
   ```css
   --header-1: #dc2626;  /* Your color here */
   --cool: #4f46e5;
   ```
4. Save and refresh

---

## 📦 File Structure Explained

```
dashboard/
│
├── india_heat_tracker.html
│   ├── HTML structure
│   ├── CSS styles
│   └── D3.js visualization code
│
├── india_city_temperature.csv
│   ├── 13,000+ temperature records
│   ├── 38 Indian cities
│   └── Updated regularly
│
├── india_cities_metadata.csv
│   ├── City coordinates
│   ├── State information
│   └── Statistical summaries
│
├── update_data.py
│   ├── Converts Excel → CSV
│   ├── Validates data
│   └── Manages metadata
│
└── README.md & QUICK_START.md
    └── Documentation
```

---

## 🎨 Customization Examples

### Change header color to blue
Edit HTML, find:
```css
--header-1: #dc2626;
--header-2: #991b1b;
```

Change to:
```css
--header-1: #0066ff;
--header-2: #003399;
```

### Change cool temperature threshold to 20°C
Find function:
```javascript
function getTemperatureColor(temp) {
  if (temp < 25) return '#4f46e5';
```

Change to:
```javascript
function getTemperatureColor(temp) {
  if (temp < 20) return '#4f46e5';  // Now 20 instead of 25
```

### Show last 60 days instead of 30
Find in chart code:
```javascript
const recentData = cityData.slice(-30);
```

Change to:
```javascript
const recentData = cityData.slice(-60);
```

---

## 📱 Mobile Tips

✅ Dashboard works on mobile!
- Tap city circle to select
- Scroll horizontally on charts
- Bottom cards stack vertically
- Touch-friendly interface

---

## 🔄 Regular Maintenance

### Daily
- Check for data quality issues
- Verify new records loaded

### Weekly
- Run data validation: `python update_data.py -v india_city_temperature.csv`
- Backup CSV files

### Monthly
- Archive old data
- Update city statistics
- Check for missing cities

---

## 📞 Support Checklist

Before reporting issues:

- [ ] Using local server (not direct file open)?
- [ ] CSV files in same directory as HTML?
- [ ] Date format is YYYY-MM-DD?
- [ ] No empty temperature cells?
- [ ] Coordinates between -180/+180 longitude?
- [ ] Tried refreshing browser (Ctrl+F5)?
- [ ] Checked browser console (F12)?

---

## 🎓 Learn More

- **D3.js Docs**: https://d3js.org
- **CSV Format**: RFC 4180
- **IMD Data Source**: https://mausam.imd.gov.in

---

## Next Steps

1. ✅ Open the dashboard
2. ✅ Search for your city
3. ✅ Check the temperature trends
4. ✅ Try updating with new data
5. ✅ Share with others!

**Happy tracking!** 🌡️
