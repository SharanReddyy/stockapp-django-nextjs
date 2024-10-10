import yfinance as yf
import pandas as pd
import mysql.connector
from datetime import datetime
import os
from dotenv import load_dotenv

#Load env variables from .env
load_dotenv()

def fetch_data(symbols):
    data = yf.download(tickers=symbols, period="1y", interval="1d", group_by='ticker')
    return data

def process_data(symbol, data):
    data = data.reset_index()
    data = data[['Date', 'Open', 'Close', 'High', 'Low', 'Volume']]
    data.columns = ['date', 'open', 'close', 'high', 'low', 'volume']
    data['symbol'] = symbol
    data['change_percent'] = ((data['close'] - data['open']) / data['open']) * 100
    return data

def store_data(df):
    # db_host = os.getenv('DB_HOST', 'mysql-service')
    # db_port = os.getenv('DB_PORT', '3306')
    # db_user = os.getenv('DB_USER', 'root')
    # db_password = os.getenv('DB_PASSWORD', 'Techdemo223')
    # db_name = os.getenv('DB_NAME', 'techdemo223')


    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT')
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_name = os.getenv('DB_NAME')

    conn = mysql.connector.connect(
        host=db_host,
        port=int(db_port),
        user=db_user,
        password=db_password,
        database=db_name
    )
    cursor = conn.cursor()

    for _, row in df.iterrows():
        cursor.execute("""
            INSERT INTO daily_stock (symbol, date, open, close, high, low, change_percent, volume)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
            open = VALUES(open),
            close = VALUES(close),
            high = VALUES(high),
            low = VALUES(low),
            change_percent = VALUES(change_percent),
            volume = VALUES(volume);
        """, (row['symbol'], row['date'], row['open'], row['close'], row['high'], row['low'], row['change_percent'], row['volume']))

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    # symbols = ["AAPL", "GOOGL", "MSFT"]
    symbols = [
        "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "BRK-B", "META", "UNH", "JNJ",
        "V", "XOM", "JPM", "PG", "HD", "MA", "LLY", "CVX", "MRK", "PEP",
        "ABBV", "KO", "PFE", "AVGO", "COST", "TMO", "MCD", "CSCO", "NKE", "WMT",
        "DIS", "ADBE", "DHR", "NFLX", "ABT", "PM", "VZ", "ORCL", "CRM", "ACN",
        "NEE", "TXN", "NVS", "TM", "AZN", "SNY", "INTC", "LIN", "TMUS", "AMGN"
    ]
    raw_data = fetch_data(symbols)
    
    for symbol in symbols:
        if symbol in raw_data:
            symbol_data = process_data(symbol, raw_data[symbol])
            store_data(symbol_data)
        else:
            print(f"No data found for {symbol}")
