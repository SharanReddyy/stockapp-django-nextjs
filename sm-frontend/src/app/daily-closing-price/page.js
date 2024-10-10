// src/app/daily-closing-price/page.js
"use client";
import { useEffect, useState } from 'react';
import { fetchDailyClosingPrice } from '../../utils/api';
import Navbar from '../../components/Navbar';
import DailyClosingPrice from '../../components/DailyClosingPrice';
import withAuth from '../../utils/withAuth';

const DailyClosingPricePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDailyClosingPrice();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className="flex">
            <Navbar />
            <div className="ml-96 p-4">
                <h1 className="text-2xl mb-4">Daily Closing Price</h1>
                <DailyClosingPrice data={data} />
            </div>
        </div>
    );
};

export default withAuth(DailyClosingPricePage);
