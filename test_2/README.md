# 🌡️ India City Heat Tracker Dashboard

A comprehensive, interactive dashboard for monitoring city-wise temperature records, anomalies, and heat patterns across India. Built with D3.js and HTML, styled to match modern design standards.

## Features

### 🗺️ **Interactive Map**
- Visual representation of Indian cities with temperature-based color coding
- Click on any city marker to view detailed information
- Hover tooltips showing current temperature and location details
- Real-time last update date display

### 🔍 **Smart City Search**
- Autocomplete search functionality
- Quick selection from dropdown suggestions
- Left sidebar with top 8 hottest cities
- One-click city selection

### 📊 **Detailed City Reports**
- **Large highlight card** for selected city showing:
  - Latest maximum and minimum temperatures
  - Average temperatures
  - Peak recorded temperatures
  - Temperature anomalies above normal
  - 30-day temperature trend chart
  - Historical statistics and state information

### 📈 **Bottom City Cards**
- Top 3 alternative cities displayed below the map
- Individual temperature metrics for quick comparison
- Compact temperature trend charts (20-day view)
- Anomaly indicators

### 🎨 **Heat Color Scale**
- **Cool** (< 25°C): Blue (#4f46e5)
- **Moderate** (25-30°C): Yellow (#fbbf24)
- **Hot** (30-35°C): Orange (#f97316)
- **Very Hot** (35-40°C): Red (#dc2626)
- **Extreme** (> 40°C): Dark Red (#991b1b)

### 📱 **Responsive Design**
- Works on desktop, tablet, and mobile devices
- Adaptive grid layout
- Touch-friendly interface

## File Structure

```
india_heat_tracker/
├── india_heat_tracker.html          # Main dashboard (open in browser)
├── india_city_temperature.csv       # Daily temperature records
├── india_cities_metadata.csv        # City metadata (coordinates, state, etc.)
└── README.md                        # This file
```

## CSV Data Format

### 1. **india_city_temperature.csv**
Daily temperature records for each city.

| Column | Type | Description |
|--------|------|-------------|
| date | YYYY-MM-DD | Date of observation |
| city | String | City name |
| tmax | Float | Maximum temperature (°C) |
| tmin | Float | Minimum temperature (°C) |
| tmax_normal | Float | Normal maximum temperature (°C) |
| tmin_normal | Float | Normal minimum temperature (°C) |
| tmax_anomaly | Float | Deviation from normal max (°C) |
| tmin_anomaly | Float | Deviation from normal min (°C) |

**Example:**
```
date,city,tmax_normal,tmax,tmin_normal,tmin,tmax_anomaly,tmin_anomaly
2025-05-06,New Delhi,40.2,42.1,27.3,29.5,1.9,2.2
2025-05-07,New Delhi,40.3,41.8,27.4,28.9,1.5,1.5
```

### 2. **india_cities_metadata.csv**
Static metadata for each city (coordinates, state, statistics).

| Column | Type | Description |
|--------|------|-------------|
| city | String | City name |
| latitude | Float | Geographic latitude |
| longitude | Float | Geographic longitude |
| state | String | State/Territory name |
| latest_date | YYYY-MM-DD | Most recent data date |
| avg_tmax | Float | Average max temperature |
| avg_tmin | Float | Average min temperature |
| record_count | Integer | Total number of observations |

**Example:**
```
city,latitude,longitude,state,latest_date,avg_tmax,avg_tmin,record_count
New Delhi,28.7041,77.1025,Delhi,2025-05-15,33.45,22.67,356
Mumbai,19.0760,72.8777,Maharashtra,2025-05-15,32.12,24.33,353
```

## Setup Instructions

### Option 1: Direct Browser (Recommended for Quick Start)
1. Download all files to a folder
2. Open `india_heat_tracker.html` in your web browser
3. The dashboard will automatically load the CSV files

### Option 2: Local Server (Recommended for Production)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000/india_heat_tracker.html`

### Option 3: Cloud Hosting
- Upload files to GitHub Pages, Netlify, or Vercel
- Files work with any static hosting service

## Updating Data

### Adding New Cities

1. **Update `india_cities_metadata.csv`** - Add a new row:
   ```
   New City Name,LAT,LON,State Name,2025-05-15,35.2,24.5,100
   ```

2. **Update `india_city_temperature.csv`** - Add daily records:
   ```
   2025-05-15,New City Name,35.5,24.8,33.2,22.9,2.3,1.9
   2025-05-16,New City Name,36.1,25.2,33.5,23.1,2.6,2.1
   ```

3. Refresh the browser - changes appear automatically

### Bulk Data Updates

Use a Python script to process and convert Excel files to CSV:

```python
import pandas as pd

# Read Excel file
excel_file = 'temperature_data.xlsx'
df = pd.read_excel(excel_file)

# Process and save as CSV
df.to_csv('india_city_temperature.csv', index=False)
```

### Data Collection Tips

1. **Source Quality**: Use India Meteorological Department (IMD) data
2. **Frequency**: Daily updates recommended for real-time monitoring
3. **Consistency**: Maintain consistent city names and spelling
4. **Validation**: Verify temperature anomalies are calculated correctly
   - Formula: `anomaly = actual_temp - normal_temp`

## Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

### Dependencies
- **D3.js v7** - Data visualization library (CDN)
- **TopoJSON** - Geographic data (optional, for future enhancements)

No build process or installation required!

### Performance
- Handles 13,000+ data points smoothly
- Optimized for 38+ cities
- Responsive rendering with D3.js
- Automatic data aggregation and calculation

## Customization Guide

### Change Color Scheme

Edit the CSS root variables in `india_heat_tracker.html`:

```css
:root {
  --header-1: #dc2626;  /* Primary red */
  --header-2: #991b1b;  /* Dark red */
  --cool: #4f46e5;      /* Cool temperature color */
  --vhot: #dc2626;      /* Very hot temperature color */
}
```

### Adjust Temperature Thresholds

In the `getTemperatureColor()` function:

```javascript
function getTemperatureColor(temp) {
  if (temp < 20) return '#0066ff';  // Your custom threshold
  if (temp < 30) return '#ffcc00';
  // ... etc
}
```

### Modify Chart Time Ranges

In `renderTemperatureChart()` function:

```javascript
const recentData = cityData.slice(-30);  // Change 30 to desired days
```

## Troubleshooting

### CSV Files Not Loading
- Ensure CSV files are in the same directory as HTML
- Check browser console (F12) for CORS errors
- Use local server instead of opening HTML directly

### Map Not Displaying
- Verify city coordinates are valid (latitude: -90 to 90, longitude: -180 to 180)
- Check that numeric columns have valid numbers
- Clear browser cache and reload

### Charts Not Rendering
- Ensure D3.js library loaded (check network tab)
- Verify city data exists in CSV
- Check for duplicate city names

### Date Format Issues
- Use ISO format: YYYY-MM-DD
- Avoid Excel date serial numbers
- Convert dates to text format before exporting CSV

## Data Fields Reference

### Temperature Metrics
- **tmax**: Maximum daily temperature
- **tmin**: Minimum daily temperature
- **tmax_normal**: 30-year average maximum
- **tmin_normal**: 30-year average minimum
- **tmax_anomaly**: Positive = hotter than normal
- **tmin_anomaly**: Temperature deviation from normal

### Useful Statistics
- **Average Temperature**: Mean of all tmax values
- **Peak Recorded**: Maximum tmax across all dates
- **Heat Anomaly**: Sum of all positive anomalies

## Future Enhancements

- [ ] Monthly/seasonal trend analysis
- [ ] Predictive heat wave alerts
- [ ] Comparison with previous years
- [ ] Export data functionality
- [ ] Animated time-series replay
- [ ] Geospatial heatmap overlay
- [ ] Integration with weather APIs
- [ ] Multi-year comparison views

## API Integration (Optional)

To auto-fetch real-time data from weather APIs:

```javascript
// Example: Replace CSV loading with API call
const API_URL = 'https://api.weather.service/india-temp';

async function loadDataFromAPI() {
  const response = await fetch(API_URL);
  const data = await response.json();
  // Process and use data
}
```

## License

This dashboard is provided as-is for monitoring and educational purposes.

## Credits

- **Designed for**: India Meteorological Department data
- **Built with**: D3.js, HTML5, CSS3
- **Inspired by**: AQI Dashboard design patterns

## Support & Feedback

For issues, improvements, or new features:
1. Check existing city data format
2. Verify CSV file integrity
3. Test with sample cities first
4. Review browser console for errors

---

**Last Updated**: 2026-08-02
**Version**: 1.0
**Status**: Production Ready ✅
