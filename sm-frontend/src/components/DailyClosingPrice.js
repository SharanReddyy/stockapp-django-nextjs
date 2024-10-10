// "use client";

// const DailyClosingPrice = ({ data }) => {
//     const latestDate = data.reduce((latest, stock) => {
//         return new Date(stock.date) > new Date(latest) ? stock.date : latest;
//     }, data[0]?.date);

//     const filteredData = data.filter(stock => stock.date === latestDate);

//     return (
//         <div>
//             {/* <h2 className="text-xl mb-4">Daily Closing Prices</h2> */}
//             <table className="min-w-full bg-white">
//                 <thead>
//                     <tr>
//                         <th className="py-2 px-4 border">Symbol</th>
//                         <th className="py-2 px-4 border">Date</th>
//                         <th className="py-2 px-4 border">Close Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredData.map((stock) => (
//                         <tr key={`${stock.symbol}-${stock.date}`}>
//                             <td className="py-2 px-4 border">{stock.symbol}</td>
//                             <td className="py-2 px-4 border">{stock.date}</td>
//                             <td className="py-2 px-4 border">{parseFloat(stock.close).toFixed(2)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DailyClosingPrice;

"use client";

import React, { useState, useEffect } from 'react';

const DailyClosingPrice = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Find the latest date in the data
        const latestDate = data.reduce((latest, stock) => {
            return new Date(stock.date) > new Date(latest) ? stock.date : latest;
        }, data[0]?.date);

        // Filter data for the latest date
        const latestData = data.filter(stock => stock.date === latestDate);

        // Further filter data based on the search term
        const searchFilteredData = latestData.filter(stock => 
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(searchFilteredData);
    }, [searchTerm, data]);

    return (
        <div>
            {/* Search Bar */}
            <input 
                type="text"
                placeholder="Search by stock symbol..."
                className="mb-4 p-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Daily Closing Prices Table */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Symbol</th>
                        <th className="py-2 px-4 border">Date</th>
                        <th className="py-2 px-4 border">Close Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((stock) => (
                        <tr key={`${stock.symbol}-${stock.date}`}>
                            <td className="py-2 px-4 border">{stock.symbol}</td>
                            <td className="py-2 px-4 border">{stock.date}</td>
                            <td className="py-2 px-4 border">{parseFloat(stock.close).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DailyClosingPrice;
