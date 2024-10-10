// "use client";

// const TopLosersGainers = ({ data }) => {
//     return (
//         <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <h1 className="text-2xl font-semibold mb-4">Top Gainers and Losers Today</h1>
//             <div className="flex flex-col md:flex-row gap-4 items-center">
//                 {/* Image on the left */}
//                 <div className="flex-1 flex items-center justify-center">
//                     <img
//                         src="/bull.png"   // Path to the bull image
//                         alt="Bull"
//                         className="w-32 h-32 object-cover" // Adjust size here
//                     />
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 flex flex-col md:flex-row gap-4">
//                     {/* Top Gainers Table */}
//                     <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
//                         <h3 className="text-xl font-medium mb-2">Top Gainers</h3>
//                         <table className="min-w-full table-auto border-collapse">
//                             <thead className="bg-gray-200">
//                                 <tr>
//                                     <th className="py-2 px-4 border-b">Symbol</th>
//                                     <th className="py-2 px-4 border-b">Percentage Change</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data.top_gainers.length > 0 ? (
//                                     data.top_gainers.map((stock) => (
//                                         <tr key={stock.symbol}>
//                                             <td className="py-2 px-4 border-b">{stock.symbol}</td>
//                                             <td className="py-2 px-4 border-b text-green-600">
//                                                 {stock.percentage_change.toFixed(2)}%

//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="2" className="py-2 px-4 text-center">No data available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Top Losers Table */}
//                     <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
//                         <h3 className="text-xl font-medium mb-2">Top Losers</h3>
//                         <table className="min-w-full table-auto border-collapse">
//                             <thead className="bg-gray-200">
//                                 <tr>
//                                     <th className="py-2 px-4 border-b">Symbol</th>
//                                     <th className="py-2 px-4 border-b">Percentage Change</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data.top_losers.length > 0 ? (
//                                     data.top_losers.map((stock) => (
//                                         <tr key={stock.symbol}>
//                                             <td className="py-2 px-4 border-b">{stock.symbol}</td>
//                                             <td className="py-2 px-4 border-b text-red-600">
//                                                 {stock.percentage_change.toFixed(2)}%

//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="2" className="py-2 px-4 text-center">No data available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Image on the right */}
//                 <div className="flex-1 flex items-center justify-center">
//                     <img
//                         src="/bear.png"   // Path to the bear image
//                         alt="Bear"
//                         className="w-32 h-32 object-cover" // Adjust size here
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopLosersGainers;


"use client";

const TopLosersGainers = ({ data }) => {
    // Filter to only include stocks with negative percentage change for top losers
    const filteredLosers = data.top_losers.filter(stock => stock.percentage_change < 0);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Top Gainers and Losers Today</h1>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Image on the left */}
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src="/bull.png"   // Path to the bull image
                        alt="Bull"
                        className="w-32 h-32 object-cover" // Adjust size here
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                    {/* Top Gainers Table */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-xl font-medium mb-2">Top Gainers</h3>
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border-b">Symbol</th>
                                    <th className="py-2 px-4 border-b">Percentage Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.top_gainers.length > 0 ? (
                                    data.top_gainers.map((stock) => (
                                        <tr key={stock.symbol}>
                                            <td className="py-2 px-4 border-b">{stock.symbol}</td>
                                            <td className="py-2 px-4 border-b text-green-600">
                                                {stock.percentage_change.toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="py-2 px-4 text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Top Losers Table */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-xl font-medium mb-2">Top Losers</h3>
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border-b">Symbol</th>
                                    <th className="py-2 px-4 border-b">Percentage Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLosers.length > 0 ? (
                                    filteredLosers.map((stock) => (
                                        <tr key={stock.symbol}>
                                            <td className="py-2 px-4 border-b">{stock.symbol}</td>
                                            <td className="py-2 px-4 border-b text-red-600">
                                                {stock.percentage_change.toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="py-2 px-4 text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Image on the right */}
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src="/bear.png"   // Path to the bear image
                        alt="Bear"
                        className="w-32 h-32 object-cover" // Adjust size here
                    />
                </div>
            </div>
        </div>
    );
};

export default TopLosersGainers;
