// src/app/top-gainers-losers/page.js
"use client";
import { useEffect, useState } from 'react';
import { fetchTopGainersLosers } from '../../utils/api';
import Navbar from '../../components/Navbar';
import TopLosersGainers from '../../components/TopLosersGainers';
import withAuth from '../../utils/withAuth';

const TopGainersLosersPage = () => {
    const [data, setData] = useState({ top_gainers: [], top_losers: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchTopGainersLosers();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className="flex">
            <Navbar />
            <div className="ml-72 p-4">
                {/* <h1 className="text-2xl mb-4">Top Gainers/Losers</h1> */}
                <TopLosersGainers data={data} />
            </div>
        </div>
    );
};

export default withAuth(TopGainersLosersPage);
