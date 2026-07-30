# India Temperature Heat Tracker Dashboard

An interactive D3.js dashboard for visualizing daily temperature variations across 38 major Indian cities over a 1-year period.

## Features

✨ **Interactive Map Visualization**
- India map showing city locations with color-coded temperature anomalies
- Hover tooltips displaying detailed temperature information
- Light color scheme inspired by The Guardian and Reuters graphics

📊 **City Cards**
- Visual display of each city's maximum and minimum temperatures
- Temperature anomaly indicators (variance from normal)
- Color-coded cards based on temperature categories
- Sortable by anomaly, max temp, min temp, or city name

📈 **Statistics Dashboard**
- Daily statistics including hottest/coldest cities
- Average temperature anomaly across all cities
- Count of cities above average temperature

🎯 **Date Selection**
- Date picker to view historical data
- Navigate through the entire year of temperature records

## Files Included

### 1. **temperature_dashboard.html**
Main dashboard file. Open this in any modern web browser.

**Requirements:**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for loading D3.js and India map data)
- `temperature_data.csv` and `city_metadata.csv` in the same directory

**How to Use:**
1. Place all three files in the same folder
2. Open `temperature_dashboard.html` in your browser
3. Use the date picker to select a date
4. Click on city markers in the map or view city cards
5. Sort cards using the dropdown menu

### 2. **temperature_data.csv**
Clean, easy-to-update temperature dataset.

**Columns:**
- `date` - Date in YYYY-MM-DD format
- `city` - City name
- `tmax_normal` - Normal maximum temperature
- `tmax` - Actual maximum temperature
- `tmin_normal` - Normal minimum temperature
- `tmin` - Actual minimum temperature
- `tmax_anomaly` - Difference from normal max temperature
- `tmin_anomaly` - Difference from normal min temperature

**Records:** 13,120 (30 cities × ~365 days)

**To Update Data:**
1. Add new rows following the same format
2. Dates must be in YYYY-MM-DD format
3. Temperature values should be numeric (can include decimals)
4. Save with UTF-8 encoding to avoid issues

### 3. **city_metadata.csv**
City coordinates used for map plotting.

**Columns:**
- `city` - City name (must match temperature_data.csv)
- `latitude` - Latitude coordinate
- `longitude` - Longitude coordinate

**To Add New Cities:**
1. Add a new row with city name and coordinates
2. Ensure city name matches exactly in temperature_data.csv
3. Latitude range: -90 to 90
4. Longitude range: -180 to 180

## Color Scheme (Temperature Anomalies)

| Color | Range | Meaning |
|-------|-------|---------|
| 🔴 Red | +3°C and above | Significantly hotter than normal |
| 🟠 Orange | +1°C to +3°C | Moderately hotter than normal |
| 🟡 Yellow | -1°C to +1°C | Near normal temperature |
| 🔵 Light Blue | -1°C to -3°C | Moderately cooler than normal |
| 🔵 Dark Blue | -3°C and below | Significantly cooler than normal |

## Data Format Examples

### temperature_data.csv
```
date,city,tmax_normal,tmax,tmin_normal,tmin,tmax_anomaly,tmin_anomaly
2026-07-27,Port Blair,32,33,25,26,1,1
2026-07-27,New Delhi,38,39,28,29,1,1
```

### city_metadata.csv
```
city,latitude,longitude
Port Blair,11.7345,92.7159
New Delhi,28.7041,77.1025
```

## Customization

### Change Map Colors
Edit the `colorScale` in the HTML file (look for `d3.scaleLinear()`):
```javascript
const colorScale = d3.scaleLinear()
    .domain([-3, -1, 0, 1, 3])
    .range(['#4575b4', '#91bfdb', '#fee090', '#fc8d59', '#d73027'])
```

### Change Dashboard Title
Modify the `<h1>` tag in the header section:
```html
<h1>Your Custom Title Here</h1>
```

### Adjust Map Center or Zoom
Modify the projection settings:
```javascript
const projection = d3.geoMercator()
    .center([78.5, 22])  // [longitude, latitude]
    .scale(1200)         // zoom level
```

## Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ⚠️ Internet Explorer (Not supported)

## Performance

- Dashboard loads optimally with 30-40 cities
- Smooth interactions with 1-2 years of data
- File sizes:
  - HTML: ~15 KB
  - CSV: ~250-400 KB depending on data size

## Data Updates Workflow

1. **Collect new data** for cities in `temperature_data.csv` format
2. **Append rows** to the CSV file (don't modify existing rows)
3. **Verify formatting** - ensure dates are YYYY-MM-DD, values are numeric
4. **Save file** with UTF-8 encoding
5. **Refresh browser** to see updated data

## Troubleshooting

### Map doesn't display
- Check browser console (F12) for errors
- Ensure internet connection (map data loads from CDN)
- Verify D3.js library is loading correctly

### Data not showing
- Ensure CSV files are in the same directory as HTML
- Check that city names match exactly between CSV files
- Verify date format is YYYY-MM-DD

### Slow performance
- Reduce data range (older browsers)
- Check for browser extensions blocking scripts
- Try a different browser

## Browser Console Access

To check for errors:
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for any red error messages

## Technical Stack

- **Visualization:** D3.js v7.8.5
- **Mapping:** TopoJSON for India boundaries
- **Data Format:** CSV
- **Styling:** Pure CSS with Guardian/Reuters design principles

## License & Attribution

This dashboard template is free to use and modify. The India map data is sourced from publicly available GeoJSON resources.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify CSV file formatting
3. Check browser console for error messages
4. Ensure all three files are in the same directory

---

**Last Updated:** July 2026
**Version:** 1.0
**Data Coverage:** 38 Indian Cities | 1+ Year of Daily Data
