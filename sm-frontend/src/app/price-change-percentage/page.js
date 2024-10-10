// src/app/price-change-percentage/page.js
"use client";
import { useEffect, useState } from 'react';
import { fetchPriceChangePercentage } from '../../utils/api';
import Navbar from '../../components/Navbar';
// import PriceChangePercentage from '../../components/PriceChangePercentage';
import withAuth from '../../utils/withAuth';
import StockHeatmap from '../../components/StockHeatmap';

const PriceChangePercentagePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchPriceChangePercentage();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className="flex">
            <Navbar />
            <div className="ml-72 p-4">
                <h1 className="text-2xl mb-4">Price Change Percentage</h1>
                {/* <PriceChangePercentage data={data} /> */}
                <StockHeatmap data={data} />
            </div>
        </div>
    );
};

// export default withAuth(PriceChangePercentagePage);
export default withAuth(PriceChangePercentagePage);
