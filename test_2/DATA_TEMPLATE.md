# 📋 Data Format Reference & Template

Complete guide to CSV formats used in India Heat Tracker.

---

## 🔴 Temperature Data CSV Format

**File:** `india_city_temperature.csv`

### Column Definitions

| # | Column Name | Type | Required | Format | Example |
|---|-------------|------|----------|--------|---------|
| 1 | date | String | ✅ YES | YYYY-MM-DD | 2025-05-15 |
| 2 | city | String | ✅ YES | Exact name | New Delhi |
| 3 | tmax_normal | Float | ❌ NO | Decimal | 40.2 |
| 4 | tmax | Float | ✅ YES | Decimal | 42.1 |
| 5 | tmin_normal | Float | ❌ NO | Decimal | 27.3 |
| 6 | tmin | Float | ✅ YES | Decimal | 29.5 |
| 7 | tmax_anomaly | Float | ❌ NO | Decimal | 1.9 |
| 8 | tmin_anomaly | Float | ❌ NO | Decimal | 2.2 |

### Calculation Rules

```
tmax_anomaly = tmax - tmax_normal
tmin_anomaly = tmin - tmin_normal

Examples:
- If tmax = 42.1 and tmax_normal = 40.2 → anomaly = 1.9
- If tmax = 38.5 and tmax_normal = 40.2 → anomaly = -1.7
```

### Valid Value Ranges

- **Latitude**: -90.0 to 90.0
- **Longitude**: -180.0 to 180.0
- **Temperature**: -50 to 60 (°C)
- **Anomaly**: -20 to 20 (°C)

### Sample Data

```csv
date,city,tmax_normal,tmax,tmin_normal,tmin,tmax_anomaly,tmin_anomaly
2025-05-15,New Delhi,40.2,42.1,27.3,29.5,1.9,2.2
2025-05-15,Mumbai,31.8,32.5,27.2,28.1,0.7,0.9
2025-05-15,Bengaluru,29.5,30.2,20.8,21.5,0.7,0.7
2025-05-15,Chennai,35.1,36.8,27.4,28.5,1.7,1.1
2025-05-15,Kolkata,35.2,37.1,26.8,28.2,1.9,1.4
2025-05-16,New Delhi,40.3,41.8,27.4,28.9,1.5,1.5
2025-05-16,Mumbai,32.1,32.8,27.3,28.2,0.7,0.9
2025-05-16,Bengaluru,29.8,30.5,21.0,21.8,0.7,0.8
```

---

## 🟢 Cities Metadata CSV Format

**File:** `india_cities_metadata.csv`

### Column Definitions

| # | Column Name | Type | Required | Format | Example |
|---|-------------|------|----------|--------|---------|
| 1 | city | String | ✅ YES | Exact name | New Delhi |
| 2 | latitude | Float | ✅ YES | -90 to 90 | 28.7041 |
| 3 | longitude | Float | ✅ YES | -180 to 180 | 77.1025 |
| 4 | state | String | ✅ YES | State name | Delhi |
| 5 | latest_date | String | ✅ YES | YYYY-MM-DD | 2025-05-15 |
| 6 | avg_tmax | Float | ✅ YES | Decimal | 33.45 |
| 7 | avg_tmin | Float | ✅ YES | Decimal | 22.67 |
| 8 | record_count | Integer | ✅ YES | Whole number | 356 |

### Sample Data

```csv
city,latitude,longitude,state,latest_date,avg_tmax,avg_tmin,record_count
New Delhi,28.7041,77.1025,Delhi,2025-05-15,33.45,22.67,356
Mumbai,19.0760,72.8777,Maharashtra,2025-05-15,32.12,24.33,353
Bengaluru,12.9716,77.5946,Karnataka,2025-05-15,29.78,20.55,368
Chennai,13.0827,80.2707,Tamil Nadu,2025-05-15,33.89,26.69,368
Kolkata,22.5726,88.3639,West Bengal,2025-05-15,32.15,24.72,355
Hyderabad,17.3850,78.4867,Telangana,2025-05-15,32.45,23.05,361
Pune,18.5204,73.8567,Maharashtra,2025-05-15,31.23,19.45,340
Delhi,28.7041,77.1025,Delhi,2025-05-15,33.45,22.67,356
```

---

## 🔵 City List with Coordinates

Pre-configured cities (use these exact names):

```
Port Blair                (11.7401, 92.6586) - Andaman and Nicobar Islands
Amaravati                 (16.5941, 79.1368) - Andhra Pradesh
Itanagar                  (28.2180, 93.6053) - Arunachal Pradesh
Guwahati                  (26.1445, 91.7362) - Assam
Patna                     (25.5941, 85.1376) - Bihar
Raipur                    (21.2514, 81.6296) - Chhattisgarh
New Delhi                 (28.7041, 77.1025) - Delhi
Diu                       (20.7289, 70.9979) - Daman and Diu
Panjim                    (15.4909, 73.8278) - Goa
Gandhinagar               (23.1815, 72.6369) - Gujarat
Hisar                     (29.1724, 75.7339) - Haryana
Shimla                    (31.7775, 77.1577) - Himachal Pradesh
Jammu                     (32.7266, 75.5373) - Jammu and Kashmir
Srinagar                  (34.0837, 74.7973) - Jammu and Kashmir
Ranchi                    (23.3441, 85.3096) - Jharkhand
Bengaluru                 (12.9716, 77.5946) - Karnataka
Thiruvananthuram          (8.5241, 76.9366) - Kerala
Leh                       (34.1642, 77.5771) - Ladakh
Minicoy                   (8.2825, 72.7822) - Lakshadweep
Bhopal (Arera hills)      (23.1815, 77.4055) - Madhya Pradesh
Mumbai                    (19.0760, 72.8777) - Maharashtra
Imphal                    (24.8170, 94.9090) - Manipur
Shillong                  (25.5788, 91.8933) - Meghalaya
Aizawl                    (23.8103, 92.7015) - Mizoram
Kohima                    (25.6150, 94.1086) - Nagaland
Bhubaneswar-airport       (20.2441, 85.8245) - Odisha
Puducherry                (12.0657, 79.8711) - Puducherry
Ludhiana                  (30.9010, 75.8573) - Punjab
Chandigarh                (30.7333, 76.7794) - Chandigarh
Jaipur (amo)              (26.8124, 75.8026) - Rajasthan
Gangtok                   (27.5330, 88.6139) - Sikkim
Chennai (Nungambakkam)    (13.0827, 80.2707) - Tamil Nadu
Hyderabad                 (17.3850, 78.4867) - Telangana
Agartala                  (23.8241, 91.2796) - Tripura
Lucknow (airport)         (26.7606, 80.8910) - Uttar Pradesh
Dehradun (Mokhampur)      (30.1928, 78.0064) - Uttarakhand
Kolkata                   (22.5726, 88.3639) - West Bengal
Ahmedabad                 (23.0225, 72.5714) - Gujarat
```

---

## ✅ Data Validation Checklist

### Before Adding Data:

- [ ] All dates in YYYY-MM-DD format
- [ ] No leading/trailing spaces in city names
- [ ] Temperature values are numbers (not text)
- [ ] Anomalies calculated correctly
- [ ] No empty cells in required columns
- [ ] City names match exactly (case-sensitive)
- [ ] Coordinates within valid ranges
- [ ] No duplicate date+city combinations

### Common Errors & Fixes:

| Error | Cause | Fix |
|-------|-------|-----|
| "City not found on map" | Coordinates missing/invalid | Check latitude/longitude in metadata CSV |
| "Chart shows gaps" | Missing daily records | Ensure all dates 2025-05-01 to today |
| "Temperature seems wrong" | Format issue | Verify decimal separator (. not ,) |
| "Anomaly incorrect" | Calculation error | Recalculate: actual - normal |
| "City name mismatch" | Spelling differences | Use exact names from list above |

---

## 📝 Adding a New City

### Step 1: Update Metadata CSV

Add line to `india_cities_metadata.csv`:
```csv
Your City Name,LATITUDE,LONGITUDE,State Name,2025-05-15,32.5,20.3,1
```

Example:
```csv
Jamshedpur,22.8046,84.3239,Jharkhand,2025-05-15,33.2,24.1,50
```

### Step 2: Add Temperature Records

Add rows to `india_city_temperature.csv`:
```csv
2025-05-15,Jamshedpur,31.2,33.5,25.1,26.8,2.3,1.7
2025-05-14,Jamshedpur,30.8,32.9,24.9,26.2,2.1,1.3
```

### Step 3: Verify & Update

- Latitude: Between -90 and 90
- Longitude: Between -180 and 180
- State: Match official Indian state names
- Dates: Start from earliest data available

### Step 4: Test

1. Refresh browser
2. Search for city name
3. Verify it appears on map
4. Check temperature values

---

## 🔄 Bulk Data Import

### Using Excel to CSV Conversion

**Excel Format:**
```
Each city uses 7 columns:
Col 1: Date
Col 2: tmax_normal
Col 3: tmax
Col 4: tmin_normal
Col 5: tmin
Col 6: (reserved)
Col 7: (reserved)
```

**To Convert:**
```bash
python update_data.py your_excel_file.xlsx -o .
```

This automatically:
- ✓ Extracts all cities
- ✓ Calculates anomalies
- ✓ Sorts by date
- ✓ Validates data
- ✓ Saves as CSV

---

## 📊 Data Quality Standards

### Temperature Ranges by Season

| Season | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| North (Delhi) Max | 24 | 27 | 33 | 39 | 41 | 39 | 35 | 34 | 33 | 32 | 28 | 25 |
| South (Chennai) Max | 29 | 31 | 34 | 37 | 38 | 35 | 33 | 32 | 32 | 31 | 29 | 28 |

Use these as reference to validate incoming data.

---

## 🛠️ Tools for Data Preparation

### Python Pandas Example

```python
import pandas as pd

# Read Excel
df = pd.read_excel('temperature_data.xlsx')

# Clean
df = df.dropna()  # Remove empty rows
df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')

# Calculate anomalies
df['tmax_anomaly'] = df['tmax'] - df['tmax_normal']
df['tmin_anomaly'] = df['tmin'] - df['tmin_normal']

# Sort
df = df.sort_values(['city', 'date'])

# Save
df.to_csv('india_city_temperature.csv', index=False)
```

### Google Sheets to CSV

1. Open Google Sheet
2. File → Download → CSV
3. Open in text editor
4. Verify format matches template
5. Save as .csv file

### LibreOffice Calc Example

```
1. Open temperature_data.ods
2. Select all data
3. File → Save As
4. Format: CSV (.csv)
5. Save as 'india_city_temperature.csv'
```

---

## 📈 Time Series Best Practices

### Continuous Data
- Ideal: Daily records
- Minimum: Weekly records
- Maximum gap: 7 days

### Quality Scoring
```
100% Complete = All days have data
80-99% = Some missing days
60-79% = Regular gaps
< 60%  = Too sparse (consider adding more data)
```

### Interpolation
For missing days, calculate average:
```
Missing day temp = (day_before + day_after) / 2
```

---

## 🔐 Data Security Notes

### Sensitive Information
- Only temperature data is needed
- No personal information required
- Public IMD data is safe to use

### File Safety
- Keep backups of CSV files
- Version control: date_data_YYYY-MM-DD.csv
- Test updates on copy first

---

## 📞 Data Troubleshooting

### Question: How do I get actual temperature data?

**Answer:** Download from:
- India Meteorological Department: https://mausam.imd.gov.in
- Weather APIs: OpenWeatherMap, WeatherAPI
- Research databases: NOAA, NCEI

### Question: Can I use approximated temperatures?

**Answer:** Yes, but:
- Mark clearly which are estimates
- Use nearby station data
- Document assumptions

### Question: How far back should I go?

**Answer:** Recommendations:
- Historical: 5-10 years minimum
- Real-time: Daily updates
- For analysis: Minimum 1 full year

---

## ✨ Example Complete Update Workflow

```bash
# 1. Download new IMD data
wget https://mausam.imd.gov.in/export/temperature_data.xlsx

# 2. Convert to CSV
python update_data.py temperature_data.xlsx -o .

# 3. Validate
python update_data.py -v india_city_temperature.csv --verbose

# 4. Backup old files
cp india_city_temperature.csv india_city_temperature_backup.csv

# 5. Open browser
open india_heat_tracker.html

# 6. Verify data appears
# Click cities and check latest dates and temperatures
```

---

**Last Updated:** 2025-05-15
**Version:** 1.0
