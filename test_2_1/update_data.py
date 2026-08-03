#!/usr/bin/env python3
"""
India Heat Tracker - Data Update Utility
Converts Excel temperature data to CSV format for the dashboard
"""

import pandas as pd
import numpy as np
from datetime import datetime
from pathlib import Path
import argparse
import sys


class HeatTrackerUpdater:
    """Utility to process temperature data and update CSV files"""
    
    # Cities with their coordinates and states
    CITIES_METADATA = {
        'Port Blair': (11.7401, 92.6586, 'Andaman and Nicobar Islands'),
        'Amaravati': (16.5941, 79.1368, 'Andhra Pradesh'),
        'Itanagar': (28.2180, 93.6053, 'Arunachal Pradesh'),
        'Guwahati': (26.1445, 91.7362, 'Assam'),
        'Patna': (25.5941, 85.1376, 'Bihar'),
        'Raipur': (21.2514, 81.6296, 'Chhattisgarh'),
        'New Delhi': (28.7041, 77.1025, 'Delhi'),
        'Diu': (20.7289, 70.9979, 'Daman and Diu'),
        'Panjim': (15.4909, 73.8278, 'Goa'),
        'Gandhinagar': (23.1815, 72.6369, 'Gujarat'),
        'Hisar': (29.1724, 75.7339, 'Haryana'),
        'Shimla': (31.7775, 77.1577, 'Himachal Pradesh'),
        'Jammu': (32.7266, 75.5373, 'Jammu and Kashmir'),
        'Srinagar': (34.0837, 74.7973, 'Jammu and Kashmir'),
        'Ranchi': (23.3441, 85.3096, 'Jharkhand'),
        'Bengaluru': (12.9716, 77.5946, 'Karnataka'),
        'Thiruvananthuram': (8.5241, 76.9366, 'Kerala'),
        'Leh': (34.1642, 77.5771, 'Ladakh'),
        'Minicoy': (8.2825, 72.7822, 'Lakshadweep'),
        'Bhopal (Arera hills)': (23.1815, 77.4055, 'Madhya Pradesh'),
        'Mumbai ': (19.0760, 72.8777, 'Maharashtra'),
        'Imphal': (24.8170, 94.9090, 'Manipur'),
        'Shillong': (25.5788, 91.8933, 'Meghalaya'),
        'Aizawl': (23.8103, 92.7015, 'Mizoram'),
        'Kohima': (25.6150, 94.1086, 'Nagaland'),
        'Bhubaneswar-airport': (20.2441, 85.8245, 'Odisha'),
        'Puducherry': (12.0657, 79.8711, 'Puducherry'),
        'Ludhiana': (30.9010, 75.8573, 'Punjab'),
        'Chandigarh': (30.7333, 76.7794, 'Chandigarh'),
        'Jaipur (amo)': (26.8124, 75.8026, 'Rajasthan'),
        'Gangtok': (27.5330, 88.6139, 'Sikkim'),
        'Chennai (Nungambakkam)': (13.0827, 80.2707, 'Tamil Nadu'),
        'Hyderabad': (17.3850, 78.4867, 'Telangana'),
        'Agartala': (23.8241, 91.2796, 'Tripura'),
        'Lucknow (airport)': (26.7606, 80.8910, 'Uttar Pradesh'),
        'Dehradun (Mokhampur)': (30.1928, 78.0064, 'Uttarakhand'),
        'Kolkata': (22.5726, 88.3639, 'West Bengal'),
        'Ahmedabad ': (23.0225, 72.5714, 'Gujarat'),
    }

    def __init__(self, verbose=False):
        """Initialize the updater"""
        self.verbose = verbose
        self.log("Heat Tracker Data Updater initialized")

    def log(self, message):
        """Print log message if verbose"""
        if self.verbose:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] {message}")

    def safe_float(self, value):
        """Safely convert value to float, handling common issues"""
        if pd.isna(value):
            return None
        try:
            value_str = str(value).replace('..', '').replace('_', '').strip()
            if value_str == '' or value_str.lower() == 'nan':
                return None
            return float(value_str)
        except (ValueError, AttributeError):
            return None

    def extract_data_from_excel(self, excel_file, output_dir='.'):
        """
        Extract temperature data from Excel file
        Excel format: Each city has 7 columns (Date, tmax_normal, tmax, tmin_normal, tmin, more_max, more_min)
        """
        self.log(f"Reading Excel file: {excel_file}")
        
        try:
            df_raw = pd.read_excel(excel_file, header=None)
        except Exception as e:
            print(f"❌ Error reading Excel file: {e}")
            return False

        # Find cities from first row
        cities = []
        col = 0
        while col < df_raw.shape[1]:
            city_name = df_raw.iloc[0, col]
            if pd.notna(city_name) and city_name != '':
                cities.append((col, str(city_name).strip()))
                col += 7  # Each city has 7 columns
            else:
                col += 1

        self.log(f"Found {len(cities)} cities")
        
        # Extract data
        all_data = []
        for row_idx in range(2, min(df_raw.shape[0], 500)):  # Limit to avoid memory issues
            row_data = df_raw.iloc[row_idx]
            
            for col_idx, city_name in cities:
                try:
                    date_val = row_data.iloc[col_idx]
                    tmax_normal = row_data.iloc[col_idx + 1]
                    tmax = row_data.iloc[col_idx + 2]
                    tmin_normal = row_data.iloc[col_idx + 3]
                    tmin = row_data.iloc[col_idx + 4]
                    
                    # Skip if missing key data
                    if pd.isna(date_val):
                        continue
                    
                    # Convert date
                    if isinstance(date_val, pd.Timestamp):
                        date_str = date_val.strftime('%Y-%m-%d')
                    else:
                        try:
                            date_str = pd.Timestamp(date_val).strftime('%Y-%m-%d')
                        except:
                            continue
                    
                    # Safe float conversion
                    tmax_val = self.safe_float(tmax)
                    tmin_val = self.safe_float(tmin)
                    tmax_n_val = self.safe_float(tmax_normal)
                    tmin_n_val = self.safe_float(tmin_normal)
                    
                    if tmax_val is None or tmin_val is None:
                        continue
                    
                    # Calculate anomalies
                    tmax_anomaly = tmax_val - tmax_n_val if tmax_n_val is not None else None
                    tmin_anomaly = tmin_val - tmin_n_val if tmin_n_val is not None else None
                    
                    all_data.append({
                        'date': date_str,
                        'city': city_name,
                        'tmax_normal': tmax_n_val,
                        'tmax': tmax_val,
                        'tmin_normal': tmin_n_val,
                        'tmin': tmin_val,
                        'tmax_anomaly': tmax_anomaly,
                        'tmin_anomaly': tmin_anomaly
                    })
                except Exception as e:
                    continue

        if not all_data:
            print("❌ No data extracted from Excel file")
            return False

        # Create DataFrame
        result_df = pd.DataFrame(all_data)
        result_df = result_df.sort_values(['city', 'date'])
        
        # Save temperature CSV
        temp_csv = Path(output_dir) / 'india_city_temperature.csv'
        result_df.to_csv(temp_csv, index=False)
        self.log(f"✓ Saved {len(result_df)} records to {temp_csv}")
        
        # Create and save metadata CSV
        self.create_metadata_csv(result_df, output_dir)
        
        print(f"✅ Successfully processed {excel_file}")
        print(f"   • {len(result_df)} total records")
        print(f"   • {result_df['city'].nunique()} cities")
        print(f"   • Date range: {result_df['date'].min()} to {result_df['date'].max()}")
        
        return True

    def create_metadata_csv(self, temp_df, output_dir='.'):
        """Create cities metadata CSV"""
        cities_summary = []
        
        for city_name in temp_df['city'].unique():
            city_data = temp_df[temp_df['city'] == city_name]
            if len(city_data) > 0:
                coords = self.CITIES_METADATA.get(city_name, (0, 0, 'Unknown'))
                cities_summary.append({
                    'city': city_name,
                    'latitude': coords[0],
                    'longitude': coords[1],
                    'state': coords[2],
                    'latest_date': city_data['date'].max(),
                    'avg_tmax': city_data['tmax'].mean(),
                    'avg_tmin': city_data['tmin'].mean(),
                    'record_count': len(city_data)
                })
        
        summary_df = pd.DataFrame(cities_summary)
        summary_df = summary_df.sort_values('city')
        
        meta_csv = Path(output_dir) / 'india_cities_metadata.csv'
        summary_df.to_csv(meta_csv, index=False)
        self.log(f"✓ Saved metadata for {len(cities_summary)} cities to {meta_csv}")

    def validate_csv(self, csv_file):
        """Validate CSV file format"""
        try:
            df = pd.read_csv(csv_file)
            
            required_cols = ['date', 'city', 'tmax', 'tmin']
            missing_cols = [c for c in required_cols if c not in df.columns]
            
            if missing_cols:
                print(f"⚠️  Missing columns: {missing_cols}")
                return False
            
            # Check for data quality
            null_count = df.isnull().sum()
            print(f"\nData quality check for {csv_file}:")
            print(f"  • Total records: {len(df)}")
            print(f"  • Cities: {df['city'].nunique()}")
            print(f"  • Date range: {df['date'].min()} to {df['date'].max()}")
            print(f"  • Null values:\n{null_count}")
            
            return True
        
        except Exception as e:
            print(f"❌ Error validating CSV: {e}")
            return False

    def add_manual_city(self, city_name, latitude, longitude, state, csv_file, date, tmax, tmin, tmax_normal=None, tmin_normal=None):
        """Add a manual entry for a city"""
        try:
            df = pd.read_csv(csv_file)
            
            # Calculate anomalies
            tmax_anomaly = tmax - tmax_normal if tmax_normal else None
            tmin_anomaly = tmin - tmin_normal if tmin_normal else None
            
            new_row = {
                'date': date,
                'city': city_name,
                'tmax_normal': tmax_normal,
                'tmax': tmax,
                'tmin_normal': tmin_normal,
                'tmin': tmin,
                'tmax_anomaly': tmax_anomaly,
                'tmin_anomaly': tmin_anomaly
            }
            
            df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
            df = df.sort_values(['city', 'date'])
            df.to_csv(csv_file, index=False)
            
            self.log(f"✓ Added entry for {city_name} on {date}")
            return True
        
        except Exception as e:
            print(f"❌ Error adding manual entry: {e}")
            return False


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description='Update India Heat Tracker data from Excel files'
    )
    
    parser.add_argument(
        'excel_file',
        nargs='?',
        help='Path to Excel file with temperature data'
    )
    
    parser.add_argument(
        '-o', '--output',
        default='.',
        help='Output directory for CSV files (default: current directory)'
    )
    
    parser.add_argument(
        '-v', '--validate',
        metavar='CSV_FILE',
        help='Validate a CSV file'
    )
    
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable verbose logging'
    )
    
    args = parser.parse_args()
    
    updater = HeatTrackerUpdater(verbose=args.verbose)
    
    if args.validate:
        updater.validate_csv(args.validate)
    elif args.excel_file:
        updater.extract_data_from_excel(args.excel_file, args.output)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
