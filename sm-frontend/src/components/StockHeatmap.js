// src/components/PriceChangePercentage.js
"use client";

import React, { useState, useEffect } from 'react';
// import TreemapComponent from './TreemapComponent';

import dynamic from 'next/dynamic'; // Add this line

// Import TreemapComponent dynamically with SSR disabled
const TreemapComponent = dynamic(() => import('./TreemapComponent'), { 
    ssr: false, // Disable server-side rendering 
});


const PriceChangePercentage = ({ data }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('24h');
    const [filteredData, setFilteredData] = useState([]);

    // Hardcoded market cap values (in billions USD)
    const marketCaps = {
        "AAPL": 2500, "MSFT": 2300, "GOOGL": 1600, "AMZN": 1400, "TSLA": 800,
        "NVDA": 1100, "BRK-B": 700, "META": 900, "UNH": 500, "JNJ": 450,
        "V": 420, "XOM": 350, "JPM": 400, "PG": 340, "HD": 300,
        "MA": 320, "LLY": 280, "CVX": 270, "MRK": 290, "PEP": 250,
        "ABBV": 240, "KO": 230, "PFE": 220, "AVGO": 210, "COST": 200,
        "TMO": 190, "MCD": 180, "CSCO": 170, "NKE": 160, "WMT": 150,
        "DIS": 140, "ADBE": 130, "DHR": 120, "NFLX": 110, "ABT": 100,
        "PM": 90, "VZ": 80, "ORCL": 70, "CRM": 60, "ACN": 50,
        "NEE": 45, "TXN": 40, "NVS": 35, "TM": 30, "AZN": 25,
        "SNY": 20, "INTC": 18, "LIN": 15, "TMUS": 12, "AMGN": 10,
    };

    useEffect(() => {
        const periodData = data[selectedPeriod] || [];

        // Prepare filtered data for treemap
        const filteredData = periodData.map(stock => ({
            symbol: stock.symbol,
            percentage_change: stock.percentage_change.toFixed(2),
        }));

        setFilteredData(filteredData);
    }, [selectedPeriod, data]);

    return (
        <div>
            <div className="mb-4">
                <button
                    className={`py-2 px-4 mr-2 rounded ${selectedPeriod === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedPeriod('24h')}
                >
                    Last 24 Hours
                </button>
                <button
                    className={`py-2 px-4 mr-2 rounded ${selectedPeriod === '30d' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedPeriod('30d')}
                >
                    Last 30 Days
                </button>
                <button
                    className={`py-2 px-4 rounded ${selectedPeriod === '1y' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedPeriod('1y')}
                >
                    Last 1 Year
                </button>
            </div>

            <TreemapComponent
                data={filteredData}
                marketCaps={marketCaps}
            />
        </div>
    );
};

export default PriceChangePercentage;
